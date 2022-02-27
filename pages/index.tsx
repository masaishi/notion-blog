import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from '../styles/Home.module.css'

import { NotionRenderer } from 'react-notion-x'
import {getPosts, getPage} from '../compornents/notion'

import {PostContent} from '../compornents/layout/postContent'

export const getStaticProps = async () => {
  try {
    let posts = await getPosts(process.env.NOTION_DATABASE_ID);
    
    posts = posts.slice(0, 7);
    for(let post of posts) {
      post.recordMap = await getPage(post.id)
    }
    
    posts = JSON.parse(JSON.stringify(posts));
    const props = {posts: posts};

    return { props, revalidate: 60 * 60 * 12 }
  } catch (err) {
    console.error('page error', err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export default function NotionDomainPage({posts}) {
  const router = useRouter();
  let { hashtags } = router.query
  hashtags = hashtags ? hashtags.split(',') : []
  console.log(hashtags);
  
  let show_posts = posts
  if(hashtags){
    for(const hashtag of hashtags){
      show_posts = show_posts.filter(post => post.hashtags.includes(hashtag));
    }
  }
  
  return (
    <div>
      {/* <button id="reverse-button" onClick={reverse} hidden>reverse-button</button> */}
      <div className="container main">
        {/* <h5>{reverseState ? "新しい順" : "古い順"}</h5> */}
        <h5>新しい順</h5>
        {show_posts.map((post) => (
          
          <div className="card mt-5" key={post.id}>
            <PostContent post={post} />
          </div>
          
        ))}
      </div>
    </div>
  )
}