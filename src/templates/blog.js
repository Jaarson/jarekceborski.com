import React from "react"
import Header from "../components/header"
import BlogListing from "../components/blog-listing"
import Footer from "../components/footer"
import "../styles/styles.scss"

export default ({ pageContext }) => (
  <React.Fragment>
  <Header hideMenu />
  <main className="blog" itemScope itemType="http://schema.org/BlogPosting">
  <BlogListing allBlogposts categoriesOnSideBar category={pageContext.slug}/>
  </main>
  <Footer />
  </React.Fragment>
);

