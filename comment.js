const Twit = require("twit");
const Sentiment = require("sentiment");
require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");

// Twitter API credentials
const client = new TwitterApi({
    appKey: process.env.API_KEY,
    appSecret: process.env.API_KEY_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

// Initialize Sentiment API
const sentiment = new Sentiment();

const replyToComments = async (pageUsername) => {
    console.log(await client.v2.me())
    // const abayomiganiyTimeline = await client.v2.userTimeline(pageUsername, {
    //     expansions: [
    //         "attachments.media_keys",
    //         "attachments.poll_ids",
    //         "referenced_tweets.id",
    //     ],
    //     "media.fields": ["url"],
    // });
    // console.log(abayomiganiyTimeline);
};

// Define a function to analyze sentiment and reply only if assistance is needed
// function replyToComments(pageUsername) {
//     // Get tweets from the specified page
//     T.get(
//         "statuses/user_timeline",
//         { screen_name: pageUsername, count: 1 },
//         (err, data, response) => {
//             if (!err) {
//                 // Get the ID of the latest tweet
//                 const tweetId = data[0].id_str;

//                 // Search for comments (replies) to the latest tweet
//                 T.get(
//                     "search/tweets",
//                     {
//                         q: `to:${pageUsername}`,
//                         since_id: tweetId,
//                         result_type: "recent",
//                     },
//                     (err, data, response) => {
//                         if (!err) {
//                             // Loop through the comments and reply only if assistance is needed
//                             data.statuses.forEach((comment) => {
//                                 const commentText = comment.text;

//                                 // Analyze the sentiment of the comment
//                                 const result = sentiment.analyze(commentText);
//                                 const sentimentScore = result.score;

//                                 // Reply only if sentiment indicates assistance is needed
//                                 if (sentimentScore < 0) {
//                                     const commenterUsername =
//                                         comment.user.screen_name;
//                                     const commentId = comment.id_str;

//                                     // Reply to the comment
//                                     T.post(
//                                         "statuses/update",
//                                         {
//                                             status: `@${commenterUsername} Thanks for your comment! It seems like you need assistance. How can we help?`,
//                                             in_reply_to_status_id: commentId,
//                                         },
//                                         (err, data, response) => {
//                                             if (!err) {
//                                                 console.log(
//                                                     `Replied to ${commenterUsername}`
//                                                 );
//                                             } else {
//                                                 console.error(
//                                                     `Error replying to ${commenterUsername}: ${err}`
//                                                 );
//                                             }
//                                         }
//                                     );
//                                 }
//                             });
//                         } else {
//                             console.error("Error searching for comments:", err);
//                         }
//                     }
//                 );
//             } else {
//                 console.error("Error getting tweets:", err);
//             }
//         }
//     );
// }

// Call the function with the username of the page you want to monitor
replyToComments("abayomiganiy");
