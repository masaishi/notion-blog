import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import {getPosts, getPage, getHashtags} from '../compornents/notion'
import { Post, Hashtag } from '../compornents/notion/postType'

import {PostContent} from '../compornents/layout/postContent'
import { NavContent } from '../compornents/layout/navContent'

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

export const getStaticProps = async () => {
  try {
    let posts = await getPosts(process.env.NOTION_DATABASE_ID ?? '');

		// Load only first 5 posts
    for(let i = 0; i < 5; i++){
			let post = posts[i];
			if(!post) break;
			try {
				post!.recordMap = await getPage(post!.slug);
			} catch (err) {
				console.log('\n\n\n\nGet page error:', err, '\n\n\n\n')
			}
    }

    // Hashtag selections
    let hashtag_list = await getHashtags();
    
    let props = {posts: posts, hashtag_list: hashtag_list};
    props = JSON.parse(JSON.stringify(props));
    
    return { props, revalidate: 60 * 60 * 1 }
  } catch (err) {
    console.log('Page error', err)
    return { props: { posts: [], hashtag_list: [] } }
  }
}

export default function NotionDomainPage({posts, hashtag_list}: {posts: Post[], hashtag_list: Hashtag[]}) {
  const router = useRouter();
  let { hashtags } = router.query;
  
  let q_hashtags:string[] = [];
  if(hashtags && typeof hashtags === 'string'){
    q_hashtags = hashtags.split(',');
  }

  let show_posts = posts
  if(q_hashtags.length){
    for(const hashtag of q_hashtags){
      show_posts = show_posts.filter(post => post.hashtags.includes(hashtag));
    }
  }

  const hashtagChange = (e:any) => {
    const {name, checked} = e.target;

    if(q_hashtags){
      if(checked){
        q_hashtags!.push(name);
      } else {
        q_hashtags = q_hashtags!.filter((hashtag:string) => hashtag !== name);
      }

      router.push({
        pathname: '/',
        query: { hashtags: q_hashtags.join(',')  },
      });
    }

    if(checked){
      q_hashtags!.push(name);
    } else {
      q_hashtags = q_hashtags!.filter((hashtag:string) => hashtag !== name);
    }

    router.push({
      pathname: '/',
      query: { hashtags: q_hashtags.join(',')  },
    });
  }
  

  return (
    <div className="notion-page">
      <NavContent />

      {/* <button id="reverse-button" onClick={reverse} hidden>reverse-button</button> */}
      <div className="container main">
        <div className="mt-1 accordion card mb-3" id="selectHashtags">
          <div id="selections" className="accordion-collapse collapse show" aria-labelledby="selections" data-bs-parent="#selections">
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

        {/* <h5>{reverseState ? "新しい順" : "古い順"}</h5> */}
        <h5 className='mt-5'>Newest</h5>
        {show_posts.map((post:Post) => (
					post.recordMap && (
						<div className="card mb-5" key={post.id}>
							<PostContent post={post} />
						</div>
					)
        ))}
      </div>
    </div>
  )
}