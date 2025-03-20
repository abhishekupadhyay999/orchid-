import { Fragment, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import DropFile from "../../../src/components/apps/email/DropFile";
import EmailLayout from "../../../src/components/apps/email/EmailLayout";
import PageTitle_ from "../../../src/components/PageTitle";
import { moodChange, pageTitle } from "../../../src/redux/action/utils";
const Compose = ({ pageTitle }) => {
  const version = useSelector((state) => state.theme.version);
  useEffect(() => {
    if (version !== "dark") {
      moodChange();
    }
    pageTitle("Compose");
  }, []);
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <Fragment>
      <PageTitle_ active="Compose" mother="Email" />
      <EmailLayout openMenu={openMenu}>
        <div className="d-flex align-items-center">
          <h4 className="d-md-none d-sm-block">Email</h4>
          <div className={`email-tools-box float-end mb-2 ${openMenu ? 'active' : ''}`}
            onClick={ ()=>setOpenMenu(!openMenu)}
          >
            <i className="fa-solid fa-list-ul"></i>
          </div>
        </div>
        <div className="compose-content">
          <form action="#" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control bg-transparent"
                placeholder=" To:"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control bg-transparent"
                placeholder=" Subject:"
              />
            </div>
            <div className="mb-3">
              <textarea
                id="email-compose-editor"
                className="textarea_editor form-control bg-transparent"
                rows={8}
                placeholder="Enter text ..."
                defaultValue={""}
              />
            </div>
          </form>
          <h5 className="mb-4">
            <i className="fa fa-paperclip" /> Attatchment
          </h5>
          <DropFile />
        </div>
        <div className="text-left mt-4 mb-3">
          <button className="btn btn-primary btn-sl-sm me-2" type="button">
            <span className="me-2">
              <i className="fa fa-paper-plane" />
            </span>
            Send
          </button>
          <button className="btn btn-danger light btn-sl-sm" type="button">
            <span className="me-2">
              <i className="fa fa-times" aria-hidden="true" />
            </span>
            Discard
          </button>
        </div>
      </EmailLayout>
    </Fragment>
  );
};

export default connect(null, { pageTitle })(Compose);
