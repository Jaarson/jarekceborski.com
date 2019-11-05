import React from "react"
import Header from "../components/header"
import BlogListing from "../components/blog-listing"
import Footer from "../components/footer"
import SEO from "../components/seo"
import parse from "html-react-parser"
import "../styles/styles.scss"

export default ({ pageContext, location }) => (
  <React.Fragment>
  <SEO
    title={parse(pageContext.name) + ' in Blog'}
    pageURL={location.origin + location.pathname}
    //canonical={location.origin + "/blog"}
  />
  <Header hideMenu />
  <main className="blog" itemScope itemType="http://schema.org/BlogPosting">
  <BlogListing allBlogposts categoriesOnSideBar category={pageContext.slug}/>
  </main>
  <Footer />
  </React.Fragment>
);

