import { client } from "./client";
import {
  getAllDestinationsQuery,
  getDestinationBySlugQuery,
  getFeaturedDestinationsQuery,
  getRecentPostsQuery,
  getPostBySlugQuery,
} from "./queries";

export async function getAllDestinations() {
  return await client.fetch(getAllDestinationsQuery);
}

export async function getDestinationBySlug(slug: string) {
  return await client.fetch(getDestinationBySlugQuery, { slug });
}

export async function getFeaturedDestinations() {
  return await client.fetch(getFeaturedDestinationsQuery);
}

export async function getRecentPosts() {
  return await client.fetch(getRecentPostsQuery);
}

export async function getPostBySlug(slug: string) {
  return await client.fetch(getPostBySlugQuery, { slug });
}
