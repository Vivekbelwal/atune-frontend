import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.accessToken) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <div>Home</div>
    </>
  );
}

export default Home;
