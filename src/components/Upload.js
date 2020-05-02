// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from './index';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

// Add the Firebase services that you want to use
import 'firebase/storage';

class Upload extends Component {
    constructor(props) {
        super(props);

        this.uploadFile = this.uploadFile.bind(this);
        this.handleImageAsFile = this.handleImageAsFile.bind(this);

        this.state = {
            selectedFile: null,
            imageUrl: null
        }
    }

    handleImageAsFile(e) {
        const file = e.target.files[0];
        this.setState({ selectedFile: file });
    }

    uploadFile(e) {
        e.preventDefault()
        console.log('start of upload')
        const storage = firebase.storage()

        // async magic goes here...
        const uploadTask = storage.ref(`/files/${this.state.selectedFile.name}`).put(this.state.selectedFile)
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
                var fileRef = storage.ref('files').child(this.state.selectedFile.name);
                fileRef.getDownloadURL()
                    .then(fireBaseUrl => {
                        console.log(fireBaseUrl);
                    });
                var gcpUrl = 'gs://' + fileRef.bucket + '/' + fileRef.fullPath;
                console.log(gcpUrl);
            })
    }

    render() {
        return (
            <div style={{ backgroundColor: '#E5E5E5', width: '50%', height: '25%', top: '50%' }}>
                <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
            </div>
        );
    }
}

export default Upload;