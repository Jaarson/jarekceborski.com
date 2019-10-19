import { Link } from "gatsby"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import SocialIcon from '../components/social-icon'

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
    <SocialIcon href={item.url}>
      <img src={item.icon.source_url} alt={item.name} />
    </SocialIcon>
  ))
}

export default SocialPortfolio
