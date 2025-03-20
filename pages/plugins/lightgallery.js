import Image from 'next/image';
import { Fragment, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import PageTitle_ from "../../src/components/PageTitle";
import { moodChange, pageTitle } from "../../src/redux/action/utils";

import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom'

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

const GalleryData = [
  { thumb: '/images/big/img1.jpg' },
  { thumb: '/images/big/img2.jpg' },
  { thumb: '/images/big/img3.jpg' },
  { thumb: '/images/big/img4.jpg' },
  { thumb: '/images/big/img5.jpg' },
  { thumb: '/images/big/img6.jpg' },
  { thumb: '/images/big/img7.jpg' },
  { thumb: '/images/big/img8.jpg' },
]

const LightGalleryPage = ({ pageTitle }) => {
  const version = useSelector((state) => state.theme.version);
  useEffect(() => {
    if (version !== "dark") {
      moodChange();
    }
    pageTitle("lightGallery");
  }, []);
  return (
    <Fragment>
      <PageTitle_ active="lightGallery" mother="Plugins" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Light Gallery</h4>
            </div>
            <div className="card-body pb-1">
              <LightGallery
								speed={500}
								plugins={[lgThumbnail, lgZoom]}
								elementClassNames="row"
							>
								{GalleryData && GalleryData.map((item, index) => (
									<div data-src={item.thumb} className="col-lg-3 col-md-6 mb-4" key={index}>
                    <Image src={item.thumb}
                      style={{ width: "100%" }}
                      width={200}
                      height={118}
                      alt="gallery"
                      className='cursor-pointer img-fluid' />
									</div>
								))}
							</LightGallery>              
            </div>
          </div>
          {/* /# card */}
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, { pageTitle })(LightGalleryPage);
