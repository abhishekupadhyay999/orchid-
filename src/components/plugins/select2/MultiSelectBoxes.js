import React from "react";
import MultipulSelect from "./MultipulSelect";

const MultiSelectBoxes = () => {
  return (
    <div className="col-xl-6">
      <div className="card">
        <div className="card-body">
          <div className="mb-4">
            <h4 className="card-title">Multi-select boxes</h4>
            <p>
              Select2 also supports multi-value select boxes. The select below
              is declared with the multiple{" "}
              <mark className="text-primary">attribute</mark>.
            </p>
          </div>
          <MultipulSelect />
        </div>
      </div>
    </div>
  );
};

export default MultiSelectBoxes;
