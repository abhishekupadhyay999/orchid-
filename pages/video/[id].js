import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect, useSelector } from "react-redux";
import * as Yup from "yup";
import { moodChange, pageTitle } from "../../src/redux/action/utils";
import axios from "axios";

const Element = ({ pageTitle }) => {
  const router = useRouter();
  const { id } = router.query;

  const version = useSelector((state) => state.theme.version);
  const [video, setVideo] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null); // For displaying existing video
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (version !== "dark") {
      moodChange();
    }
    pageTitle(id ? "Edit Video" : "Create Video");

    if (id) {
      fetchHeroData(id);
    }
  }, [id, pageTitle, version]);

  const fetchHeroData = async (heroId) => {
    try {
      const response = await axios.post("http://localhost:4000/api/video/get-video", { id: heroId });
      const heroData = response.data[0];
      if (heroData) {
        if (heroData.video) {
          setPreviewVideo(heroData.video); // Assuming it's a URL
        }
      }
    } catch (error) {
      console.error("Error fetching hero data:", error);
    }
  };

  // Validation schema
  const validationSchema = Yup.object({
    video: Yup.mixed().test("fileType", "Unsupported file format", (value) =>
      !value || ["video/mp4", "video/mov", "video/avi"].includes(value?.type)
    ),
  });


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);

    // Show preview for new video selection
    if (file) {
      setPreviewVideo(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    try {
      validationSchema.validateSync({video }, { abortEarly: false });
      return {};
    } catch (error) {
      return error.inner.reduce((acc, currError) => {
        acc[currError.path] = currError.message;
        return acc;
      }, {});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        if (video) {
          formData.append("video", video);
        }
        formData.append("id", id);

        const url = id ? "http://localhost:4000/api/video/update-video" : "http://localhost:4000/api/video/create-video";
        await axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
        router.push("/hero/herolist");
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-xl-6 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">{id ? "Edit Video" : "Create Video"}</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">Upload Video</label>
                    <input className="form-control" type="file" id="formFile" name="video" accept="video/*" onChange={handleFileChange} />
                    {errors.video && <div className="text-danger">{errors.video}</div>}
                  </div>

                  {/* Show existing video if editing */}
                  {previewVideo && (
                    <div className="mb-3">
                      <p>Current Video:</p>
                      <video width="100%" controls>
                        <source src={previewVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : id ? "Update Video" : "Create Video"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { pageTitle })(Element);
