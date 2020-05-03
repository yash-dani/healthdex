async function main(
) {
  // [START documentai_quickstart]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  const projectId = 'tohacks2020-8d7a9';
  const location = 'us'
  const gcsInputUri = 'gs://tohacks2020-8d7a9.appspot.com/files/New_Patient_Sheet.pdf';

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

    for (const entity of result.entities) {
      console.log(`\nEntity text: ${extractText(entity.textAnchor)}`);
      console.log(`Entity type: ${entity.type}`);
      console.log(`Entity mention text: ${entity.mentionText}`);
    }
  }
  // [END documentai_quickstart]
  await quickstart();
}

main(...process.argv.slice(2)).catch(err => {
  console.error(err);
  process.exitCode = 1;
});