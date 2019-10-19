import { Link } from "gatsby"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

const SocialPortfolio = () => {
  const data = useStaticQuery(graphql`
    {
      wordpressAcfOptions {
        options {
          social_portfolio {
            name
            url
            icon {
              source_url
            }
          }
        }
      }
    }
  `)
  return data.wordpressAcfOptions.options.social_portfolio.map(item => (
    <a href={item.url} className="ic-social" key={item.name}>
      <img src={item.icon.source_url} alt={item.name} />
    </a>
  ))
}

export default SocialPortfolio
