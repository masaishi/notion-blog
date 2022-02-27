// Reference: https://github.com/steelydylan/notion-portfolio-site

import { Client } from '@notionhq/client'
import { NotionAPI } from 'notion-client'

const notion = new Client({
	auth: process.env.NOTION_SECRET_KEY,
})

const notionApi = new NotionAPI({
	authToken: process.env.TOKEN_V2,
});

type Post = {
  id: string
  url: string
  slug: string
  title: string
  date: string
	edited: string
  published: boolean
  hashtags: string[]
}


export const getPosts = async ( databaseId: string) => {
	const response = await notion.databases.query({
		database_id: databaseId,
		// filter: {
		// 	property: 'Published',
		// 	checkbox: {
		// 		equals: true,
		// 	},
		// }
	})
	const { results } = response

	let posts = results.map((result) => {
		const d = result.properties
		
		// Add slug if it is empty.
		if(!d.Slug.rich_text.length){
			let properties = {
				"Slug": {
					"rich_text": [
						{
							"type": "text",
							"text": {
								"content": result.url.split('/').slice(-1)[0].replace(/-/g, '_'),
							}
						}
					]
				}
			};		
			updateProperties(result.id, properties);
		}
		
		if(d.Published.checkbox == false) {
			return undefined
		}

		const item: Post = {
			id: result.id,
			url: result.url,
			slug: '',
			title: '',
			date: '',
			edited: result.last_edited_time,
			published: false,
			hashtags: [],
		}
		
		Object.keys(d).forEach((key) => {
			const property = d[key]
			if (property.type === 'people') {
				item[key.toLowerCase()] = property.people.map((p) => (p as any).name)
			} else if (property.type === 'rich_text') {
				item[key.toLowerCase()] = property.rich_text[0]?.plain_text
			} else if (property.type === 'files') {
				if (property.files[0].type === 'external') {
					item[key.toLowerCase()] = property.files[0].name
				} else {
					item[key.toLowerCase()] = property.files[0].file?.url
				}
			} else if (property.type === 'title') {
				item[key.toLowerCase()] = property.title[0]?.plain_text
			} else if (property.type === 'checkbox') {
				item[key.toLowerCase()] = property.checkbox
			} else if (property.type === 'multi_select') {
				item[key.toLowerCase()] = property.multi_select?.map((hashtag) => hashtag.name)
			} else if (property.type === 'date') {
				item[key.toLowerCase()] = property.date?.start
			}
		})

		// Add date if it is empty.
		const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
		if(!d.Date.date) {
    	let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
			localISOTime += '-08:00';

			let properties = {
				"Date": {
					"date": {
						"start": localISOTime,
					}
				}
			};
			updateProperties(result.id, properties);

			item.date = localISOTime;
		}

		// Add 4:00PM to date only.
		if(item.date.length < 10){
			item.date = item.date + 'T16:00:00.000-08:00'
		}
		item.date = new Date(item.date)

		return item
	})

	posts = posts.filter(function(post) {
		return (post);
	});

	// Sort database by date.
	posts.sort((a, b) => b.date - a.date);

	return posts
}

// Get page detail
export const getPage = async (pageId: string) => {
  const page = await notionApi.getPage(pageId);
  return page
}

export const updateProperties = async (pageId: string, properties: any) => {
	const response = await notion.pages.update({
    page_id: pageId,
    properties,
  });
}

