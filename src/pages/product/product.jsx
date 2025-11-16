import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Dropdown } from "react-bootstrap";

// Components
import NavBar from "../../components/navbar";
import Button from "../../components/button";

// React icon
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { PiPencilSimple, PiUploadSimpleBold } from "react-icons/pi";
const products = Array(3)
  .fill(null)
  .map((_, i) => ({
    name: "Product Name",
    oldPrice: 1000,
    newPrice: 800,
    status: i % 2 ? "paused" : "live",
  }));

// ------------------
// Mock Data
// ------------------
const sections = [
  {
    title: "Discount Codes",
    desc: "Create a discount code",
    fields: [
      { label: "Discount Title", name: "discount_title", col: 12 },
      {
        label: "Product to apply",
        name: "product",
        type: "select",
        col: 6,
        opts: [
          "Select",
          "Set as discount",
          "Make it exclusive",
          "Offer as Bonus",
        ],
      },
      { label: "Upload Image", name: "image", type: "file", col: 6 },
      { label: "Coupon Code", name: "coupon_code", col: 6 },
      { label: "Validity Till", name: "date", type: "date", col: 6 },
    ],
  },
  {
    title: "Exclusive Offers",
    desc: "Create an offer",
    fields: [
      { label: "Offer Title", name: "offer_title", col: 6 },
      { label: "One Liner", name: "one_liner", col: 6 },
      { label: "Attach Image/Icon", name: "icon", type: "file", col: 6 },
      { label: "Button Text", name: "button_text", col: 6 },
      { label: "Start Date", name: "start_date", type: "date", col: 4 },
      { label: "End Date", name: "end_date", type: "date", col: 4 },
      { label: "Time", name: "time", type: "time", col: 4 },
    ],
  },
  {
    title: "Exclusive Perks",
    desc: "Create a perk",
    fields: [
      { label: "Perk Title", name: "perk_title", col: 12 },
      {
        label: "Unlocking details",
        name: "unlock",
        type: "select",
        col: 6,
        opts: ["Select", "One", "Two", "Three"],
      },
      { label: "Attach Image", name: "image", type: "file", col: 6 },
      { label: "Terms & Conditions", name: "terms", type: "textarea", col: 12 },
    ],
  },
  {
    title: "Exciting Prizes",
    desc: "Create a prize",
    fields: [
      { label: "Title", name: "title", col: 12 },
      {
        label: "Upload Image",
        name: "image",
        type: "file",
        col: 3,
        upload: "flex-column px-4 py-4 bg-light-white-3-color",
      },
      { label: "Terms & Conditions", name: "terms", type: "textarea", col: 9 },
    ],
  },
];

const Product = () => {
  // react-hook-form
  const { register, handleSubmit } = useForm();

  // ------------------
  // STATE
  // ------------------
  const [show, setShow] = useState(false);
  const [forms, setForms] = useState(sections.map(() => [0]));

  const Field = ({ f, sIdx, fIdx }) => {
    const name = `${f.name}_${sIdx}_${fIdx}`;
    const cls = "form-control login-input rounded-3 border-0 py-2";
    return (
      <div className={`col-lg-${f.col} mb-3`}>
        <label className="form-label font-14 montserrat-regular text-border-gray-color">
          {f.label}
        </label>
        {f.type === "file" ? (
          <div
            className={`upload-box d-flex text-center rounded-3 form-control login-input border-0 py-2 text-blue-color font-12 montserrat-medium ${
              f.upload || ""
            }`}
          >
            <PiUploadSimpleBold className="font-16 me-3 mb-2" />
            Upload
            <input type="file" {...register(name)} />
          </div>
        ) : f.type === "select" ? (
          <select
            className="form-select login-input border-0"
            {...register(name)}
          >
            {f.opts?.map((o) => (
              <option key={o} disabled={o === "Select"}>
                {o}
              </option>
            ))}
          </select>
        ) : f.type === "textarea" ? (
          <textarea className={cls} rows="3" {...register(name)} />
        ) : (
          <input
            type={f.type || "text"}
            className={`${cls} ${
              f.type === "date" || f.type === "time" ? "text-blue-color" : ""
            }`}
            {...register(name)}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <NavBar />
      <div className="container py-5">
        <NavLink to="/dashboard">
          <p className="font-14 montserrat-medium text-blue-color">
            <IoIosArrowBack className="font-18" /> Back
          </p>
        </NavLink>
        <p className="text-blue-color font-24 montserrat-semibold mb-0">
          Your Products
        </p>
        <p className="text-blue-color font-12 montserrat-medium">
          Manage products with offers, discounts, and rewards
        </p>

        <div className="row py-4">
          <div className="col-lg-6">
            <div className="border-radius-12 bg-white border-light-gray p-3 mb-3">
              <div className="d-flex flex-wrap gap-2 align-items-center justify-content-end">
                {["Pause", "Live"].map((s, i) => (
                  <div
                    key={s}
                    className={`${
                      i
                        ? "live-btn text-live-green-color"
                        : "pause-btn text-muted-blue-color"
                    } rounded-3 p-2 px-4 font-12 montserrat-medium`}
                  >
                    <span
                      className={`live-circle d-inline-block rounded-circle ${
                        i ? "bg-live-green-color" : "bg-muted-blue-color"
                      } me-1`}
                    />
                    {s}
                  </div>
                ))}
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    className="bg-purple-color text-white px-3 border-radiu-8 font-12 montserrat-medium py-2"
                  >
                    Reward Type <IoIosArrowDown className="font-18 ms-2" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="border-0 border-radius-8">
                    {[
                      "Discount",
                      "Bonus Points",
                      "Exclusive offers",
                      "Exciting Prizes",
                    ].map((t) => (
                      <Dropdown.Item
                        key={t}
                        className="border-bottom text-purple-color"
                      >
                        {t}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="row mt-3 g-3">
                {products.map((p, i) => (
                  <div key={i} className="col-lg-4 col-md-4">
                    <div className="product-card w-100 rounded-3">
                      <div className="product-card-header d-flex justify-content-between align-items-center rounded-top pb-2">
                        <div
                          className={`rounded d-flex ms-2 justify-content-center align-items-center ${
                            p.status === "live"
                              ? "bg-transparent-green"
                              : "bg-transparent-muted-blue"
                          }`}
                        >
                          <span
                            className={`live-circle d-inline-block rounded-circle ${
                              p.status === "live"
                                ? "bg-live-green-color"
                                : "bg-muted-blue-color"
                            }`}
                          />
                        </div>
                        <div className="product-edit d-flex justify-content-center align-items-center w-32 h-32">
                          <PiPencilSimple className="font-20 text-blue-color" />
                        </div>
                      </div>
                      <div className="p-2">
                        <p className="text-blue-color font-14 montserrat-medium mb-0 text-center">
                          {p.name}
                        </p>
                        <p className="mb-1 montserrat-semibold">
                          <span className="text-red-color font-12 text-decoration-line-through">
                            ₹{p.oldPrice}/-
                          </span>
                          <span className="ms-2 font-14 text-blue-color">
                            ₹{p.newPrice}/-
                          </span>
                        </p>
                        <p className="text-blue-color font-12 montserrat-medium mb-0">
                          Lorem Ipsum Dolor...
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="bg-blue-color text-white py-2 font-18 montserrat-medium mt-3 rounded-pill border-0 w-100"
                onClick={() => setShow(!show)}
              >
                <GoPlus className="me-3 font-24" />
                Add New Product
              </button>
            </div>

            <div className="accordion accordion-flush" id="acc">
              {sections.map((s, sIdx) => (
                <div
                  key={sIdx}
                  className="accordion-item bg-white box-shadow border-light-gray border-radius-12 mb-3"
                >
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed font-18 montserrat-semibold text-gray-color border-radius-12 pb-1"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#c${sIdx}`}
                      aria-expanded={!sIdx}
                      aria-controls={`c${sIdx}`}
                    >
                      {s.title}
                    </button>
                    <p className="px-3 font-12 montserrat-medium text-blue-color">
                      {s.desc}
                    </p>
                  </h2>
                  <div
                    id={`c${sIdx}`}
                    className={`accordion-collapse collapse ${
                      !sIdx ? "show" : ""
                    }`}
                    data-bs-parent="#acc"
                  >
                    <div className="accordion-body text-blue-color">
                      {forms[sIdx].map((_, fIdx) => (
                        <div key={fIdx} className="row">
                          {s.fields.map((f, i) => (
                            <Field key={i} f={f} sIdx={sIdx} fIdx={fIdx} />
                          ))}
                          <hr className="my-4" />
                        </div>
                      ))}
                      <div className="row">
                        <div className="col-lg-5">
                          <Button
                            btn_title="Save Changes"
                            btn_class="text-white w-100 bg-purple-color border-purple mt-3 px-5"
                          />
                        </div>
                        <div className="col-lg-5">
                          <Button
                            btn_title="Create New"
                            btn_class="text-purple-color w-100 bg-transparent border-purple mt-3 px-5"
                            onClick={() =>
                              setForms((prev) =>
                                prev.map((arr, i) =>
                                  i === sIdx ? [...arr, arr.length] : arr
                                )
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            {show && (
              <div className="border-radius-12 border-light-gray bg-white p-3">
                <p className="font-24 montserrat-semibold text-blue-color mb-0">
                  Add New product
                </p>
                <p className="text-blue-color font-12 montserrat-medium">
                  Fill details to add a new product
                </p>
                <form
                  className="row"
                  onSubmit={handleSubmit((d) => console.log(d))}
                >
                  {[
                    { label: "Product Name", name: "productName", col: 6 },
                    {
                      label: "Original Amt",
                      name: "originalAmt",
                      type: "number",
                      col: 3,
                    },
                    {
                      label: "Discount Amt",
                      name: "discountAmt",
                      type: "number",
                      col: 3,
                    },
                    {
                      label: "Short Description",
                      name: "shortDescription",
                      col: 6,
                    },
                    {
                      label: "Attach Image/Icon",
                      name: "productImage",
                      type: "file",
                      col: 6,
                    },
                    {
                      label: "Reward Type",
                      name: "rewardType",
                      type: "select",
                      col: 12,
                      w: "w-50",
                      opts: [
                        "Reward Type",
                        "Set as discount",
                        "Make it exclusive",
                        "Offer as Bonus",
                      ],
                    },
                    {
                      label: "Product Status",
                      name: "status",
                      type: "select",
                      col: 5,
                      w: "w-75",
                      opts: ["Status", "Live", "Paused", "Upcoming"],
                    },
                    {
                      label: "Visibility date (Till)",
                      name: "visibilityDate",
                      type: "date",
                      col: 7,
                      w: "w-50",
                    },
                  ].map((f, i) => (
                    <div key={i} className={`col-lg-${f.col} mb-3`}>
                      <label className="form-label font-14 montserrat-regular text-border-gray-color">
                        {f.label}
                      </label>
                      {f.type === "file" ? (
                        <div className="upload-box d-flex text-center bg-light-white-3-color rounded-3 form-control login-input border-0 py-2 text-blue-color font-12 montserrat-medium">
                          <PiUploadSimpleBold className="font-16 me-3 mb-2" />
                          Upload
                          <input type="file" {...register(f.name)} />
                        </div>
                      ) : f.type === "select" ? (
                        <select
                          className={`form-select login-input border-0 ${f.w}`}
                          {...register(f.name)}
                        >
                          {f.opts.map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={f.type || "text"}
                          className={`form-control login-input rounded-3 border-0 py-2 ${
                            f.type === "date" ? "text-blue-color" : ""
                          } ${f.w || ""}`}
                          {...register(f.name)}
                        />
                      )}
                    </div>
                  ))}
                  <div className="col-lg-4">
                    <Button
                      type="submit"
                      btn_class="text-white px-4 w-100 bg-purple-color border-0 mt-3"
                      btn_title="Save Changes"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Button
                      type="button"
                      btn_class="text-purple-color w-100 bg-transparent border-purple mt-3 px-5"
                      btn_title="Cancel"
                      onClick={() => setShow(false)}
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
