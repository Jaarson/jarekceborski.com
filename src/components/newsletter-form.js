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
    //console.log(this.state.email)
  }

  handleSubmit = event => {
    event.preventDefault()
    var xhr = new XMLHttpRequest()
    xhr.addEventListener("load", () => {
      // update the state of the component with the result here
      //console.log(xhr.responseText)
      if (xhr.status != 200) {
      var response = JSON.parse(xhr.response)
      this.setState({
        message: response.message,
      })
      } else {
        this.setState({
          //message: "A confirmation email is on the way. Follow the instructions and check the spam folder. Thank you.",
          message: this.props.newsletter_success_message
        })
      }
    })
    xhr.open(
      "POST",
      "http://jarekceborskicom.local/wp-json/newsletter/v1/subscribe"
    )
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(
      JSON.stringify({
        email: this.state.email,
        api_key: "b29c63ee-ced7-4081-b4f9-452620eae9fa",
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
