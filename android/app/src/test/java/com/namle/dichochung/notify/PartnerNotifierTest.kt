package com.namle.dichochung.notify

import android.Manifest
import android.app.Application
import android.app.NotificationManager
import android.app.Notification
import androidx.test.core.app.ApplicationProvider
import com.namle.dichochung.MainActivity
import com.namle.dichochung.ui.Tab
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.Shadows.shadowOf
import org.robolectric.annotation.Config

@RunWith(RobolectricTestRunner::class)
@Config(sdk = [34])
class PartnerNotifierTest {

    private val app = ApplicationProvider.getApplicationContext<Application>()
    private val manager get() = app.getSystemService(NotificationManager::class.java)

    @Before
    fun setUp() {
        Channels.create(app)
    }

    @Test
    fun show_postsOnPartnerChannel_opensListTab() {
        shadowOf(app).grantPermissions(Manifest.permission.POST_NOTIFICATIONS)
        PartnerNotifier.show(app, "🧺 Lan vừa gửi 3 món cần mua", "Thịt ba chỉ, Rau muống, Trứng gà")

        val posted = shadowOf(manager).allNotifications
        assertEquals(1, posted.size)
        val n = posted.single()
        assertEquals(Channels.PARTNER, n.channelId)
        assertEquals("🧺 Lan vừa gửi 3 món cần mua", n.extras.getCharSequence(Notification.EXTRA_TITLE).toString())
        assertEquals("Thịt ba chỉ, Rau muống, Trứng gà", n.extras.getCharSequence(Notification.EXTRA_TEXT).toString())
        val intent = shadowOf(n.contentIntent).savedIntent
        assertEquals(Tab.LIST, MainActivity.tabFrom(intent))
    }

    @Test
    fun show_twoMessages_bothStay() {
        shadowOf(app).grantPermissions(Manifest.permission.POST_NOTIFICATIONS)
        PartnerNotifier.show(app, "Nam vừa thêm: Bia", "Mở Cần mua để xem")
        PartnerNotifier.show(app, "Nam đã đi chợ xong", "Nhặt 7/9 món")
        assertEquals(2, shadowOf(manager).allNotifications.size)
    }

    @Test
    fun show_withoutPermission_postsNothing() {
        shadowOf(app).denyPermissions(Manifest.permission.POST_NOTIFICATIONS)
        PartnerNotifier.show(app, "Nam đã đi chợ xong", "Nhặt 7/9 món")
        assertTrue(shadowOf(manager).allNotifications.isEmpty())
    }
}
