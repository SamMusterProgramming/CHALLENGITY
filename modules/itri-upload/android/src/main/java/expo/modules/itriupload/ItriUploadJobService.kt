package expo.modules.itriupload

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.job.JobParameters
import android.app.job.JobService
import android.os.Build
import androidx.core.app.NotificationCompat
import org.json.JSONObject
import java.io.BufferedInputStream
import java.io.File
import java.io.IOException
import java.net.HttpURLConnection
import java.net.URL
import java.net.URLEncoder
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class ItriUploadJobService : JobService() {

    companion object {
        const val EXTRA_JOB_ID = "jobId"
        const val EXTRA_UPLOAD_URL = "uploadUrl"
        const val EXTRA_AUTHORIZATION = "authorization"
        const val EXTRA_FILE_PATH = "filePath"
        const val EXTRA_FILE_NAME = "fileName"
        const val EXTRA_CONTENT_TYPE = "contentType"

        private const val CHANNEL_ID = "itri_uploads"
    }

    private val executor: ExecutorService =
        Executors.newSingleThreadExecutor()

    @Volatile
    private var connection: HttpURLConnection? = null

    @Volatile
    private var stopping = false

    override fun onStartJob(
        params: JobParameters
    ): Boolean {

        stopping = false

        val jobId = params.extras.getString(EXTRA_JOB_ID)
        val uploadUrl = params.extras.getString(EXTRA_UPLOAD_URL)
        val authorization = params.extras.getString(EXTRA_AUTHORIZATION)
        val filePath = params.extras.getString(EXTRA_FILE_PATH)
        val fileName = params.extras.getString(EXTRA_FILE_NAME)
        val contentType = params.extras.getString(EXTRA_CONTENT_TYPE)

        if (
            jobId.isNullOrBlank() ||
            uploadUrl.isNullOrBlank() ||
            authorization.isNullOrBlank() ||
            filePath.isNullOrBlank() ||
            fileName.isNullOrBlank() ||
            contentType.isNullOrBlank()
        ) {
            jobFinished(params, false)
            return false
        }

        val file = File(filePath)

        if (!file.exists() || !file.isFile) {
            saveState(
                jobId,
                JSONObject()
                    .put("status", "FAILED")
                    .put("error", "Upload file does not exist")
            )

            jobFinished(params, false)
            return false
        }

        createNotificationChannel()

        if (
            Build.VERSION.SDK_INT >=
            Build.VERSION_CODES.UPSIDE_DOWN_CAKE
        ) {
            setNotification(
                params,
                params.jobId,
                createNotification(
                    "Uploading",
                    fileName,
                    0,
                    file.length()
                ),
                JobService.JOB_END_NOTIFICATION_POLICY_REMOVE
            )
        }

        saveState(
            jobId,
            JSONObject()
                .put("status", "UPLOADING")
                .put("fileName", fileName)
                .put("filePath", file.absolutePath)
                .put("bytesTotal", file.length())
                .put("bytesUploaded", 0)
        )

        executor.execute {
            performUpload(
                params,
                jobId,
                uploadUrl,
                authorization,
                file,
                fileName,
                contentType
            )
        }

        return true
    }

    override fun onStopJob(
        params: JobParameters
    ): Boolean {

        stopping = true

        val jobId = params.extras.getString(EXTRA_JOB_ID)

        connection?.disconnect()
        connection = null

        if (!jobId.isNullOrBlank()) {
            saveState(
                jobId,
                JSONObject()
                    .put("status", "STOPPED")
            )
        }

        return true
    }

    private fun performUpload(
        params: JobParameters,
        jobId: String,
        uploadUrl: String,
        authorization: String,
        file: File,
        fileName: String,
        contentType: String
    ) {
        try {
            val url = URL(uploadUrl)

            connection =
                (url.openConnection() as HttpURLConnection).apply {

                    requestMethod = "POST"
                    doOutput = true
                    doInput = true
                    useCaches = false

                    connectTimeout = 30_000
                    readTimeout = 120_000

                    setFixedLengthStreamingMode(file.length())

                    setRequestProperty(
                        "Authorization",
                        authorization
                    )

                    setRequestProperty(
                        "X-Bz-File-Name",
                        URLEncoder.encode(
                            fileName,
                            "UTF-8"
                        )
                    )

                    setRequestProperty(
                        "Content-Type",
                        contentType
                    )

                    setRequestProperty(
                        "X-Bz-Content-Sha1",
                        "do_not_verify"
                    )
                }

            val output = connection!!.outputStream
            val input = BufferedInputStream(
                file.inputStream()
            )

            val buffer = ByteArray(64 * 1024)

            var uploaded = 0L
            var lastPersisted = 0L

            input.use { inputStream ->
                output.use { outputStream ->

                    while (true) {

                        if (stopping) {
                            throw IOException("Upload stopped")
                        }

                        val read = inputStream.read(buffer)

                        if (read == -1) {
                            break
                        }

                        outputStream.write(
                            buffer,
                            0,
                            read
                        )

                        uploaded += read

                        if (
                            uploaded - lastPersisted >=
                            1024 * 1024
                        ) {
                            lastPersisted = uploaded

                            saveState(
                                jobId,
                                JSONObject()
                                    .put(
                                        "status",
                                        "UPLOADING"
                                    )
                                    .put(
                                        "fileName",
                                        fileName
                                    )
                                    .put(
                                        "filePath",
                                        file.absolutePath
                                    )
                                    .put(
                                        "bytesTotal",
                                        file.length()
                                    )
                                    .put(
                                        "bytesUploaded",
                                        uploaded
                                    )
                            )

                            if (
                                Build.VERSION.SDK_INT >=
                                Build.VERSION_CODES.UPSIDE_DOWN_CAKE
                            ) {
                                setNotification(
                                    params,
                                    params.jobId,
                                    createNotification(
                                        "Uploading",
                                        fileName,
                                        uploaded,
                                        file.length()
                                    ),
                                    JobService.JOB_END_NOTIFICATION_POLICY_REMOVE
                                )
                            }
                        }
                    }

                    outputStream.flush()
                }
            }

            if (stopping) {
                throw IOException("Upload stopped")
            }

            val responseCode =
                connection!!.responseCode

            if (responseCode in 200..299) {

                val responseBody =
                    connection!!.inputStream
                        .bufferedReader()
                        .use { it.readText() }

                saveState(
                    jobId,
                    JSONObject()
                        .put(
                            "status",
                            "COMPLETED"
                        )
                        .put(
                            "fileName",
                            fileName
                        )
                        .put(
                            "filePath",
                            file.absolutePath
                        )
                        .put(
                            "bytesTotal",
                            file.length()
                        )
                        .put(
                            "bytesUploaded",
                            file.length()
                        )
                        .put(
                            "response",
                            responseBody
                        )
                )

                if (
                    Build.VERSION.SDK_INT >=
                    Build.VERSION_CODES.UPSIDE_DOWN_CAKE
                ) {
                    setNotification(
                        params,
                        params.jobId,
                        createNotification(
                            "Upload complete",
                            fileName,
                            file.length(),
                            file.length()
                        ),
                        JobService.JOB_END_NOTIFICATION_POLICY_REMOVE
                    )
                }

                jobFinished(params, false)
                return
            }

            val errorBody =
                try {
                    connection!!
                        .errorStream
                        ?.bufferedReader()
                        ?.use { it.readText() }
                } catch (_: Exception) {
                    null
                }

            saveState(
                jobId,
                JSONObject()
                    .put(
                        "status",
                        "FAILED"
                    )
                    .put(
                        "error",
                        "HTTP $responseCode"
                    )
                    .put(
                        "response",
                        errorBody ?: ""
                    )
            )

            jobFinished(params, false)

        } catch (e: IOException) {

            if (stopping) {
                saveState(
                    jobId,
                    JSONObject()
                        .put(
                            "status",
                            "STOPPED"
                        )
                        .put(
                            "error",
                            e.message ?: "Upload stopped"
                        )
                )

                jobFinished(params, true)
                return
            }

            saveState(
                jobId,
                JSONObject()
                    .put(
                        "status",
                        "STOPPED"
                    )
                    .put(
                        "error",
                        e.message ?: "Network error"
                    )
            )

            jobFinished(params, true)

        } catch (e: Exception) {

            saveState(
                jobId,
                JSONObject()
                    .put(
                        "status",
                        "FAILED"
                    )
                    .put(
                        "error",
                        e.message ?: "Upload failed"
                    )
            )

            jobFinished(params, false)

        } finally {
            connection?.disconnect()
            connection = null
        }
    }

    private fun saveState(
        jobId: String,
        state: JSONObject
    ) {
        ItriUploadStore(this)
            .saveState(
                jobId,
                state
            )
    }

    private fun createNotificationChannel() {

        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            return
        }

        val manager =
            getSystemService(
                NotificationManager::class.java
            )

        val channel =
            NotificationChannel(
                CHANNEL_ID,
                "Itri uploads",
                NotificationManager.IMPORTANCE_LOW
            )

        manager.createNotificationChannel(channel)
    }

    private fun createNotification(
        title: String,
        fileName: String,
        uploaded: Long,
        total: Long
    ): android.app.Notification {

        val builder =
            NotificationCompat
                .Builder(
                    this,
                    CHANNEL_ID
                )
                .setSmallIcon(
                    android.R.drawable.stat_sys_upload
                )
                .setContentTitle(title)
                .setContentText(fileName)
                .setOngoing(uploaded < total)

        if (total > 0) {
            builder.setProgress(
                100,
                ((uploaded * 100L) / total).toInt(),
                false
            )
        }

        return builder.build()
    }

    override fun onDestroy() {

        connection?.disconnect()
        connection = null

        executor.shutdownNow()

        super.onDestroy()
    }
}