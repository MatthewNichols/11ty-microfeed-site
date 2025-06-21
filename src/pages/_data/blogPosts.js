/**
 * Reads an RSS feed from the Cirdia microfeed instance which we use as a blog publishing platform
 *  and returns a list of blog posts as JSON to use in the blog page 
 */
import axios from "axios";

const feedUrl = process.env.MICROFEED_JSON_URL;

async function readFeed(url) {
  try {
    const response = await axios.get(url);
    const data = response.data;
    // console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error(error);
  }
}

function parseFeed(feed) {
const items = feed.items.map((post) => {
  return {
    ... post,
  }
  });

  return items;
}


export default async function () {
  const feed = await readFeed(feedUrl);
  const parsedReults = parseFeed(feed);
  // console.log(parsedReults);
  return parsedReults;
}