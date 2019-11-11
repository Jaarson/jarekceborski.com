import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import parse from "html-react-parser"
import Header from "../components/header"
import Footer from "../components/footer"
import Icon from "../components/icon"
import SEO from "../components/seo"
import "../styles/styles.scss"

var textColor
var bgColor
var themedPost = false

function hexToRgbA(hex, opacity) {
  var c
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("")
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = "0x" + c.join("")
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      "," +
      opacity +
      ")"
    )
  }
  throw new Error("Bad Hex")
}

function hexToLightness(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  var r = parseInt(result[1], 16)
  var g = parseInt(result[2], 16)
  var b = parseInt(result[3], 16)
  r /= 255
  g /= 255
  b /= 255
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  var h,
    s,
    l = (max + min) / 2
  if (max === min) {
    h = s = 0
  } else {
    var d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  return l
}

const Post = ({ data, location }) => {
  if (
    data.allWordpressPost.edges[0].node.acf.text_color &&
    data.allWordpressPost.edges[0].node.acf.background_color
  ) {
    themedPost = true
  }
  textColor = data.allWordpressPost.edges[0].node.acf.text_color || "#000000"
  bgColor = data.allWordpressPost.edges[0].node.acf.background_color || "#ffffff"

  const shareSelfUrl = location.origin + location.pathname 
  const shareTwitterUrl = 'https://twitter.com/share?text=' + encodeURIComponent(parse(data.allWordpressPost.edges[0].node.title)) + '&url=' + shareSelfUrl
  const shareFacebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + shareSelfUrl

  return (
    <React.Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html:
            `

    @media (min-width: 769px) and (max-width: 1919px){
      .meta-item {
      border-bottom: ` +
            hexToRgbA(textColor, 0.1) +
            ` 1px solid;
    }
    }
    @media (min-width: 1920px), (max-width: 768px){
      .meta-top, .meta-top-widescreen {
        border-top: ` +
            hexToRgbA(textColor, 0.1) +
            ` 1px solid;
      }
      .post-header-bg-bg { background-color: ` + bgColor + `;}
    }      
    `,
        }}
      />

      { 
        /* For themed post: check if given bg color is darken than text color,
        and apply styles accrodingly */
        themedPost && (
            hexToLightness(bgColor) < hexToLightness(textColor) ? (
            <style
              dangerouslySetInnerHTML={{
                __html:
                  `
          .image-author { mix-blend-mode: lighten; background-color: ` + textColor + `;}
          .image-author img { mix-blend-mode: multiply; }
          `,
              }}
            />
          ) : (
            <style
              dangerouslySetInnerHTML={{
                __html:
                  `
          .image-author { mix-blend-mode: multiply; background-color: ` + textColor + `; }
          .image-author img { mix-blend-mode: lighten; filter: brightness(1.1); }
          `,
              }}
            />
          )
        )
      }

      <SEO
        title={parse(data.allWordpressPost.edges[0].node.title)}
        description={parse(data.allWordpressPost.edges[0].node.excerpt)}
        wideScreen
        isBlogpost
        pageURL={location.origin + location.pathname}
        pageImage={
          data.allWordpressPost.edges[0].node.featured_media.source_url
        }
        meta={[
          {
            property: "article:published_time",
            content: data.allWordpressPost.edges[0].node.dateOG,
          },
          {
            property: "article:author",
            content: data.allWordpressPost.edges[0].node.author.name,
          },
        ]}
      />

      <Header hideMenu logoColor={textColor} bgColor={bgColor} wideScreen />

      <article
        itemScope
        itemType="http://schema.org/BlogPosting"
        className="widescreen"
      >
        <div
          className="post-header-bg-bg"></div>
        <div
          className="post-header-bg"
          style={{
            backgroundColor: bgColor,
            marginBottom: "3rem",
          }}
        >
          <header className="post-header grid-12 grid-12-widescreen">
            <aside className="grid-aside grid-aside-widescreen">
              <Link
                to="/blog"
                className="small-copy nav-back"
                style={{
                  color: textColor,
                }}
              >
                <Icon name="arrowLeft" color={textColor} />
                All blogposts
              </Link>
            </aside>
            <div className="grid-main grid-main-widescreen">
              <h1 itemProp="headline" style={{ color: textColor }}>
                {parse(data.allWordpressPost.edges[0].node.title)}
              </h1>
              <h2 itemProp="alternativeHeadline" style={{ color: textColor }}>
                {parse(data.allWordpressPost.edges[0].node.excerpt)}
              </h2>
            </div>

            <aside className="grid-aside grid-aside-widescreen meta-top meta-top-widescreen">
              <div
                className="small-title meta-item meta-item-widescreen"
                style={themedPost ? { color: textColor } : {}}
              >
                <Img
                  className="image-author"
                  fluid={
                    data.allWordpressPost.edges[0].node.author.acf.avatar
                      .localFile.childImageSharp.fluid
                  }
                />
                Written by
                <span
                  className="small-copy"
                  itemProp="author"
                  style={{ color: textColor }}
                >
                  {parse(data.allWordpressPost.edges[0].node.author.name)}
                </span>
                <p className="mini" style={{ color: textColor }}>
                  {parse(
                    data.allWordpressPost.edges[0].node.author.description
                  )}
                </p>
              </div>
              <div
                className="small-title meta-item meta-item-widescreen"
                style={themedPost ? { color: textColor } : {}}
              >
                Category
                {data.allWordpressPost.edges[0].node.categories.map(
                  category => (
                    <Link
                      to={"/blog/" + category.slug}
                      key={"/blog/" + category.slug}
                    >
                      <span className="small-copy" style={{ color: textColor }}>
                        {parse(category.name)}
                      </span>
                    </Link>
                  )
                )}
              </div>
              <div
                className="small-title meta-item meta-item-widescreen"
                style={themedPost ? { color: textColor } : {}}
              >
                Published
                <time
                  dateTime={data.allWordpressPost.edges[0].node.dateOG}
                  itemProp="datePublished"
                  className="small-copy"
                  style={{ color: textColor }}
                >
                  {data.allWordpressPost.edges[0].node.date}
                </time>
              </div>
              <div
                className="small-title meta-item meta-item-widescreen meta-item-social-1col meta-item-social-1col-widescreen"
                style={themedPost ? { color: textColor } : {}}
              >
                Share
                <div>
                  <a href={shareSelfUrl} className="ic-share">
                    {themedPost ? (
                      <Icon name="shareLink" color={textColor} />
                    ) : (
                      <Icon name="shareLink" />
                    )}
                  </a>
                  <a href={shareTwitterUrl} className="ic-share">
                    {themedPost ? (
                      <Icon name="twitter" color={textColor} />
                    ) : (
                      <Icon name="twitter" />
                    )}
                  </a>
                  <a href={shareFacebookUrl} className="ic-share">
                    {themedPost ? (
                      <Icon name="facebook" color={textColor} />
                    ) : (
                      <Icon name="facebook" />
                    )}
                  </a>
                </div>
              </div>
            </aside>
            <figure
              className="grid-main grid-main-widescreen figure-cover figure-cover-widescreen"
              itemProp="image"
            >
              <Img
                className="image-cover"
                fluid={
                  data.allWordpressPost.edges[0].node.featured_media.localFile
                    .childImageSharp.fluid
                }
                alt={data.allWordpressPost.edges[0].node.title}
              />
            </figure>
          </header>
        </div>
        <main className="post-content grid-12 grid-12-widescreen">
          <aside className="grid-aside grid-aside-widescreen meta-item-social-2col-hide meta-item-social-2col-hide-widescreen">
            <div className="small-title meta-item meta-item-widescreen meta-item-social-2col meta-item-social-2col-widescreen">
              <a href={shareSelfUrl} className="ic-share">
                <Icon name="shareLink" />
              </a>
              <a href={shareTwitterUrl} className="ic-share">
                <Icon name="twitter" />
              </a>
              <a href={shareFacebookUrl} className="ic-share">
                <Icon name="facebook" />
              </a>
            </div>
          </aside>
          <div
            itemProp="articleBody"
            className="grid-text grid-text-widescreen blogpost-container"
          >
            {parse(data.allWordpressPost.edges[0].node.content)}
            <aside className="meta-bottom">
              <div className="small-title meta-item-metabottom">
                Written by
                <span className="small-copy" itemProp="author">
                  {parse(data.allWordpressPost.edges[0].node.author.name)}
                </span>
              </div>
              <div className="small-title meta-item-metabottom">
                Category
                {data.allWordpressPost.edges[0].node.categories.map(
                  category => (
                    <Link
                      to={"/blog/" + category.slug}
                      key={"/blog/" + category.slug}
                    >
                      <span className="small-copy">{parse(category.name)}</span>
                    </Link>
                  )
                )}
              </div>
              <div className="small-title meta-item-metabottom">
                Published
                <time
                  dateTime={data.allWordpressPost.edges[0].node.date}
                  itemProp="datePublished"
                  className="small-copy"
                >
                  {data.allWordpressPost.edges[0].node.date}
                </time>
              </div>
              <div className="small-title meta-item-metabottom">
                Share
                <div>
                  <a href={shareSelfUrl} className="ic-share">
                    <Icon name="shareLink" />
                  </a>
                  <a href={shareTwitterUrl} className="ic-share">
                    <Icon name="twitter" />
                  </a>
                  <a href={shareFacebookUrl} className="ic-share">
                    <Icon name="facebook" />
                  </a>
                </div>
              </div>
            </aside>
          </div>
          <div className="grid-text-white-space grid-text-white-space-widescreen"></div>
        </main>
      </article>

      <Footer wideScreen />
    </React.Fragment>
  )
}

export default Post

export const query = graphql`
  query($slug: String!) {
    allWordpressPost(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          slug
          title
          content
          excerpt
          date: date(formatString: "DD MMM YYYY")
          dateOG: date
          acf {
            text_color
            background_color
          }
          categories {
            name
            slug
          }
          author {
            name
            description
            avatar_urls {
              wordpress_96
            }
            acf {
              avatar {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 140) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
          featured_media {
            source_url
            localFile {
              childImageSharp {
                fluid(maxWidth: 900) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`