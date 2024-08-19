import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useFormik} from 'formik';

const Validations = (values) =>
{
    const errors = {}

    if(values.fname === '')
    {
        errors.fname = "*Reqired"
    }
    else if(values.fname.length > 20)
    {
        errors.fname = "Maximum Limit Reached"
    }
    
    if(values.lname === '')
    {
        errors.lname = "*Reqired"
    }
    else if(values.lname.length > 20)
    {
        errors.lname = "Maximum Limit Reached"
    }
    
    
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

    if(values.conf_password === '')
    {
        errors.conf_password = "*Reqired"
    }
    else if(values.conf_password !== values.password)
    {
        errors.conf_password = "Password Mismatch"
    }

    return errors
}

function SignUp()
{
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues : {
            fname : '',
            lname : '',
            email : '',
            password : '',
            conf_password : '',
        },
        validate : Validations,
        onSubmit : (values) => {
            axios.post('http://localhost:8081/',values)
            .then(res => navigate('/login'))
            .catch(err => console.log('Error'))
        }
    });

    console.log(formik.values);
    
    return(
    <form onSubmit={formik.handleSubmit}>    
        <div className="full_page">
            <div className="page_card">
                <h2 className='text-center'>SIGN IN</h2>

                <input type="text" placeholder="Enter Your First Name" name='fname' value={formik.values.fname}
                onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {<span className='space'>{formik.touched.fname && formik.errors.fname ? <span>{formik.errors.fname}</span> : ''}</span>}

                <input type="text" placeholder="Enter Your Last Name" name='lname'  value={formik.values.lname}
                onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {<span className='space'>{formik.touched.lname && formik.errors.lname ? <span>{formik.errors.lname}</span> : ''}</span>}

                <input type="email" placeholder="Enter Your Email ID" name='email'  value={formik.values.email}
                onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {<span className='space'>{formik.touched.email && formik.errors.email ? <span>{formik.errors.email}</span> : ''}</span>}

                <input type="password" placeholder="Enter Your Password" name='password'  value={formik.values.password}
                onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {<span className='space'>{formik.touched.password && formik.errors.password ? <span>{formik.errors.password}</span> : ''}</span>}

                <input type="password" placeholder="Enter Your Confirm Password" name='conf_password'  value={formik.values.conf_password}
                onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                {<span className='space'>{formik.touched.conf_password && formik.errors.conf_password ? <span>{formik.errors.conf_password}</span> : ''}</span>}

                <button className='card_btn mt-3' type='submit'>SIGN IN</button>
                <p className='text text-center mt-3'>Already Registerd <Link className='text-decoration-none text-white' to={'/login'}> Click </Link> this Link</p>

            </div>
        </div>
    </form>
    )
}

export default SignUp