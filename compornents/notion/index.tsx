// Reference: https://github.com/steelydylan/notion-portfolio-site

import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";
import * as notionTypes from "notion-types";

const notion = new Client({
	auth: process.env.NOTION_SECRET_KEY,
});

const notionApi = new NotionAPI({
	authToken: process.env.TOKEN_V2,
});

import { Post, Hashtag } from "./postType";

// Query the Notion database with a custom filter
const queryDatabase = async (
	databaseId: string,
	customFilter?: any,
	page_size?: number,
	start_cursor?: any
) => {
	let defaultFilter = {
		property: "Published",
		checkbox: {
			equals: true,
		},
	};

	return await notion.databases.query({
		database_id: databaseId,
		page_size: page_size,
		start_cursor: start_cursor,
		filter: customFilter || defaultFilter,
		sorts: [
			{
				property: "Date",
				direction: "descending",
			},
		],
	});
};

// Process specific property types
const processProperty = (property: any, key: string) => {
	switch (property.type) {
		case "people":
			return property.people.map((p: any) => (p as any).name);
		case "rich_text":
			return property.rich_text[0]?.plain_text;
		case "files":
			return property.files[0].type === "external"
				? property.files[0].name
				: property.files[0].file?.url;
		case "title":
			return property.title[0]?.plain_text;
		case "checkbox":
			return property.checkbox;
		case "multi_select":
			return property.multi_select?.map((hashtag: any) => hashtag.name);
		case "date":
			return property.date?.start;
		default:
			return undefined;
	}
};

// Process each post
const processPost = (result: any) => {
	const d = result.properties;

	if (d.Published.checkbox == false) {
		return undefined;
	}

	const item: any = {
		id: result.id,
		url: result.url,
		slug: "",
		title: "",
		date: "",
		edited: result.last_edited_time,
		published: false,
		hashtags: [],
		recordMap: {},
	};

	for (const key in d) {
		item[key.toLowerCase()] = processProperty(d[key], key);
	}

	// Handle empty slug
	if (!d.Slug.rich_text.length) {
		let properties = {
			Slug: {
				rich_text: [
					{
						type: "text",
						text: {
							content: result.url
								.split("/")
								.slice(-1)[0]
								.replace(/-/g, "_"),
						},
					},
				],
			},
		};
		updateProperties(result.id, properties);
	}

	// Handle empty date
	const tzoffset = new Date().getTimezoneOffset() * 60000;
	if (!d.Date.date) {
		let localISOTime =
			new Date(Date.now() - tzoffset).toISOString().slice(0, -1) + "-08:00";
		let properties = {
			Date: {
				date: {
					start: localISOTime,
				},
			},
		};
		updateProperties(result.id, properties);
		item.date = localISOTime;
	}

	if (item.date.length < 10) {
		item.date = item.date + "T16:00:00.000-08:00";
	}
	item.date = new Date(item.date);

	return item as Post;
};

export const getPosts = async (
	databaseId: string,
	page_size?: any,
	start_cursor?: any
) => {
	const response = await queryDatabase(
		databaseId,
		undefined,
		page_size,
		start_cursor
	);
	let posts = response.results.map(processPost);
	posts = posts.filter((post): post is Post => typeof post !== "undefined");
	posts.sort((a, b) => b!.date - a!.date);
	return posts;
};

export const getPost = async (databaseId: string, slug: string) => {
	const filterBySlug = {
		and: [
			{
				property: "Published",
				checkbox: {
					equals: true,
				},
			},
			{
				property: "Slug",
				rich_text: {
					equals: slug,
				},
			},
		],
	};

	const response = await queryDatabase(databaseId, filterBySlug, 1); // page_size is 1 because we expect a unique slug
	const posts = response.results.map(processPost);
	return posts[0] || null; // Return the first post or null if not found
};

// Get page detail
export const notionAPIgetPage = async (pageId: string) => {
	const page = await notionApi.getPage(pageId);
	return page;
};

export const getPage = async (slug: string) => {
	const response = await fetch(`http://localhost:3000/data/${slug}`);
	const data = await response.text();
	const regex = /<pre>(.*?)<\/pre>/gs;
	const match = regex.exec(data);
	if (!match) {
		throw new Error("Post not found");
	}
	const jsonString = match[1].replace(/&quot;/g, '"'); // Convert &quot; to "
	const parsedData: notionTypes.ExtendedRecordMap = JSON.parse(jsonString);
	return parsedData;
};

export const updateProperties = async (pageId: string, properties: any) => {
	const response = await notion.pages.update({
		page_id: pageId,
		properties,
	});
};

export const getHashtags = async () => {
	const response = await notion.databases.query({
		database_id: process.env.NOTION_DATABASE_ID ?? "",
	});
	const { results } = response as any;

	let hashtags: Hashtag[] = [];
	for (const result of results) {
		const d = result.properties! as any;
		for (const select of d.Hashtags.multi_select) {
			if (!hashtags.filter((hashtag) => hashtag.name == select.name).length) {
				hashtags.push({ name: select.name, color: select.color, count: 1 });
			} else {
				hashtags.filter((hashtag) => hashtag.name == select.name)[0].count += 1;
			}
		}
	}
	hashtags = hashtags.sort((a, b) => b.count - a.count);
	return hashtags;
};
