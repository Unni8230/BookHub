import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoIosCloseCircle} from 'react-icons/io'
import './header.css'

const menuActiveStatus = {
  home: 'HOME',
  bookshelf: 'BOOK SHELVES',
}
class Header extends Component {
  state = {
    showHamburgerMenu: false,
    activeMenu: menuActiveStatus.home,
  }

  onShowMenu = () => {
    this.setState(prev => ({
      showHamburgerMenu: !prev.showHamburgerMenu,
    }))
  }

  closeMenu = () => {
    this.setState({
      showHamburgerMenu: false,
    })
  }

  clickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  changeActiveMenuHome = () => {
    this.setState({
      activeMenu: menuActiveStatus.home,
    })
  }

  changeActiveMenuBook = () => {
    this.setState({
      activeMenu: menuActiveStatus.bookshelf,
    })
  }

  render() {
    const {showHamburgerMenu, activeMenu} = this.state
    return (
      <div className="HeaderBgContainer">
        <div className="HeaderContainer">
          <Link to="/" className="Logo-link-section">
            <img
              className="BookhubHeaderLogo"
              src="https://res.cloudinary.com/dyareetre/image/upload/v1751008090/Group_7731_exxax1.png"
              alt="website logo"
            />
          </Link>
          <button
            className="BookhubHamburgerButton"
            type="button"
            onClick={this.onShowMenu}
          >
            <GiHamburgerMenu />
          </button>
          <ul className="HeaderMenuSection">
            <li className="header-menu-item">
              <Link to="/" style={{textDecoration: 'none'}}>
                <button
                  className={
                    activeMenu === 'HOME'
                      ? 'MenuTitleHomeButton isactive'
                      : 'MenuTitleHomeButton'
                  }
                  type="button"
                  onClick={this.changeActiveMenuHome}
                >
                  Home
                </button>
              </Link>
            </li>
            <li className="header-menu-item">
              <Link to="/shelf" style={{textDecoration: 'none'}}>
                <button
                  className={
                    activeMenu === 'BOOK SHELVES'
                      ? 'MenuTitleHomeButton isactive'
                      : 'MenuTitleHomeButton'
                  }
                  type="button"
                  onClick={this.changeActiveMenuBook}
                >
                  Bookshelves
                </button>
              </Link>
            </li>
            <button
              type="button"
              className="HeaderLogoutButton"
              onClick={this.clickLogout}
            >
              Logout
            </button>
          </ul>
        </div>
        {showHamburgerMenu && (
          <div className="HeaderMenuSmSection">
            <Link to="/" style={{textDecoration: 'none'}}>
              <button
                className={
                  activeMenu === 'HOME'
                    ? 'MenuTitleHomeButton isactive'
                    : 'MenuTitleHomeButton'
                }
                type="button"
                onClick={this.changeActiveMenuHome}
              >
                Home
              </button>
            </Link>
            <Link to="/shelf" style={{textDecoration: 'none'}}>
              <button
                className={
                  activeMenu === 'BOOK SHELVES'
                    ? 'MenuTitleBookButton isactive'
                    : 'MenuTitleBookButton'
                }
                type="button"
                onClick={this.changeActiveMenuBook}
              >
                Bookshelves
              </button>
            </Link>
            <button className="HeaderLogoutButton" type="button" onClick={this.clickLogout}>
              Logout
            </button>
            <button className="HeaderCloseButton" type="button" onClick={this.closeMenu}>
              <IoIosCloseCircle />
            </button>
          </div>
        )}
      </div>
    )
  }
}
export default withRouter(Header)
