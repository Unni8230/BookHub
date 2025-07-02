import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './login.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    loginErrMsg: '',
  }

  changeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  changePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onLoginFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const {history} = this.props
    const credentials = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
    }
    const loginResponse = await fetch(loginApiUrl, options)
    const loginData = await loginResponse.json()
    if (loginResponse.ok === true) {
      const jwtToken = loginData.jwt_token
      this.setState({
        loginErrMsg: '',
      })
      Cookies.set('jwt_token', jwtToken, {expires: 7})
      history.replace('/')
    } else {
      this.setState({
        loginErrMsg: loginData.error_msg,
      })
    }
  }

  render() {
    const {username, password, loginErrMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="BookhubLoginContainer" testid="login">
        <img
          className="BookhubLgImage"
          src="https://res.cloudinary.com/dyareetre/image/upload/v1751005877/Rectangle_1467_lbuza8.png"
          alt="website login"
        />
        <img
          className="BookhubSmImage"
          src="https://res.cloudinary.com/dyareetre/image/upload/v1751006023/Ellipse_99_o6um52.png"
          alt="website login"
        />
        <div className="BookhubFormSection">
          <form className="BookhubLoginForm" onSubmit={this.onLoginFormSubmit}>
            <img
              className="BookhubLogo"
              src="https://res.cloudinary.com/dyareetre/image/upload/v1751008090/Group_7731_exxax1.png"
              alt="login website logo"
            />
            <label className="BookhubLoginFormLabel" htmlFor="username">
              Username*
            </label>
            <input
              className="BookhubLoginFormInput"
              type="text"
              id="username"
              value={username}
              onChange={this.changeUsername}
            />
            <label className="BookhubLoginFormLabel" htmlFor="password">
              Password*
            </label>
            <input
              className="BookhubLoginFormInput"
              type="password"
              id="password"
              value={password}
              onChange={this.changePassword}
            />
            <p className="BookhubLoginErrorMsg">{loginErrMsg}</p>
            <button className="BookhubLoginButton" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
