package expo.modules.itriupload

import android.app.job.JobInfo
import android.app.job.JobScheduler
import android.content.ComponentName
import android.net.NetworkCapabilities
import android.net.NetworkRequest
import android.os.Build
import android.os.PersistableBundle
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.io.File

class ItriUploadModule : Module() {

    override fun definition() = ModuleDefinition {
        Name("ItriUpload")

        AsyncFunction("startUpload") {
            jobId: String,
            uploadUrl: String,
            authorization: String,
            filePath: String,
            fileName: String,
            contentType: String ->

            scheduleUpload(
                jobId,
                uploadUrl,
                authorization,
                filePath,
                fileName,
                contentType
            )
        }

        AsyncFunction("cancelUpload") {
            jobId: String ->
            cancelUpload(jobId)
        }

        AsyncFunction("getUploadStatus") {
            jobId: String ->
            getUploadStatus(jobId)
        }

        AsyncFunction("getUploadJobInfo") {
            jobId: String ->
            getUploadJobInfo(jobId)
        }

        Function("hello") {
            "ItriUpload native module is working"
        }
    }

    private fun scheduleUpload(
        jobId: String,
        uploadUrl: String,
        authorization: String,
        filePath: String,
        fileName: String,
        contentType: String
    ): Boolean {

        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
            throw IllegalStateException(
                "User-initiated background uploads require Android 14 or newer"
            )
        }

        val context = appContext.reactContext
            ?: throw IllegalStateException("React context is unavailable")

        val file = File(filePath)

        if (!file.exists() || !file.isFile) {
            throw IllegalArgumentException(
                "Upload file does not exist: $filePath"
            )
        }

        val scheduler =
            context.getSystemService(JobScheduler::class.java)
                ?: throw IllegalStateException("JobScheduler unavailable")

        val extras = PersistableBundle().apply {
            putString(
                ItriUploadJobService.EXTRA_JOB_ID,
                jobId
            )
            putString(
                ItriUploadJobService.EXTRA_UPLOAD_URL,
                uploadUrl
            )
            putString(
                ItriUploadJobService.EXTRA_AUTHORIZATION,
                authorization
            )
            putString(
                ItriUploadJobService.EXTRA_FILE_PATH,
                filePath
            )
            putString(
                ItriUploadJobService.EXTRA_FILE_NAME,
                fileName
            )
            putString(
                ItriUploadJobService.EXTRA_CONTENT_TYPE,
                contentType
            )
        }

        val networkRequest =
            NetworkRequest.Builder()
                .addCapability(
                    NetworkCapabilities.NET_CAPABILITY_INTERNET
                )
                .build()

        val jobInfo =
            JobInfo.Builder(
                jobId.hashCode().and(Int.MAX_VALUE).coerceAtLeast(1),
                ComponentName(
                    context,
                    ItriUploadJobService::class.java
                )
            )
                .setExtras(extras)
                .setRequiredNetwork(networkRequest)
                .setEstimatedNetworkBytes(
                    0L,
                    file.length()
                )
                .setUserInitiated(true)
                .setBackoffCriteria(
                    10_000L,
                    JobInfo.BACKOFF_POLICY_EXPONENTIAL
                )
                .build()

        val result = scheduler.schedule(jobInfo)

        if (result != JobScheduler.RESULT_SUCCESS) {
            throw IllegalStateException(
                "Unable to schedule upload job"
            )
        }

        ItriUploadStore(context).saveState(
            jobId,
            org.json.JSONObject()
                .put("status", "SCHEDULED")
                .put("fileName", fileName)
                .put("filePath", filePath)
                .put("bytesTotal", file.length())
                .put("bytesUploaded", 0)
        )

        return true
    }

    private fun cancelUpload(
        jobId: String
    ): Boolean {

        val context = appContext.reactContext
            ?: throw IllegalStateException("React context is unavailable")

        val scheduler =
            context.getSystemService(JobScheduler::class.java)
                ?: throw IllegalStateException("JobScheduler unavailable")

        scheduler.cancel(
            jobId.hashCode().and(Int.MAX_VALUE).coerceAtLeast(1)
        )

        ItriUploadStore(context).saveState(
            jobId,
            org.json.JSONObject()
                .put("status", "CANCELLED")
        )

        return true
    }

    private fun getUploadJobInfo(
        jobId: String
    ): String {

        val context = appContext.reactContext
            ?: throw IllegalStateException(
                "React context is unavailable"
            )

        val scheduler =
            context.getSystemService(
                JobScheduler::class.java
            )
                ?: throw IllegalStateException(
                    "JobScheduler unavailable"
                )

        val schedulerJobId =
            jobId.hashCode()
                .and(Int.MAX_VALUE)
                .coerceAtLeast(1)

        val jobInfo =
            scheduler.getPendingJob(
                schedulerJobId
            )

        val pendingReason =
            if (
                jobInfo != null &&
                Build.VERSION.SDK_INT >=
                Build.VERSION_CODES.UPSIDE_DOWN_CAKE
            ) {
                scheduler.getPendingJobReason(
                    schedulerJobId
                )
            } else {
                JobScheduler.PENDING_JOB_REASON_INVALID_JOB_ID
            }

        val nativeState =
            ItriUploadStore(context)
                .getState(jobId)

        return org.json.JSONObject()
            .put(
                "jobId",
                jobId
            )
            .put(
                "scheduled",
                jobInfo != null
            )
            .put(
                "pendingReason",
                pendingReason
            )
            .put(
                "userStopped",
                pendingReason ==
                    JobScheduler.PENDING_JOB_REASON_USER
            )
            .put(
                "nativeState",
                nativeState
            )
            .toString()
    }

    private fun getUploadStatus(
        jobId: String
    ): String? {

        val context = appContext.reactContext
            ?: throw IllegalStateException("React context is unavailable")

        return ItriUploadStore(context)
            .getState(jobId)
            ?.toString()
    }
}
