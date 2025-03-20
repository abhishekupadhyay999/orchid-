import { Dropdown } from "react-bootstrap";
const ToolBar2 = () => {
  return (
    <div role="toolbar" className="toolbar ms-sm-0 ms-1">
      <div className="btn-group mb-1">
        <div className="custom-control custom-checkbox ps-1">
          <input
            type="checkbox"
            className="form-check-input"
            id="checkAll"
          />
          <label className="form-check-label" htmlFor="checkAll" />
        </div>
      </div>
      <div className="btn-group mb-1">
        <button className="btn btn-primary light px-3" type="button">
          <i className="ti-reload" />
        </button>
      </div>
      <div className="btn-group mb-1">
        <Dropdown>
          <Dropdown.Toggle
            as="button"
            variant=""
            className="btn btn-primary light dropdown-toggle v ms-1"
          >
            More <span className="caret m-l-5" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {" "}
            <Dropdown.Item>Mark as Unread</Dropdown.Item>{" "}
            <Dropdown.Item>Add to Tasks</Dropdown.Item>
            <Dropdown.Item>Add Star</Dropdown.Item>{" "}
            <Dropdown.Item>Mute</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default ToolBar2;
