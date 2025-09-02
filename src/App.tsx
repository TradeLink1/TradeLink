import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import Header from "./static/Header";
import Footer from "./static/Footer";
import Home from "./pages/Homepage/Home";
// import Categories from "./pages/Categories/Categories";
import SellWithUs from "./pages/SellWIthUs/SellWithUs";
import Faq from "./pages/Faq/Faq";

import Contact from "./pages/Contact/ContactMain";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Product from "./pages/Categories/Products";
import Services from "./pages/Categories/Services";
import { SearchProvider } from "./context/SearchContext";
import DashboardLayout from "./pages/sellersDashboard/DashboardLayout";
import Overview from "./pages/sellersDashboard/Overview";
import MyListings from "./pages/sellersDashboard/MyListings";
import Messages from "./pages/sellersDashboard/Messages";
import UploadProduct from "./pages/sellersDashboard/UploadProduct";
import Settings from "./pages/sellersDashboard/Settings";
import AdminLayout from "./pages/adminDashboard/AdminLayout";
import AdminOverview from "./pages/adminDashboard/AdminOverview";
import AdminSellers from "./pages/adminDashboard/AdminSellers";
import AdminKyc from "./pages/adminDashboard/AdminKyc";
import AdminSellersReport from "./pages/adminDashboard/AdminReports";
import ProtectRoute from "./components/routes/ProtectRoute";
import { AuthProvider } from "./context/AuthContext";
import VerifyEmail from "./pages/Register/VerifyEmail";

const Layout = () => {
  const location = useLocation();

  //  hide header and footer in some pages //
  const hideHeaderFooter = ["/login", "/register"].includes(
    location.pathname.toLowerCase()
  );

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Outlet /> {/* This is where nested routes will render */}
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <div className=" mx-auto">
      <AuthProvider>
        <SearchProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                {/* <Route path="/Categories" element={<Categories />} /> */}
                <Route
                  path="/Categories/Products"
                  element={
                    <ProtectRoute allowedRole="user">
                      <Product />
                    </ProtectRoute>
                  }
                />
                <Route
                  path="/Categories/Services"
                  element={
                    <ProtectRoute>
                      <Services />
                    </ProtectRoute>
                  }
                />
                <Route path="/SellWithUs" element={<SellWithUs />} />
                <Route path="/Faq" element={<Faq />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/VerifyEmail/:token" element={<VerifyEmail />} />
              </Route>
              {/* Nested dashboard routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectRoute allowedRole="seller">
                    <DashboardLayout />
                  </ProtectRoute>
                }
              >
                <Route index element={<Overview />} />
                <Route path="upload" element={<UploadProduct />} />
                <Route
                  path="listings"
                  // element={<MyListings sellerId="user.id" />}
                  element={<MyListings />}
                />
                <Route path="messages" element={<Messages />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminOverview />} />
                <Route path="sellers" element={<AdminSellers />} />
                <Route path="reports" element={<AdminSellersReport />} />
                <Route path="kyc" element={<AdminKyc />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
