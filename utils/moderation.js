const axios = require("axios");

const GOOGLE_NLP_API_KEY = process.env.GOOGLE_NLP_API_KEY;

exports.moderateText = async (text) => {
  try {
    const response = await axios.post(
      `https://language.googleapis.com/v1/documents:moderateText?key=${GOOGLE_NLP_API_KEY}`,
      {
        document: {
          type: "PLAIN_TEXT",
          content: text,
        },
      }
    );

    const result = response.data;
    const flagged = result.moderationCategories.some(
      (category) => category.confidence > 0.7
    );

    return flagged; // Returns true if the comment is inappropriate
  } catch (error) {
    console.error(
      "Error in moderation:",
      error.response ? error.response.data : error.message
    );
    return false; // If API fails, assume the text is safe
  }
};
