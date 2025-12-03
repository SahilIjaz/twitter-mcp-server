import { config } from "dotenv";
import { TwitterApi } from "twitter-api-v2";
config();

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

export async function createPost(text) {
  try {
    const newPost = await twitterClient.v2.tweet({ text });

    return {
      content: [
        {
          type: "text",
          text: `Successfully tweeted: "${text}"\nTweet ID: ${newPost.data.id}\nURL: https://twitter.com/user/status/${newPost.data.id}`,
        },
      ],
    };
  } catch (error) {
    console.error("Error posting tweet:", error);
    return {
      content: [
        {
          type: "text",
          text: `Failed to post tweet: ${error.message || error}`,
        },
      ],
      isError: true,
    };
  }
}
