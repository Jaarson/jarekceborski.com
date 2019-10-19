import React from "react"

import Layout from "../components/layout"
import SocialMedia from "../components/social-media"
import SocialPortfolio from "../components/social-portfolio"
import SEO from "../components/seo"

import { graphql, StaticQuery, useStaticQuery } from "gatsby"

const HomePage = () => (
  <Layout>
    <StaticQuery
      query={graphql`
        {
          wordpressPage(slug: { eq: "home" }) {
            title
            featured_media {
              source_url
            }
            acf {
              header
              bio
              social_media_title
              portfolio_title
              clients
              venture {
                name
                description
                status
              }
            }
          }
        }
      `}
      render={props => (
        <div>
          <h1>{props.wordpressPage.title}</h1>
          <SocialMedia />
          <SocialPortfolio />
          <p>{props.wordpressPage.acf.header}</p>
          <div
            dangerouslySetInnerHTML={{ __html: props.wordpressPage.acf.bio }}
          />
          {props.wordpressPage.acf.venture.map(venture => (
            <div>
              {venture.name} <br />
              {venture.description} <br />
              {venture.status}
            </div>
          ))}
        </div>
      )}
    />
  </Layout>
)

export default HomePage
