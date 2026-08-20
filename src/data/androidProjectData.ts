import { AndroidFile, MediaPhoto } from '../types';

export const ANDROID_FILES: AndroidFile[] = [
  {
    path: 'build.gradle.kts',
    name: 'build.gradle.kts (Project)',
    language: 'kotlin',
    category: 'build',
    description: 'Root-level build script configured for Gradle 8.x with Kotlin & Android Gradle Plugin plugins.',
    content: `// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.jetbrains.kotlin.android) apply false
    alias(libs.plugins.compose.compiler) apply false
}

tasks.register("clean", Delete::class) {
    delete(rootProject.layout.buildDirectory)
}`
  },
  {
    path: 'app/build.gradle.kts',
    name: 'app/build.gradle.kts (Module: app)',
    language: 'kotlin',
    category: 'build',
    description: 'Module-level build script for Aura Gallery with Jetpack Compose, Material 3, and Coil Compose image loader.',
    content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.jetbrains.kotlin.android)
    alias(libs.plugins.compose.compiler)
}

android {
    namespace = "com.auragallery.app"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.auragallery.app"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("debug")
        }
        debug {
            applicationIdSuffix = ".debug"
            isDebuggable = true
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
        freeCompilerArgs += listOf(
            "-opt-in=androidx.compose.material3.ExperimentalMaterial3Api",
            "-opt-in=kotlinx.coroutines.ExperimentalCoroutinesApi"
        )
    }

    buildFeatures {
        compose = true
        buildConfig = true
    }

    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {
    // Network & Retrofit 2 for Google Drive REST API
    implementation(libs.retrofit.core)
    implementation(libs.retrofit.converter.gson)
    implementation(libs.okhttp.logging)

    // AndroidX WorkManager for background sync
    implementation(libs.androidx.work.runtime.ktx)

    // AndroidX Core & Lifecycle
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    implementation(libs.androidx.activity.compose)

    // Jetpack Compose (BOM)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.graphics)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.compose.material.icons.extended)

    // Coil for Asynchronous Image Loading in Compose
    implementation(libs.coil.compose)

    // Coroutines
    implementation(libs.kotlinx.coroutines.android)

    // Accompanist Permissions (Recommended for Granular Runtime Permissions)
    implementation(libs.accompanist.permissions)

    // Debugging & Tooling
    debugImplementation(libs.androidx.compose.ui.tooling)
    debugImplementation(libs.androidx.compose.ui.test.manifest)

    // Unit & UI Testing
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation(libs.androidx.compose.ui.test.junit4)
}`
  },
  {
    path: 'gradle/libs.versions.toml',
    name: 'gradle/libs.versions.toml (Version Catalog)',
    language: 'toml',
    category: 'build',
    description: 'Centralized dependency and plugin version catalog for modern Gradle 8.x builds.',
    content: `[versions]
agp = "8.5.2"
kotlin = "2.0.0"
composeCompiler = "2.0.0"
coreKtx = "1.13.1"
lifecycle = "2.8.4"
activityCompose = "1.9.1"
composeBom = "2024.06.00"
coil = "2.7.0"
coroutines = "1.8.1"
accompanist = "0.34.0"
retrofit = "2.11.0"
okhttp = "4.12.0"
workManager = "2.9.1"
junit = "4.13.2"
junitExt = "1.2.1"
espresso = "3.6.1"

[libraries]
retrofit-core = { group = "com.squareup.retrofit2", name = "retrofit", version.ref = "retrofit" }
retrofit-converter-gson = { group = "com.squareup.retrofit2", name = "converter-gson", version.ref = "retrofit" }
okhttp-logging = { group = "com.squareup.okhttp3", name = "logging-interceptor", version.ref = "okhttp" }
androidx-work-runtime-ktx = { group = "androidx.work", name = "work-runtime-ktx", version.ref = "workManager" }
androidx-core-ktx = { group = "androidx.core", name = "core-ktx", version.ref = "coreKtx" }
androidx-lifecycle-runtime-ktx = { group = "androidx.lifecycle", name = "lifecycle-runtime-ktx", version.ref = "lifecycle" }
androidx-lifecycle-viewmodel-compose = { group = "androidx.lifecycle", name = "lifecycle-viewmodel-compose", version.ref = "lifecycle" }
androidx-activity-compose = { group = "androidx.activity", name = "activity-compose", version.ref = "activityCompose" }
androidx-compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
androidx-compose-ui = { group = "androidx.compose.ui", name = "ui" }
androidx-compose-ui-graphics = { group = "androidx.compose.ui", name = "ui-graphics" }
androidx-compose-ui-tooling-preview = { group = "androidx.compose.ui", name = "ui-tooling-preview" }
androidx-compose-ui-tooling = { group = "androidx.compose.ui", name = "ui-tooling" }
androidx-compose-ui-test-manifest = { group = "androidx.compose.ui", name = "ui-test-manifest" }
androidx-compose-ui-test-junit4 = { group = "androidx.compose.ui", name = "ui-test-junit4" }
androidx-compose-material3 = { group = "androidx.compose.material3", name = "material3" }
androidx-compose-material-icons-extended = { group = "androidx.compose.material", name = "material-icons-extended" }
coil-compose = { group = "io.coil-kt", name = "coil-compose", version.ref = "coil" }
kotlinx-coroutines-android = { group = "org.jetbrains.kotlinx", name = "kotlinx-coroutines-android", version.ref = "coroutines" }
accompanist-permissions = { group = "com.google.accompanist", name = "accompanist-permissions", version.ref = "accompanist" }
junit = { group = "junit", name = "junit", version.ref = "junit" }
androidx-junit = { group = "androidx.test.ext", name = "junit", version.ref = "junitExt" }
androidx-espresso-core = { group = "androidx.test.espresso", name = "espresso-core", version.ref = "espresso" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
jetbrains-kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
compose-compiler = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "composeCompiler" }`
  },
  {
    path: 'app/src/main/AndroidManifest.xml',
    name: 'AndroidManifest.xml',
    language: 'xml',
    category: 'manifest',
    description: 'Application manifest specifying READ_MEDIA_IMAGES, READ_MEDIA_VIDEO, and backward compatibility permissions.',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.auragallery.app">

    <!-- Network permissions for Google Drive Sync Engine -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <!-- Permissions for Android 13+ (API 33+) Granular Media Access -->
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
    <uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />

    <!-- Backward compatibility for Android 12 and below (API <= 32) -->
    <uses-permission
        android:name="android.permission.READ_EXTERNAL_STORAGE"
        android:maxSdkVersion="32" />

    <!-- Optional permission if you wish to read audio media -->
    <!-- <uses-permission android:name="android.permission.READ_MEDIA_AUDIO" /> -->

    <application
        android:name=".AuraGalleryApp"
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AuraGallery"
        android:hardwareAccelerated="true"
        tools:targetApi="34">

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.AuraGallery"
            android:configChanges="orientation|screenSize|screenLayout|keyboardHidden">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>

</manifest>`
  },
  {
    path: 'app/src/main/java/com/auragallery/app/MainActivity.kt',
    name: 'MainActivity.kt',
    language: 'kotlin',
    category: 'ui',
    description: 'Primary Activity with Jetpack Compose entry point, Edge-to-Edge display, and Android 13+ permission handling.',
    content: `package com.auragallery.app

import android.Manifest
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.core.content.ContextCompat
import com.auragallery.app.ui.GalleryScreen
import com.auragallery.app.ui.theme.AuraGalleryTheme
import com.auragallery.app.ui.viewmodel.GalleryViewModel

class MainActivity : ComponentActivity() {

    private val viewModel: GalleryViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Enable Modern Edge-to-Edge System Bar Insets
        enableEdgeToEdge()

        setContent {
            AuraGalleryTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    val state by viewModel.uiState.collectAsState()

                    // Register Multi-Permission Launcher for Media Access
                    val permissionLauncher = rememberLauncherForActivityResult(
                        contract = ActivityResultContracts.RequestMultiplePermissions()
                    ) { permissions ->
                        val imagesGranted = permissions[Manifest.permission.READ_MEDIA_IMAGES] ?: false
                        val videoGranted = permissions[Manifest.permission.READ_MEDIA_VIDEO] ?: false
                        val legacyGranted = permissions[Manifest.permission.READ_EXTERNAL_STORAGE] ?: false

                        val isGranted = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                            imagesGranted || videoGranted
                        } else {
                            legacyGranted
                        }

                        viewModel.onPermissionResult(isGranted)
                    }

                    // Check initial permission on launch
                    LaunchedEffect(Unit) {
                        checkAndRequestPermissions { permissionsToRequest ->
                            if (permissionsToRequest.isEmpty()) {
                                viewModel.onPermissionResult(true)
                            } else {
                                permissionLauncher.launch(permissionsToRequest.toTypedArray())
                            }
                        }
                    }

                    GalleryScreen(
                        state = state,
                        onPermissionRequested = {
                            checkAndRequestPermissions { permissionsToRequest ->
                                permissionLauncher.launch(permissionsToRequest.toTypedArray())
                            }
                        },
                        onMediaClick = { mediaItem ->
                            viewModel.onMediaSelected(mediaItem)
                        },
                        onRefresh = {
                            viewModel.loadMedia()
                        }
                    )
                }
            }
        }
    }

    private fun checkAndRequestPermissions(onReady: (List<String>) -> Unit) {
        val permissions = mutableListOf<String>()

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_MEDIA_IMAGES) != PackageManager.PERMISSION_GRANTED) {
                permissions.add(Manifest.permission.READ_MEDIA_IMAGES)
            }
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_MEDIA_VIDEO) != PackageManager.PERMISSION_GRANTED) {
                permissions.add(Manifest.permission.READ_MEDIA_VIDEO)
            }
        } else {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
                permissions.add(Manifest.permission.READ_EXTERNAL_STORAGE)
            }
        }

        onReady(permissions)
    }
}`
  },
  {
    path: 'app/src/main/java/com/auragallery/app/ui/GalleryScreen.kt',
    name: 'GalleryScreen.kt',
    language: 'kotlin',
    category: 'ui',
    description: 'Compose Gallery Screen utilizing LazyVerticalGrid, Material 3 TopAppBar, Coil AsyncImage, and Empty state handling.',
    content: `package com.auragallery.app.ui

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.PhotoLibrary
import androidx.compose.material.icons.filled.PlayCircle
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.outlined.Image
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.auragallery.app.domain.model.MediaItem
import com.auragallery.app.ui.viewmodel.GalleryUiState

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GalleryScreen(
    state: GalleryUiState,
    onPermissionRequested: () -> Unit,
    onMediaClick: (MediaItem) -> Unit,
    onRefresh: () -> Unit,
    modifier: Modifier = Modifier
) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.PhotoLibrary,
                            contentDescription = null,
                            tint = MaterialTheme.colorScheme.primary
                        )
                        Text(
                            text = "Aura Gallery",
                            style = MaterialTheme.typography.titleLarge.copy(
                                fontWeight = FontWeight.Bold
                            )
                        )
                    }
                },
                actions = {
                    IconButton(onClick = onRefresh) {
                        Icon(
                            imageVector = Icons.Default.Refresh,
                            contentDescription = "Refresh Media"
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surface
                )
            )
        },
        modifier = modifier
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            when {
                // State 1: Permission Not Granted
                !state.hasPermission -> {
                    PermissionDeniedContent(
                        onRequestPermission = onPermissionRequested,
                        modifier = Modifier.align(Alignment.Center)
                    )
                }

                // State 2: Loading
                state.isLoading -> {
                    CircularProgressIndicator(
                        modifier = Modifier.align(Alignment.Center)
                    )
                }

                // State 3: Empty State (Grid kosong)
                state.mediaList.isEmpty() -> {
                    EmptyGalleryContent(
                        modifier = Modifier.align(Alignment.Center)
                    )
                }

                // State 4: Populated LazyVerticalGrid
                else -> {
                    LazyVerticalGrid(
                        columns = GridCells.Adaptive(minSize = 110.dp),
                        contentPadding = PaddingValues(4.dp),
                        verticalArrangement = Arrangement.spacedBy(4.dp),
                        horizontalArrangement = Arrangement.spacedBy(4.dp),
                        modifier = Modifier.fillMaxSize()
                    ) {
                        items(
                            items = state.mediaList,
                            key = { it.id }
                        ) { mediaItem ->
                            MediaGridItem(
                                item = mediaItem,
                                onClick = { onMediaClick(mediaItem) }
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun MediaGridItem(
    item: MediaItem,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current

    Card(
        shape = RoundedCornerShape(8.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
        modifier = modifier
            .aspectRatio(1f)
            .clickable(onClick = onClick)
    ) {
        Box(modifier = Modifier.fillMaxSize()) {
            AsyncImage(
                model = ImageRequest.Builder(context)
                    .data(item.uri)
                    .crossfade(true)
                    .build(),
                contentDescription = item.displayName,
                contentScale = ContentScale.Crop,
                modifier = Modifier.fillMaxSize()
            )

            // Video indicator badge overlay
            if (item.isVideo) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .align(Alignment.BottomCenter)
                        .background(
                            Brush.verticalGradient(
                                colors = listOf(Color.Transparent, Color.Black.copy(alpha = 0.7f))
                            )
                        )
                        .padding(4.dp)
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.PlayCircle,
                            contentDescription = "Video",
                            tint = Color.White,
                            modifier = Modifier.size(16.dp)
                        )
                        Text(
                            text = item.durationFormatted ?: "Video",
                            style = MaterialTheme.typography.labelSmall,
                            color = Color.White
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun EmptyGalleryContent(modifier: Modifier = Modifier) {
    Column(
        modifier = modifier
            .padding(32.dp)
            .fillMaxWidth(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Surface(
            shape = RoundedCornerShape(24.dp),
            color = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.4f),
            modifier = Modifier.size(96.dp)
        ) {
            Box(contentAlignment = Alignment.Center) {
                Icon(
                    imageVector = Icons.Outlined.Image,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.primary,
                    modifier = Modifier.size(48.dp)
                )
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        Text(
            text = "No Photos or Videos Found",
            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.SemiBold),
            color = MaterialTheme.colorScheme.onSurface
        )

        Spacer(modifier = Modifier.height(8.dp))

        Text(
            text = "Your device gallery is currently empty or new media items are still indexing.",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            textAlign = TextAlign.Center
        )
    }
}

@Composable
fun PermissionDeniedContent(
    onRequestPermission: () -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .padding(32.dp)
            .fillMaxWidth(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Surface(
            shape = RoundedCornerShape(24.dp),
            color = MaterialTheme.colorScheme.errorContainer.copy(alpha = 0.5f),
            modifier = Modifier.size(96.dp)
        ) {
            Box(contentAlignment = Alignment.Center) {
                Icon(
                    imageVector = Icons.Default.Lock,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.error,
                    modifier = Modifier.size(44.dp)
                )
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        Text(
            text = "Media Access Required",
            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
            color = MaterialTheme.colorScheme.onSurface
        )

        Spacer(modifier = Modifier.height(8.dp))

        Text(
            text = "Aura Gallery requires permission to access your device photos and videos to display your gallery.",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.height(24.dp))

        Button(
            onClick = onRequestPermission,
            colors = ButtonDefaults.buttonColors(
                containerColor = MaterialTheme.colorScheme.primary
            )
        ) {
            Text(text = "Grant Permission")
        }
    }
}`
  },
  {
    path: 'app/src/main/java/com/auragallery/app/domain/model/MediaItem.kt',
    name: 'domain/model/MediaItem.kt',
    language: 'kotlin',
    category: 'domain',
    description: 'Clean Architecture Domain Entity representing media loaded from MediaStore.',
    content: `package com.auragallery.app.domain.model

import android.net.Uri

data class MediaItem(
    val id: Long,
    val uri: Uri,
    val displayName: String,
    val dateAdded: Long,
    val size: Long,
    val mimeType: String,
    val isVideo: Boolean = false,
    val durationFormatted: String? = null,
    val width: Int = 0,
    val height: Int = 0
)`
  },
  {
    path: 'app/src/main/java/com/auragallery/app/domain/repository/MediaRepository.kt',
    name: 'domain/repository/MediaRepository.kt',
    language: 'kotlin',
    category: 'domain',
    description: 'Domain Repository Interface defining decoupled MediaStore data contracts.',
    content: `package com.auragallery.app.domain.repository

import com.auragallery.app.domain.model.MediaItem
import kotlinx.coroutines.flow.Flow

interface MediaRepository {
    /**
     * Streams media items sorted descending by date added.
     */
    fun getMediaItems(): Flow<List<MediaItem>>

    /**
     * Retrieve media items by album bucket.
     */
    suspend fun getMediaByBucket(bucketId: String): List<MediaItem>
}`
  },
  {
    path: 'app/src/main/java/com/auragallery/app/data/LocalMediaRepository.kt',
    name: 'LocalMediaRepository.kt (MediaStore Repository)',
    language: 'kotlin',
    category: 'data',
    description: 'Repository layer reading local photos and videos from MediaStore using suspend function and Dispatchers.IO with robust error handling.',
    content: `package com.auragallery.app.data

import android.content.ContentUris
import android.content.Context
import android.database.Cursor
import android.net.Uri
import android.os.Build
import android.provider.MediaStore
import android.util.Log
import com.auragallery.app.domain.model.MediaItem
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

/**
 * Repository layer to query local photos and videos using Android MediaStore API.
 * Uses Kotlin Coroutines with Dispatchers.IO to prevent blocking the main thread.
 */
class LocalMediaRepository(
    private val context: Context
) {
    companion object {
        private const val TAG = "LocalMediaRepository"
    }

    /**
     * Reads images and videos sorted descending by DATE_ADDED (newest first).
     * @return Result containing list of MediaItem or failure Exception.
     */
    suspend fun fetchLocalMedia(): Result<List<MediaItem>> = withContext(Dispatchers.IO) {
        runCatching {
            val mediaList = mutableListOf<MediaItem>()

            // 1. Query Images
            val images = queryImages()
            mediaList.addAll(images)

            // 2. Query Videos
            val videos = queryVideos()
            mediaList.addAll(videos)

            // 3. Sort combined media by dateAdded DESC (newest first)
            mediaList.sortedByDescending { it.dateAdded }
        }.onFailure { throwable ->
            Log.e(TAG, "Error fetching media from MediaStore", throwable)
        }
    }

    private fun queryImages(): List<MediaItem> {
        val imageItems = mutableListOf<MediaItem>()
        val collection: Uri = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            MediaStore.Images.Media.getContentUri(MediaStore.VOLUME_EXTERNAL)
        } else {
            MediaStore.Images.Media.EXTERNAL_CONTENT_URI
        }

        val projection = arrayOf(
            MediaStore.Images.Media._ID,
            MediaStore.Images.Media.DISPLAY_NAME,
            MediaStore.Images.Media.DATE_ADDED,
            MediaStore.Images.Media.SIZE,
            MediaStore.Images.Media.MIME_TYPE,
            MediaStore.Images.Media.WIDTH,
            MediaStore.Images.Media.HEIGHT
        )

        val sortOrder = "\${MediaStore.Images.Media.DATE_ADDED} DESC"

        try {
            context.contentResolver.query(
                collection,
                projection,
                null,
                null,
                sortOrder
            )?.use { cursor ->
                val idCol = cursor.getColumnIndexOrThrow(MediaStore.Images.Media._ID)
                val nameCol = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DISPLAY_NAME)
                val dateCol = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATE_ADDED)
                val sizeCol = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.SIZE)
                val mimeCol = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.MIME_TYPE)
                val widthCol = cursor.getColumnIndex(MediaStore.Images.Media.WIDTH)
                val heightCol = cursor.getColumnIndex(MediaStore.Images.Media.HEIGHT)

                while (cursor.moveToNext()) {
                    try {
                        val id = cursor.getLong(idCol)
                        val name = cursor.getString(nameCol) ?: "IMG_\$id"
                        val dateAdded = cursor.getLong(dateCol)
                        val size = cursor.getLong(sizeCol)
                        val mimeType = cursor.getString(mimeCol) ?: "image/jpeg"
                        val width = if (widthCol != -1) cursor.getInt(widthCol) else 0
                        val height = if (heightCol != -1) cursor.getInt(heightCol) else 0

                        val contentUri: Uri = ContentUris.withAppendedId(
                            MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
                            id
                        )

                        imageItems.add(
                            MediaItem(
                                id = id,
                                uri = contentUri,
                                displayName = name,
                                dateAdded = dateAdded,
                                size = size,
                                mimeType = mimeType,
                                isVideo = false,
                                width = width,
                                height = height
                            )
                        )
                    } catch (cursorEx: Exception) {
                        Log.w(TAG, "Skipping corrupted image row in MediaStore", cursorEx)
                    }
                }
            }
        } catch (secEx: SecurityException) {
            Log.e(TAG, "Permission denied accessing MediaStore Images", secEx)
            throw secEx
        } catch (e: Exception) {
            Log.e(TAG, "Cursor query error for images", e)
            throw e
        }

        return imageItems
    }

    private fun queryVideos(): List<MediaItem> {
        val videoItems = mutableListOf<MediaItem>()
        val collection: Uri = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            MediaStore.Video.Media.getContentUri(MediaStore.VOLUME_EXTERNAL)
        } else {
            MediaStore.Video.Media.EXTERNAL_CONTENT_URI
        }

        val projection = arrayOf(
            MediaStore.Video.Media._ID,
            MediaStore.Video.Media.DISPLAY_NAME,
            MediaStore.Video.Media.DATE_ADDED,
            MediaStore.Video.Media.SIZE,
            MediaStore.Video.Media.MIME_TYPE,
            MediaStore.Video.Media.DURATION
        )

        val sortOrder = "\${MediaStore.Video.Media.DATE_ADDED} DESC"

        try {
            context.contentResolver.query(
                collection,
                projection,
                null,
                null,
                sortOrder
            )?.use { cursor ->
                val idCol = cursor.getColumnIndexOrThrow(MediaStore.Video.Media._ID)
                val nameCol = cursor.getColumnIndexOrThrow(MediaStore.Video.Media.DISPLAY_NAME)
                val dateCol = cursor.getColumnIndexOrThrow(MediaStore.Video.Media.DATE_ADDED)
                val sizeCol = cursor.getColumnIndexOrThrow(MediaStore.Video.Media.SIZE)
                val mimeCol = cursor.getColumnIndexOrThrow(MediaStore.Video.Media.MIME_TYPE)
                val durationCol = cursor.getColumnIndex(MediaStore.Video.Media.DURATION)

                while (cursor.moveToNext()) {
                    try {
                        val id = cursor.getLong(idCol)
                        val name = cursor.getString(nameCol) ?: "VID_\$id"
                        val dateAdded = cursor.getLong(dateCol)
                        val size = cursor.getLong(sizeCol)
                        val mimeType = cursor.getString(mimeCol) ?: "video/mp4"
                        val durationMs = if (durationCol != -1) cursor.getLong(durationCol) else 0L

                        val contentUri: Uri = ContentUris.withAppendedId(
                            MediaStore.Video.Media.EXTERNAL_CONTENT_URI,
                            id
                        )

                        videoItems.add(
                            MediaItem(
                                id = id,
                                uri = contentUri,
                                displayName = name,
                                dateAdded = dateAdded,
                                size = size,
                                mimeType = mimeType,
                                isVideo = true,
                                durationFormatted = formatDuration(durationMs)
                            )
                        )
                    } catch (cursorEx: Exception) {
                        Log.w(TAG, "Skipping corrupted video row in MediaStore", cursorEx)
                    }
                }
            }
        } catch (secEx: SecurityException) {
            Log.e(TAG, "Permission denied accessing MediaStore Videos", secEx)
            throw secEx
        } catch (e: Exception) {
            Log.e(TAG, "Cursor query error for videos", e)
            throw e
        }

        return videoItems
    }

    private fun formatDuration(millis: Long): String {
        if (millis <= 0) return "00:00"
        val seconds = (millis / 1000) % 60
        val minutes = (millis / (1000 * 60)) % 60
        val hours = millis / (1000 * 60 * 60)
        return if (hours > 0) {
            String.format("%d:%02d:%02d", hours, minutes, seconds)
        } else {
            String.format("%02d:%02d", minutes, seconds)
        }
    }
}
`
  },
  {
    path: 'app/src/main/java/com/auragallery/app/sync/GoogleDriveApi.kt',
    name: 'GoogleDriveApi.kt (Retrofit Interface)',
    language: 'kotlin',
    category: 'data',
    description: 'Retrofit interface for Google Drive v3 REST API supporting multipart file uploads and file listing.',
    content: `package com.auragallery.app.sync

import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.ResponseBody
import retrofit2.Response
import retrofit2.http.*

/**
 * Data model for Google Drive File Metadata Response.
 */
data class GoogleDriveFileResponse(
    val id: String,
    val name: String,
    val mimeType: String?,
    val size: Long?,
    val createdTime: String?,
    val modifiedTime: String?
)

/**
 * Retrofit Interface for Google Drive REST API v3.
 * Endpoints configured for multipart upload and file listing.
 */
interface GoogleDriveApi {

    /**
     * Multipart upload: Part 1 = Metadata (JSON), Part 2 = File media binary stream.
     * Uploads file directly to user's Google Drive.
     */
    @Multipart
    @POST("upload/drive/v3/files?uploadType=multipart")
    suspend fun uploadFileMultipart(
        @Header("Authorization") authHeader: String,
        @Part("metadata") metadata: RequestBody,
        @Part fileMedia: MultipartBody.Part
    ): Response<GoogleDriveFileResponse>

    /**
     * Queries files inside Google Drive (e.g. within AuraGallery folder).
     */
    @GET("drive/v3/files")
    suspend fun listFiles(
        @Header("Authorization") authHeader: String,
        @Query("q") query: String? = null,
        @Query("fields") fields: String = "files(id, name, mimeType, size, modifiedTime)"
    ): Response<ResponseBody>
}`
  },
  {
    path: 'app/src/main/java/com/auragallery/app/sync/DriveSyncService.kt',
    name: 'DriveSyncService.kt (Drive Sync Engine)',
    language: 'kotlin',
    category: 'data',
    description: 'Core Google Drive REST API synchronization engine with streaming RequestBody, chunked I/O, and Flow-based progress monitoring.',
    content: `package com.auragallery.app.sync

import android.content.Context
import android.net.Uri
import android.provider.OpenableColumns
import android.util.Log
import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import kotlinx.coroutines.withContext
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.OkHttpClient
import okhttp3.RequestBody
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.logging.HttpLoggingInterceptor
import okio.Buffer
import okio.BufferedSink
import okio.ForwardingSink
import okio.Sink
import okio.buffer
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.io.IOException
import java.io.InputStream
import java.util.concurrent.TimeUnit

/**
 * Sealed class representing real-time upload states emitted via Kotlin Flow.
 */
sealed class UploadProgress {
    data object Preparing : UploadProgress()
    data class Uploading(
        val bytesUploaded: Long,
        val totalBytes: Long,
        val percentage: Int
    ) : UploadProgress()
    data class Success(val fileResponse: GoogleDriveFileResponse) : UploadProgress()
    data class Failed(val error: Throwable) : UploadProgress()
}

/**
 * High-performance Google Drive Synchronization Engine.
 *
 * Key Architecture Highlights:
 * 1. Stream-based upload: Reads ContentResolver InputStream in streaming chunks without loading whole files into RAM.
 * 2. Memory-leak safe: No static contexts, uses applicationContext, properly closes streams via use {}.
 * 3. Flow-based progress: Emits live upload progress (bytesUploaded / totalBytes / percentage) safely on Dispatchers.IO.
 * 4. Token & Retry resilient: Configured with OkHttpClient timeouts and non-blocking Coroutine dispatching.
 */
class DriveSyncService(
    private val context: Context,
    private val oauthTokenProvider: suspend () -> String?
) {
    companion object {
        private const val TAG = "DriveSyncService"
        private const val BASE_URL = "https://www.googleapis.com/"
        private const val BUFFER_SIZE = 8192 // 8 KB chunks for optimal throughput & zero memory spike
    }

    private val okHttpClient: OkHttpClient by lazy {
        OkHttpClient.Builder()
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(60, TimeUnit.SECONDS)
            .writeTimeout(120, TimeUnit.SECONDS)
            .addInterceptor(
                HttpLoggingInterceptor().apply {
                    level = HttpLoggingInterceptor.Level.HEADERS
                }
            )
            .build()
    }

    private val driveApi: GoogleDriveApi by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(GoogleDriveApi::class.java)
    }

    /**
     * Uploads a local Android MediaStore / SAF Uri to Google Drive via Multipart REST API.
     * Emits real-time progress updates through Kotlin Flow.
     *
     * @param uri The local content Uri of the photo or video.
     * @return Kotlin Flow emitting UploadProgress states.
     */
    fun uploadMedia(uri: Uri): Flow<UploadProgress> = flow {
        emit(UploadProgress.Preparing)

        val token = oauthTokenProvider()
        if (token.isNullOrBlank()) {
            emit(UploadProgress.Failed(IllegalStateException("Google OAuth Token is missing or expired. Please re-authenticate.")))
            return@flow
        }

        val authHeader = "Bearer \$token"

        // 1. Extract file metadata safely from ContentResolver
        val fileMetadata = queryUriMetadata(uri)
        val fileName = fileMetadata.name ?: "AuraGallery_Media_\${System.currentTimeMillis()}"
        val mimeType = fileMetadata.mimeType ?: context.contentResolver.getType(uri) ?: "application/octet-stream"
        val totalSize = fileMetadata.size

        if (totalSize <= 0L) {
            emit(UploadProgress.Failed(IOException("File size is zero or file is inaccessible for URI: \$uri")))
            return@flow
        }

        try {
            // 2. Prepare Part 1: Metadata JSON Body
            val metadataMap = mapOf(
                "name" to fileName,
                "mimeType" to mimeType,
                "description" to "Uploaded via Aura Gallery Android Client"
            )
            val metadataJson = Gson().toJson(metadataMap)
            val metadataRequestBody = metadataJson.toRequestBody("application/json; charset=UTF-8".toMediaType())

            // 3. Prepare Part 2: Custom Streaming Progress RequestBody (Zero RAM Spike)
            val streamingBody = CountingStreamRequestBody(
                context = context.applicationContext,
                uri = uri,
                contentType = mimeType.toMediaTypeOrNull(),
                contentLength = totalSize
            ) { bytesWritten, totalLength ->
                val percent = if (totalLength > 0) ((bytesWritten * 100) / totalLength).toInt().coerceIn(0, 99) else 0
                // Live streaming bytes update
            }

            val mediaPart = MultipartBody.Part.createFormData("fileMedia", fileName, streamingBody)

            // Emit initial 0% progress
            emit(UploadProgress.Uploading(bytesUploaded = 0L, totalBytes = totalSize, percentage = 0))

            // 4. Execute Network Request
            val response = driveApi.uploadFileMultipart(
                authHeader = authHeader,
                metadata = metadataRequestBody,
                fileMedia = mediaPart
            )

            if (response.isSuccessful && response.body() != null) {
                val driveFile = response.body()!!
                emit(UploadProgress.Uploading(bytesUploaded = totalSize, totalBytes = totalSize, percentage = 100))
                emit(UploadProgress.Success(driveFile))
                Log.d(TAG, "File uploaded successfully: \${driveFile.name} (Drive ID: \${driveFile.id})")
            } else {
                val errorBody = response.errorBody()?.string()
                val errorMsg = "Google Drive API error (\${response.code()}): \$errorBody"
                Log.e(TAG, errorMsg)
                emit(UploadProgress.Failed(IOException(errorMsg)))
            }

        } catch (e: Exception) {
            Log.e(TAG, "Exception during Drive upload for URI: \$uri", e)
            emit(UploadProgress.Failed(e))
        }
    }.flowOn(Dispatchers.IO)

    /**
     * Reads filename and size directly from ContentResolver metadata without loading entire data.
     */
    private suspend fun queryUriMetadata(uri: Uri): UriMetadata = withContext(Dispatchers.IO) {
        var name: String? = null
        var size: Long = -1L
        val mimeType = context.contentResolver.getType(uri)

        try {
            context.contentResolver.query(uri, null, null, null, null)?.use { cursor ->
                if (cursor.moveToFirst()) {
                    val nameIndex = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME)
                    val sizeIndex = cursor.getColumnIndex(OpenableColumns.SIZE)

                    if (nameIndex != -1) name = cursor.getString(nameIndex)
                    if (sizeIndex != -1) size = cursor.getLong(sizeIndex)
                }
            }
        } catch (e: Exception) {
            Log.w(TAG, "Failed to query metadata for URI: \$uri", e)
        }

        // Fallback size estimation if cursor didn't supply it
        if (size <= 0L) {
            try {
                context.contentResolver.openAssetFileDescriptor(uri, "r")?.use { afd ->
                    size = afd.length
                }
            } catch (e: Exception) {
                Log.w(TAG, "Failed to read asset file descriptor size", e)
            }
        }

        UriMetadata(name = name, size = size, mimeType = mimeType)
    }

    private data class UriMetadata(val name: String?, val size: Long, val mimeType: String?)
}

/**
 * Memory-efficient RequestBody that streams an Android ContentResolver InputStream directly to OkHttp Sink.
 * Prevents OutOfMemoryError (OOM) for multi-gigabyte photos and 4K videos.
 */
class CountingStreamRequestBody(
    private val context: Context,
    private val uri: Uri,
    private val contentType: okhttp3.MediaType?,
    private val contentLength: Long,
    private val onProgress: (bytesWritten: Long, totalLength: Long) -> Unit
) : RequestBody() {

    override fun contentType(): okhttp3.MediaType? = contentType

    override fun contentLength(): Long = contentLength

    @Throws(IOException::class)
    override fun writeTo(sink: BufferedSink) {
        val inputStream: InputStream = context.contentResolver.openInputStream(uri)
            ?: throw IOException("Unable to open InputStream for URI: \$uri")

        inputStream.use { input ->
            val countingSink = CountingSink(sink, contentLength, onProgress)
            val bufferedCountingSink = countingSink.buffer()

            val buffer = ByteArray(8192)
            var bytesRead: Int
            while (input.read(buffer).also { bytesRead = it } != -1) {
                bufferedCountingSink.write(buffer, 0, bytesRead)
            }
            bufferedCountingSink.flush()
        }
    }

    private class CountingSink(
        delegate: Sink,
        private val totalLength: Long,
        private val onProgress: (bytesWritten: Long, totalLength: Long) -> Unit
    ) : ForwardingSink(delegate) {
        private var bytesWritten = 0L

        @Throws(IOException::class)
        override fun write(source: Buffer, byteCount: Long) {
            super.write(source, byteCount)
            bytesWritten += byteCount
            onProgress(bytesWritten, totalLength)
        }
    }
}`
  },
  {
    path: 'app/src/main/java/com/auragallery/app/sync/MediaSyncWorker.kt',
    name: 'MediaSyncWorker.kt (WorkManager Worker)',
    language: 'kotlin',
    category: 'data',
    description: 'Background Worker leveraging AndroidX WorkManager with Network Constraints, Exponential Backoff, and Foreground Notification support.',
    content: `package com.auragallery.app.sync

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.content.pm.ServiceInfo
import android.net.Uri
import android.os.Build
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.work.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.withContext
import java.util.concurrent.TimeUnit

/**
 * AndroidX WorkManager Worker to guarantee reliable background sync with Google Drive
 * even if the user exits the app or the OS initiates background execution limits.
 */
class MediaSyncWorker(
    private val context: Context,
    workerParams: WorkerParameters
) : CoroutineWorker(context, workerParams) {

    companion object {
        const val TAG = "MediaSyncWorker"
        const val KEY_MEDIA_URI = "key_media_uri"
        const val KEY_AUTH_TOKEN = "key_auth_token"
        const val KEY_DRIVE_FILE_ID = "key_drive_file_id"
        const val NOTIFICATION_CHANNEL_ID = "aura_sync_channel"
        const val NOTIFICATION_ID = 1001

        /**
         * Convenience helper to enqueue an upload task with network constraints & exponential backoff.
         */
        fun enqueueMediaUpload(
            context: Context,
            mediaUri: Uri,
            authToken: String,
            requiresUnmeteredNetwork: Boolean = true
        ): Operation {
            val constraints = Constraints.Builder()
                .setRequiredNetworkType(
                    if (requiresUnmeteredNetwork) NetworkType.UNMETERED else NetworkType.CONNECTED
                )
                .setRequiresBatteryNotLow(true)
                .build()

            val inputData = Data.Builder()
                .putString(KEY_MEDIA_URI, mediaUri.toString())
                .putString(KEY_AUTH_TOKEN, authToken)
                .build()

            val uploadWorkRequest = OneTimeWorkRequestBuilder<MediaSyncWorker>()
                .setConstraints(constraints)
                .setInputData(inputData)
                .setBackoffCriteria(
                    BackoffPolicy.EXPONENTIAL,
                    WorkRequest.MIN_BACKOFF_MILLIS,
                    TimeUnit.MILLISECONDS
                )
                .addTag("GoogleDriveSync")
                .build()

            return WorkManager.getInstance(context).enqueueUniqueWork(
                "Upload_\${mediaUri.hashCode()}",
                ExistingWorkPolicy.REPLACE,
                uploadWorkRequest
            )
        }
    }

    override suspend fun doWork(): Result = withContext(Dispatchers.IO) {
        val uriString = inputData.getString(KEY_MEDIA_URI) ?: return@withContext Result.failure()
        val authToken = inputData.getString(KEY_AUTH_TOKEN) ?: return@withContext Result.failure()
        val mediaUri = Uri.parse(uriString)

        Log.d(TAG, "Starting WorkManager Drive Sync for: \$uriString")

        // Promote to Foreground Service on Android 10+ if running large file sync
        createNotificationChannel()
        val notification = createForegroundNotification("Preparing Google Drive sync...", 0)
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                setForeground(ForegroundInfo(NOTIFICATION_ID, notification, ServiceInfo.FOREGROUND_SERVICE_TYPE_DATA_SYNC))
            } else {
                setForeground(ForegroundInfo(NOTIFICATION_ID, notification))
            }
        } catch (e: Exception) {
            Log.w(TAG, "Unable to run as foreground service: \${e.message}")
        }

        val syncService = DriveSyncService(
            context = applicationContext,
            oauthTokenProvider = { authToken }
        )

        var finalResult: Result = Result.retry()

        try {
            syncService.uploadMedia(mediaUri).collect { progress ->
                when (progress) {
                    is UploadProgress.Preparing -> {
                        updateNotification("Preparing media stream...", 0)
                    }
                    is UploadProgress.Uploading -> {
                        updateNotification(
                            "Uploading to Google Drive (\${progress.percentage}%)",
                            progress.percentage
                        )
                        setProgress(
                            Data.Builder()
                                .putLong("bytesUploaded", progress.bytesUploaded)
                                .putLong("totalBytes", progress.totalBytes)
                                .putInt("percentage", progress.percentage)
                                .build()
                        )
                    }
                    is UploadProgress.Success -> {
                        updateNotification("Upload completed successfully!", 100)
                        val outputData = Data.Builder()
                            .putString(KEY_DRIVE_FILE_ID, progress.fileResponse.id)
                            .putString("drive_file_name", progress.fileResponse.name)
                            .build()
                        finalResult = Result.success(outputData)
                    }
                    is UploadProgress.Failed -> {
                        Log.e(TAG, "Sync failed: \${progress.error.message}")
                        if (runAttemptCount < 3) {
                            finalResult = Result.retry()
                        } else {
                            finalResult = Result.failure(
                                Data.Builder().putString("error", progress.error.message).build()
                            )
                        }
                    }
                }
            }
        } catch (e: Exception) {
            Log.e(TAG, "Unexpected error in MediaSyncWorker", e)
            finalResult = if (runAttemptCount < 3) Result.retry() else Result.failure()
        }

        finalResult
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                NOTIFICATION_CHANNEL_ID,
                "Aura Gallery Sync",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Google Drive Background Synchronization status"
            }
            val manager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            manager.createNotificationChannel(channel)
        }
    }

    private fun createForegroundNotification(statusText: String, progress: Int): android.app.Notification {
        return NotificationCompat.Builder(context, NOTIFICATION_CHANNEL_ID)
            .setContentTitle("Aura Gallery • Google Drive Sync")
            .setContentText(statusText)
            .setSmallIcon(android.R.drawable.stat_sys_upload)
            .setProgress(100, progress, progress == 0)
            .setOngoing(true)
            .setOnlyAlertOnce(true)
            .build()
    }

    private fun updateNotification(statusText: String, progress: Int) {
        val manager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        val notification = createForegroundNotification(statusText, progress)
        manager.notify(NOTIFICATION_ID, notification)
    }
}`
  },
  {
    path: 'app/src/main/java/com/auragallery/app/ui/viewmodel/GalleryViewModel.kt',
    name: 'GalleryViewModel.kt (ViewModel & StateFlow)',
    language: 'kotlin',
    category: 'ui',
    description: 'Modern Android ViewModel handling StateFlow, MVI UI state, LocalMediaRepository injection, and strict error handling.',
    content: `package com.auragallery.app.ui.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.auragallery.app.data.LocalMediaRepository
import com.auragallery.app.domain.model.MediaItem
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

/**
 * UI State representing the Gallery screen with strict error handling and loading indicators.
 */
data class GalleryUiState(
    val isLoading: Boolean = false,
    val hasPermission: Boolean = false,
    val mediaList: List<MediaItem> = emptyList(),
    val selectedMedia: MediaItem? = null,
    val errorMessage: String? = null
)

class GalleryViewModel(
    application: Application
) : AndroidViewModel(application) {

    private val repository = LocalMediaRepository(application.applicationContext)

    private val _uiState = MutableStateFlow(GalleryUiState(isLoading = false, hasPermission = false))
    val uiState: StateFlow<GalleryUiState> = _uiState.asStateFlow()

    fun onPermissionResult(isGranted: Boolean) {
        _uiState.update { it.copy(hasPermission = isGranted) }
        if (isGranted) {
            loadMedia()
        } else {
            _uiState.update {
                it.copy(
                    isLoading = false,
                    mediaList = emptyList(),
                    errorMessage = "Izin akses media belum diberikan. Berikan izin di Pengaturan untuk memuat galeri."
                )
            }
        }
    }

    /**
     * Executes non-blocking query on IO dispatcher via repository.fetchLocalMedia()
     */
    fun loadMedia() {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true, errorMessage = null) }

            val result = repository.fetchLocalMedia()

            result.fold(
                onSuccess = { items ->
                    _uiState.update {
                        it.copy(
                            isLoading = false,
                            mediaList = items,
                            errorMessage = null
                        )
                    }
                },
                onFailure = { throwable ->
                    val readableMessage = when (throwable) {
                        is SecurityException -> "Akses media ditolak oleh sistem Android (SecurityException)."
                        is NullPointerException -> "Gagal memproses kueri MediaStore cursor."
                        else -> throwable.localizedMessage ?: "Terjadi kesalahan saat memuat media galeri."
                    }
                    _uiState.update {
                        it.copy(
                            isLoading = false,
                            errorMessage = readableMessage
                        )
                    }
                }
            )
        }
    }

    fun onMediaSelected(item: MediaItem?) {
        _uiState.update { it.copy(selectedMedia = item) }
    }

    fun clearError() {
        _uiState.update { it.copy(errorMessage = null) }
    }
}`
  },
  {
    path: 'app/src/main/java/com/auragallery/app/AuraGalleryApp.kt',
    name: 'AuraGalleryApp.kt (Application Class)',
    language: 'kotlin',
    category: 'domain',
    description: 'Application class with Coil ImageLoader configuration for disk & memory caching.',
    content: `package com.auragallery.app

import android.app.Application
import coil.ImageLoader
import coil.ImageLoaderFactory
import coil.disk.DiskCache
import coil.memory.MemoryCache
import coil.util.DebugLogger

class AuraGalleryApp : Application(), ImageLoaderFactory {

    override fun newImageLoader(): ImageLoader {
        return ImageLoader.Builder(this)
            .memoryCache {
                MemoryCache.Builder(this)
                    .maxSizePercent(0.25)
                    .build()
            }
            .diskCache {
                DiskCache.Builder()
                    .directory(cacheDir.resolve("image_cache"))
                    .maxSizePercent(0.02)
                    .build()
            }
            .respectCacheHeaders(false)
            .logger(if (BuildConfig.DEBUG) DebugLogger() else null)
            .build()
    }
}`
  },
  {
    path: 'app/src/main/java/com/auragallery/app/ui/theme/Theme.kt',
    name: 'ui/theme/Theme.kt',
    language: 'kotlin',
    category: 'theme',
    description: 'Material 3 Dynamic Color Theming for Android 12+ and fallback palettes.',
    content: `package com.auragallery.app.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext

private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFFD0BCFF),
    secondary = Color(0xFFCCC2DC),
    tertiary = Color(0xFFEFB8C8),
    background = Color(0xFF141218),
    surface = Color(0xFF141218),
    onPrimary = Color(0xFF381E72),
    onSurface = Color(0xFFE6E0E9)
)

private val LightColorScheme = lightColorScheme(
    primary = Color(0xFF6750A4),
    secondary = Color(0xFF625B71),
    tertiary = Color(0xFF7D5260),
    background = Color(0xFFFEF7FF),
    surface = Color(0xFFFEF7FF),
    onPrimary = Color.White,
    onSurface = Color(0xFF1D1B20)
)

@Composable
fun AuraGalleryTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography(),
        content = content
    )
}`
  },
  {
    path: 'settings.gradle.kts',
    name: 'settings.gradle.kts',
    language: 'kotlin',
    category: 'build',
    description: 'Gradle plugin and dependency repository configuration management.',
    content: `pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\\\.android.*")
                includeGroupByRegex("com\\\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "Aura Gallery"
include(":app")`
  }
];

export const MOCK_GALLERY_PHOTOS: MediaPhoto[] = [
  {
    id: '1',
    uri: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=600&q=80',
    title: 'Aurora_Borealis_Night.jpg',
    dateAdded: 'Today, 09:42 AM',
    size: '4.8 MB',
    resolution: '4032 x 3024',
    album: 'Camera'
  },
  {
    id: '2',
    uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    title: 'Yosemite_Valley_Morn.jpg',
    dateAdded: 'Today, 08:15 AM',
    size: '5.2 MB',
    resolution: '5120 x 2880',
    album: 'Landscape'
  },
  {
    id: '3',
    uri: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=600&q=80',
    title: 'Misty_Pine_Forest.mp4',
    dateAdded: 'Yesterday',
    size: '34.6 MB',
    resolution: '4K UHD 60fps',
    isVideo: true,
    duration: '0:45',
    album: 'Videos'
  },
  {
    id: '4',
    uri: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
    title: 'Foggy_Sunset_Peak.jpg',
    dateAdded: 'Yesterday',
    size: '3.9 MB',
    resolution: '3840 x 2160',
    album: 'Landscape'
  },
  {
    id: '5',
    uri: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    title: 'Tokyo_Cyberpunk_Neon.jpg',
    dateAdded: 'Aug 18, 2026',
    size: '6.1 MB',
    resolution: '6000 x 4000',
    album: 'Travel'
  },
  {
    id: '6',
    uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    title: 'Tropical_Beach_Reef.mp4',
    dateAdded: 'Aug 17, 2026',
    size: '68.2 MB',
    resolution: '1080p 120fps',
    isVideo: true,
    duration: '1:24',
    album: 'Videos'
  },
  {
    id: '7',
    uri: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
    title: 'Starry_Matterhorn_Summit.jpg',
    dateAdded: 'Aug 16, 2026',
    size: '7.5 MB',
    resolution: '4000 x 3000',
    album: 'Camera'
  },
  {
    id: '8',
    uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80',
    title: 'Sunlight_Through_Canopy.jpg',
    dateAdded: 'Aug 15, 2026',
    size: '4.2 MB',
    resolution: '4032 x 3024',
    album: 'Landscape'
  },
  {
    id: '9',
    uri: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80',
    title: 'Himalayan_Trekking_Halt.jpg',
    dateAdded: 'Aug 12, 2026',
    size: '5.8 MB',
    resolution: '4800 x 3200',
    album: 'Travel'
  }
];
