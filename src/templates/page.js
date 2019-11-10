import React from "react"
import SEO from "../components/seo"
import Header from "../components/header"
import Footer from "../components/footer"
import parse from "html-react-parser"

export default ({ pageContext }) => (
  <>
    <Header />
    <SEO title={parse(pageContext.title)} />
    <main>
      <section>
        <div className="grid-12">
          <aside className="grid-aside">
            <h3 className="aside-whitebg" style={{ paddingTop: 0 }}>{parse(pageContext.title)}</h3>
          </aside>
          <div className="grid-main">
            <div
              dangerouslySetInnerHTML={{
                 __html: pageContext.content,
              }}
            />
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
)
