import { NotionRenderer } from 'react-notion-x'
import {getPosts, getPage} from '../../compornents/notion'
import { Post } from '../../compornents/notion/postType'

import { PostContent } from '../../compornents/layout/postContent'
import { NavContent } from '../../compornents/layout/navContent'

export default function PostDetail({ post }: {post: Post}) {
  if (!post) {
    return <div />
  }

  return (
    <>
      <NavContent />

      <div className="container main py-3">
        <PostContent post={post} />
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  try {
    const posts = await getPosts(process.env.NOTION_DATABASE_ID as string);
    return {
      paths: posts.map((post) => ({ params: { slug: post!.slug, id: post!.id } })),
      fallback: true,
    }
  } catch (error) {
    console.error('Error while getting static paths:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
}

export const getStaticProps = async (context:any) => {
  try {
		const { slug } = context.params;

		//// This APP data/[slug].tsx
		//const response = await fetch(`http://localhost:3000/data/${slug}`);
		//const data = await response.text();
		//const regex = /<pre>(.*?)<\/pre>/gs;
		//const match = regex.exec(data);
		//if (!match) {
		//	throw new Error('Post not found');
		//}
				
    const posts = await getPosts(process.env.NOTION_DATABASE_ID as string);
    let post:any = posts.find((p) => p!.slug === slug) ?? null;
    if (!post) throw new Error('Post not found');

    post.recordMap = await getPage(post.id);
		//post.recordMap = match[1];
    post = JSON.parse(JSON.stringify(post));
    post = post as Post;
		
    return {
      props: {
        post,
      },
      revalidate: 60 * 60 * 1,  // revalidate every 1 hour
    };
  } catch (error) {
    console.error('Error while getting static props:', error);
    return {
      notFound: true,
    };
  }
}