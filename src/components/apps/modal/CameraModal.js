import { Modal } from "react-bootstrap";
const CameraModal = ({ modal, modalChange }) => {
  return (
    <Modal show={modal} onHide={() => modalChange()} centered>
      <div className="modal-content border-0">
        <div className="modal-header">
          <h5 className="modal-title">Upload images</h5>
          <button
            type="button"
            className="btn-close"
            data-dismiss="modal"
            onClick={() => modalChange()}
          >
            {/* <span>×</span> */}
          </button>
        </div>
        <div className="modal-body">
            <div className="input-group mb-3 flex-nowrap">
              <span className="input-group-text">Upload</span>
              <div className="form-file border-left-end overflow-hidden">
                <input type="file" className="form-file-input form-control" />
              </div>
            </div>
          </div>
      </div>
    </Modal>
  );
};

export default CameraModal;
