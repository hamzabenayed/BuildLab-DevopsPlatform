
# Install the SDK


## Step 1. Install the SDK


## Introduction

This document provides an overview of the Android Analytic SDK, which is used to track user behavior and collect analytics data in Android applications.

## Step 1. Install the SDK

To install the SDK, follow these steps:

1. Add implementation 'com.mixpanel.android:mixpanel-android:7.+' as a dependency to your build.gradle file.
2. Update build.gradle by clicking the Sync Project with Gradle Files icon at the top of the window.
3. Make sure you've specified mavenCentral() as a repository in build.gradle.
4. Add the following permissions in your AndroidManifest.xml:




![Docusaurus logo](https://storage.googleapis.com/cdn-mxpnl-com/static/readme/android-sync-gradle.png)





```xml
<!-- Required to allow the application to send events to Mixpanel -->
<uses-permission android:name="android.permission.INTERNET" />

<!-- Optional, but recommended so we can send data intelligently based on network conditions -->
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<!-- Optional, but recommended so events will contain information about bluetooth state -->
<uses-permission android:name="android.permission.BLUETOOTH" />
