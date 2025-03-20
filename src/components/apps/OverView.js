import Link from "next/link";
import { useState } from "react";
import SendMeg from "./modal/SendMeg";
const OverView = ({ overview: { reviews, follower, placeStay } }) => {
  const [postModel, setPostModel] = useState(false);
  return (
    <div className="col-xl-12">
      <SendMeg postModel={postModel} modelChange={() => setPostModel(false)} />
      <div className="card">
        <div className="card-body">
          <div className="profile-statistics">
            <div className="text-center">
              <div className="row">
                <div className="col">
                  <h3 className="m-b-0">{follower && follower}</h3>
                  <span>Follower</span>
                </div>
                <div className="col">
                  <h3 className="m-b-0">{placeStay && placeStay}</h3>
                  <span>Place Stay</span>
                </div>
                <div className="col">
                  <h3 className="m-b-0">{reviews && reviews}</h3>
                  <span>Reviews</span>
                </div>
              </div>
              <div className="mt-4">
                <Link href="#" scroll={false}  className="btn btn-primary mb-1 me-1">Follow</Link>
                <Link href="#" scroll={false}
                    className="btn btn-primary mb-1"
                    data-toggle="modal"
                    data-target="#sendMessageModal"
                    onClick={() => setPostModel(true)}
                  >
                    Send Message                  
                </Link>
              </div>
            </div>
            {/* Modal */}
            <div className="modal fade" id="sendMessageModal">
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Send Message</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-dismiss="modal"
                    >
                      
                    </button>
                  </div>
                  <div className="modal-body">
                    <form
                      className="comment-form"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Name <span className="required">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="Author"
                              name="Author"
                              placeholder="Author"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Email <span className="required">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="Email"
                              placeholder="Email"
                              name="Email"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Comment
                            </label>
                            <textarea
                              rows={8}
                              className="form-control"
                              name="comment"
                              placeholder="Comment"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="mb-3 mb-0">
                            <input
                              type="submit"
                              defaultValue="Post Comment"
                              className="submit btn btn-primary"
                              name="submit"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
