import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyBJ5YCuCPGAusxEDVlbhs-dUnlZa2Bpqa0",
    authDomain: "volunteer-ddb7f.firebaseapp.com",
    databaseURL: "https://volunteer-ddb7f.firebaseio.com",
    projectId: "volunteer-ddb7f",
    storageBucket: "volunteer-ddb7f.appspot.com",
    messagingSenderId: "348516805966",
    appId: "1:348516805966:web:a16cd55b779158f4ecc21f",
    measurementId: "G-B5TEMZH1DP"

}

// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase