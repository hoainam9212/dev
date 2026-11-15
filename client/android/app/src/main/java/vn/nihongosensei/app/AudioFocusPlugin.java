package vn.nihongosensei.app;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.media.AudioAttributes;
import android.media.AudioFocusRequest;
import android.media.AudioManager;
import android.os.Build;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Takes transient audio focus while the app plays sound (speech or a recording), so music/video apps pause and
 * resume afterwards — the community TTS plugin and the WebView's <audio> never request focus. While focus is
 * held, {@link PlaybackService} keeps the sound going with the screen off.
 *
 * Events to the web side: "interrupted" when another app takes the audio for good or for a while (a call, the
 * user starting music), "stopRequested" when Stop is pressed in the notification. Both stop all app sound.
 */
@CapacitorPlugin(name = "AudioFocus")
public class AudioFocusPlugin extends Plugin {
    private AudioManager audioManager;
    private AudioFocusRequest focusRequest; // API 26+
    private final AudioManager.OnAudioFocusChangeListener listener = change -> {
        // a short "duck" (navigation prompt, notification sound) does not stop the lesson
        if (change == AudioManager.AUDIOFOCUS_LOSS || change == AudioManager.AUDIOFOCUS_LOSS_TRANSIENT) {
            notifyListeners("interrupted", null);
        }
    };

    @Override
    public void load() {
        audioManager = (AudioManager) getContext().getSystemService(Context.AUDIO_SERVICE);
        PlaybackService.stopListener = () -> notifyListeners("stopRequested", null);
    }

    @PluginMethod
    public void request(PluginCall call) {
        if (audioManager == null) {
            call.resolve();
            return;
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            if (focusRequest == null) {
                AudioAttributes attrs = new AudioAttributes.Builder()
                        .setUsage(AudioAttributes.USAGE_MEDIA)
                        .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                        .build();
                focusRequest = new AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN_TRANSIENT)
                        .setAudioAttributes(attrs)
                        .setOnAudioFocusChangeListener(listener)
                        .build();
            }
            audioManager.requestAudioFocus(focusRequest);
        } else {
            audioManager.requestAudioFocus(listener, AudioManager.STREAM_MUSIC, AudioManager.AUDIOFOCUS_GAIN_TRANSIENT);
        }
        askNotificationsOnce();
        PlaybackService.start(getContext());
        call.resolve();
    }

    /** Android 13+: without this permission the playback notification (and its Stop button) stays hidden. */
    private void askNotificationsOnce() {
        if (Build.VERSION.SDK_INT < 33 || getActivity() == null) return;
        String perm = "android.permission.POST_NOTIFICATIONS";
        if (ContextCompat.checkSelfPermission(getContext(), perm) == PackageManager.PERMISSION_GRANTED) return;
        SharedPreferences prefs = getContext().getSharedPreferences("audio", Context.MODE_PRIVATE);
        if (prefs.getBoolean("askedNotifications", false)) return;
        prefs.edit().putBoolean("askedNotifications", true).apply();
        ActivityCompat.requestPermissions(getActivity(), new String[] { perm }, 4711);
    }

    @PluginMethod
    public void abandon(PluginCall call) {
        if (audioManager != null) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                if (focusRequest != null) audioManager.abandonAudioFocusRequest(focusRequest);
            } else {
                audioManager.abandonAudioFocus(listener);
            }
        }
        PlaybackService.stop(getContext());
        call.resolve();
    }
}
