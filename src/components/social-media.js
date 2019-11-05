import React from "react"
import { graphql, useStaticQuery } from "gatsby"

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
    <a href={item.url} className="ic-social" key={item.name}>
      <img src={item.icon.source_url} alt={item.name} />
    </a>
  ))
}

export default SocialMedia
