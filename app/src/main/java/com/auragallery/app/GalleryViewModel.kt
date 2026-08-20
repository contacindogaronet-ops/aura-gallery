package com.auragallery.app

import android.app.Application
import android.content.ContentUris
import android.net.Uri
import android.provider.MediaStore
import android.util.Log
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

data class MediaModel(val uri: Uri, val isVideo: Boolean)

class GalleryViewModel(application: Application) : AndroidViewModel(application) {
    private val _mediaList = MutableStateFlow<List<MediaModel>>(emptyList())
    val mediaList: StateFlow<List<MediaModel>> = _mediaList.asStateFlow()
    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    fun loadMedia() {
        viewModelScope.launch {
            _isLoading.value = true
            _mediaList.value = fetchMediaFilesFromMediaStore()
            _isLoading.value = false
        }
    }

    private suspend fun fetchMediaFilesFromMediaStore(): List<MediaModel> = withContext(Dispatchers.IO) {
        val resultList = mutableListOf<MediaModel>()
        val contentResolver = getApplication<Application>().contentResolver
        val collection: Uri = MediaStore.Files.getContentUri("external")
        val projection = arrayOf(MediaStore.Files.FileColumns._ID, MediaStore.Files.FileColumns.MEDIA_TYPE, MediaStore.Files.FileColumns.DATE_ADDED)
        val selection = "${MediaStore.Files.FileColumns.MEDIA_TYPE} = ? OR ${MediaStore.Files.FileColumns.MEDIA_TYPE} = ?"
        val selectionArgs = arrayOf(MediaStore.Files.FileColumns.MEDIA_TYPE_IMAGE.toString(), MediaStore.Files.FileColumns.MEDIA_TYPE_VIDEO.toString())
        val sortOrder = "${MediaStore.Files.FileColumns.DATE_ADDED} DESC"

        try {
            contentResolver.query(collection, projection, selection, selectionArgs, sortOrder)?.use { cursor ->
                val idColumn = cursor.getColumnIndexOrThrow(MediaStore.Files.FileColumns._ID)
                val mediaTypeColumn = cursor.getColumnIndexOrThrow(MediaStore.Files.FileColumns.MEDIA_TYPE)
                while (cursor.moveToNext()) {
                    val id = cursor.getLong(idColumn)
                    val mediaType = cursor.getInt(mediaTypeColumn)
                    val isVideo = (mediaType == MediaStore.Files.FileColumns.MEDIA_TYPE_VIDEO)
                    val contentUri: Uri = if (isVideo) {
                        ContentUris.withAppendedId(MediaStore.Video.Media.EXTERNAL_CONTENT_URI, id)
                    } else {
                        ContentUris.withAppendedId(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, id)
                    }
                    resultList.add(MediaModel(uri = contentUri, isVideo = isVideo))
                }
            }
        } catch (e: Exception) {
            Log.e("GalleryViewModel", "Gagal memuat media: ${e.message}", e)
        }
        resultList
    }
}
