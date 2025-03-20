const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="copyright">
        <p>
          Copyright © Designed &amp; Developed by{" "}
          <a href="https://dexignzone.com/" target="_blank"  rel="noreferrer" >
            DexignZone
          </a>{" "}
          { year}
        </p>
      </div>
    </div>
  );
};

export default Footer;
