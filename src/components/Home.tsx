import logo from "../assets/happy-rep-logo.png";
import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import photo4 from "../assets/photo4.jpg";
import photo5 from "../assets/photo5.jpg";
import photo6 from "../assets/photo6.jpg";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div id="container">
      <div id="left">
        <div id="menu">
          <div id="title">
            <Image src={logo} alt="Happy Rep Logo" />
            <h1>Happy Rep</h1>
          </div>
          <div id="menu-buttons">
            <Button
              className="custom-btn"
              label="Sign Up"
              onClick={() => navigate("/signup")}
            />
            <Button
              className="custom-outline-btn"
              label="Sign In"
              outlined
              onClick={() => navigate("/login")}
            />
          </div>
        </div>
      </div>

      <div id="right">
        <div id="photos">
          <div className="left-photos">
            <div className="photo-container">
              <Image src={photo1} />
            </div>
            <div className="photo-container">
              <Image src={photo2} />
            </div>
            <div className="photo-container">
              <Image src={photo3} />
            </div>
          </div>

          <div className="right-photos">
            <div className="photo-container">
              <Image src={photo4} />
            </div>
            <div className="photo-container">
              <Image src={photo5} />
            </div>
            <div className="photo-container">
              <Image src={photo6} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
