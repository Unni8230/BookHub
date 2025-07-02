import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './footer.css'

const Footer = () => (
  <div className="SocialmediaContactusContainer">
    <div className="SocialmediaIconsContainer">
      <FaGoogle />
      <FaTwitter />
      <FaInstagram />
      <FaYoutube />
    </div>
    <p className="ContactusText">Contact Us</p>
  </div>
)
export default Footer
