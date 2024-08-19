import { BrowserRouter,Routes,Route } from "react-router-dom";
import SignUp from "./signin";
import Login from "./login";
import './style.css';
import Header from "./header";
import Home from "./home";
import Footer from "./footer";
import Products from "./products";
import ProductList from "./productList";
import ClothesDetail from "./clothes_detail";
import AddToCart from "./add_to_cart";

function App() {
  return (
   <BrowserRouter>
      <Routes>
          <Route element={<SignUp/>} path="/"></Route>
          <Route element={<Login/>} path="/login"></Route>
          <Route element={<Header/>} path="/header"></Route>
          <Route element={<Home/>} path="/home"></Route>
          <Route element={<Footer/>} path="/footer"></Route>
          <Route element={<Products/>} path="/products"></Route>
          <Route element={<ProductList/>} path="/product_list"></Route>
          <Route element={<ClothesDetail/>} path="/clothes_detail"></Route>
          <Route element={<AddToCart/>} path="/add_to_cart"></Route>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
