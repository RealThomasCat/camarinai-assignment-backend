const axios = require("axios");

const GOOGLE_NLP_API_KEY = "AIzaSyAP3EEZzXCBkuC5tF_JCNjc7_4WNzqWFoc"; // Replace with your API key

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
