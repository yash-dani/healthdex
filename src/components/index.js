import Record from './Record';
import * as firebase from "firebase/app";

export const PatientRecord = Record;

var firebaseConfig = {
    apiKey: "AIzaSyBxWVU6SCedzeH9vUtkdQGyS_5ywyoZf94",
    authDomain: "tohacks2020-8d7a9.firebaseapp.com",
    databaseURL: "https://tohacks2020-8d7a9.firebaseio.com",
    projectId: "tohacks2020-8d7a9",
    storageBucket: "tohacks2020-8d7a9.appspot.com",
    messagingSenderId: "62588383176",
    appId: "1:62588383176:web:d61dfeb91e2ec1ee821afd",
    measurementId: "G-GW6CQ1BL7L"
};
firebase.initializeApp(firebaseConfig);

export default firebase;