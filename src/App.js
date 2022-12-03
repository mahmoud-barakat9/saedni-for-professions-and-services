import logo from "./logo.svg";
import "./App.css";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductInfo from "./pages/ProductInfo";
import CartPage from "./pages/CartPage";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import "./stylesheets/layout.css";
import "./stylesheets/products.css";
import "./stylesheets/authentication.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrdersPage from "./pages/OrdersPage";
import AdminPage from "./pages/AdminPage";
import ServiceGallery from "./pages/ServiceGallery";
import ImageSlider from "./pages/ImageSlider";
import { SliderData } from "./pages/SliderData";
import ChatRoom from "./pages/ChatRoom";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <ProtectedRoutes>
              <Homepage />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/productinfo/:serviceid"
          exact
          element={
            <ProtectedRoutes>
              <ProductInfo />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/serviceGallery/:serviceid"
          exact
          element={
            <ProtectedRoutes>
              <ServiceGallery />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/imageSlider/:serviceid"
          exact
          element={
            <ProtectedRoutes>
              <ImageSlider slides={SliderData} />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/chat/:serviceid"
          exact
          element={
            <ProtectedRoutes>
              <ChatRoom />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cart"
          exact
          element={
            <ProtectedRoutes>
              <CartPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/orders"
          exact
          element={
            <ProtectedRoutes>
              <OrdersPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin"
          exact
          element={
            <ProtectedRoutes>
              <AdminPage />
            </ProtectedRoutes>
          }
        />
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/register" exact element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;

export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("currentUser")) {
    return children;
  } else {
    return <Navigate to="login" />;
  }
};
