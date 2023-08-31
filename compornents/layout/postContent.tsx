import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import styles from '../styles/Home.module.css'

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
  return (
      <div className="card-body" key={`${post.id}_content`}>
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
          
          <div className="card-text mt-4 post-content contents-texts">
          {/* <div className="card-text post-content contents-texts" id={`${post.id}_contents`}> */}
            { post.recordMap && (
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
            )}
          </div>
      </div>
  );
}