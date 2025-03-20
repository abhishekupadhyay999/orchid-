import EmailLeft from "./EmailLeft";
// import ToolBar2 from "./ToolBar2";
// import Toolber from "./Toolber";
const EmailLayout = ({ children, openMenu }) => {  
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className={`col-xl-3 email-left-body ${openMenu ? 'active' : ''}`}>
                <EmailLeft />
              </div>
              <div className="col-xl-9">
                <div className="email-right-box">
                  {/* {readToolbar ? <ToolBar2 /> : <Toolber />} */}                  
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailLayout;
