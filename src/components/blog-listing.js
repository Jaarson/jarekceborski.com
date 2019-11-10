import { Link } from "gatsby"
import React from "react"
import PropTypes from "prop-types"
import parse from "html-react-parser"
import Img from "gatsby-image"
import Icon from "../components/icon"
import BlogCategories from "../components/blog-categories"
import { graphql, useStaticQuery } from "gatsby"

let blogpostLimit = 2

function checkCategories(requestedCategory, currentCategory) {
  return (currentCategory.some(cat => cat.slug === requestedCategory) || requestedCategory === null)
}

const BlogListing = props => {
  const data = useStaticQuery(graphql`
    {
      allWordpressPost(sort: { fields: [date], order: DESC }) {
        edges {
          node {
            slug
            title
            excerpt
            path
            featured_media {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 600) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            categories {
              id
              name
              slug
            }
          }
        }
      }
    }
  `)

  props.allBlogposts
    ? (blogpostLimit = data.allWordpressPost.edges.length)
    : (blogpostLimit = props.numberOfBlogposts)

  return (
    <React.Fragment>
      <div className="grid-12">
        <div className="grid-aside grid-aside-padding">
          {props.categoriesOnSideBar ? (
            <BlogCategories highlightCategory={props.category}/>
          ) : (
            <>
              <h3 className="aside-whitebg no-padding">{props.title}</h3>
              <Link to="/blog" className="blog-link">
                All blogposts
                <Icon name="arrowRight" opacity="0.5" style={{marginLeft: '0.5rem'}} />
              </Link>
            </>
          )}
        </div>
        <div className="grid-main grid-9">
          {data.allWordpressPost.edges.slice(0, blogpostLimit).map(
            blogpost =>
              checkCategories(props.category, blogpost.node.categories) && (
                <React.Fragment key={blogpost.node.slug}>
                  <div className="grid-9-item-4" key={blogpost.node.slug + '-blogpost'}>
                    <article className="thumb">
                      <Link to={'/blog' + blogpost.node.path}>
                        <figure className="figure-thumb" itemProp="image">
                          <Img
                            className="image-thumb"
                            fluid={blogpost.node.featured_media.localFile.childImageSharp.fluid}
                            alt={parse(blogpost.node.title)}
                          />
                        </figure>
                      </Link>

                      {blogpost.node.categories.map(category => (
                        <Link to={'/blog/' + category.slug} key={category.slug}>
                        <h4 className="blogpost-category">
                          {parse(category.name)}
                        </h4>
                        </Link>
                      ))}

                      <Link to={'/blog' + blogpost.node.path}>
                        <h3 itemProp="headline" className="blogpost-title">
                          {parse(blogpost.node.title)}
                        </h3>
                      </Link>
                      <p className="p-small">{parse(blogpost.node.excerpt)}</p>
                    </article>
                  </div>
                </React.Fragment>
              )
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

BlogListing.defaultProps = {
  allBlogposts: false,
  numberOfBlogposts: 2,
  categoriesOnSideBar: false,
  category: null,
}

BlogListing.propTypes = {
  allBlogposts: PropTypes.bool,
  numberOfBlogposts: PropTypes.number,
  categoriesOnSideBar: PropTypes.bool,
  category: PropTypes.string,
}

export default BlogListing
