package com.auragallery.app

import android.app.Application
import android.content.ContentUris
import android.net.Uri
import android.provider.MediaStore
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class GalleryViewModel(application: Application) : AndroidViewModel(application) {
    private val _photos = MutableStateFlow<List<Uri>>(emptyList())
    val photos: StateFlow<List<Uri>> = _photos.asStateFlow()

    fun loadPhotos() {
        viewModelScope.launch {
            val uriList = fetchPhotosFromMediaStore()
            _photos.value = uriList
        }
    }

    private suspend fun fetchPhotosFromMediaStore(): List<Uri> = withContext(Dispatchers.IO) {
        val uriList = mutableListOf<Uri>()
        val context = getApplication<Application>().applicationContext
        val projection = arrayOf(MediaStore.Images.Media._ID)
        val sortOrder = "${MediaStore.Images.Media.DATE_ADDED} DESC"
        val queryUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI

        context.contentResolver.query(queryUri, projection, null, null, sortOrder)?.use { cursor ->
            val idColumn = cursor.getColumnIndexOrThrow(MediaStore.Images.Media._ID)
            while (cursor.moveToNext()) {
                val id = cursor.getLong(idColumn)
                val contentUri: Uri = ContentUris.withAppendedId(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, id)
                uriList.add(contentUri)
            }
        }
        uriList
    }
}
