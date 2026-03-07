import { XMLParser } from "fast-xml-parser";
import type { Episode } from "../types";

export const getRSSTitle = async (url: string) => {
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  const parser = new XMLParser();
  const data = parser.parse(await response.text());
  return data.rss.channel.title;
}

export const getRSSEpisodes = async (url: string) => {
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  const parser = new XMLParser({ ignoreAttributes: false});
  const data = parser.parse(await response.text());
  const episodes: Episode[] = [];
  for(var episode of data.rss.channel.item) {
    episodes.push({name: episode.title, id: episode["omny:clipId"], description: episode.description, link: episode["media:content"][0]["@_url"]})
  }
  return episodes;
}