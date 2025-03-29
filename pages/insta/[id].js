import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect, useSelector } from "react-redux";
import axios from "axios";
import { moodChange, pageTitle } from "../../src/redux/action/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Image from "next/image";

const InstaForm = ({ pageTitle }) => {
  const router = useRouter();
  const { id } = router.query;
  const version = useSelector((state) => state.theme.version);
  const [previewImg1, setPreviewImg1] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = Yup.object().shape({
    img_text: Yup.string().required("Image text is required"),
    redirect_link: Yup.string().url("Invalid URL format").required("Redirect link is required"),
    redirect_text: Yup.string().required("Redirect text is required"),
    img_position: Yup.string().required("Image position is required"),
    img_status: Yup.boolean().required("Image status is required"),
    img: Yup.mixed().test("image", "Unsupported file format", (value) => {
      return !value || (value[0] && ["image/jpg", "image/jpeg", "image/png"].includes(value[0].type));
    }),
  });

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      img_text: "",
      redirect_link: "",
      redirect_text: "",
      img_position: "",
      img_status: "",
      img: null,
    },
  });

  useEffect(() => {
    if (version !== "dark") {
      moodChange();
    }
    pageTitle("Edit Instas");
    if (id) {
      fetchOfferData(id);
    }
  }, [id, pageTitle, version]);

  const fetchOfferData = async (id) => {
    try {
      const response = await axios.post("http://localhost:4000/api/insta/get-instas", { id });
      const data = response.data[0];
      setValue("img_text", data.img_text);
      setValue("redirect_link", data.redirect_link);
      setValue("redirect_text", data.redirect_text);
      setValue("img_position", data.img_position);
      setValue("img_status", String(data.img_status));

      const base64Image = `data:image/png;base64,${Buffer.from(data.img.data).toString("base64")}`;
      setPreviewImg1(base64Image);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("img_text", data.img_text);
    formData.append("redirect_link", data.redirect_link);
    formData.append("redirect_text", data.redirect_text);
    formData.append("img_position", data.img_position);
    formData.append("img_status", data.img_status);
    if (data.img) {
      formData.append("img", data.img[0]);
    }

    try {
      const url = id ? "http://localhost:4000/api/insta/update-insta" : "http://localhost:4000/api/insta/create-insta";
      await axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
      router.push("/insta/instalist");
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
            <h4 className="card-title">{id ? "Edit Insta" : "Create Insta"}</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6">
                  <label className="form-label">Image Text</label>
                  <input type="text" className="form-control" {...register("img_text")} />
                  {errors.img_text && <p className="text-danger">{errors.img_text.message}</p>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Redirect Link</label>
                  <input type="text" className="form-control" {...register("redirect_link")} />
                  {errors.redirect_link && <p className="text-danger">{errors.redirect_link.message}</p>}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label className="form-label">Redirect Text</label>
                  <input type="text" className="form-control" {...register("redirect_text")} />
                  {errors.redirect_text && <p className="text-danger">{errors.redirect_text.message}</p>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Image Position</label>
                  <input type="text" className="form-control" {...register("img_position")} />
                  {errors.img_position && <p className="text-danger">{errors.img_position.message}</p>}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label className="form-label">Image Status</label>
                  <select className="form-control" {...register("img_status")}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                  {errors.img_status && <p className="text-danger">{errors.img_status.message}</p>}
                </div>
                <div className="col-md-6">
                <label className="form-label">Upload Image</label>
                <input type="file" className="form-control" {...register("img")} />
                {previewImg1 && <Image src={previewImg1} alt="Preview" width="100" height="100" />}
                {errors.img && <p className="text-danger">{errors.img.message}</p>}
              </div>
              </div>

              

              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : id ? "Update Insta" : "Create Insta"}
                </button>
                <button className="btn btn-secondary" onClick={() => router.push('/insta/instalist')}>Back</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { pageTitle })(InstaForm);
