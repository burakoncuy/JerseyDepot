

import "./Footer.css";
import { RxGithubLogo } from "react-icons/rx";
import { FaReact, FaLinkedin } from "react-icons/fa";
import { PiFileHtmlDuotone, PiFileCssFill } from "react-icons/pi";
import { IoLogoJavascript } from "react-icons/io";
import { SiPython } from "react-icons/si";

function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer-content">

        <div className="team-section">
          <div className="team-member">

          <h3>Created By</h3>
<a
  href='https://burakoncuy.github.io/'
  target='_blank'
  rel='noopener noreferrer'>
    <h4>BurakOzdemir</h4>
</a>
            <div className="social-links">
              <a href="https://github.com/burakoncuy">
                <RxGithubLogo />
              </a>
              <a href="https://www.linkedin.com/in/burak-%C3%B6zdemir-64a2a9317/">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="technologies-used">
            <h3>Powered by:</h3>
            <div className="tech-icons">
              <i className="fab fa-react"><FaReact /></i>
              <i className="fab fa-html5"><PiFileHtmlDuotone /></i>
              <i className="fab fa-css3-alt"><PiFileCssFill /></i>
              <i className="fab fa-js-square"><IoLogoJavascript /></i>
              <i className="fab fa-python"><SiPython /></i>
            </div>
          </div>
        </div>
      </div>
      <div id='footer-copyright'>@ 2025 NowJersey</div>
    </div>
  );
}

export default Footer;