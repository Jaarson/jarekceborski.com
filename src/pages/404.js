import React from "react"
import SEO from "../components/seo"
import Header from "../components/header"
import Footer from "../components/footer"

const NotFoundPage = () => (
  <>
    <Header />
    <SEO title="404: Not found" />
    <main>
    <section>
            <div className="hero-bio grid-12">
              <aside className="grid-aside">
                <h3 className="aside-whitebg">404</h3>
              </aside>
              <div className="grid-main">
                <h1 itemProp="name" className="my-name"><h1>NOT FOUND</h1></h1>
                <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
              </div>
            </div>
          </section>
          </main>
    <Footer />
  </>
)

export default NotFoundPage
