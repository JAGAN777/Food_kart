importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-app-compat.js'
)
importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-messaging-compat.js'
)
firebase?.initializeApp({
    apiKey: "AIzaSyBOetBYflDw2xKV-BNcl8aA6UQLQIQ0koY",
    authDomain: "foodkartcustomer.firebaseapp.com",
    projectId: "foodkartcustomer",
    storageBucket: "foodkartcustomer.appspot.com",
    messagingSenderId: "925050063107",
    appId: "1:925050063107:web:f38d482d85ac6e776a8136",
    measurementId: "G-5DKTW1J8JP"
})

// Retrieve firebase messaging
const messaging = firebase?.messaging()

messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification.title
    const notificationOptions = {
        body: payload.notification.body,
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
})
