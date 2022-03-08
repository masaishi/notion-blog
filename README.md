This is code of [my blog](https://blog.masaishi.net/)


I wrote a blog post explaining this code.
[How I developed this blog (Next.js and notion)](https://blog.masaishi.net/posts/How_I_developed_this_blog_Next_js_and_notion_a115cba1b20c4f6ca9d0001719f793f7)

<br />

This blog is really simple. Using **[compornents/notion/index.tsx](https://github.com/masaishi/notion-blog/blob/main/compornents/notion/index.tsx)** for get data from notion, then reander at [pages/index.tsx](https://github.com/masaishi/notion-blog/blob/main/pages/index.tsx) and [pages/posts/[slug].tsx](https://github.com/masaishi/notion-blog/blob/main/pages/posts/%5Bslug%5D.tsx).

### **[compornents/notion/index.tsx](https://github.com/masaishi/notion-blog/blob/main/compornents/notion/index.tsx)**

This code has some functions which get data from notion by using [Notion API](https://developers.notion.com/) and [notion-client](https://github.com/NotionX/react-notion-x/tree/master/packages/notion-client) which is provided to get page content for React Notion X render.


This page tells me how to use Notion API for Next.js.
[Notion APIで自分のポートフォリオサイトを作ってみた](https://zenn.dev/steelydylan/articles/portfolio-with-notion-api)

This code is described by the upper article. This code which makes a portfolio with next.js and the notion is really helpful.

[https://github.com/steelydylan/notion-portfolio-site](https://github.com/steelydylan/notion-portfolio-site)

This code doesn’t use React Notion X, but this code tells me how to get data from notion database table.