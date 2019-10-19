import { Link } from "gatsby"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import SocialIcon from '../components/social-icon'

const SocialMedia = () => {
  const data = useStaticQuery(graphql`
    {
      wordpressAcfOptions {
        options {
          social_media {
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
  return data.wordpressAcfOptions.options.social_media.map(item => (
    <SocialIcon href={item.url}>
      <img src={item.icon.source_url} alt={item.name} />
    </SocialIcon>
  ))
}

export default SocialMedia
