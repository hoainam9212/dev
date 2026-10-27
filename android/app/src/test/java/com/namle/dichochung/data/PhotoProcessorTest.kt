package com.namle.dichochung.data

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config
import org.robolectric.annotation.GraphicsMode

@RunWith(RobolectricTestRunner::class)
@GraphicsMode(GraphicsMode.Mode.NATIVE)
@Config(sdk = [34])
class PhotoProcessorTest {

    @Test
    fun photo_squareWebp_isSquareAndSmall() {
        val src = Bitmap.createBitmap(1200, 800, Bitmap.Config.ARGB_8888)
        Canvas(src).apply {
            drawColor(Color.WHITE)
            drawCircle(600f, 400f, 300f, Paint().apply { color = Color.rgb(230, 80, 60) })
        }

        val bytes = PhotoProcessor.squareWebp(src)

        assertTrue("${bytes.size} bytes", bytes.size < 200 * 1024)
        val decoded = BitmapFactory.decodeByteArray(bytes, 0, bytes.size)
        assertEquals(512, decoded.width)
        assertEquals(512, decoded.height)
        // Cắt giữa: tâm ảnh vẫn là hình tròn đỏ, góc là nền trắng (không bị méo / lệch).
        assertTrue(Color.red(decoded.getPixel(256, 256)) > 180 && Color.green(decoded.getPixel(256, 256)) < 140)
        assertTrue(Color.green(decoded.getPixel(4, 4)) > 200)
    }

    @Test
    fun photo_squareWebp_portraitIsCroppedToo() {
        val src = Bitmap.createBitmap(300, 900, Bitmap.Config.ARGB_8888)
        val decoded = PhotoProcessor.squareWebp(src, sizePx = 256).let { BitmapFactory.decodeByteArray(it, 0, it.size) }
        assertEquals(256, decoded.width)
        assertEquals(256, decoded.height)
    }
}
