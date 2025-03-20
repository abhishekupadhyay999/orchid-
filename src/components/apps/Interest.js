import Image from 'next/image';
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

const Interest = ({ interest }) => {
  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-body">
          <div className="profile-interest">
            <h5 className="text-primary d-inline">Interest</h5>            
            <LightGallery
              speed={500}
              plugins={[lgThumbnail, lgZoom]}
              elementClassNames="row mt-4 sp4"
              id="lightgallery"
            >
               {interest && interest.map((d, i) => (
                <div data-src={d} className="mb-1 col-lg-4 col-xl-4 col-sm-4 col-6" key={i}>
                   <Image src={d} style={{ width: "100%" }}
                     alt="gallery"
                     className="img-fluid"
                     width={100}
                     height={100}
                  />
                </div>
              ))}      
            </LightGallery>              
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interest;
