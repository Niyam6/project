import Logo from './assets/Logo.png'
import React, { useState, useEffect } from 'react';
import {useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';

function Header()
{

    const [userName, setUserName] = useState(null);
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    const id = queryParams.id;      

    useEffect(() => {
        const fetchData = async () => {
          try {
            // Append the id to the URL string
            const response = await fetch(`http://localhost:8081/header/${id}`);
            const data = await response.json();
            setUserName(data.name);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        if (id) { // Check if id exists before fetching data
          fetchData();
        }
      }, [id]); // Include id in the dependency array

      const scrollToFooter = () => {
        const footer = document.getElementById('footer');
        footer.scrollIntoView({ behavior: 'smooth' });
    };

    return(
        <form className="form_tag">

            <header className="header">
                <div className="header_logo">
                    <img src={Logo} alt="Logo" className='logo' />
                </div>

                <div className="header_content">
                    <ul>
                        <li><Link to={`/home?id=${id}`} className='text-decoration-none text-white'>Home</Link></li>
                        <li><Link to={`/product_list?id=${id}`} className='text-decoration-none text-white'>Products</Link></li>
                        {/* <li>Features</li> */}
                        <li><div className='text-decoration-none text-white' onClick={scrollToFooter}>About</div></li>
                    </ul>
                </div>

                <div className='header_button'>
                {userName ? (
                    <div className='header_but'>{userName}</div>
                ) : (
                    <Link className='user header_but text-decoration-none' to={'/login'}>LOGIN</Link>
             )}

                </div>
                {/* <Link className='add_to_cart_btn' to={'/add_to_cart'}>Add to cart</Link> */}

            </header>
        </form>
    )
}

export default Header;