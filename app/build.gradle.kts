plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
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
    }
    signingConfigs {
        create("stable") {
            storeFile = file("aura.keystore")
            storePassword = "aura123"
            keyAlias = "aura"
            keyPassword = "aura123"
        }
    }
    buildTypes {
        debug { signingConfig = signingConfigs.getByName("stable") }
        release { signingConfig = signingConfigs.getByName("stable"); isMinifyEnabled = false }
    }
    buildFeatures { compose = true }
    composeOptions { kotlinCompilerExtensionVersion = "1.5.9" }
    compileOptions { sourceCompatibility = JavaVersion.VERSION_17; targetCompatibility = JavaVersion.VERSION_17 }
    kotlinOptions { jvmTarget = "17" }
}
dependencies {
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.activity:activity-compose:1.8.2")
    implementation("androidx.compose.ui:ui:1.6.1")
    implementation("androidx.compose.material3:material3:1.2.0")
    implementation("io.coil-kt:coil-compose:2.6.0")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.4")
}
