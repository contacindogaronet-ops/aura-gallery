package com.auragallery.app

import android.Manifest
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.core.content.ContextCompat
import coil.compose.AsyncImage
import coil.request.ImageRequest

class MainActivity : ComponentActivity() {
    private val galleryViewModel: GalleryViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                AuraGalleryApp(viewModel = galleryViewModel)
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AuraGalleryApp(viewModel: GalleryViewModel) {
    val context = LocalContext.current
    val photos by viewModel.photos.collectAsState()
    val requiredPermission = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
        Manifest.permission.READ_MEDIA_IMAGES
    } else {
        Manifest.permission.READ_EXTERNAL_STORAGE
    }

    var hasPermission by remember {
        mutableStateOf(ContextCompat.checkSelfPermission(context, requiredPermission) == PackageManager.PERMISSION_GRANTED)
    }

    val permissionLauncher = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) { isGranted ->
        hasPermission = isGranted
        if (isGranted) viewModel.loadPhotos()
    }

    LaunchedEffect(key1 = hasPermission) {
        if (hasPermission) viewModel.loadPhotos()
    }

    Scaffold(topBar = { TopAppBar(title = { Text(text = "Aura Gallery") }) }) { innerPadding ->
        Box(modifier = Modifier.fillMaxSize().padding(innerPadding)) {
            if (hasPermission) {
                PhotoGrid(photos = photos)
            } else {
                PermissionRequestScreen(onRequestPermission = { permissionLauncher.launch(requiredPermission) })
            }
        }
    }
}

@Composable
fun PhotoGrid(photos: List<Uri>, modifier: Modifier = Modifier) {
    if (photos.isEmpty()) {
        Box(modifier = modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            Text(text = "Tidak ada foto ditemukan.")
        }
    } else {
        LazyVerticalGrid(
            columns = GridCells.Adaptive(minSize = 110.dp),
            contentPadding = PaddingValues(4.dp),
            horizontalArrangement = Arrangement.spacedBy(4.dp),
            verticalArrangement = Arrangement.spacedBy(4.dp),
            modifier = modifier.fillMaxSize()
        ) {
            items(items = photos, key = { uri -> uri.toString() }) { uri ->
                PhotoItem(uri = uri)
            }
        }
    }
}

@Composable
fun PhotoItem(uri: Uri) {
    Card(shape = RoundedCornerShape(4.dp), elevation = CardDefaults.cardElevation(defaultElevation = 2.dp), modifier = Modifier.fillMaxWidth().aspectRatio(1f)) {
        AsyncImage(
            model = ImageRequest.Builder(LocalContext.current).data(uri).crossfade(true).build(),
            contentDescription = "Gallery Thumbnail",
            contentScale = ContentScale.Crop,
            modifier = Modifier.fillMaxSize()
        )
    }
}

@Composable
fun PermissionRequestScreen(onRequestPermission: () -> Unit) {
    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        Button(onClick = onRequestPermission) { Text(text = "Izinkan Akses Galeri") }
    }
}
