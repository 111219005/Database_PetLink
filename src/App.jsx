import { BrowserRouter, Routes, Route } from "react-router";
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import "./App.css";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Species from "./pages/Species";
import ScrollToTop from "./components/ScrollToTop";
import Intro from "./pages/Intro/Intro";
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import Cart from "./pages/Cart"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from './pages/Profile/Profile';
//import { feedProducts } from "./api/fireStore";
//feedProducts();
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <HelmetProvider context={{}}>
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="introduction" element={<Intro />} />
                  <Route path=":productSpecies" element={<Species />} />
                  <Route path=":productSpecies/:productId" element={<Product />} />
                  <Route path="SignUp" element={<SignUp />} />
                  <Route path="LogIn" element={<LogIn />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="Profile" element={<Profile />} />
                </Routes>
              </BrowserRouter>
            </HelmetProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
