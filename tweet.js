const { TwitterApi } = require("twitter-api-v2");
const { openaiCompletions } = require("./openaiFuncs");
const generateImage = require("./generateImage");
require("dotenv").config();

const tweet = async (promptText) => {
    try {
        const client = new TwitterApi({
            appKey: process.env.API_KEY,
            appSecret: process.env.API_KEY_SECRET,
            accessToken: process.env.ACCESS_TOKEN,
            accessSecret: process.env.ACCESS_TOKEN_SECRET,
        });

        const gptResponse = await openaiCompletions(promptText);
        const gptResponseText = gptResponse.choices[0].message.content;

        const mediaIds = await Promise.all([
            client.v1.uploadMedia(
                Buffer.from(await generateImage(gptResponseText)),
                {
                    type: "png",
                }
            ),
        ]);

        const res = await client.v2.tweet({
            text: gptResponseText,
            media: { media_ids: mediaIds },
        });
        return res;
    } catch (error) {
        console.log(error.data);
    }
};

module.exports = tweet;
