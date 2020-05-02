// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
import React, { Component } from 'react';

// Add the Firebase services that you want to use
import "firebase/auth";
import 'firebase/storage';

class Upload extends Component {
    constructor(props) {
        super(props);
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

        this.uploadFile = this.uploadFile.bind(this);

        this.state = {
            selectedFile: null
        }
    }

    handleImageAsFile(e) {
        const file = e.target.files[0];
        this.setState({ selectedFile, file });
    }

    uploadFile(e) {
        e.preventDefault()
        console.log('start of upload')
        // async magic goes here...
        const uploadTask = storage.ref(`/images/${this.state.selectedFile.name}`).put(this.state.selectedFile)
        //initiates the firebase side uploading 
        uploadTask.on('state_changed',
            (snapShot) => {
                //takes a snap shot of the process as it is happening
                console.log(snapShot)
            }, (err) => {
                //catches the errors
                console.log(err)
            }, () => {
                // gets the functions from storage refences the image storage in firebase by the children
                // gets the download url then sets the image from firebase as the value for the imgUrl key:
                storage.ref('images').child(this.state.selectedFile.name).getDownloadURL()
                    .then(fireBaseUrl => {
                        setImageAsUrl(prevObject => ({ ...prevObject, imgUrl: fireBaseUrl }))
                    })
            })
    }
}

export default Upload;