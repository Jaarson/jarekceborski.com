import React from "react"
import Header from "../components/header"
import BlogListing from "../components/blog-listing"
import Footer from "../components/footer"
import { graphql, StaticQuery, useStaticQuery } from "gatsby"

import "../styles/styles.scss"


var ventureEvenItem = false

const Blog = () => (
  <React.Fragment>
  <Header hideMenu />
  <main className="blog" itemScope itemType="http://schema.org/BlogPosting">
  <BlogListing allBlogposts categoriesOnSideBar/>
  </main>
  <Footer />
  </React.Fragment>
)

export default Blog
