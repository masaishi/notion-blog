import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import * as notionTypes from "notion-types";

import { NotionRenderer } from 'react-notion-x'
const Code: any = dynamic<any>(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
)

const Collection = dynamic<any>(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)

import TweetEmbed from 'react-tweet-embed'
const Tweet = ({ id }: { id: string }) => {
  return <TweetEmbed tweetId={id} />
}

import { Post } from '../notion/postType'

export const PostContent = ({post}:{post:Post}) => {
	// After user scroll and distance to this post is less than 100px, load post.recordMap
	const [isLoad, setIsLoad] = useState(false);
	const [recordMap, setRecordMap] = useState<notionTypes.ExtendedRecordMap | null>(null);

	useEffect(() => {
		const handleScroll = () => {
			const distance = document.getElementById(`${post.id}_content`)?.getBoundingClientRect().top! - window.innerHeight;
			if(distance! < 200) setIsLoad(true);
		}
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		}
	}, []);

	useEffect(() => {
		if(isLoad && Object.keys(post.recordMap).length === 0){
			(async () => {
				try {
					const response = await fetch(`https://blog.masaishi.net/data/${post.slug}`);
					const data = await response.text();
					const regex = /<pre>(.*?)<\/pre>/gs;
					const match = regex.exec(data);
					if (!match) {
						throw new Error("Post not found");
					}
					const jsonString = match[1].replace(/&quot;/g, '"'); // Convert &quot; to "
					const parsedData: notionTypes.ExtendedRecordMap = JSON.parse(jsonString);
					
					setRecordMap(parsedData);
				} catch (err) {
					console.log('Get page error:', err)
				}
			})();
		}
	}, [isLoad]);

  return (
      <div className="card-body" id={`${post.id}_content`} key={`${post.id}_content`}>
          <div className='notion light-mode notion-page notion-block'>
              <div className="card-title d-flex align-items-center">
                  <div className="profile align-items-center">
                      <Link
                          href={`/posts/${post.slug}`}
                          className="h2 mb-0 notion-link"
                          id={`${post.id}_title`}>
                          {post.title}
                      </Link>
                  </div>
              </div>
              <h6 className="card-subtitle mb-2 text-muted" id={`${post.id}_published_at`}>posted_at:&ensp;{new Date(post.date ?? '').toLocaleString()}</h6>
              <h6 className="card-subtitle mb-2 text-muted" id={`${post.id}_edited_at`}>edited_at: &ensp;{new Date(post.edited).toLocaleString()}</h6>
              <div className="d-flex">
                  {post.hashtags?.map((hashtag) => {
                      return (
                          <div key={`${post.id}_${hashtag}`} className="me-3">
                              <Link href={`/?hashtags=${hashtag}`} legacyBehavior>
                                  <p className="h6 mb-0 notion-link">#{hashtag}</p>
                              </Link>
                          </div>
                      );
                  })}
              </div>
          </div>
          
					{post.recordMap && Object.keys(post.recordMap).length > 0 && (
						<div className="card-text mt-4 post-content contents-texts">
								<NotionRenderer
										recordMap={post.recordMap}
										fullPage={false}
										darkMode={false}
										components={{
												Code,
												Collection,
												Tweet,
										}}
								/>
						</div>
					)}
					{!post.recordMap && isLoad && recordMap && Object.keys(recordMap).length > 0 && (
						<div className="card-text mt-4 post-content contents-texts">
								<NotionRenderer
										recordMap={recordMap}
										fullPage={false}
										darkMode={false}
										components={{
												Code,
												Collection,
												Tweet,
										}}
								/>
						</div>
					)}
      </div>
  );
}