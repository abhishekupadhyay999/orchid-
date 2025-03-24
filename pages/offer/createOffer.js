import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect, useSelector } from "react-redux";
import * as Yup from "yup";
import { moodChange, pageTitle } from "../../src/redux/action/utils";
import axios from "axios";
import Image from "next/image";

const Offer = ({ pageTitle }) => {
  const router = useRouter();
  const { id } = router.query;
  const version = useSelector((state) => state.theme.version);

  const [description, setDescription] = useState("");
  const [imgText, setImgText] = useState("");
  const [redirectLink, setRedirectLink] = useState("");
  const [locationDetails, setLocationDetails] = useState("");
  const [offerDate, setOfferDate] = useState("");
  const [imgStatus, setImgStatus] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (version !== "dark") {
      moodChange();
    }
    pageTitle(id ? "Edit Offer" : "Create Offer");

    if (id) {
      fetchOfferData(id);
    }
  }, [id, pageTitle, version]);

  const fetchOfferData = async (offerID) => {
    try {
      const response = await axios.post("http://localhost:4000/api/offer/get-offers", { id: offerID });
      const offerData = response.data[0];

      if (offerData) {
        setDescription(offerData.description);
        setImgText(offerData.img_text);
        setRedirectLink(offerData.redirect_link);
        setLocationDetails(offerData.location_details);
        setOfferDate(offerData.offer_date);
        setImgStatus(offerData.img_status);
        if (offerData.image?.data) {
          const base64Image = `data:image/png;base64,${Buffer.from(offerData.image.data).toString("base64")}`;
          setPreviewImage(base64Image);
        }
      }
    } catch (error) {
      console.error("Error fetching offer data:", error);
    }
  };

  const validationSchema = Yup.object({
    description: Yup.string().required("Description is required"),
    img_text: Yup.string().required("Image text is required"),
    redirect_link: Yup.string().url("Invalid URL format").required("Redirect link is required"),
    location_details: Yup.string().required("Location details are required"),
    offer_date: Yup.date().required("Offer date is required"),
    img_status: Yup.string().required("Image status is required"),
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
      validationSchema.validateSync({ description, img_text: imgText, redirect_link: redirectLink, location_details: locationDetails, offer_date: offerDate, img_status: imgStatus, image }, { abortEarly: false });
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
        formData.append("description", description);
        formData.append("img_text", imgText);
        formData.append("redirect_link", redirectLink);
        formData.append("location_details", locationDetails);
        formData.append("offer_date", offerDate);
        formData.append("img_status", imgStatus);
        if (image) {
          formData.append("image", image);
        }
        formData.append("id", id);

        const url = id ? "http://localhost:4000/api/offer/update-offer" : "http://localhost:4000/api/offer/create-offer";
        await axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
        router.push("/offer/offerlist");
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
            <h4 className="card-title">{id ? "Edit Offer" : "Create Offer"}</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <div className="text-danger">{errors.description}</div>}
          </div>
          <div className="mb-3">
          <label className="form-label">Image Text</label>
          <input
            type="text"
            className="form-control"
            value={imgText}
            onChange={(e) => setImgText(e.target.value)}
          />
          {errors.img_text && <div className="text-danger">{errors.img_text}</div>}
        </div>
        <div className="mb-3">
            <label className="form-label">Redirect Link</label>
            <input
              type="text"
              className="form-control"
              value={redirectLink}
              onChange={(e) => setRedirectLink(e.target.value)}
            />
            {errors.redirect_link && <div className="text-danger">{errors.redirect_link}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Location Details</label>
            <input
              type="text"
              className="form-control"
              value={locationDetails}
              onChange={(e) => setLocationDetails(e.target.value)}
            />
            {errors.location_details && <div className="text-danger">{errors.location_details}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Offer Date</label>
            <input
              type="date"
              className="form-control"
              value={offerDate}
              onChange={(e) => setOfferDate(e.target.value)}
            />
            {errors.offer_date && <div className="text-danger">{errors.offer_date}</div>}
          </div>


              <div className="mb-3">
                <label className="form-label">Image</label>
                <input className="form-control" type="file" onChange={handleFileChange} />
                {errors.image && <div className="text-danger">{errors.image}</div>}
                {previewImage && <Image src={previewImage} alt="Offer" width={150} height={150} />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { pageTitle })(Offer);
