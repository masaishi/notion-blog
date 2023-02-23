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
  const posts = await getPosts(process.env.NOTION_DATABASE_ID as string)
  return {
    paths: posts.map((post) => ({ params: { slug: post!.slug, id: post!.id } })),
    fallback: true,
  }
}

export const getStaticProps = async (context:any) => {
  const { slug } = context.params;
  const posts = await getPosts(process.env.NOTION_DATABASE_ID as string);
  let post:any = posts.find((p) => p!.slug === slug) ?? null;
  post.recordMap = await getPage(post.id);
  post = JSON.parse(JSON.stringify(post));
  post = post as Post;
  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 1,
  }
}