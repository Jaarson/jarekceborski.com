import React from "react"
import Header from "../components/header"
import BlogListing from "../components/blog-listing"
import Footer from "../components/footer"
import SEO from "../components/seo"
import "../styles/styles.scss"

export default ({ location }) => (
  <React.Fragment>
  <SEO title="Blog" pageURL={location.origin + location.pathname}/>
  <Header hideMenu />
  <main className="blog" itemScope itemType="http://schema.org/BlogPosting">
  <BlogListing allBlogposts categoriesOnSideBar/>
  </main>
  <Footer />
  </React.Fragment>
);

