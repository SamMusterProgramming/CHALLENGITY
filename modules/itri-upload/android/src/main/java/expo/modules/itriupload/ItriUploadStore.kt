package expo.modules.itriupload

import android.content.Context
import org.json.JSONObject

class ItriUploadStore(context: Context) {

    private val preferences =
        context.getSharedPreferences(
            "itri_upload_state",
            Context.MODE_PRIVATE
        )

    fun saveState(
        jobId: String,
        state: JSONObject
    ) {
        preferences.edit()
            .putString(jobId, state.toString())
            .apply()
    }

    fun getState(
        jobId: String
    ): JSONObject? {
        val value =
            preferences.getString(jobId, null)
                ?: return null

        return try {
            JSONObject(value)
        } catch (_: Exception) {
            null
        }
    }

    fun removeState(
        jobId: String
    ) {
        preferences.edit()
            .remove(jobId)
            .apply()
    }
}
