import React from "react";

const StepOne = () => {
   return (
      <section>
         <div className="row">
            <div className="col-lg-6 mb-2">
               <div className="mb-3">
                  <label className="form-label">First name
                     <span className="required ms-1">*</span>
                  </label>
                  <input
                     type="text"
                     name="firstName"
                     className="form-control"
                     placeholder="Parsley"
                     required
                  />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="mb-3">
                  <label className="form-label">Last Name
                     <span className="required ms-1">*</span>
                  </label>
                  <input
                     type="text"
                     name="lastName"
                     className="form-control"
                     placeholder="Montana"
                     required
                  />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="mb-3">
                  <label className="form-label">Email Address
                     <span className="required ms-1">*</span>
                  </label>
                  <input
                     type="email"
                     className="form-control"
                     id="inputGroupPrepend2"
                     aria-describedby="inputGroupPrepend2"
                     placeholder="example@example.com.com"
                     required
                  />
               </div>
            </div>
            <div className="col-lg-6 mb-2">
               <div className="mb-3">
                  <label className="form-label">Phone Number
                     <span className="required ms-1">*</span>
                  </label>
                  <input
                     type="number"
                     name="phoneNumber"
                     className="form-control"
                     placeholder="(+1)408-657-9007"
                     required
                  />
               </div>
            </div>
            <div className="col-lg-12 mb-3">
               <div className="mb-3">
                  <label className="form-label">Where are you from
                     <span className="required ms-1">*</span>
                  </label>
                  <input
                     type="text"
                     name="place"
                     className="form-control"
                     required
                  />
               </div>
            </div>
         </div>
      </section>
   );
};

export default StepOne;
