# Track your first event


## Step 2. Track your first event
 
To track your first event, follow these steps:


1. Add implementation 'com.mixpanel.android:mixpanel-android:7.+' as a dependency to your build.gradle file.
2. Update build.gradle by clicking the Sync Project with Gradle Files icon at the top of the window.

```xml
import com.mixpanel.android.mpmetrics.MixpanelAPI;

public class MainActivity extends ActionBarActivity {
  private MixpanelAPI mp;
  
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    
    // Replace with your Project Token
    mp = MixpanelAPI.getInstance(this, "YOUR_TOKEN");
  }

  private void sendToMixpanel() throws JSONException {
    JSONObject props = new JSONObject();
    props.put("Signup Type", "Referral");
    mp.track("Signed Up", props);
  }
}