// {// const axios = require('axios');

// // async function checkToxicity(text) {
// //   try {
// //     const response = await axios.post(
// //       'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze',
// //       {
// //         comment: { text: text },
// //         requestedAttributes: { TOXICITY: {} },
// //       },
// //       { params: { key: process.env.PERSPECTIVE_API_KEY } }
// //     );

// //     const score = response.data.attributeScores.TOXICITY.summaryScore.value;
// //     return score;

// //   } catch (err) {
// //     console.error('Error calling Perspective API:', err.message);
// //     return 0; // Assume non-toxic if error occurs
// //   }
// // }

// // module.exports = { checkToxicity };
// }