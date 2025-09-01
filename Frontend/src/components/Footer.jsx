import "./Footer.css";

function Footer() {
  return (
    <div className="f-info">
      <div className="f-info-socials">
        <i className="fa-brands fa-square-facebook"></i>
        <i className="fa-brands fa-linkedin"></i>
        <i className="fa-brands fa-square-instagram"></i>
      </div>
      <div>&copy; Wanderlust Private Limited</div>
      <div className="f-info-links">
        <a href="/">Privacy</a>
        <a href="/">Terms</a>
      </div>
    </div>
  );
}
export default Footer;
