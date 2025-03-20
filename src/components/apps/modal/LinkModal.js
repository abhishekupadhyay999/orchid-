import { Modal } from "react-bootstrap";
import Link from "next/link";

const LinkModal = ({ modul, modelChange }) => {
  return (
    <Modal show={modul} onHide={() => modelChange()} centered>
      <div className="modal-content border-0 post-input">
        <div className="modal-header">
          <h5 className="modal-title">Social Links</h5>
          <button
            type="button"
            className="btn-close"
            data-dismiss="modal"
            onClick={() => modelChange()}
          >
            {/* <span>×</span> */}
          </button>
        </div>

        <div className="modal-body">
          <Link href={"#"} passHref className="btn-social facebook">
            <i className="fa-brands fa-facebook-f" />
          </Link>
          <Link href={"#"} passHref className="btn-social ms-1 google-plus">
            <i className="fa-brands fa-google-plus-g" />
          </Link>
          <Link href={"#"} passHref className="btn-social ms-1 linkedin">
            <i className="fa-brands fa-linkedin-in" />
          </Link>
          <Link href={"#"} passHref className="btn-social ms-1 instagram">
            <i className="fa-brands fa-instagram" />
          </Link>
          <Link href={"#"} passHref className="btn-social ms-1 twitter">
            <i className="fa-brands fa-twitter" />
          </Link>
          <Link href={"#"} passHref className="btn-social ms-1 youtube">
            <i className="fa-brands fa-youtube" />
          </Link>
          <Link href={"#"} passHref className="btn-social ms-1 whatsapp">
            <i className="fa-brands fa-whatsapp" />
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default LinkModal;
