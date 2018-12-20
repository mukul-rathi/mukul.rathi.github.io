import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import styles from '../../css/blog-post.module.css'
import { Helmet } from "react-helmet"
import { DiscussionEmbed } from 'disqus-react';
import Img from 'gatsby-image'
import ShareBar from "../components/share-bar";
require("katex/dist/katex.min.css")
require("prismjs/themes/prism.css")


function formatDate(date){
  let dateFormat = require('dateformat');
  return dateFormat(date, "dS mmmm yyyy");
  
}


 const BlogPost = ({ data, pathContext }) => {

  const post = data.markdownRemark;
  const disqusShortname = "https-mukul-rathi-github-io";
  const disqusConfig = {
    identifier: post.id,
    title: post.frontmatter.title,
  };
  const { nextPost, prevPost} = pathContext;
  return (
    <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{post.frontmatter.title}</title>

        </Helmet>
        
        <div className={styles.blogPost}>
          <h1 className={styles.title}>
          {post.frontmatter.title} </h1>
          <h2 className={styles.date}> {formatDate(post.frontmatter.date)}</h2>
          <Img fluid={post.frontmatter.image.childImageSharp.fluid}/>
          <ShareBar className={styles.shareBar}/>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.html }}/>
        
          <div className={styles.pageNavigation}>
            {prevPost &&  <Link className={styles.pageNavButton} to={prevPost.fields.slug}>
                {prevPost.frontmatter.title}
            </Link> }

          {nextPost &&
            <Link to={nextPost.fields.slug}>
              {nextPost.frontmatter.title}
            </Link>}
            </div>

           <div className= {styles.comments}>

            <DiscussionEmbed shortname={disqusShortname} config=  {disqusConfig} />
            </div>
          </div>

    </Layout>
  )
}

export default BlogPost;

//can use slug from context in gatsby-node as a variable in GraphQl
// $slug 
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      fields{
        slug
      }
      frontmatter {
        title
        date
        series
        part
        image{
          childImageSharp{
              fluid(maxWidth: 630) {
                  ...GatsbyImageSharpFluid
              }
          }
      }
      excerpt
      }
    }
  }
`