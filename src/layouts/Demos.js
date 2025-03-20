import Link from "next/link";
import Image from 'next/image'
import { Fragment, useState } from "react";

import { connect } from "react-redux";
import { demoAction } from "../redux/action/themeAction";

function Demo({ demos, demoAction, activeDemo }) {
  const [show, setShow] = useState(false);
  return (
    <div className={`dz-demo-panel ${show ? "show" : ""}`}>
      <div className="bg-close" onClick={() => setShow(false)} />
      <Link href="#" scroll={false} passHref className="dz-demo-trigger" onClick={() => setShow(true)}>
          <span>
            <i className="las la-tint" />
          </span>        
      </Link>
      <div className="dz-demo-inner">
        <Link href={"#"} scroll={false} passHref
            className="btn btn-primary btn-sm px-2 py-1 mb-3"            
          >
            Delete All Cookie          
        </Link>
        <div className="dz-demo-header">
          <h4>Select A Demo</h4>
          <Link href={"#"} scroll={ false} passHref className="dz-demo-close" onClick={() => setShow(false)}>
              <span>
                <i className="las la-times" />
              </span>            
          </Link>
        </div>
        <div className="dz-demo-content ps ps--active-y">
          <div className="dz-wrapper">
            {demos &&
              demos.map((demo) => (
                <Fragment key={demo.id}>
                  <div
                    className={`overlay-bx rounded-lg dz-demo-bx demo-${
                      demo.id === activeDemo ? "active" : ""
                    }`}
                  >
                    <div className="overlay-wrapper rounded-lg">
                      <Image src={demo.image} alt="" className="w-100 img-fluid"
                        width={300}
                        height={200}
                      />
                    </div>
                    <div className="overlay-layer">
                      <Link href="#" scroll={ false}
                          className="btn c-pointer dz_theme_demo btn-secondary btn-sm me-2"
                          onClick={() => demoAction(demo.id, "ltr")}
                        >
                          Default                        
                      </Link>{" "}
                      
                    </div>
                  </div>
                  <h5
                    className="text-black"
                    style={{ textTransform: "capitalize" }}
                  >
                    {demo.name}
                  </h5>
                  <hr />
                </Fragment>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  demos: state.theme.demos,
  activeDemo: state.theme.activeDemo,
});
export default connect(mapStateToProps, { demoAction })(Demo);
