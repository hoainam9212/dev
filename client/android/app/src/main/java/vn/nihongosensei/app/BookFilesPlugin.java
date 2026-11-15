package vn.nihongosensei.app;

import android.app.Activity;
import android.content.ContentResolver;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.provider.OpenableColumns;

import androidx.activity.result.ActivityResult;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * Remembers where the learner's book .zip files are. The WebView's file input loses the file right after the
 * import; picking through the document picker and taking a persistable read permission lets the app read the
 * same file again later with one tap (web side: bookFiles.ts).
 *
 * pick() → { uri, name, size } (rejects "cancelled"); copy({ uri }) → { path, size }: the file copied into the
 * cache, read by the WebView through Capacitor's file URL (rejects "gone"); clean() deletes that copy.
 */
@CapacitorPlugin(name = "BookFiles")
public class BookFilesPlugin extends Plugin {
    private static final String COPY_NAME = "book-import.zip";

    @PluginMethod
    public void pick(PluginCall call) {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("*/*");
        intent.putExtra(Intent.EXTRA_MIME_TYPES, new String[] {
            "application/zip", "application/x-zip-compressed", "application/x-zip", "application/octet-stream"
        });
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION);
        startActivityForResult(call, intent, "picked");
    }

    @ActivityCallback
    private void picked(PluginCall call, ActivityResult result) {
        if (call == null) return;
        Intent data = result.getData();
        Uri uri = data == null ? null : data.getData();
        if (result.getResultCode() != Activity.RESULT_OK || uri == null) {
            call.reject("cancelled", "cancelled");
            return;
        }
        ContentResolver resolver = getContext().getContentResolver();
        try {
            resolver.takePersistableUriPermission(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION);
        } catch (SecurityException e) {
            // some providers grant no lasting access: the import still works, reopening later may say "gone"
        }
        String name = uri.getLastPathSegment();
        long size = -1;
        try (Cursor c = resolver.query(uri, new String[] { OpenableColumns.DISPLAY_NAME, OpenableColumns.SIZE }, null, null, null)) {
            if (c != null && c.moveToFirst()) {
                int n = c.getColumnIndex(OpenableColumns.DISPLAY_NAME);
                int s = c.getColumnIndex(OpenableColumns.SIZE);
                if (n >= 0 && !c.isNull(n)) name = c.getString(n);
                if (s >= 0 && !c.isNull(s)) size = c.getLong(s);
            }
        } catch (Exception e) {
            // name and size are only shown in the list
        }
        JSObject ret = new JSObject();
        ret.put("uri", uri.toString());
        ret.put("name", name == null ? "book.zip" : name);
        ret.put("size", size);
        call.resolve(ret);
    }

    @PluginMethod
    public void copy(PluginCall call) {
        String uriString = call.getString("uri");
        if (uriString == null) {
            call.reject("gone", "gone");
            return;
        }
        // plugin calls run on Capacitor's background thread, so a large copy does not block the UI
        File out = new File(getContext().getCacheDir(), COPY_NAME);
        long total = 0;
        InputStream opened;
        try {
            opened = getContext().getContentResolver().openInputStream(Uri.parse(uriString));
            if (opened == null) throw new java.io.FileNotFoundException(uriString);
        } catch (Exception e) {
            // moved, deleted, or the permission was lost
            call.reject("gone", "gone", e);
            return;
        }
        // failures from here on (e.g. no space left for the copy) are not the file's fault
        try (InputStream in = opened; OutputStream os = new FileOutputStream(out)) {
            byte[] buf = new byte[1 << 16];
            int n;
            while ((n = in.read(buf)) > 0) {
                os.write(buf, 0, n);
                total += n;
            }
        } catch (Exception e) {
            //noinspection ResultOfMethodCallIgnored
            out.delete();
            call.reject("failed", "failed", e);
            return;
        }
        JSObject ret = new JSObject();
        ret.put("path", out.getAbsolutePath());
        ret.put("size", total);
        call.resolve(ret);
    }

    /** Gives the lasting read permission back when the learner removes a file from the list (Android caps them). */
    @PluginMethod
    public void release(PluginCall call) {
        String uriString = call.getString("uri");
        try {
            if (uriString != null) {
                getContext().getContentResolver().releasePersistableUriPermission(Uri.parse(uriString), Intent.FLAG_GRANT_READ_URI_PERMISSION);
            }
        } catch (SecurityException e) {
            // no lasting permission was held
        }
        call.resolve();
    }

    @PluginMethod
    public void clean(PluginCall call) {
        //noinspection ResultOfMethodCallIgnored
        new File(getContext().getCacheDir(), COPY_NAME).delete();
        call.resolve();
    }
}
