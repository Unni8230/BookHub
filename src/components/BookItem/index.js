import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'

import './bookitem.css'

const loadingStatus = {
  initial: 'INITIAL',
  inprogress: 'IN PROGRESS',
  success: 'SUCCESS',
}
class BookItem extends Component {
  state = {
    bookDetails: {},
    status: loadingStatus.initial,
    isFetchingError: false,
  }

  componentDidMount() {
    this.fetchBookDetails()
  }

  loadingView = () => (
    <div className="LoaderContainer" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  retry = () => {
    this.fetchBookDetails()
  }

  successBookView = () => {
    const {bookDetails, isFetchingError} = this.state
    return (
      <>
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
        <div className="BookDetailsDisplayContainer">
          <div className="BookThumbnailTitleContainer">
            <img
              className="BookItemThumbnail"
              src={bookDetails.cover_pic}
              alt={bookDetails.title}
            />
            <div className="BookItemTitleSection">
              <h1 className="BookTitle">{bookDetails.title}</h1>
              <p className="BookAuthor">{bookDetails.author_name}</p>
              <div className="BookRatingSection">
                <p className="BookRatingText">Avg Rating</p>
                <BsFillStarFill style={{fill: '#FBBF24'}} />
                <p className="BookRatingValue">{bookDetails.rating}</p>
              </div>
              <div className="BookStatusSection">
                <p className="BookStatusText">Status: </p>
                <p className="BookStatusValue">{bookDetails.read_status}</p>
              </div>
            </div>
          </div>
          <hr className="HorizondalLine" />
          <div className="AboutSection">
            <h1 className="AboutHeading">About Author</h1>
            <p className="AboutDescription">{bookDetails.about_author}</p>
          </div>
          <div className="AboutSection">
            <h1 className="AboutHeading">About Book</h1>
            <p className="AboutDescription">{bookDetails.about_book}</p>
          </div>
        </div>
      </>
    )
  }

  renderView = () => {
    const {status} = this.state
    switch (status) {
      case loadingStatus.inprogress:
        return this.loadingView()
      case loadingStatus.success:
        return this.successBookView()
      default:
        return null
    }
  }

  fetchBookDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const getBookUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    this.setState({
      status: loadingStatus.inprogress,
    })
    const getBookResponse = await fetch(getBookUrl, options)
    const bookData = await getBookResponse.json()
    if (getBookResponse.ok === true) {
      this.setState({
        bookDetails: bookData.book_details,
        status: loadingStatus.success,
      })
    } else {
      this.setState({
        isFetchingError: true,
        status: loadingStatus.success,
      })
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="BookDetailsBgContainer" testid="bookItem">
          {this.renderView()}
          <Footer />
        </div>
      </>
    )
  }
}
export default BookItem
