const promptText = require("./prompts");
const tweet = require("./tweet");
const schedule = require("node-schedule");

const scheduledTask = schedule.scheduleJob("*/10 * * * *", () => {
    console.log("Task executed every minute:", new Date().toLocaleTimeString());
    tweet(promptText[0]);
});
