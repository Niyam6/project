import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {Link} from 'react-router-dom';

function Footer()
{
    return(
        <footer className="footer mt-1" id='footer'>
    <div className="footer_container">

        <div className="footer_links">
            <h4>Quick Links</h4>
            <ul>
                <li><Link>Home</Link></li>
                <li><Link>Products</Link></li>
                <li><Link>Features</Link></li>
                <li><Link>About Us</Link></li>
                <li><Link>Contact</Link></li>
            </ul>
        </div>
        
        <div className="footer_about">
            <h4>About Us</h4>
            <p>We offer a wide range of fashionable clothes that cater to all your needs. Quality and customer satisfaction are our top priorities.</p>
        </div>

        <div className="footer_contact">
            <h4>Contact Us</h4>
            <p>Email: support@clotheswebsite.com</p>
            <p>Phone: +123 456 7890</p>
            <p>Address: 123 Fashion St, Deira, Dubai</p>
        </div>

        <div className="footer_social">
            <h4>Follow Us</h4>
            <div className="social_icons">
                <FontAwesomeIcon icon={faFacebook} size="2x" className='p-2'/>
                <FontAwesomeIcon icon={faTwitter} size="2x" className='p-2'/>
                <FontAwesomeIcon icon={faInstagram} size="2x" className='p-2'/>
                <FontAwesomeIcon icon={faLinkedin} size="2x" className='p-2'/>
            </div>
        </div>
    </div>
    <div className="footer_bottom">
        <p>&copy; 2024 ClothesWebsite. All Rights Reserved.</p>
    </div>
</footer>

    )
}

export default Footer