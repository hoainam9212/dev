package vn.nihongosensei.app;

import android.content.Intent;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Home-screen shortcuts (long-press the app icon; res/xml/shortcuts.xml) carry the page to open as the intent
 * extra "route". The web side takes the route that started the app once, and hears "route" for a shortcut tapped
 * while the app is already open (singleTask: it arrives through onNewIntent).
 */
@CapacitorPlugin(name = "Launch")
public class LaunchPlugin extends Plugin {
    static final String EXTRA = "route";
    private String pending;

    @Override
    public void load() {
        if (getActivity() != null) pending = routeOf(getActivity().getIntent());
    }

    @Override
    protected void handleOnNewIntent(Intent intent) {
        super.handleOnNewIntent(intent);
        String route = routeOf(intent);
        if (route == null) return;
        JSObject ret = new JSObject();
        ret.put("route", route);
        notifyListeners("route", ret);
    }

    @PluginMethod
    public void take(PluginCall call) {
        JSObject ret = new JSObject();
        if (pending != null) ret.put("route", pending);
        pending = null;
        call.resolve(ret);
    }

    private static String routeOf(Intent intent) {
        if (intent == null) return null;
        String route = intent.getStringExtra(EXTRA);
        intent.removeExtra(EXTRA); // a later recreation of the activity must not open it again
        return route;
    }
}
