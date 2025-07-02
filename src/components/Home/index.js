import {Component} from 'react'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './home.css'

const loadingStatus = {
  initial: 'INITIAL',
  inprogress: 'IN PROGRESS',
  success: 'SUCCESS',
}
class Home extends Component {
  state = {
    topRatedBooks: [],
    status: loadingStatus.initial,
    isFetchingError: false,
  }

  componentDidMount() {
    this.fetchTopRatedBooks()
  }

  retry = () => {
    this.fetchTopRatedBooks()
  }

  fetchTopRatedBooks = async () => {
    const topBooksUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
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
    const topBooksResponse = await fetch(topBooksUrl, options)
    const topBooksData = await topBooksResponse.json()
    if (topBooksResponse.ok === true) {
      const booksList = topBooksData.books
      console.log(booksList)
      this.setState({
        topRatedBooks: booksList,
        status: loadingStatus.success,
      })
    } else {
      this.setState({
        isFetchingError: true,
        status: loadingStatus.success,
      })
    }
  }

  loadingView = () => (
    <div className='LoaderContainer' testid='loader'>
      <Loader type='TailSpin' color='#0284C7' height={50} width={50} />
    </div>
  )

  successView = () => {
    const {topRatedBooks, isFetchingError} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <>
        <div className='HomeDescriptionSection'>
          <h1 className='HomeTitle'>Find Your Next Favorite Books?</h1>
          <p className='HomeDescription'>
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <Link to='/shelf'>
            <button className='SliderButtonSm' type='button'>
              Find Books
            </button>
          </Link>
          <div className='SliderBgContainer'>
            <div className='SliderHeadingSection'>
              <h1 className='SliderTitle'>Top Rated Books</h1>
              <Link to='/shelf'>
                <button className='SliderButton' type='button'>
                  Find Books
                </button>
              </Link>
            </div>
            {isFetchingError && (
              <>
                <img
                  className='HomeErrorImage'
                  src='https://res.cloudinary.com/dyareetre/image/upload/v1751099367/Group_7522_anihae.png'
                  alt='failure view'
                />
                <p className='HomeErrorMsg'>
                  Something went wrong. Please try again.
                </p>
                <button
                  className='HomeErrorButton'
                  type='button'
                  onClick={this.retry}
                >
                  Try Again
                </button>
              </>
            )}
            <Slider {...settings}>
              {topRatedBooks.map(each => (
                <li className='SliderContainer slick-item' key={each.id}>
                  <Link
                    to={`/books/${each.id}`}
                    style={{textDecoration: 'none'}}
                  >
                    <img
                      className='SliderImage'
                      src={each.cover_pic}
                      alt='company logo'
                    />
                    <h1 className='SliderImgTitle'>{each.title}</h1>
                    <p className='SliderImgAuthorname'>{each.author_name}</p>
                  </Link>
                </li>
              ))}
            </Slider>
          </div>
          <Footer />
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
        return this.successView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className='HomeBgContainer' testid='home'>
          {this.renderView()}
        </div>
      </>
    )
  }
}
export default Home
