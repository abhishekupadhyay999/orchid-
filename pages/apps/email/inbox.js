import Link from "next/link";
import { Fragment, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import EmailLayout from "../../../src/components/apps/email/EmailLayout";
import ToolBar2 from "../../../src/components/apps/email/ToolBar2";
import Table from "../../../src/components/InboxTable";
import PageTitle_ from "../../../src/components/PageTitle";
import { emailInbox } from "../../../src/redux/action/apps";
import { moodChange, pageTitle } from "../../../src/redux/action/utils";
const inbox = ({ pageTitle, emailInbox, inboxData }) => {
  // const version = useSelector((state) => state.theme.version);
  // useEffect(() => {
  //   if (version !== "dark") {
  //     moodChange();
  //   }
  //   pageTitle("Inbox");
  //   emailInbox();
  // }, []);
  return (
    <Fragment>
      <PageTitle_ active="Inbox" mother="Email" />
      <EmailLayout readToolbar={true}>
        <ToolBar2 />
        <Table
          tableId=".message"
          sort={10}
          pagginationContainerId="#inbox-pagination"
          previousBtnClass="page-item page-indicator"
          previousBtnId="inbox-previous"
          previousIcon="la la-angle-left"
          nextBtnClass="page-item page-indicator"
          nextBtnId="inbox-next"
          nextIcon="la la-angle-right"
          pagginationClass="page-item "
          activeClass="active"
          pagginationId="inbox-paginaiton"
          // checkBox={true}
          checkBoxAll=".form-check-input"
          // checkBoxMother="#checkAll"
          inbox={true}
        >
          <div className="email-list mt-3">
            {inboxData &&
              inboxData.map((inbox, i) => (
                <div className="message" key={i}>
                  <div>
                    <div className="d-flex message-single">
                      <div className="ps-1 align-self-center mt-2">
                        <div className="form-check custom-checkbox ">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`checkbox-${i}`}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`checkbox-${i}`}
                          />
                        </div>
                      </div>
                      <div className="ms-2">
                        <button className="border-0 bg-transparent align-middle p-0">
                          <i className="fa fa-star" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <Link href="/apps/email/read" className="col-mail col-mail-2">
                        <div className="subject">{inbox.title}</div>
                        <div className="date">{inbox.date}</div>                      
                    </Link>
                  </div>
                </div>
              ))}
          </div>
          <div className="row mt-4">
            <div className="col-12 pl-3">
              <nav>
                <ul
                  id="inbox-pagination"
                  className="pagination pagination-gutter pagination-primary pagination-sm no-bg"
                ></ul>
              </nav>
            </div>
          </div>
        </Table>
      </EmailLayout>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  inboxData: state.apps.emailInbox,
});

export default connect(mapStateToProps, { pageTitle, emailInbox })(inbox);
