async function main(
) {
  // [START documentai_quickstart]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */


  const firebase = require("firebase");
  // Required for side-effects
  const firestore = require("firebase/firestore");

  const admin = require('firebase-admin');

  admin.initializeApp({
  credential: admin.credential.applicationDefault()
  });

  const db = admin.firestore();


  const projectId = 'tohacks2020-8d7a9';
  const location = 'us'
  const gcsInputUri = 'gs://tohacks2020-8d7a9.appspot.com/files/test_patient.pdf';

  const {
    DocumentUnderstandingServiceClient,
  } = require('@google-cloud/documentai');
  const client = new DocumentUnderstandingServiceClient();

  async function quickstart() {
    // Configure the request for processing the PDF
    const parent = `projects/${projectId}/locations/${location}`;
    const request = {
      parent,
      inputConfig: {
        gcsSource: {
          uri: gcsInputUri,
        },
        mimeType: 'application/pdf',
      },
    };

    // Recognizes text entities in the PDF document
    const [result] = await client.processDocument(request);

    // Get all of the document text as one big string
    const {text} = result;

    // Extract shards from the text field
    function extractText(textAnchor) {
      // First shard in document doesn't have startIndex property
      const startIndex = textAnchor.textSegments[0].startIndex || 0;
      const endIndex = textAnchor.textSegments[0].endIndex;

      return text.substring(startIndex, endIndex);
    }

    var json = '{';
    var count = 0;

    for (const entity of result.entities) {

      if (count + 1 == result.entities.length) {
        const field = extractText(entity.textAnchor).replace(/[\u2018\u2019]/g, "'");
        const input  = (entity.mentionText).replace(/[\u2018\u2019]/g, "'");
        json += `"${field}":"${input}" }`;
      } else {
        const field = extractText(entity.textAnchor).replace(/[\u2018\u2019]/g, "'");
        const input  = (entity.mentionText).replace(/[\u2018\u2019]/g, "'");
        json += `"${field}":"${input}",`;
      }

      count += 1;

    }
    json = json.replace(/\r?\n|\r/g, '');
    console.log(json);
    const jsonObj = JSON.parse(json);

    const addedPatient = db.collection('records').add(jsonObj).then(ref => {
      console.log("Added document with ID: " + ref.id);
    });



  }
  // [END documentai_quickstart]
  await quickstart();
}

main(...process.argv.slice(2)).catch(err => {
  console.error(err);
  process.exitCode = 1;
});