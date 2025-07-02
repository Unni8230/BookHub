import {Link} from 'react-router-dom'
import './notfound.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <img
      className="not-found-image"
      src="https://res.cloudinary.com/dyareetre/image/upload/v1751359845/Group_7484_uhb4hl.png"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found
    </p>
    <Link to="/" style={{textDecoration: 'none'}}>
      <button type="button" className="not-found-button">
        Go Back to Home
      </button>
    </Link>
  </div>
)
export default NotFound
