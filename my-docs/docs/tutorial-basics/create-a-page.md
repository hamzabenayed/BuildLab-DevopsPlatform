# Finally, Timing Events

## Step 3. Timing Events


To track the time it takes for an action to occur, such as an image upload or a comment post, use the timeEvent method, which will mark the "start" of your action, which will be timed until you finish with a track call. The time duration is then recorded in the "Duration" property. Here's an example:



Export Your Own Events

You can export events from the table that contains all your events in your project profile. You can choose the type of file you want to export and which events you want to export for a full review. Here's how to do it:

1. Navigate to the table containing your events in your project profile.
2. Click the "Export" button.
3. elect the file format you want to export.
4. Select the events you want to export.
5. Click "Export" to download your file.



```xml

MixpanelAPI mixpanel = MixpanelAPI.getInstance(context, MIXPANEL_TOKEN, true);

// Start the timer for the event "Image Upload"
mixpanel.timeEvent("Image Upload");

// Stop the timer if the imageUpload() method returns true
if(imageUpload()){
    mixpanel.track("Image Upload");
}


