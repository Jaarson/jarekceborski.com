import React from "react"
import Layout from "../components/layout"
import SocialMedia from "../components/social-media"
import SocialPortfolio from "../components/social-portfolio"
import Header from "../components/header"
import SEO from "../components/seo"
import { graphql, StaticQuery, useStaticQuery } from "gatsby"

import "../styles/styles.scss"
import "../styles/about.scss"

const HomePage = () => (
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
            work_section_title
            clients_title
            clients
            venture {
              name
              description
              status
              link {
                title
                url
                target
              }
            }
          }
        }
      }
    `}
    render={props => (
      <>
        <Header />
        <main itemscope itemtype="https://schema.org/Person">
          <section>
            <div class="hero-bio grid-12">
              <aside class="grid-aside">
                <h3 class="aside-whitebg">{props.wordpressPage.title}</h3>
              </aside>
              <div class="grid-main">
                <h1 itemprop="name">{props.wordpressPage.acf.header}</h1>
                <p
                  class="p-small"
                  itemprop="description"
                  dangerouslySetInnerHTML={{
                    __html: props.wordpressPage.acf.bio,
                  }}
                />
              </div>
            </div>
            <div class="hero-photo grid-12">
              <aside class="grid-aside meta-top">
                <div class="small-title meta-item">
                  {props.wordpressPage.acf.social_media_title}
                  <div>
                    <SocialMedia />
                  </div>
                </div>
                <div class="small-title meta-item">
                  {props.wordpressPage.acf.portfolio_title}
                  <div>
                    <SocialPortfolio />
                  </div>
                </div>
              </aside>
              <div class="grid-main">
                <div class="jc-image" style={{background: `url(` + props.wordpressPage.featured_media.source_url + `) no-repeat center center/cover`}}></div>
              </div>
            </div>
          </section>
          <section class="work">
      <div class="grid-12">
        <div class="grid-aside grid-aside-padding">
          <h3 class="aside-darkbg">{props.wordpressPage.acf.work_section_title}</h3>
          <br />
          <p class="small-title small-title-darkbg">{props.wordpressPage.acf.clients_title}</p>
          <p class="p-extra-small p-extra-small-darkbg">{props.wordpressPage.acf.clients}</p>
        </div>
        <div class="grid-main grid-9 grid-work">
          {props.wordpressPage.acf.venture.map(venture => (
            <>
            <div class="grid-9-item-4" key={venture.name}>
              <h3 class="venture-active">{venture.name}</h3>
              <p class="p-small venture-active">{venture.description}</p>
              {venture.link ? <a href={venture.link.url} class="work-links">{venture.link.title}</a> : ''}
              {venture.status}
            </div>

            <div class="grid-9-spacer-1"></div>
            </>
          ))}
        </div>
      </div>
    </section>
        </main>
        {props.wordpressPage.title}

        {props.wordpressPage.acf.header}
        <p
          class="p-small"
          itemprop="description"
          dangerouslySetInnerHTML={{ __html: props.wordpressPage.acf.bio }}
        />
        {props.wordpressPage.acf.venture.map(venture => (
          <div key={venture.name}>
            {venture.name} <br />
            {venture.description} <br />
            {venture.status}
          </div>
        ))}
      </>
    )}
  />
)

export default HomePage
