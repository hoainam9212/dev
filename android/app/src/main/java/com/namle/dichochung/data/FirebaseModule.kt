package com.namle.dichochung.data

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.FirebaseFirestoreSettings
import com.google.firebase.firestore.PersistentCacheSettings
import com.google.firebase.storage.FirebaseStorage

/** Firebase entry points. Firestore keeps an on-disk cache so ticks made offline in the store survive. */
object FirebaseModule {
    val auth: FirebaseAuth by lazy { FirebaseAuth.getInstance() }

    val db: FirebaseFirestore by lazy {
        FirebaseFirestore.getInstance().apply {
            firestoreSettings = FirebaseFirestoreSettings.Builder()
                .setLocalCacheSettings(PersistentCacheSettings.newBuilder().build())
                .build()
        }
    }

    val storage: FirebaseStorage by lazy { FirebaseStorage.getInstance() }
}
