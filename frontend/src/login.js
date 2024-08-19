import {useFormik} from 'formik';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Validations = (values) =>
{
    const errors = {}
    
    if(values.email === '')
    {
        errors.email = "*Reqired"
    }
    else if(!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(values.email))
    {
        errors.email = "Invalid Email ID"
    }

    if(values.password === '')
    {
        errors.password = "*Reqired"
    }
    else if(values.password.length > 8)
    {
        errors.password = "Maximum Limit Reached"
    }
    else if(values.password.length < 4)
    {
        errors.password = "Atleast 4 Digit Must"
    }

    return errors
}

function Login()
{
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues : {
            email : '',
            password : '',
        },
        validate : Validations,
        onSubmit: (values) => {
            axios.post('http://localhost:8081/login', values)
            .then(res => {
                if(res.data.success)
                {
                    const id = res.data.data[0].id;
                    navigate(`/home?id=${id}`)
                }
                else
                {
                    // alert("No one is Registered")
                    Swal.fire({
                        position: "top",
                        title: "No One Is Registered",
                        allowOutsideClick:false,
                      })
                }
            })
            .catch(err => console.log(err))
        }});
    // });

    console.log(formik.values);
    return(
    <form onSubmit={formik.handleSubmit}>
        <div className="full_page">
            <div className="page_card">
                <h2 className="text-center">LOGIN</h2>

                <input type="email" placeholder="Enter Your Email ID" name='email'  value={formik.values.email}
                onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {<span className='space'>{formik.touched.email && formik.errors.email ? <span>{formik.errors.email}</span> : ''}</span>}

                <input type="password" placeholder="Enter Your Password" name='password'  value={formik.values.password}
                onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {<span className='space'>{formik.touched.password && formik.errors.password ? <span>{formik.errors.password}</span> : ''}</span>}

                <button className='card_btn mt-3'>SIGN IN</button>
                <p className='text text-center mt-3'>New Users <Link className='text-decoration-none text-white' to={"/"}> Click </Link> this Link</p>

            </div>
        </div>
    </form>
    )
}

export default Login