import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect, useSelector } from "react-redux";
import * as Yup from "yup";
import { moodChange, pageTitle } from "../../src/redux/action/utils";
import Image from "next/image";

const CreateDestination = ({ pageTitle }) => {
  const router = useRouter();
  const { id } = router.query;

  const version = useSelector((state) => state.theme.version);
  const [formData, setFormData] = useState({
    img: null,
    header: "",
    details: "",
    link: "",
    date: "",
    mainpageimg1: null,
    mainpageimg2: null,
    category: "", // for the dropdown
  });
  const [previewImages, setPreviewImages] = useState({
    img: null,
    mainpageimg1: null,
    mainpageimg2: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([
    "Popular",
    "Upcoming",
    "Recent",
  ]);

  useEffect(() => {
    if (version !== "dark") {
      moodChange();
    }
    pageTitle(id ? "Edit Destination" : "Create Destination");
  }, [id, pageTitle, version]);

  // Validation schema
  const validationSchema = Yup.object({
    header: Yup.string()
      .min(3, "Header must be at least 3 characters")
      .required("Header is required"),
    details: Yup.string()
      .min(10, "Details must be at least 10 characters")
      .required("Details are required"),
    link: Yup.string()
      .url("Please enter a valid URL")
      .required("Link is required"),
    date: Yup.string().required("Date is required"),
    category: Yup.string().required("Category is required"),
    img: Yup.mixed().test(
      "fileType",
      "Unsupported file format",
      (value) =>
        !value || ["image/jpg", "image/jpeg", "image/png"].includes(value?.type)
    ),
    mainpageimg1: Yup.mixed().test(
      "fileType",
      "Unsupported file format",
      (value) =>
        !value || ["image/jpg", "image/jpeg", "image/png"].includes(value?.type)
    ),
    mainpageimg2: Yup.mixed().test(
      "fileType",
      "Unsupported file format",
      (value) =>
        !value || ["image/jpg", "image/jpeg", "image/png"].includes(value?.type)
    ),
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    setFormData((prevData) => ({
      ...prevData,
      [name]: file,
    }));

    // Show preview for new image selection
    if (file) {
      setPreviewImages((prevPreviews) => ({
        ...prevPreviews,
        [name]: URL.createObjectURL(file),
      }));
    }
  };

  const validate = () => {
    try {
      validationSchema.validateSync(formData, { abortEarly: false });
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
        // Just log the form data
        console.log("Form Data being submitted:");
        console.log({
          id: id || "New destination",
          header: formData.header,
          details: formData.details,
          link: formData.link,
          date: formData.date,
          category: formData.category,
          hasMainImage: formData.img ? true : false,
          hasMainPageImage1: formData.mainpageimg1 ? true : false,
          hasMainPageImage2: formData.mainpageimg2 ? true : false
        });
        
        console.log("Form submitted successfully");
        
        // Simulating completion
        setTimeout(() => {
          setIsSubmitting(false);
        }, 1000);
        
      } catch (error) {
        console.error("Error:", error);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-xl-8 col-lg-8">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                {id ? "Edit Destination" : "Create Destination"}
              </h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="img" className="form-label">
                      Main Image
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="img"
                      name="img"
                      onChange={handleFileChange}
                    />
                    {errors.img && (
                      <div className="text-danger">{errors.img}</div>
                    )}
                    {previewImages.img && (
                      <div className="mt-2">
                        <p>Current Image:</p>
                        <Image
                          src={previewImages.img}
                          alt="destination"
                          width="150"
                          height="150"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="header" className="form-label">
                      Header
                    </label>
                    <input
                      id="header"
                      type="text"
                      className="form-control input-default"
                      placeholder="Destination Header"
                      name="header"
                      value={formData.header}
                      onChange={handleTextChange}
                    />
                    {errors.header && (
                      <div className="text-danger">{errors.header}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="details" className="form-label">
                      Details
                    </label>
                    <textarea
                      id="details"
                      className="form-control"
                      rows="4"
                      placeholder="Destination Details"
                      name="details"
                      value={formData.details}
                      onChange={handleTextChange}
                    ></textarea>
                    {errors.details && (
                      <div className="text-danger">{errors.details}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="link" className="form-label">
                      Link
                    </label>
                    <input
                      id="link"
                      type="url"
                      className="form-control input-default"
                      placeholder="https://example.com"
                      name="link"
                      value={formData.link}
                      onChange={handleTextChange}
                    />
                    {errors.link && (
                      <div className="text-danger">{errors.link}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      className="form-control input-default"
                      name="date"
                      value={formData.date}
                      onChange={handleTextChange}
                    />
                    {errors.date && (
                      <div className="text-danger">{errors.date}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <select
                      id="category"
                      className="form-control"
                      name="category"
                      value={formData.category}
                      onChange={handleTextChange}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <div className="text-danger">{errors.category}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="mainpageimg1" className="form-label">
                      Main Page Image 1
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="mainpageimg1"
                      name="mainpageimg1"
                      onChange={handleFileChange}
                    />
                    {errors.mainpageimg1 && (
                      <div className="text-danger">{errors.mainpageimg1}</div>
                    )}
                    {previewImages.mainpageimg1 && (
                      <div className="mt-2">
                        <p>Current Image:</p>
                        <Image
                          src={previewImages.mainpageimg1}
                          alt="mainpage 1"
                          width="150"
                          height="150"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="mainpageimg2" className="form-label">
                      Main Page Image 2
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="mainpageimg2"
                      name="mainpageimg2"
                      onChange={handleFileChange}
                    />
                    {errors.mainpageimg2 && (
                      <div className="text-danger">{errors.mainpageimg2}</div>
                    )}
                    {previewImages.mainpageimg2 && (
                      <div className="mt-2">
                        <p>Current Image:</p>
                        <Image
                          src={previewImages.mainpageimg2}
                          alt="mainpage 2"
                          width="150"
                          height="150"
                        />
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : id
                      ? "Update Destination"
                      : "Create Destination"}
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

export default connect(null, { pageTitle })(CreateDestination);