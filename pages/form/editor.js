import dynamic from "next/dynamic";
import { Fragment, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import PageTitle_ from "../../src/components/PageTitle";
import { moodChange, pageTitle } from "../../src/redux/action/utils";

const FormEditor = ({ pageTitle }) => {
  const version = useSelector((state) => state.theme.version);
  useEffect(() => {
    if (version !== "dark") {
      moodChange();
    }
    pageTitle("CkEditor");
  }, []);

  
  return (
    <Fragment>
      <PageTitle_ active="CkEditor" mother="Form" />
      <div className="row">
        <div className="col-xl-12 col-xxl-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">CkEditor</h4>
            </div>
            <div className="card-body">
              <div className="summernote">                
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, { pageTitle })(FormEditor);
