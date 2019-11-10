/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

//const headerInteraction = require('./static/scripts/header-interaction')
//const prismCodeSnippets = require('./static/scripts/prism.js')

const insertJS = () => {
  const addJS = (src) => {
    const s = document.createElement(`script`)
    s.type = `text/javascript`
    s.src = src
    document.getElementsByTagName(`head`)[0].appendChild(s)
  }

  addJS('/scripts/header-interaction.js')
  addJS('/scripts/prism.js')
}

exports.onRouteUpdate = () => {
  insertJS()
}
