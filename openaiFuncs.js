const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const openaiCompletions = async (promptText) => {
    try {
        const gptResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: promptText,
                },
            ],
            temperature: 0.8,
            max_tokens: 64,
            top_p: 1,
        });
        return gptResponse;
    } catch (error) {
        console.log(error);
    }
};

// export const openaiDalle = () => {
// const image = await openai.images.generate({
//     model: "dall-e-3",
//     prompt: "A cute baby sea otter",
// });
// image_url = image.data;
// console.log(image_url);
// }

module.exports = { openaiCompletions };
