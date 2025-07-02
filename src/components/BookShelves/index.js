import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'

import './bookshelves.css'

const loadingStatus = {
  initial: 'INITIAL',
  inprogress: 'IN PROGRESS',
  success: 'SUCCESS',
}

class BookShelves extends Component {
  state = {
    bookShelfName: 'ALL',
    searchInput: '',
    booksList: [],
    status: loadingStatus.initial,
    isFetchingError: false,
  }

  componentDidMount() {
    this.fetchAllBooks()
  }

  filterBooksList = () => {
    this.fetchAllBooks()
  }

  updateSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  changeActiveMenuId = value => {
    this.setState(
      {
        bookShelfName: value,
      },
      this.fetchAllBooks,
    )
  }

  retry = () => {
    this.fetchAllBooks()
  }

  fetchAllBooks = async () => {
    const {bookShelfName, searchInput} = this.state
    const booksUrl = `https://apis.ccbp.in/book-hub/books?shelf=${bookShelfName}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    this.setState({
      status: loadingStatus.inprogress,
    })
    const getBooksResponse = await fetch(booksUrl, options)
    const booksData = await getBooksResponse.json()
    if (getBooksResponse.ok === true) {
      const booksList = booksData.books
      this.setState({
        booksList,
        status: loadingStatus.success,
      })
    } else {
      this.setState({
        isFetchingError: true,
        status: loadingStatus.success,
      })
    }
  }

  renderBookListView = () => {
    const {booksList} = this.state
    return (
      <ul className="BookshelvesAllBooksDisplayContainer">
        {booksList.map(eachBook => (
          <Link className="StyledLink" to={`/books/${eachBook.id}`}>
            <li className="BookshelvesEachBookItem" key={eachBook.id}>
              <img
                className="BookItemThumbnail"
                src={eachBook.cover_pic}
                alt={eachBook.title}
              />
              <div className="BookDetailsSection">
                <h1 className="Booktitle">{eachBook.title}</h1>
                <p className="BookAuthor">{eachBook.author_name}</p>
                <div className="BookratingSection">
                  <p className="BookRatingText">Avg Rating</p>
                  <BsFillStarFill style={{fill: '#FBBF24'}} />
                  <p className="BookRatingValue">{eachBook.rating}</p>
                </div>
                <div className="BookStatusSection">
                  <p className="BookStatusText">Status : </p>
                  <p className="BookStatusValue">{eachBook.read_status}</p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderEmptyView = () => {
    const {searchInput} = this.state
    return (
      <div className="BooksEmptyContainer">
        <img
          className="BooksEmptyImage"
          src="https://res.cloudinary.com/dyareetre/image/upload/v1751183061/Asset_1_1_uislqa.png"
          alt="no books"
        />
        <p className="BookEmptyMsg">
          Your search for {searchInput} did not find any matches
        </p>
      </div>
    )
  }

  loadingView = () => (
    <div className="LoaderContainer" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  successView = () => {
    const {booksList, bookShelfName, searchInput, isFetchingError} = this.state
    const {bookshelvesList} = this.props
    const activeBookshelfText = bookshelvesList.find(
      each => each.value === bookShelfName,
    ).label
    const isBooksListEmpty = booksList.length === 0
    return (
      <div className="BookshelvesBgContainer">
        <div className="BookshelvesMenuSection">
          <h1 className="BookshelvesTitle">Bookshelves</h1>
          <ul className="BookshelvesMenuUlListContainer">
            {bookshelvesList.map(eachMenu => (
              <li key={eachMenu.id} className="BookshelvesMenuListItem">
                <button
                  type="button"
                  className={
                    bookShelfName === eachMenu.value
                      ? 'menu-button isactive'
                      : 'menu-button'
                  }
                  onClick={() => {
                    this.changeActiveMenuId(eachMenu.value)
                  }}
                >
                  {eachMenu.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="BookshelvesAllBooksSection">
          <div className="BookshelvesSearchSection">
            <h1 className="BookshelvesAllBooksHeading">
              {activeBookshelfText} Books
            </h1>
            <div className="BookshelvesSearchContainer">
              <input
                className="SearchInput"
                type="search"
                value={searchInput}
                onChange={this.updateSearchInput}
                placeholder="Search"
              />
              <button
                className="SearchIconButton"
                type="button"
                testid="searchButton"
                onClick={this.filterBooksList}
              >
                <BsSearch />
              </button>
            </div>
          </div>
          <div className="BookshelvesMenuSmContainer">
            <h1 className="BookshelvesTitle">Bookshelves</h1>
            <ul className="BookshelvesMenuUlListContainer">
              {bookshelvesList.map(eachMenu => (
                <li
                  className={
                    bookShelfName === eachMenu.value
                      ? 'BookshelvesMenuListItem issmactive'
                      : 'BookshelvesMenuListItem'
                  }
                  key={eachMenu.id}
                  onClick={() => {
                    this.changeActiveMenuId(eachMenu.value)
                  }}
                >
                  {eachMenu.label}
                </li>
              ))}
            </ul>
          </div>
          {isFetchingError && (
            <>
              <img
                className="HomeErrorImage"
                src="https://res.cloudinary.com/dyareetre/image/upload/v1751099367/Group_7522_anihae.png"
                alt="failure view"
              />
              <p className="HomeErrorMsg">
                Something went wrong, Please try again.
              </p>
              <button
                className="HomeErrorButton"
                type="button"
                onClick={this.retry}
              >
                Try Again
              </button>
            </>
          )}
          {isBooksListEmpty
            ? this.renderEmptyView()
            : this.renderBookListView()}
        </div>
      </div>
    )
  }

  renderView = () => {
    const {status} = this.state
    switch (status) {
      case loadingStatus.inprogress:
        return this.loadingView()
      case loadingStatus.success:
        return this.successView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="BookshelvesMainBgContainer" testid="bookShelves">
          {this.renderView()}

          <Footer />
        </div>
      </>
    )
  }
}
export default BookShelves
