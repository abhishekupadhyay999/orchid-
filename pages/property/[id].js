import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect, useSelector } from "react-redux";
import axios from "axios";
import { moodChange, pageTitle } from "../../src/redux/action/utils";
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form
import { yupResolver } from "@hookform/resolvers/yup"; // Import yupResolver
import * as Yup from "yup"; // Import Yup
import Image from "next/image";
import { toast } from "react-toastify";


const Property = ({ pageTitle }) => {
  const router = useRouter();
  const { id } = router.query;
  const version = useSelector((state) => state.theme.version);
  const [previewImg1, setPreviewImg1] = useState(null);
  const [previewImg2, setPreviewImg2] = useState(null);
  const [previewImg3, setPreviewImg3] = useState(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define Yup schema for validation
  const schema = Yup.object().shape({
    description: Yup.string().required("Description is required"),
    img_text: Yup.string().required("Image text is required"),
    redirect_link: Yup.string().url("Invalid URL format").required("Redirect link is required"),
    redirect_text: Yup.string().required("Redirect text is required"), // Added validation for redirect_text
    property_type: Yup.string().required("Property type is required"), // Added validation for property_type
    property_category: Yup.string().required("Property category is required"), // Added validation for property_category
    city: Yup.string().required("City is required"), // Added validation for city
    location_details: Yup.string().required("Location details are required"),
    offer_date: Yup.date().required("Offer date is required"),
    img_status: Yup.string().required("Image status is required"),
    img1: Yup.mixed()
       .test("image", "Unsupported file format", (value) => {
         return !value || (value[0] && ["image/jpg", "image/jpeg", "image/png"].includes(value[0].type));
       }),
     
     img2: Yup.mixed()
       .test("image", "Unsupported file format", (value) => {
         return !value || (value[0] && ["image/jpg", "image/jpeg", "image/png"].includes(value[0].type));
       }),
     
     img3: Yup.mixed()
       .test("image", "Unsupported file format", (value) => {
         return !value || (value[0] && ["image/jpg", "image/jpeg", "image/png"].includes(value[0].type));
       }),
  });

  // Use react-hook-form with Yup validation
  const { register,watch, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      description: "",
      img_text: "",
      redirect_link: "",
      redirect_text: "",
      property_type: "",
      property_category: "",
      city: "",
      location_details: "",
      offer_date: new Date().toISOString().split("T")[0], 
      img_status: "",
      img1: null,
      img2: null,
      img3: null, 
       }
  });

  const propertyType = watch("property_type");

  const categoryOptions = {
    Destinations: ["Leisure", "Business", "Heritage", "Wellness"],
    Meetings: ["Upcoming Events", "Meeting Rooms", "Banquet Area", "Wedding Venues", "Heritage", "Wellness"],
  };
  useEffect(() => {
    if (version !== "dark") {
      moodChange();
    }
    pageTitle(id ? "Edit Property" : "Create Property");
    if (id) {
      fetchOfferData(id);
    }
  }, [id, pageTitle, version]);

  // Fetch the existing data if id is present (for editing)
  const fetchOfferData = async (id) => {
    try {
        const response = await axios.post("http://localhost:4000/api/property/get-properties", { id: id },{
            headers:{
            }
        });
        const data = response.data[0];
      setValue("description", data.description);
      setValue("img_text", data.img_text);
      setValue("redirect_link", data.redirect_link);
      setValue("redirect_text", data.redirect_text);
      setValue("property_type", data.property_type);
      setValue("property_category", data.property_category);
      setValue("city", data.city);
      setValue("location_details", data.location_details);
      setValue("offer_date", new Date(data.offer_date).toISOString().split("T")[0]);
      setValue("img_status", data.img_status);
     
      const base64Image = `data:image/png;base64,${Buffer.from(data.img.data).toString("base64")}`;
      setPreviewImg1(base64Image)

      const base64Image2 = `data:image/png;base64,${Buffer.from(data.main_img.data).toString("base64")}`;
      setPreviewImg2(base64Image2)

      const base64Image3 = `data:image/png;base64,${Buffer.from(data.main_sub_img.data).toString("base64")}`;
      setPreviewImg3(base64Image3)

    } catch (error) {

    }
  };

  // Form submit handler
  const onSubmit = async (data) => {

    const formData = new FormData();
    formData.append("id", id); 
    formData.append("description", data.description);
    formData.append("img_text", data.img_text);
    formData.append("redirect_link", data.redirect_link);
    formData.append("redirect_text", data.redirect_text);
    formData.append("property_type", data.property_type);
    formData.append("property_category", data.property_category);
    formData.append("city", data.city);
    formData.append("location_details", data.location_details);
    formData.append("offer_date", new Date(data.offer_date));
    formData.append("img_status", data.img_status);

    if (data.img1) formData.append("img1", data.img1[0]);
    if (data.img2) formData.append("img2", data.img2[0]);
    if (data.img3) formData.append("img3", data.img3[0]);

    try {
      const url = id ? "http://localhost:4000/api/property/update-property" : "http://localhost:4000/api/property/create-property";
      const response = await axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
        if(response.status == 200){
            window.location.reload()
            // toast.success("Property Details Updated Succesfully")
        }else{
            // toast.error("Something went wrong")
        }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
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
            <form onSubmit={handleSubmit(onSubmit)}>
           <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("description")}
                />
                {errors.description && <p className="text-danger">{errors.description.message}</p>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Image Text</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("img_text")}
                />
                {errors.img_text && <p className="text-danger">{errors.img_text.message}</p>}
              </div>
              </div>
              <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Redirect Link</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("redirect_link")}
                />
                {errors.redirect_link && <p className="text-danger">{errors.redirect_link.message}</p>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Redirect Text</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("redirect_text")}
                />
                {errors.redirect_text && <p className="text-danger">{errors.redirect_text.message}</p>}
              </div>
              </div>
             <div className="row mb-3">

             <div className="col-md-6">
                <label className="form-label">Property Type</label>
                <select className="form-control" {...register("property_type")} defaultValue="Destinations">
                <option value="Destinations">Destinations</option>
                <option value="Meetings">Meetings</option>
              </select>
                {errors.property_type && <p className="text-danger">{errors.property_type.message}</p>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Property Category</label>
                <select className="form-control" {...register("property_category")}>
                  {categoryOptions[propertyType]?.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.property_category && <p className="text-danger">{errors.property_category.message}</p>}
              </div>
            </div>

           <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("city")}
                />
                {errors.city && <p className="text-danger">{errors.city.message}</p>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Location Details</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("location_details")}
                />
                {errors.location_details && <p className="text-danger">{errors.location_details.message}</p>}
              </div>
              </div>

           <div className="row mb-3">

              <div className="col-md-6">
                <label className="form-label">Offer Date</label>
                <input
                  type="date"
                  className="form-control"
                  {...register("offer_date")}
                />
                {errors.offer_date && <p className="text-danger">{errors.offer_date.message}</p>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Image Status</label>
                <select className="form-control" {...register("img_status")}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                {errors.img_status && <p className="text-danger">{errors.img_status.message}</p>}
                </div>
            </div>

            <div className="row mb-3">

            <div className="col-md-6">
                    <label className="form-label">Image 1</label>
                    <input type="file" className="form-control" {...register("img1")} />
                    {previewImg1 && <Image src={previewImg1} alt="Preview" width="100" height="100" />}
                    {errors.img1 && <p className="text-danger">{errors.img1.message}</p>}
                    </div>

                    <div className="col-md-6">
                    <label className="form-label">Image 2</label>
                    <input type="file" className="form-control" {...register("img2")} />
                    {previewImg2 && <Image src={previewImg2} alt="Preview" width="100" height="100" />}
                    {errors.img2 && <p className="text-danger">{errors.img2.message}</p>}
                    </div>
              </div>


              <div className="mb-3">
              <label className="form-label">Image 3</label>
                    <input type="file" className="form-control" {...register("img3")} />
                    {previewImg3 && <Image src={previewImg3} alt="Preview" width="100" height="100" />}
                    {errors.img3 && <p className="text-danger">{errors.img3.message}</p>}
                    </div>
                    <div style={{display:'flex', justifyContent:"space-between"}}>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : id ? "Update Offer" : "Create Offer"}
                  </button>
                  <button className="btn btn-primary" onClick={()=>router.push('/property/propertylist')}>
                    Back
                  </button>
                  </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { pageTitle })(Property);
