const promptText = require("./prompts");
const tweet = require("./tweet");
const schedule = require("node-schedule");

try {
    const scheduledTask = schedule.scheduleJob("*/5 * * * *", () => {
        console.log(
            "Task executed every minute:",
            new Date().toLocaleTimeString()
        );
        tweet(promptText[0]);
    });
} catch (error) {
    console.log(error);
}
