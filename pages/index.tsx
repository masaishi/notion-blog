import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from '../styles/Home.module.css'

import { NotionRenderer } from 'react-notion-x'

import {getPosts, getPage, getHashtags} from '../compornents/notion'
import { Post, Hashtag } from '../compornents/notion/postType'

import {PostContent} from '../compornents/layout/postContent'

export const getStaticProps = async () => {
  try {
    let posts = await getPosts(process.env.NOTION_DATABASE_ID ?? '');
    
    // posts = posts.slice(0, 7);
    for(let post of posts) {
      post!.recordMap = await getPage(post!.id);
    }

    // Hashtag selections
    let hashtag_list = await getHashtags();
    
    let props = {posts: posts, hashtag_list: hashtag_list};
    props = JSON.parse(JSON.stringify(props));

    return { props, revalidate: 60 * 60 * 12 }
  } catch (err) {
    console.error('page error', err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export default function NotionDomainPage({posts, hashtag_list}: {posts: Post[], hashtag_list: Hashtag[]}) {
  const router = useRouter();
  // query hashtags
  let { hashtags } = router.query;
  if(hashtags && typeof hashtags === 'string'){
    hashtags = hashtags.split(',');
  }
  
  let show_posts = posts
  if(hashtags){
    for(const hashtag of hashtags){
      show_posts = show_posts.filter(post => post.hashtags.includes(hashtag));
    }
  }

  const hashtagChange = (e:any) => {
    const {name, checked} = e.target;
    if(typeof hashtags === 'object'){
      if(checked){
        hashtags?.push(name);
      } else {
        hashtags = hashtags!.filter((hashtag:string) => hashtag !== name);
      }

      router.push({
        pathname: '/',
        query: { hashtags: hashtags.join(',')  },
      });
    }
  }
  
  return (
    <div>
      <div className="mt-1 accordion" id="selectHashtags">
        <div id="selections" className="accordion-collapse collapse" aria-labelledby="selections" data-bs-parent="#selections">
          <div className="accordion-body">
            {hashtag_list.map((hashtag) => (
              <div className="form-check mb-2" key={`hashtag-${hashtag.name}-field`}>  
                <input className="form-check-input" type="checkbox" id={`hashtag-${hashtag.name}`} name={hashtag.name} onChange={hashtagChange} />
                <label className={`form-check-label notion-${hashtag.color}_background`} htmlFor={`hashtag-${hashtag.name}`} >
                  #{hashtag.name}: {hashtag.count}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <button id="reverse-button" onClick={reverse} hidden>reverse-button</button> */}
      <div className="container main">
        {/* <h5>{reverseState ? "新しい順" : "古い順"}</h5> */}
        <h5>新しい順</h5>
        {show_posts.map((post:Post) => (
          <div className="card mt-5" key={post.id}>
            <PostContent post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}