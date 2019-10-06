import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { graphql, StaticQuery } from "gatsby"

const HomePage = () => (
  <Layout>
    <StaticQuery
      query={graphql`
        {
          wordpressPage(slug: { eq: "home" }) {
            title
            content
          }
        }
      `}
      render={props => (
        <div>
          <h1>{props.wordpressPage.title}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: props.wordpressPage.content }}
          />
        </div>
      )}
    />
  </Layout>
)

export default HomePage
