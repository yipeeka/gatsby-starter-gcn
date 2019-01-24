import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import CardList from '../components/CardList'
import Card from '../components/Card'
import Hero from '../components/Hero'
import Helmet from 'react-helmet'
import Container from '../components/Container'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO'
import config from '../utils/siteConfig'

const Index = ({ data, pageContext }) => {
  const posts = data.allContentfulPost.edges
  const { currentPage } = pageContext
  const heroImage = data.allContentfulImage.edges[0].node.image
  const subTitle = data.allContentfulImage.edges[0].node.subTitle
  const isFirstPage = currentPage === 1
  console.log(heroImage)

  return (
    <Layout>
      <SEO />
      {!isFirstPage && (
        <Helmet>
          <title>{`${config.siteTitle} - Page ${currentPage}`}</title>
        </Helmet>
      )}
      {isFirstPage && (
        <Hero title={config.siteTitle} subTitle={subTitle} image={heroImage} height={'50vh'} />
      )}
      <Container>
          <CardList>
            {posts.map(({ node: post }) => (
              <Card key={post.id} {...post} />
            ))}
          </CardList>
      </Container>
      <Pagination context={pageContext} />
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allContentfulPost(
      sort: { fields: [publishDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          id
          slug
          publishDate(formatString: "MMMM DD, YYYY")
          heroImage {
            title
            fluid(maxWidth: 1800) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
          body {
            childMarkdownRemark {
              html
              excerpt(pruneLength: 80)
            }
          }
        }
      }
    }
    allContentfulImage(
      filter: {title: {eq : "Home Hero" }}
    ) {
      edges {
        node {
          title
          subTitle
          image {
            title
            fluid(maxWidth: 1800) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  }
`

export default Index
