// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from './index';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';

// Add the Firebase services that you want to use
import 'firebase/storage';

import '../style/filepicker.css';
import '../../node_modules/dropzone/dist/min/dropzone.min.css'

class Upload extends Component {
    constructor(props) {
        super(props);

        this.uploadFile = this.uploadFile.bind(this);
        this.dropFile = this.dropFile.bind(this);
        this.removedfile = this.removedfile.bind(this);

        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "application/pdf",
            autoProcessQueue: false
        };

        this.componentConfig = {
            iconFiletypes: ['.pdf'],
            showFiletypeIcon: true,
            postUrl: 'no-url'
        };

        this.state = {
            files: []
        }
    }

    dropFile(file) {
        this.state.files.push(file)
        console.log("added file")
    }

    removedfile(file) {
        let index = this.state.files.indexOf(file)
        if (index > -1) {
            this.state.files.splice(index, 1);
        }
        console.log('removed file')
    }

    uploadFile(e) {
        e.preventDefault()
        console.log('start of upload')
        if (this.state.files.length == 0) {
            console.log("no files")
            return;
        }

        const storage = firebase.storage()

        this.state.files.map((file) => {
            // async magic goes here...
            const uploadTask = storage.ref(`/files/${file.name}`).put(file)
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
                    var fileRef = storage.ref('files').child(file.name);
                    fileRef.getDownloadURL()
                        .then(fireBaseUrl => {
                            console.log(fireBaseUrl);
                        });
                    var gcpUrl = 'gs://' + fileRef.bucket + '/' + fileRef.fullPath;
                    console.log(gcpUrl);
                })
        })
        this.state.files = []
    }

    render() {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            addedfile: this.dropFile,
            removedfile: this.removedfile
        }

        return (
            <div>
                <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
                <button type="button" onClick={this.uploadFile}>Upload!</button>
            </div>
        );
    }
}

export default Upload;