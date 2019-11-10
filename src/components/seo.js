/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title, wideScreen, canonical, isBlogpost, pageURL, pageImage }) {
  const data = useStaticQuery(
    graphql`
      {
        allWordpressSiteMetadata {
          edges {
            node {
              name
              description
            }
          }
        }

        wordpressAcfOptions {
          options {
            social_media {
              name
              user_name
            }
          }
        }
      }
    `
  )

  const metaDescription = description || data.allWordpressSiteMetadata.edges[0].node.description
  const metaType = isBlogpost ? 'article' : 'website'

  return (
    <>
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${data.allWordpressSiteMetadata.edges[0].node.name}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: metaType,
        },
        {
          property: `og:url`,
          content: pageURL,
        },
        {
          property: `og:image`,
          content: pageImage,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: data.wordpressAcfOptions.options.social_media.find(function(el) { return el.name === "Twitter"}).user_name,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
    <Helmet>
    <link rel="stylesheet" href="https://use.typekit.net/liu3fgy.css" />
    <link rel="stylesheet" href="/styles/prism.css" />
    {/* <script src="/scripts/prism.js" type="text/javascript" /> */}
    {/* {wideScreen ? <script src="/scripts/header-interaction.js" type="text/javascript" /> : ''} */}
    {canonical && <link rel="canonical" href={canonical} />}
    
    </Helmet>
    </>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  wideScreen: false,
  isBlogpost: false,
  canonical: ``,
  pageURL: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  wideScreen: PropTypes.bool,
  isBlogpost: PropTypes.bool,
  canonical: PropTypes.string,
  pageURL: PropTypes.string,
}

export default SEO