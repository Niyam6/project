import Header from "./header"
import Main from './assets/9752739.jpg'
import Footer from "./footer";
import Products from "./products";

function Home()
{
return(
<>
    <Header/>

    <div className="image_content">
        <img src={Main} alt="main"className="main_img"/>
    </div>

    <Products/>

    <Footer/>
</>
)
}

export default Home