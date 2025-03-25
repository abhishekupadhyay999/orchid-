import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect, useSelector } from "react-redux";
import * as Yup from "yup";
import { moodChange, pageTitle } from "../../src/redux/action/utils";
import axios from "axios";
import Image from "next/image";

const Element = ({ pageTitle }) => {
  const router = useRouter();
  const { id } = router.query; 

  const version = useSelector((state) => state.theme.version);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // For displaying existing image
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
      const response = await axios.post("http://localhost:4000/api/hero/get-heros", { id: heroId });
      const heroData = response.data[0];

      if (heroData) {
        setTitle(heroData.title);
        if (heroData.image.data) {
          const base64Image = `data:image/png;base64,${Buffer.from(heroData.image.data).toString("base64")}`;
          setPreviewImage(base64Image);
        }
      }
    } catch (error) {
      console.error("Error fetching hero data:", error);
    }
  };

  // Validation schema
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Hero text must be at least 3 characters")
      .required("Hero text is required"),
    image: Yup.mixed().test("fileType", "Unsupported file format", (value) =>
      !value || ["image/jpg", "image/jpeg", "image/png"].includes(value?.type)
    ),
  });

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Show preview for new image selection
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    try {
      validationSchema.validateSync({ title, image }, { abortEarly: false });
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
        formData.append("title", title);
        if (image) {
          formData.append("image", image);
        }
        formData.append("id", id); 

        const url = id ? "http://localhost:4000/api/hero/update-hero" : "http://localhost:4000/api/hero/create-hero";
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
                    <label htmlFor="title" className="form-label">Video Text</label>
                    <input
                      id="title"
                      type="text"
                      className="form-control input-default"
                      placeholder="Hero Text"
                      name="title"
                      value={title}
                      onChange={handleChange}
                    />
                    {errors.title && <div className="text-danger">{errors.title}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">Video for Hero Section</label>
                    <input className="form-control" type="file" id="formFile" name="image" onChange={handleFileChange} />
                    {errors.image && <div className="text-danger">{errors.image}</div>}
                  </div>

                  {/* Show existing image if editing */}
                  {previewImage && (
                    <div className="mb-3">
                      <p>Current Image:</p>
                      <Image src={previewImage} alt="hero" width="150" height="150" />
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
