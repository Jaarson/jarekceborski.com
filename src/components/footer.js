import { Link } from "gatsby"
import PropTypes from "prop-types"
import NewsletterForm from "../components/newsletter-form"
import SocialMedia from "../components/social-media"
import SocialPortfolio from "../components/social-portfolio"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const Footer = ({ wideScreen }) => {
  const data = useStaticQuery(graphql`
  {
    wordpressAcfOptions {
      options {
        newsletter_title
        newsletter_success_message
        newsletter_description
        email_field_description
        copyrights_note
      }
    }
  }
  `)

  return (
    <>
    <footer className={wideScreen ? 'widescreen' : ''}>
    <div className={wideScreen ? 'grid-12 grid-12-widescreen' : 'grid-12'}>
      <div className={wideScreen ? 'grid-aside grid-aside-widescreen' : 'grid-aside'}></div>
      <div className={wideScreen ? 'grid-main grid-main-widescreen grid-9 grid-newsletter' : 'grid-main grid-9 grid-newsletter'}> 
        <div className="grid-9-item-4">
          <h3>{data.wordpressAcfOptions.options.newsletter_title}</h3>
          <p className="p-small">{data.wordpressAcfOptions.options.newsletter_description}</p>
        </div>
        <div className="grid-9-item-4">
          <NewsletterForm newsletter_success_message={data.wordpressAcfOptions.options.newsletter_success_message} />
          <p className="p-extra-small">{data.wordpressAcfOptions.options.email_field_description}</p>
        </div>
      </div>
    </div>

    <div className={wideScreen ? 'grid-12 grid-12-widescreen' : 'grid-12'}>
      <div className={wideScreen ? 'grid-aside grid-aside-widescreen' : 'grid-aside'}></div>
      <div className={wideScreen ? 'grid-main grid-main-widescreen grid-9 grid-border-top' : 'grid-main grid-9 grid-border-top'}>
        <div className="grid-9-item-4">
          <p className="p-extra-small">© {new Date().getFullYear()}, {data.wordpressAcfOptions.options.copyrights_note} • <Link to='/privacy-terms'>Privacy &amp; Terms</Link></p>
        </div>
        <div className="grid-9-item-4 footer-social">
        <SocialMedia />
        <SocialPortfolio />
        </div>
      </div>
    </div>
  </footer>
    </>
  )
}

Footer.propTypes = {
  wideScreen: PropTypes.bool,
}

Footer.defaultProps = {
  wideScreen: false,
}

export default Footer