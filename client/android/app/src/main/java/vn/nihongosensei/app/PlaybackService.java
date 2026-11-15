package vn.nihongosensei.app;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ServiceInfo;
import android.os.Build;
import android.os.IBinder;
import android.os.PowerManager;

import androidx.core.app.NotificationCompat;

/**
 * Foreground "media playback" service that runs while the app plays sound (speech or a recording), so the sound
 * keeps going with the screen off: without it Android may freeze the app's process and let the CPU sleep between
 * lines. It shows a notification with a Stop button; nothing else lives here — the web side drives the sound.
 */
public class PlaybackService extends Service {
    static final String ACTION_STOP = "vn.nihongosensei.app.STOP_AUDIO";
    private static final String CHANNEL = "playback";
    private static final int NOTIFICATION_ID = 7;

    /** Called on the main thread when the notification's Stop is pressed. */
    interface StopListener { void onStopRequested(); }
    static StopListener stopListener;

    private PowerManager.WakeLock wakeLock;

    static void start(Context context) {
        Intent i = new Intent(context, PlaybackService.class);
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) context.startForegroundService(i);
            else context.startService(i);
        } catch (RuntimeException e) {
            // Android 12+ refuses to start a foreground service from the background; sound still plays
            // while the app is visible, so this only costs the screen-off case.
        }
    }

    static void stop(Context context) {
        context.stopService(new Intent(context, PlaybackService.class));
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null && ACTION_STOP.equals(intent.getAction())) {
            if (stopListener != null) stopListener.onStopRequested();
            stopSelf();
            return START_NOT_STICKY;
        }
        Notification n = buildNotification();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            startForeground(NOTIFICATION_ID, n, ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK);
        } else {
            startForeground(NOTIFICATION_ID, n);
        }
        if (wakeLock == null) {
            PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
            wakeLock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "NihongoSensei:playback");
            wakeLock.setReferenceCounted(false);
        }
        // safety net: never hold the CPU for more than an hour if the web side forgets to stop
        wakeLock.acquire(60 * 60 * 1000L);
        return START_NOT_STICKY;
    }

    private Notification buildNotification() {
        NotificationManager nm = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && nm.getNotificationChannel(CHANNEL) == null) {
            NotificationChannel ch = new NotificationChannel(CHANNEL, "Phát âm thanh", NotificationManager.IMPORTANCE_LOW);
            ch.setShowBadge(false);
            nm.createNotificationChannel(ch);
        }
        int immutable = Build.VERSION.SDK_INT >= Build.VERSION_CODES.M ? PendingIntent.FLAG_IMMUTABLE : 0;
        PendingIntent open = PendingIntent.getActivity(this, 0,
                new Intent(this, MainActivity.class).setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP),
                PendingIntent.FLAG_UPDATE_CURRENT | immutable);
        PendingIntent stop = PendingIntent.getService(this, 1,
                new Intent(this, PlaybackService.class).setAction(ACTION_STOP),
                PendingIntent.FLAG_UPDATE_CURRENT | immutable);
        return new NotificationCompat.Builder(this, CHANNEL)
                .setSmallIcon(android.R.drawable.ic_media_play)
                .setContentTitle("Nihongo Sensei")
                .setContentText("Đang phát âm thanh bài học")
                .setContentIntent(open)
                .setOngoing(true)
                .setSilent(true)
                .setCategory(NotificationCompat.CATEGORY_TRANSPORT)
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                .addAction(android.R.drawable.ic_media_pause, "Dừng", stop)
                .build();
    }

    @Override
    public void onDestroy() {
        if (wakeLock != null && wakeLock.isHeld()) wakeLock.release();
        stopForeground(true);
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
