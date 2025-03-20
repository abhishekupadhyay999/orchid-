import Link from "next/link";
import { useEffect, useState } from "react";

const EmailLeft = () => {
  const [pageUrl, setPageUrl] = useState(null);
  useEffect(() => {
    setPageUrl(window.location.pathname);
  }, [pageUrl]);
  return (
    <div className="email-left-box">
      <div className="p-0">
        <Link href="/apps/email/compose" className="btn btn-primary btn-block">Compose</Link>
      </div>
      <div className="mail-list mt-4">
        <Link href="/apps/email/inbox" className="list-group-item active" passHref>
            <i className="fa fa-inbox font-18 align-middle me-2" /> Inbox{" "}
            <span className="badge badge-secondary badge-sm float-end">
              198
            </span>{" "}          
        </Link>
        <Link href="#" scroll={false} passHref
           className="list-group-item">
            <i className="fa fa-paper-plane font-18 align-middle me-2" />
            Sent          
        </Link>{" "}
        <Link href="#" scroll={false} passHref
           className="list-group-item">
            <i className="fa fa-star font-18 align-middle me-2" />
            Important{" "}
            <span className="badge badge-danger text-white badge-sm float-end">
              47
            </span>          
        </Link>
        <Link href="#" scroll={false} passHref
           className="list-group-item">
            <i className="mdi mdi-file-document-box font-18 align-middle me-2" />
            Draft          
        </Link>
        <Link href="#" scroll={false} passHref  passHrefclassName="list-group-item">
            <i className="fa fa-trash font-18 align-middle me-2" />
            Trash          
        </Link>
      </div>
      <div className="intro-title">
        <h5>Categories</h5>
      </div>
      <div className="mail-list mt-4">
        <Link href={`${pageUrl}`} passHref className="list-group-item">
            <span className="icon-warning">
              <i className="fa fa-circle" />
            </span>
            Work{" "}          
        </Link>
        <Link href={`${pageUrl}`} passHref className="list-group-item">
            <span className="icon-primary">
              <i className="fa fa-circle" />
            </span>
            Private{" "}          
        </Link>
        <Link href={`${pageUrl}`} passHref className="list-group-item">
            <span className="icon-success">
              <i className="fa fa-circle" />
            </span>
            Support{" "}          
        </Link>
        <Link href={`${pageUrl}`} passHref className="list-group-item">
            <span className="icon-dpink">
              <i className="fa fa-circle" />
            </span>
            Social{" "}          
        </Link>
      </div>
    </div>
  );
};

export default EmailLeft;
