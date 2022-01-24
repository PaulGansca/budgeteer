import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC1n1PTmrcFOFh-FtIBAdGTZ1umrULlU3k",
    authDomain: "budgeteer-c0b5c.firebaseapp.com",
    projectId: "budgeteer-c0b5c",
    storageBucket: "budgeteer-c0b5c.appspot.com",
    messagingSenderId: "306757354250",
    appId: "1:306757354250:web:d9c02f21c002dc69de70f3",
    measurementId: "G-0XCE186CJH"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const user = await userRef.get();

    if (!user.exists) {
        const { name, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                name,
                email,
                createdAt,
                ...additionalData
            });
        } catch (err) {
            console.log(err);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;