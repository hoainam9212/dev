package com.namle.dichochung.data

import android.content.ContentResolver
import android.graphics.Bitmap
import android.graphics.ImageDecoder
import android.net.Uri
import android.os.Build
import java.io.ByteArrayOutputStream

/** Ảnh món tự chụp: cắt vuông ở giữa, thu về [sizePx], nén WebP (≈ 20–60 KB, dưới giới hạn 1 MB của storage.rules). */
object PhotoProcessor {

    fun squareWebp(src: Bitmap, sizePx: Int = 512, quality: Int = 80): ByteArray {
        val side = minOf(src.width, src.height)
        val square = Bitmap.createBitmap(src, (src.width - side) / 2, (src.height - side) / 2, side, side)
        val scaled = Bitmap.createScaledBitmap(square, sizePx, sizePx, true)
        val format = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            Bitmap.CompressFormat.WEBP_LOSSY
        } else {
            @Suppress("DEPRECATION")
            Bitmap.CompressFormat.WEBP
        }
        return ByteArrayOutputStream().use { out ->
            scaled.compress(format, quality, out)
            out.toByteArray()
        }
    }

    /** Đọc ảnh camera / thư viện: ImageDecoder tự xoay theo EXIF, giải mã nhỏ lại để không tốn bộ nhớ. */
    fun fromUri(resolver: ContentResolver, uri: Uri, sizePx: Int = 512): ByteArray {
        val source = ImageDecoder.createSource(resolver, uri)
        val bitmap = ImageDecoder.decodeBitmap(source) { decoder, info, _ ->
            decoder.allocator = ImageDecoder.ALLOCATOR_SOFTWARE
            val side = minOf(info.size.width, info.size.height)
            if (side > sizePx * 2) {
                val ratio = side / (sizePx * 2f)
                decoder.setTargetSize((info.size.width / ratio).toInt(), (info.size.height / ratio).toInt())
            }
        }
        return squareWebp(bitmap, sizePx)
    }
}
