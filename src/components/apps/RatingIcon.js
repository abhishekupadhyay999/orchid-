import { Fragment } from "react";

const RatingIcon = ({ rating }) => {
  return (
    <Fragment>
      <li>
        <i
          className={`fa ${rating >= 1 ? "fa-star " : "fa-solid fa-star-half-stroke"}`}
        />{" "}
      </li>
      <li>
        <i
          className={`fa ${rating >= 2 ? "fa-star " : "fa-solid fa-star-half-stroke"}`}
        />{" "}
      </li>
      <li>
        <i
          className={`fa ${rating >= 3 ? "fa-star " : "fa-solid fa-star-half-stroke"}`}
        />{" "}
      </li>
      <li>
        <i
          className={`fa ${rating >= 4 ? "fa-star " : "fa-solid fa-star-half-stroke"}`}
        />{" "}
      </li>
      <li>
        <i
          className={`fa ${rating >= 5 ? "fa-star " : "fa-solid fa-star-half-stroke"}`}
        />{" "}
      </li>
    </Fragment>
  );
};

export default RatingIcon;
