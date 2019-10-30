import React from "react"
import Layout from "../components/layout"
import SocialMedia from "../components/social-media"
import SocialPortfolio from "../components/social-portfolio"
import Header from "../components/header"
import BlogListing from "../components/blog-listing"
import Footer from "../components/footer"
import SEO from "../components/seo"
import { graphql, StaticQuery, useStaticQuery } from "gatsby"

import "../styles/styles.scss"
import "../styles/about.scss"

var ventureEvenItem = false

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
            blog_section_title
            blogposts_number
          }
        }
      }
    `}
    render={props => (
      <>
        <Header />
        <main itemScope itemType="https://schema.org/Person">
          <section>
            <div className="hero-bio grid-12">
              <aside className="grid-aside">
                <h3 className="aside-whitebg">{props.wordpressPage.title}</h3>
              </aside>
              <div className="grid-main">
                <h1 itemProp="name">{props.wordpressPage.acf.header}</h1>
                <p
                  className="p-small"
                  itemProp="description"
                  dangerouslySetInnerHTML={{
                    __html: props.wordpressPage.acf.bio,
                  }}
                />
              </div>
            </div>
            <div className="hero-photo grid-12">
              <aside className="grid-aside meta-top">
                <div className="small-title meta-item">
                  {props.wordpressPage.acf.social_media_title}
                  <div>
                    <SocialMedia />
                  </div>
                </div>
                <div className="small-title meta-item">
                  {props.wordpressPage.acf.portfolio_title}
                  <div>
                    <SocialPortfolio />
                  </div>
                </div>
              </aside>
              <div className="grid-main">
                <div
                  className="jc-image"
                  style={{
                    background:
                      `url(` +
                      props.wordpressPage.featured_media.source_url +
                      `) no-repeat center center/cover`,
                  }}
                ></div>
              </div>
            </div>
          </section>
          <section className="work">
            <div className="grid-12">
              <div className="grid-aside grid-aside-padding">
                <h3 className="aside-darkbg">
                  {props.wordpressPage.acf.work_section_title}
                </h3>
                <br />
                <p className="small-title small-title-darkbg">
                  {props.wordpressPage.acf.clients_title}
                </p>
                <p className="p-extra-small p-extra-small-darkbg">
                  {props.wordpressPage.acf.clients}
                </p>
              </div>
              <div className="grid-main grid-9 grid-work">
                {props.wordpressPage.acf.venture.map(venture => (
                  <React.Fragment key={venture.name}>
                    <div
                      className="grid-9-item-4"
                      key={venture.name + "-venture"}
                    >
                      {venture.status === "Active" ? (
                        <h3 className="venture-active">{venture.name}</h3>
                      ) : (
                        <h3 className="venture-inactive">{venture.name}</h3>
                      )}
                      {venture.status === "Active" ? (
                        <p className="p-small venture-active">
                          {venture.description}
                        </p>
                      ) : (
                        <p className="p-small venture-inactive">
                          {venture.description}
                        </p>
                      )}
                      {venture.link ? (
                        <a href={venture.link.url} className="work-links">
                          {venture.link.title}
                          <svg
                            width="16px"
                            height="16px"
                            viewBox="0 0 16 16"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g
                              id="link-arrow-white"
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <g id="small-right">
                                <rect
                                  id="Rectangle"
                                  x="0"
                                  y="0"
                                  width="16"
                                  height="16"
                                ></rect>
                                <g
                                  id="Group"
                                  transform="translate(5.000000, 2.000000)"
                                  stroke="#FFFFFF"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline
                                    id="Path"
                                    points="0.5 0.5 6 6 0.5 11.5"
                                  ></polyline>
                                </g>
                              </g>
                            </g>
                          </svg>
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                    {ventureEvenItem ? (
                      ""
                    ) : (
                      <div
                        className="grid-9-spacer-1"
                        key={venture.name + "-spacer"}
                      ></div>
                    )}
                    {(ventureEvenItem = !ventureEvenItem)}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>
          <section
            className="blog"
            itemScope
            itemType="http://schema.org/BlogPosting"
          >
            <BlogListing title={props.wordpressPage.acf.blog_section_title} numberOfBlogposts={parseInt(props.wordpressPage.acf.blogposts_number, 10)}/>
          </section>
        </main>
        <Footer />
      </>
    )}
  />
)

export default HomePage
