import Link from "next/link";
import Image from 'next/image'

const News = ({ news }) => {
  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-body">
          <div className="profile-news">
            <h5 className="text-primary d-inline">Our Latest News</h5>
            {news &&
              news.map((n, i) => (
                <div className="media pt-3 pb-3" key={i}>
                  <Image
                    src={n.img}
                    alt="image"
                    className="me-3 rounded"
                    width={75}
                    height={75}
                  />
                  <div className="media-body">
                    <h5 className="m-b-5">
                      <Link href="/apps/post-details"
                         className="text-black">{n.title}
                      </Link>
                    </h5>
                    <p className="mb-0">{n.dec}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
