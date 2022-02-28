import { NotionRenderer } from 'react-notion-x'
import {getPosts, getPage} from '../../compornents/notion'
import { Post } from '../../compornents/notion/postType'

import { PostContent } from '../../compornents/layout/postContent'

export default function Post({ post }) {
  if (!post) {
    return <div />
  }

  return (
    <div className="container main">
      <PostContent post={post:Post} />
    </div>
  )
}

export const getStaticPaths = async () => {
  const posts = await getPosts(process.env.NOTION_DATABASE_ID as string)
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug, id: post.id } })),
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const posts = await getPosts(process.env.NOTION_DATABASE_ID as string);
  let post:Post = posts.find((p) => p.slug === slug);
  post.recordMap = await getPage(post.id);
  post = JSON.parse(JSON.stringify(post));

  return {
    props: {
      post,
    },
    revalidate: 1,
  }
}