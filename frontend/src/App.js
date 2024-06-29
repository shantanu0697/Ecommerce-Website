import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductDetails from "./screens/ProductDetails";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
function App() {
  return (
    <Router>
      <Header />
      <main className="my-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/payment" element={<PaymentScreen />} exact />
            <Route path="/placeorder" element={<PlaceOrderScreen />} exact />
            <Route path="/login" element={<LoginScreen />} exact />
            <Route path="/shipping" element={<ShippingScreen />} exact />
            <Route path="/profile" element={<ProfileScreen />} exact />
            <Route path="/register" element={<RegisterScreen />} exact />
            <Route path="/product/:id" element={<ProductDetails />} exact />
            <Route path="/cart/:id?" element={<CartScreen />} exact />
          </Routes>
        </Container>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
