import { Link } from "gatsby"
import React from "react"
import parse from "html-react-parser"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"

var blogpostEvenItem = false

const BlogListing = (props) => {
  const data = useStaticQuery(graphql`
    {
      allWordpressPost(sort: { fields: [date] }, limit: 2) {
        edges {
          node {
            slug
            title
            excerpt
            featured_media {
              source_url
            }
            categories {
              id
              name
            }
          }
        }
      }
    }
  `)

  return (
    <>
      <section
        className="blog"
        itemScope
        itemType="http://schema.org/BlogPosting"
      >
        <div className="grid-12">
          <div className="grid-aside grid-aside-padding">
            <h3 className="aside-whitebg no-padding">{props.title}</h3>
            <a href="blog.html" className="blog-link">
              All blogposts
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 16 16"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  id="link-arrow"
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
                      stroke="#000000"
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
          </div>
          <div className="grid-main grid-9">
            {data.allWordpressPost.edges.map(blogpost => (
              <React.Fragment key={blogpost.node.slug}>
                <div
                  className="grid-9-item-4"
                  key={blogpost.node.slug + "-blogpost"}
                >
                  <article className="thumb">
                    <a href="index.html">
                      <figure className="figure-thumb" itemProp="image">
                        <Img
                          className="image-thumb"
                          fixed={blogpost.node.featured_media.source_url}
                          alt={parse(blogpost.node.title)}
                        />
                      </figure>
                    </a>
                    <h4 className="blogpost-category">
                      {blogpost.node.categories.map(category =>
                        parse(category.name)
                      )}
                    </h4>
                    <a href="#">
                      <h3 itemProp="headline" className="blogpost-title">
                        {parse(blogpost.node.title)}
                      </h3>
                    </a>
                    <p className="p-small">{parse(blogpost.node.excerpt)}</p>
                  </article>
                </div>

                {blogpostEvenItem ? (
                  ""
                ) : (
                  <div
                    className="grid-9-spacer-1"
                    key={blogpost.node.slug + "-spacer"}
                  ></div>
                )}
                {(blogpostEvenItem = !blogpostEvenItem)}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogListing

/* 
                        <img
                          className="image-thumb"
                          src={blogpost.node.featured_media.source_url}
                          alt={parse(blogpost.node.title)}
                        />
*/