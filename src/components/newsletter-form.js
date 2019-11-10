import React from "react"

export default class NewsletterForm extends React.Component {
  state = {
    email: "",
    message: "",
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    var xhr = new XMLHttpRequest()
    xhr.addEventListener("load", () => {
      if (xhr.status != 200) {
      var response = JSON.parse(xhr.response)
      this.setState({
        message: response.message,
      })
      } else {
        this.setState({
          message: this.props.newsletter_success_message
        })
      }
    })
    xhr.addEventListener("error", () => {
      this.setState({
        message: 'Connection error, try again later...',
      })
    })
    xhr.open(
      "POST",
      process.env.GATSBY_WP_NEWSLETTER_SUBSCRIBE_URL
    )
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(
      JSON.stringify({
        email: this.state.email,
        api_key: process.env.GATSBY_WP_NEWSLETTER_API_KEY,
      })
    )
  }

  render() {
    return (
      <>
        <p className="p-small">{this.state.message}</p>
        <form className="newsletter" onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          <input type="submit" className="subscribe" value="Subscribe" />
        </form>
      </>
    )
  }
}
