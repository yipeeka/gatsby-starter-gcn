import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Container from '../components/Container'
import PageBody from '../components/PageBody'
import TagList from '../components/TagList'
import PostLinks from '../components/PostLinks'
import PostDate from '../components/PostDate'
import SEO from '../components/SEO'
import styled from 'styled-components'

import { DiscussionEmbed } from 'disqus-react'
import { 
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton, 
  
  FacebookIcon,
  TwitterIcon,
  EmailIcon, 
} from 'react-share'

const Comment = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.sizes.maxWidthCentered};
`

const Share = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.sizes.maxWidthCentered};
  display: flex;
  margin-bottom: 2em;
`

const ShareButton = styled.div`
  cursor:pointer;
  margin-right: 0.5em
`

const PostTemplate = ({ data, pageContext }) => {
  const {
    title,
    slug,
    heroImage,
    body,
    publishDate,
    tags,
  } = data.contentfulPost
  const postNode = data.contentfulPost

  const previous = pageContext.prev
  const next = pageContext.next

  const disqusShortname = "yuanmingju";
  const disqusConfig = {
    identifier: slug,
    title: title,
  };

  return (
    <Layout>
      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO pagePath={slug} postNode={postNode} postSEO />

      <Hero title={title} image={heroImage} height={'50vh'} />

      <Container>
        {tags && <TagList tags={tags} />}
        <PostDate date={publishDate} />
        <PageBody body={body} />
        <Share>
          <ShareButton>
          <FacebookShareButton
            url={slug}
            quote={title}
            className="share-button">
            <FacebookIcon
              size={32}
              round />
          </FacebookShareButton>
          </ShareButton>
          <ShareButton>
          <TwitterShareButton
            url={slug}
            title={title}
            className="share-button">
            <TwitterIcon
              size={32}
              round />
          </TwitterShareButton>
          </ShareButton>
          <ShareButton>
          <EmailShareButton
            url={slug}
            subject={title}
            body="body"
            className="share-button">
            <EmailIcon
              size={32}
              round />
          </EmailShareButton>
          </ShareButton>
        </Share>
      </Container>
      <PostLinks previous={previous} next={next} />
      <Container>
        <Comment>
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </Comment>
      </Container>  
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      title
      slug
      metaDescription {
        internal {
          content
        }
      }
      publishDate(formatString: "MMMM DD, YYYY")
      publishDateISO: publishDate(formatString: "YYYY-MM-DD")
      tags {
        title
        id
        slug
      }
      heroImage {
        title
        fluid(maxWidth: 1800) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
        ogimg: resize(width: 1800) {
          src
          width
          height
        }
      }
      body {
        childMarkdownRemark {
          html
          excerpt(pruneLength: 320)
        }
      }
    }
  }
`

export default PostTemplate
