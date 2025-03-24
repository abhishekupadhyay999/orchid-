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

  const [imgText, setImgText] = useState("");
  const [redirectLink, setRedirectLink] = useState("");
  const [redirectText, setRedirectText] = useState("");
  const [imgPosition, setImgPosition] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (version !== "dark") {
      moodChange();
    }
    pageTitle(id ? "Edit InstaStories" : "Create InstaStories");

    if (id) {
      fetchInstaData(id);
    }
  }, [id, pageTitle, version]);

  const fetchInstaData = async (instaID) => {
    try {
      const response = await axios.post("http://localhost:4000/api/hero/get-heros", { id: instaID });
      const heroData = response.data[0];

      if (heroData) {
        setImgText(heroData.img_text);
        setRedirectLink(heroData.redirect_link);
        setRedirectText(heroData.redirect_text);
        setImgPosition(heroData.img_position);
        if (heroData.image.data) {
          const base64Image = `data:image/png;base64,${Buffer.from(heroData.image.data).toString("base64")}`;
          setPreviewImage(base64Image);
        }
      }
    } catch (error) {
      console.error("Error fetching hero data:", error);
    }
  };

  const validationSchema = Yup.object({
    img_text: Yup.string().min(3, "Image text must be at least 3 characters").required("Image text is required"),
    redirect_link: Yup.string().url("Invalid URL format").required("Redirect link is required"),
    redirect_text: Yup.string().required("Redirect text is required"),
    img_position: Yup.string().required("Image position is required"),
    image: Yup.mixed().test("fileType", "Unsupported file format", (value) =>
      !value || ["image/jpg", "image/jpeg", "image/png"].includes(value?.type)
    ),
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    try {
      validationSchema.validateSync({ img_text: imgText, redirect_link: redirectLink, redirect_text: redirectText, img_position: imgPosition, image }, { abortEarly: false });
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
        formData.append("img_text", imgText);
        formData.append("redirect_link", redirectLink);
        formData.append("redirect_text", redirectText);
        formData.append("img_position", imgPosition);
        if (image) {
          formData.append("image", image);
        }
        formData.append("id", id);

        const url = id ? "http://localhost:4000/api/hero/update-insta" : "http://localhost:4000/api/hero/create-insta";
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
    <div className="row d-flex justify-content-center">
      <div className="col-xl-6 col-lg-6">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">{id ? "Edit Insta" : "Create Insta"}</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Image Text</label>
                <input type="text" className="form-control" value={imgText} onChange={(e) => setImgText(e.target.value)} />
                {errors.img_text && <div className="text-danger">{errors.img_text}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Redirect Link</label>
                <input type="text" className="form-control" value={redirectLink} onChange={(e) => setRedirectLink(e.target.value)} />
                {errors.redirect_link && <div className="text-danger">{errors.redirect_link}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Redirect Text</label>
                <input type="text" className="form-control" value={redirectText} onChange={(e) => setRedirectText(e.target.value)} />
                {errors.redirect_text && <div className="text-danger">{errors.redirect_text}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Image Position</label>
                <input type="text" className="form-control" value={imgPosition} onChange={(e) => setImgPosition(e.target.value)} />
                {errors.img_position && <div className="text-danger">{errors.img_position}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Image for Hero Section</label>
                <input className="form-control" type="file" onChange={handleFileChange} />
                {errors.image && <div className="text-danger">{errors.image}</div>}
              </div>

              {previewImage && <Image src={previewImage} alt="hero" width="150" height="150" />}

              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : id ? "Update Hero" : "Create Hero"}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { pageTitle })(Element);
