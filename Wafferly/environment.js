var environments = {
    staging: {
        FIREBASE_API_KEY: "AIzaSyDg5dlJgGEfHQ17Nc4qGw1Yhf-xf3qG9Xg",
        FIREBASE_AUTH_DOMAIN: "ivory-signer-267012.firebaseapp.com",
        FIREBASE_DATABASE_URL: "https://ivory-signer-267012.firebaseio.com",
        FIREBASE_PROJECT_ID: "ivory-signer-267012",
        FIREBASE_STORAGE_BUCKET: "ivory-signer-267012.appspot.com",
        FIREBASE_MESSAGING_SENDER_ID: "99786844313",
        GOOGLE_CLOUD_VISION_API_KEY: "AIzaSyDNPutQILkyEGlfOh5_Hwsr2FvYf3L8NlE"
    },
    production: {
        // Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
    }
};
function getReleaseChannel() {
    let releaseChannel = Expo.Constants.manifest.releaseChannel;
    if (releaseChannel === undefined) {
        return "staging";
    } else if (releaseChannel === "staging") {
        return "staging";
    } else {
        return "staging";
    }
}
function getEnvironment(env) {
    console.log("Release Channel: ", getReleaseChannel());
    return environments[env];
}
var Environment = getEnvironment(getReleaseChannel());
export default Environment;