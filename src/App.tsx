import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import NotFound from "./Components/NotFound/NotFound";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
