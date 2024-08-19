import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Header from './header';
import axios from 'axios';
import Footer from './footer';

const ClothesDetail = () => {
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    const id = queryParams.id;
    const productId = queryParams.product_id;

    const [clothesData, setClothesData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8081/clothes_detail/${id}/${productId}`)
            .then(res => {
                setClothesData(res.data);
            })
            .catch(err => console.log(err));
    }, [id, productId]);
    
    

    return (
        <>
            <Header />

            {clothesData.map((clothes, index) => (
            <div className='full_details' key={index}>
                <div className='left_details'>
                    <div className="details_cards" >
                        <div className="img_details">
                            <img
                                src={`http://localhost:8081/images/${clothes.image}`}
                                alt={clothes.image}
                                className="clothes_img"
                            />
                        </div>  
                        {/* <div className="products_name">
                            <h6>{clothes.clothes_name}</h6>
                        </div> */}
                        {/* <div className="products_details">
                            <div className="price">₹{clothes.mrp_amt}</div>
                            <div className="offer">{clothes.sale_amt}</div>
                        </div> */}
                    </div>
                     
                </div>
                <div className='right_details'>
                    <div class="company_name">
                        <h4>Product Details</h4>

                        <div class="info-section mt-5">
                            <p className='head_name'>Brand Name :</p>
                            <p className='head_ans'>Logo Clothing</p>
                        </div>

                        <div class="info-section">
                            <p className='head_name'>Dress Name :</p>
                            <p className='head_ans'>{clothes.clothes_name}</p>
                        </div>

                        <div class="info-section">
                            <p className='head_name'>Fit :</p>
                            <p className='head_ans'>Regular</p>
                        </div>

                        <div class="info-section">
                            <p className='head_name'>Pack of :</p>
                            <p className='head_ans'>1</p>
                        </div>

                        <div class="info-section">
                            <p className='head_name'>Ideal for :</p>
                            <p className='head_ans'>Men</p>
                        </div>

                        <div class="info-section">
                            <p className='head_name'>Fabric :</p>
                            <p className='head_ans'>Cotton</p>
                        </div>

                        <div class="info-section">
                            <p className='head_name'>Size :</p>
                            <p className='head_ans'>M, L, XL</p>
                        </div>

                        <div class="info-section">
                            <p className='head_name'>Price :</p>
                            <p className='head_price'>{clothes.sale_amt} ₹ </p>
                        </div>

                        <div class="info-section">
                            <div className='add_to_cart_btn'>Add to Cart</div>
                        </div>


                    </div>
                </div>
            </div>

))}

            <Footer/>
        </>
    );
};

export default ClothesDetail;
