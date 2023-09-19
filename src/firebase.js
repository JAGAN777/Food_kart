import { initializeApp } from 'firebase/app'
import {
    getMessaging,
    getToken,
    onMessage,
    isSupported,
} from 'firebase/messaging'
import { useStoreFcm } from './hooks/react-query/push-notification/usePushNotification'

// const firebaseConfig = {
//     apiKey: '',
//     authDomain: '',
//     projectId: '',
//     storageBucket: '',
//     messagingSenderId: '',
//     appId: '',
//     measurementId: '',
// }

const firebaseConfig = {
  apiKey: "AIzaSyBOetBYflDw2xKV-BNcl8aA6UQLQIQ0koY",
  authDomain: "foodkartcustomer.firebaseapp.com",
  projectId: "foodkartcustomer",
  storageBucket: "foodkartcustomer.appspot.com",
  messagingSenderId: "925050063107",
  appId: "1:925050063107:web:f38d482d85ac6e776a8136",
  measurementId: "G-5DKTW1J8JP"
};

const firebaseApp = initializeApp(firebaseConfig)

const messaging = (async () => {
    try {
        const isSupportedBrowser = await isSupported()
        if (isSupportedBrowser) {
            return getMessaging(firebaseApp)
        }

        return null
    } catch (err) {
        return null
    }
})()

export const fetchToken = async (setTokenFound, setFcmToken) => {
    return getToken(await messaging, {
        vapidKey: '',
    })
        .then((currentToken) => {
            if (currentToken) {
                setTokenFound(true)
                setFcmToken(currentToken)
               console.log("currentToken",currentToken)
                // Track the token -> client mapping, by sending to backend server
                // show on the UI that permission is secured
            } else {
                setTokenFound(false)
                setFcmToken()
                // shows on the UI that permission is required
            }
        })
        .catch((err) => {
            console.error(err)
            // catch error while creating client token
        })
}

export const onMessageListener = async () =>
    new Promise((resolve) =>
        (async () => {
            const messagingResolve = await messaging
            // onMessage(messagingResolve, (payload) => {
            //     resolve(payload)
            // })
            if (messaging) {
                messaging.onMessageHandler = (payload) => {
                  resolve(payload);
                };
              }
        })()
    )
