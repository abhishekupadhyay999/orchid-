import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect, useSelector } from "react-redux";
import * as Yup from "yup";
import { moodChange, pageTitle } from "../../src/redux/action/utils";
import axios from "axios";
import Image from "next/image";

const Element = ({ pageTitle }) => {
  const router = useRouter();
  const { id } = router.query; // Get hero ID from URL

  const version = useSelector((state) => state.theme.version);
  const [video, setVideo] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // For displaying existing image
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (version !== "dark") {
      moodChange();
    }
    pageTitle(id ? "Edit Video" : "Create Video");

    if (id) {
      fetchVideoData(id);
    }
  }, [id, pageTitle, version]);

  // Fetch hero details if ID is present
  const fetchVideoData = async (videoId) => {
    try {
      const response = await axios.post("http://localhost:4000/api/video/get-video", { id: videoId });
      const videoData = response.data[0];

      if (videoData) {
        if (videoData.image.data) {
          const base64Image = `data:image/png;base64,${Buffer.from(videoData.image.data).toString("base64")}`;
          setPreviewImage(base64Image);
        }
      }
    } catch (error) {
      console.error("Error fetching hero data:", error);
    }
  };

  // Validation schema
  const validationSchema = Yup.object({
    video: Yup.mixed().required("Video is required").test("fileType", "Unsupported file format", (value) =>
      !value || ["image/jpg", "image/jpeg", "image/png"].includes(value?.type)
    ),
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);

    // Show preview for new image selection
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    try {
      validationSchema.validateSync({ video }, { abortEarly: false });
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
          formData.append("image", video);
        }
        formData.append("id", id); 

        const url = id ? "http://localhost:4000/api/video/update-video" : "http://localhost:4000/api/video/create-video";
        await axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
        router.push("/video/videolist");
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
              <h4 className="card-title">{id ? "Edit Hero" : "Create Hero"}</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">Image for Hero Section</label>
                    <input className="form-control" type="file" id="formFile" name="video" onChange={handleFileChange} />
                    {errors.video && <div className="text-danger">{errors.video}</div>}
                  </div>

                  {/* Show existing image if editing */}
                  {previewImage && (
                    <div className="mb-3">
                      <p>Current Image:</p>
                      <Image src={previewImage} alt="hero" width="150" height="150" />
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : id ? "Update Hero" : "Create Hero"}
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
