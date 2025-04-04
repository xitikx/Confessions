const AWS = require("aws-sdk");

const comprehend = new AWS.Comprehend({ region: "us-east-1" }); // Ensure the region is correct

const analyzeSentiment = async (text) => {
  const params = {
    Text: text,
    LanguageCode: "en", // Assuming English input
  };

  try {
    const result = await comprehend.detectSentiment(params).promise();
    console.log("Comprehend Response:", JSON.stringify(result, null, 2)); // Log the response

    return result.Sentiment; // POSITIVE, NEGATIVE, NEUTRAL, or MIXED
  } catch (error) {
    console.error("Comprehend Error:", error);
    return "NEUTRAL"; // Default fallback
  }
};

module.exports = { analyzeSentiment };
