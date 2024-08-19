import Swal from 'sweetalert2';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';
import { useState,useEffect, useRef } from 'react';

const handleDelete = async (product_id) => {
    if (!product_id) {
        console.error('Invalid or missing product ID');
        return;
    }

    try {
        const currentUrl = window.location.href;
        const id = new URL(currentUrl).searchParams.get("id");
        const response = await axios.put(`http://localhost:8081/products/${product_id}/remove`);
        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Deleted',
                text: 'The product has been successfully removed.',
            }).then(() => {
                // Reload the page with the same `id` query parameter
                
                window.location.href = `/product_list?id=${id}`;
            });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an issue removing the product.',
        });
    }
};




function Products()
{
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    const id = queryParams.id;

    const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = () => {
      setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
      };

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const [clothesName, setClothesName] = useState("");
    const [mrpamt, setMrpAmt] = useState("");
    const [salesamt, setSalesAmt] = useState("");
    const fileInput = useRef();

    const saveFile = (e) => {
        setFile(fileInput.current.files[0]);
        setFileName(fileInput.current.files[0].name)
    }

    const uploadFile = async () => {
        const formData = new FormData();
        formData.append('file',file);
        formData.append('fileName',fileName);
        formData.append('clothes_name', clothesName);
        formData.append('mrp_amt', mrpamt);
        formData.append('sales_amt', salesamt);

        try {
            console.log(formData.get('clothes_name')); // Log the value of 'clothes_name'
            console.log(formData.get('mrp_amt')); // Log the value of 'clothes_name'
            console.log(formData.get('sales_amt')); // Log the value of 'clothes_name'
            console.log(formData.get('file')); // Log the value of 'clothes_name'
            console.log(formData.get('fileName')); // Log the value of 'clothes_name'
            const response = await axios.post(`http://localhost:8081/products/${id}`, formData); 
            console.log(response.data); // Log the response data if needed
            setIsOpen(false);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your data has been successfully submitted!',
            }).then(() => {
                // Refresh the page after the success message is acknowledged
                window.location.reload();
            });;

        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle error here
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Your data has been successfully submitted!',
            });
        }
    }

    const [clothesData, setClothesData] = useState([]);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8081/products/${id}`)
            .then(res => {
                setClothesData(res.data);
            })
            .catch(err => console.log(err));
        } else {
            console.error('Invalid or missing product ID');
        }
    }, [id]);
    
    const isProductListPage = location.pathname === `/product_list`;

    return(
        <>
        {/* <Header/> */}
        {isProductListPage && (    
        <div className="btn-cards mt-3 add_clothes_btn">
            <div className="row">
                <div className="col-sm-10`">
                    <button className="add-cards" onClick={handleButtonClick}>Add Clothes</button>
                </div>
            </div>
        </div>
         )}

        <div className="App d-flex justify-content-center align-items-center">
                {isOpen && (
                    <div className="modal mt-3 " tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content open_div">
                        <div className="modal-header d-flex justify-content-between ">
                            <h5 className="modal-title">Add Clothes Details</h5>
                            <button type="button" className="close close-btn" onClick={handleClose} aria-label="Close">
                            <span aria-hidden="true" className="text-white">&times;</span>
                            </button>
                        </div>
                        
                        <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <input type="text" required className="form-control p-3" placeholder="Clothes Name*" name="clothes_name"
                                         value={clothesName} onChange={(e) => setClothesName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-sm-6">
                                        <input type="text" required className="form-control p-3" placeholder="MRP Amount*" name="mrp_amt"
                                         value={mrpamt} onChange={(e) => setMrpAmt(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" required className="form-control p-3" placeholder="Sales Amount*" name="sales_amt"
                                         value={salesamt} onChange={(e) => setSalesAmt(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-sm-12">
                                        <input type="file" className="form-control" name="file" onChange={saveFile} ref={fileInput}/>  
                                    </div>
                                </div>
                        </div>

                        
                        <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={uploadFile}>Save</button>
                        </div>
                        
                    </div>
                    </div>
                    </div>
                )}

                
            </div>         
            
            <div className="full_cards mt-1">
                {clothesData.map((clothes, index) => (
                    <div key={index} className="multiple_col">
                        <div className="product_cards">
                            <div className="img_card" onClick={() => window.open(`/clothes_detail?id=${id}&product_id=${clothes.id}`, '_blank')}>
                                <img
                                    src={`http://localhost:8081/images/${clothes.image}`}
                                    alt={clothes.image}
                                    className="clothes_img"
                                />
                            </div>  
                            
                            <div className="products_name">
                                <h6>{clothes.clothes_name}</h6>
                            </div>
                            
                            <div className="products_details">
                                <div className="price"><span className='text-white'>MRP Price : </span>₹{clothes.mrp_amt}</div>
                                <div className="offer"><span className='text-white'>Sale Price : </span>₹{clothes.sale_amt}</div>
                            </div>
                            
                            {isProductListPage && (    
                            <div className="products_details">
                                {/* <Link className="edit_btn">Edit</Link> */}
                                <Link className="delete_btn" onClick={() => handleDelete(clothes.id)}>Delete</Link>
                            </div>
                             )}

                        </div>
                    </div>
                ))}
            </div>

            



        {/* <Footer/> */}
    </>
    )
}

export default Products