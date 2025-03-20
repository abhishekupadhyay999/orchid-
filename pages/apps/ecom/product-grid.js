import Link from "next/dist/client/link";
import Image from "next/image";
import { Fragment, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import RatingIcon from "../../../src/components/apps/RatingIcon";
import PageTitle_ from "../../../src/components/PageTitle";
import { allProducts } from "../../../src/redux/action/apps";
import { moodChange, pageTitle } from "../../../src/redux/action/utils";
const ProductGrid = ({ pageTitle, allProducts, products }) => {
  const version = useSelector((state) => state.theme.version);
  useEffect(() => {
    if (version !== "dark") {
      moodChange();
    }
    pageTitle("Product Grid");
    allProducts();
  }, []);  
  return (
    <Fragment>
      <PageTitle_ active="Product Grid" mother="Shop" customText={true} />
      <div className="row">
        {products &&
          products.map((p, i) => (
            <div className="col-xl-3 col-lg-6 col-sm-6" key={i}>
              <div className="card">
                <div className="card-body">
                  <div className="new-arrival-product">
                    <div className="new-arrivals-img-contnent">
                      <Image
                        className="img-fluid"
                        src={p.img}
                        width={300}
                        height={300}
                        alt="Product image"
                      />
                    </div>
                    <div className="new-arrival-content text-center mt-3">
                      <h4>
                        <Link href="/product-detail">
                          {p.name}
                        </Link>
                      </h4>
                      <ul className="star-rating">
                        <RatingIcon rating={p.rating} />
                      </ul>
                      <span className="price">${p.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  products: state.apps.products,
});

export default connect(mapStateToProps, { pageTitle, allProducts })(
  ProductGrid
);
