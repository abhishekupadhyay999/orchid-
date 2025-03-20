import Link from "next/dist/client/link";
import Image from "next/image";

const Highlights = ({ highlights: { dec, img, title } }) => {
  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-body">
          <div className="profile-blog">
            <h5 className="text-primary d-inline">Today Highlights</h5>
            <Image src={img} alt=""
              className="img-fluid mt-4 mb-4 w-100"
              width={200}
              height={200}
            />
            <h4>
              <Link href="/apps/post-details"
                className="text-black">Darwin&apos;s Special Pizza Place
              </Link>
            </h4>
            <p className="mb-0">{dec}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highlights;
