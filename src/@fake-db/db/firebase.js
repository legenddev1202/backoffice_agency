import firebase from 'firebase';
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyCnpoZYceHXKIyXbS3wxA9R2UYGmcHsWEI",
    authDomain: "insurancewebapptest.firebaseapp.com",
    databaseURL: "https://insurancewebapptest-default-rtdb.firebaseio.com",
    projectId: "insurancewebapptest",
    storageBucket: "insurancewebapptest.appspot.com",
    messagingSenderId: "719907791617",
    appId: "1:719907791617:web:f6719e968efb910e3bb100",
    measurementId: "G-DG0T6VQP5Z"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const realDb = firebase.database()
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();