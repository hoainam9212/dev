import java.util.Properties

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.kotlin.serialization)
    alias(libs.plugins.roborazzi)
}

// google-services.json is git-ignored; without it the app still builds, just without Firebase config.
if (file("google-services.json").exists()) {
    apply(plugin = "com.google.gms.google-services")
}

android {
    namespace = "com.namle.dichochung"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.namle.dichochung"
        minSdk = 29
        targetSdk = 34
        versionCode = 2
        versionName = "1.0.1"
    }

    // Khoá ký bản phát hành chỉ có trên máy gốc (android/keystore.properties + .keystore, git-ignore).
    // Thiếu file (máy cloud / CI) thì bản release không ký, bản debug vẫn build bình thường.
    val keystoreFile = rootProject.file("keystore.properties")
    if (keystoreFile.exists()) {
        val props = Properties().apply { keystoreFile.inputStream().use { load(it) } }
        signingConfigs {
            create("release") {
                storeFile = rootProject.file(props.getProperty("storeFile"))
                storePassword = props.getProperty("storePassword")
                keyAlias = props.getProperty("keyAlias")
                keyPassword = props.getProperty("keyPassword")
            }
        }
        buildTypes.getByName("release").signingConfig = signingConfigs.getByName("release")
    }
    buildTypes {
        release { isMinifyEnabled = false }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions { jvmTarget = "17" }
    buildFeatures { compose = true }
    testOptions { unitTests.isIncludeAndroidResources = true }
}

roborazzi {
    outputDir.set(file("src/test/snapshots"))
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.lifecycle.runtime.compose)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    implementation(platform(libs.compose.bom))
    implementation(libs.compose.ui)
    implementation(libs.compose.ui.graphics)
    implementation(libs.compose.ui.tooling.preview)
    implementation(libs.compose.material3)
    implementation(libs.kotlinx.coroutines.android)
    implementation(libs.kotlinx.coroutines.play.services)
    implementation(libs.kotlinx.serialization.json)
    implementation(platform(libs.firebase.bom))
    implementation(libs.firebase.auth)
    implementation(libs.firebase.firestore)
    implementation(libs.firebase.storage)
    implementation(libs.firebase.messaging)
    implementation(libs.coil.compose)
    implementation(libs.zxing.core)
    implementation(libs.play.services.code.scanner)
    implementation(libs.play.services.location)
    debugImplementation(libs.compose.ui.tooling)
    debugImplementation(libs.compose.ui.test.manifest)

    testImplementation(libs.junit)
    testImplementation(libs.robolectric)
    testImplementation(libs.androidx.test.core)
    testImplementation(platform(libs.compose.bom))
    testImplementation(libs.compose.ui.test.junit4)
    testImplementation(libs.roborazzi)
    testImplementation(libs.roborazzi.compose)
    testImplementation(libs.roborazzi.junit.rule)
}
