import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import Welcome from "./Components/Welcome";
import SignIn from "./Components/SignIn";
import PageNotfound from "./Components/404"
import Products from "./Components/Products/Products";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/Log-in" element={<LoginPage />} />
          <Route path="/Sign-in" element={<SignIn />} />
          <Route path="/Products" element={<Products />} />
          <Route path="*" element={<PageNotfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
