import { Link } from "gatsby"
import React from "react"
import PropTypes from "prop-types"
import Icon from "../components/icon"
import { graphql, useStaticQuery } from "gatsby"

const BlogCategories = props => {
  const data = useStaticQuery(graphql`
    {
      allWordpressCategory {
        edges {
          node {
            name
            count
            slug
          }
        }
      }
    }
  `)

  return (
    <React.Fragment>
      <h3 className="aside-whitebg no-padding">Blog</h3>
      <Link to="/blog" className={props.highlightCategory === null ? 'blog-link-active' : 'blog-link'}>
        All
        <Icon name="arrowRight" />
      </Link>
      {data.allWordpressCategory.edges.map(
        category =>
          category.node.count > 0 && (
            <Link
              to={'/blog/' + category.node.slug}
              className={props.highlightCategory === category.node.slug ? 'blog-link-active' : 'blog-link'}
              key={category.node.slug}
              alt={category.node.name + " (" + category.node.count + ")"}
            >
              {category.node.name}
              <Icon name="arrowRight" />
            </Link>
          )
      )}
    </React.Fragment>
  )
}

BlogCategories.defaultProps = {
  highlightCategory: null,
}

BlogCategories.propTypes = {
  highlightCategory: PropTypes.string,
}

export default BlogCategories
