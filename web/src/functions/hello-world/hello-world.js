const fetch = require('node-fetch')

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const json = await fetch(
      'https://dog.ceo/api/breed/terrier/yorkshire/images/random',
    ).then((res) => res.json())
    return {
      statusCode: 200,
      body: JSON.stringify(json),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
