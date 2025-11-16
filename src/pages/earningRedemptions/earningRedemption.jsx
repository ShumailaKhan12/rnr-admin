import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Nav, Dropdown } from "react-bootstrap";

// Components
import NavBar from "../../components/navbar";
import Button from "../../components/button";
import DropdownFilter from "../../components/dropdown";
import EarningsTable from "../../components/earningsTable";

// React icon
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { CgArrowsExpandRight } from "react-icons/cg";
import { GoPlus } from "react-icons/go";
import { PiPencilSimple, PiUploadSimpleBold } from "react-icons/pi";

// ------------------
// Mock Data
// ------------------
const products = Array(4).fill({
  name: "Product Name",
  oldPrice: 1000,
  newPrice: 800,
  status: Math.random() > 0.5 ? "live" : "paused",
});
const earningData = Array(5).fill({
  name: "Aditi Sharma",
  email: "aditixyz@gmail.com",
  game: "TIC TAC TOE",
  earnings: "2000 Meteors",
});
const tabs = [
  {
    id: 0,
    title: "Games",
    headings: ["Name", "E-mail", "Game", "Earnings"],
    data: earningData,
  },
  {
    id: 1,
    title: "On referring",
    headings: ["Name", "E-mail", "No of Referrals", "Earnings"],
    data: earningData,
  },
  {
    id: 2,
    title: "On Accepting",
    headings: ["Name", "E-mail", "No of Acceptances", "Earnings"],
    data: earningData,
  },
  {
    id: 3,
    title: "On Product Purchase",
    headings: ["Name", "E-mail", "Product Purchased", "Earnings"],
    data: earningData,
  },
];
const cards = [
  {
    id: "how-it-works",
    title: "How it Works",
    description: "Steps to explain how the program works",
    fields: [
      "Title 1",
      "Description",
      "Title 2",
      "Description",
      "Title 3",
      "Description",
    ],
  },
  {
    id: "advertisement",
    title: "Advertisement Card 1",
    description: "Highlight your latest offer",
    fields: ["Title 1", "Description", "Button Text", "Image"],
  },
  {
    id: "faq",
    title: "FAQ",
    description: "Edit Q&A to inform users",
    isFAQ: true,
  },
  {
    id: "footer",
    title: "Footer Section",
    description: "Footer content",
    fields: ["Content"],
  },
];

const EarningRedemption = () => {
  // react-hook-form
  const { register, handleSubmit } = useForm();

  // ------------------
  // STATE
  // ------------------
  const [activeTab, setActiveTab] = useState("tab1");
  const [activeCardId, setActiveCardId] = useState("how-it-works");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const onSubmit = (data) => console.log("Submit:", data);

  // Product Card
  const ProductCard = ({ item, idx }) => (
    <div className="col-lg-3 col-md-4" key={idx}>
      <div className="product-card w-100 rounded-3">
        <div className="product-card-header d-flex justify-content-between align-items-center rounded-top pb-2">
          <div
            className={`rounded d-flex ms-2 justify-content-center align-items-center ${
              item.status === "live"
                ? "bg-transparent-green"
                : "bg-transparent-muted-blue"
            }`}
          >
            <span
              className={`live-circle d-inline-block rounded-circle ${
                item.status === "live"
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
          <p className="text-blue-color font-14 montserrat-medium mb-0">
            {item.name}
          </p>
          <p className="mb-1 montserrat-semibold">
            <span className="text-red-color font-12 text-decoration-line-through">
              ₹{item.oldPrice}/-
            </span>
            <span className="ms-2 font-14 text-blue-color">
              ₹{item.newPrice}/-
            </span>
          </p>
          <p className="text-blue-color font-10 montserrat-medium mb-0">
            Lorem Ipsum Dolor Sit...
          </p>
        </div>
      </div>
    </div>
  );

  // Product Header with Filters
  const ProductHeader = () => (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mt-3">
      <p className="font-18 montserrat-medium text-blue-color mb-0">
        Products / Services
      </p>
      <div className="d-flex flex-wrap gap-2 gap-md-3 align-items-center">
        {["Pause", "Live"].map((status, i) => (
          <div
            key={status}
            className={`${
              i === 0
                ? "pause-btn text-muted-blue-color"
                : "live-btn text-live-green-color"
            } rounded-3 p-2 px-4 font-12 montserrat-medium`}
          >
            <span
              className={`live-circle d-inline-block rounded-circle ${
                i === 0 ? "bg-muted-blue-color" : "bg-live-green-color"
              } me-1`}
            />
            {status}
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
            ].map((item) => (
              <Dropdown.Item
                key={item}
                className="border-bottom text-purple-color"
              >
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );

  // Form Input Field
  const FormField = ({
    label,
    name,
    type = "text",
    className = "col-lg-6",
    ...props
  }) => (
    <div className={`${className} mb-3`}>
      <label className="form-label font-14 montserrat-regular text-border-gray-color">
        {label}
      </label>
      {type === "file" ? (
        <label className="upload-box d-flex text-center bg-light-white-3-color rounded-3 form-control border-0 py-2 text-blue-color font-12 montserrat-medium">
          <PiUploadSimpleBold className="font-16 me-3 mb-2" />
          Upload
          <input type="file" {...register(name)} />
        </label>
      ) : type === "select" ? (
        <select
          className={`form-select ${props.width || "w-50"}`}
          {...register(name)}
        >
          <option>{props.placeholder || label}</option>
          {props.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          className="form-control login-input rounded-3 border-0 py-2"
          rows="3"
          {...register(name)}
        />
      ) : (
        <input
          type={type}
          className={`form-control ${
            props.inputClass || "login-input"
          } rounded-3 border-0 py-2`}
          {...register(name)}
          {...props}
        />
      )}
    </div>
  );

  // Earnings Section
  const EarningsSection = () => (
    <div className="border-radius-16 bg-light-white-color mt-3">
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-center">
          <p className="font-18 montserrat-medium text-blue-color mb-0">
            Earnings by category
          </p>
          <div
            className="text-blue-color p-2 earning-circle-arrow rounded-circle d-flex justify-content-center align-items-center cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <CgArrowsExpandRight
              className={`font-24 ${isExpanded ? "rotate-180" : ""}`}
            />
          </div>
        </div>
        <ul className="nav nav-tabs border-0 d-flex gap-3 mt-3" role="tablist">
          {tabs.map((tab, i) => (
            <li key={tab.id} className="nav-item pills-tab" role="presentation">
              <button
                className={`nav-link font-12 montserrat-medium px-4 py-2 rounded-pill border-purple ${
                  i === 0 ? "active" : ""
                }`}
                id={`tab-${i}`}
                data-bs-toggle="tab"
                data-bs-target={`#tab-pane-${i}`}
                type="button"
                role="tab"
                aria-selected={i === 0}
              >
                {tab.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="tab-content mt-3 px-3">
        {tabs.map((tab, i) => (
          <div
            key={tab.id}
            className={`tab-pane fade ${i === 0 ? "show active" : ""}`}
            id={`tab-pane-${i}`}
            role="tabpanel"
          >
            <EarningsTable
              headings={tab.headings}
              data={tab.data}
              isExpanded={isExpanded}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // Add Product Form
  const AddProductForm = () => (
    <>
      <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
        Add New product
      </p>
      <p className="text-blue-color font-12 montserrat-medium mb-3">
        Fill details to add a new product
      </p>
      <form className="row" onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Product Name" name="productName" />
        <FormField
          label="Original Amt"
          name="originalAmt"
          type="number"
          className="col-lg-3"
        />
        <FormField
          label="Discount Amt"
          name="discountAmt"
          type="number"
          className="col-lg-3"
        />
        <FormField label="Short Description" name="shortDescription" />
        <FormField label="Attach Image/Icon" name="image" type="file" />
        <FormField
          label="Reward Type"
          name="rewardType"
          type="select"
          className="col-lg-12"
          options={["Set as discount", "Make it exclusive", "Offer as Bonus"]}
        />
        <FormField
          label="Product Status"
          name="status"
          type="select"
          className="col-lg-5"
          width="w-75"
          options={["Live", "Paused", "Upcoming"]}
        />
        <FormField
          label="Visibility date (Till)"
          name="visibilityDate"
          type="date"
          className="col-lg-7"
          inputClass="text-blue-color w-50"
        />
        <div className="col-lg-4">
          <Button
            type="submit"
            btn_class="text-white px-4 w-100 bg-blue-color border-0 mt-3"
            btn_title="Save Changes"
          />
        </div>
        <div className="col-lg-4">
          <Button
            type="button"
            btn_class="text-blue-color w-100 bg-transparent border-blue mt-3 px-5"
            btn_title="Cancel"
            onClick={() => setShowAddProduct(false)}
          />
        </div>
      </form>
    </>
  );

  // Right Side Form (Offers/Prizes)
  const RightForm = ({ title, fields, isOffer }) => (
    <div className="col-lg-5">
      <div className="bg-light-white-color p-4 border-radius-16">
        <div className="gray-box border-radius-8" />
        {isOffer && (
          <div className="d-flex align-items-center justify-content-between mt-3">
            <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
              {title}
            </p>
            <div className="d-flex align-items-center gap-2">
              <button className="text-blue-color rounded-2 py-2 px-3 border-light-gray bg-light-white-1-color font-12 montserrat-medium">
                Add New
              </button>
              <DropdownFilter
                title="Sort"
                dropdownItems={[
                  { label: "Upcoming" },
                  { label: "Live" },
                  { label: "Pause" },
                ]}
                dropIcon={<IoIosArrowDown className="font-18" />}
              />
            </div>
          </div>
        )}
        {!isOffer && (
          <p className="font-18 montserrat-semibold text-border-gray-color mb-0 mt-3">
            {title}
          </p>
        )}
        <p className="text-blue-color font-12 montserrat-medium">
          {isOffer
            ? "Fill data to create an offer"
            : "Fill data to create prizes"}
        </p>
        <form className="row mt-3" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, i) => (
            <FormField key={i} {...field} />
          ))}
          <div className="col-lg-6">
            <Button
              type="submit"
              btn_class="text-white w-100 px-3 bg-blue-color border-0 mt-3"
              btn_title="Save Changes"
            />
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <NavBar />
      <div className="bg-light-blue-color py-5 min-vh-100">
        <div className="container">
          <p className="mb-0 text-blue-color montserrat-semibold font-24">
            Earnings and Redemptions
          </p>
          <p className="mb-0 text-blue-color montserrat-medium font-12">
            All rewards, exciting prizes and etc
          </p>
        </div>

        {/* Tabs */}
        <div className="nav-tab-bg">
          <Nav
            className="mt-4 container"
            activeKey={activeTab}
            onSelect={setActiveTab}
          >
            {["Exclusive Offers", "Exciting Prizes", "Miscellaneous"].map(
              (label, i) => (
                <Nav.Item key={i}>
                  <Nav.Link
                    eventKey={`tab${i + 1}`}
                    className="font-24 montserrat-semibold text-border-gray-color"
                  >
                    {label} {i < 2 && <IoIosArrowForward className="mx-4" />}
                  </Nav.Link>
                </Nav.Item>
              )
            )}
          </Nav>
        </div>

        <div className="container p-lg-4">
          {/* TAB 1: Exclusive Offers */}
          {activeTab === "tab1" && (
            <div className="row py-3 gy-3 mt-3">
              <div className="col-lg-7">
                {!showAddProduct ? (
                  <div className="border-radius-12 bg-light-white-color p-3">
                    <ProductHeader />
                    <div className="row mt-3 g-3">
                      {products.map((item, i) => (
                        <ProductCard key={i} item={item} idx={i} />
                      ))}
                    </div>
                    <button
                      className="bg-blue-color text-white py-2 font-18 montserrat-medium mt-3 rounded border-0 w-100"
                      onClick={() => setShowAddProduct(true)}
                    >
                      <GoPlus className="me-3 font-24" /> Add New Product
                    </button>
                  </div>
                ) : (
                  <AddProductForm />
                )}
              </div>
              <RightForm
                title="Exclusive Offers"
                isOffer
                fields={[
                  { label: "Offer Name", name: "offerName" },
                  { label: "Add One Liner", name: "oneLiner" },
                  {
                    label: "Upload Image/Logo",
                    name: "offerImage",
                    type: "file",
                  },
                  { label: "Button Text", name: "buttonText" },
                  {
                    label: "Start Date",
                    name: "startDate",
                    type: "date",
                    className: "col-lg-4",
                  },
                  {
                    label: "End Date",
                    name: "endDate",
                    type: "date",
                    className: "col-lg-4",
                  },
                  {
                    label: "Time",
                    name: "time",
                    type: "time",
                    className: "col-lg-4",
                  },
                ]}
              />
            </div>
          )}

          {/* TAB 2: Exciting Prizes */}
          {activeTab === "tab2" && (
            <div className="row gy-3 mt-3">
              {!isExpanded ? (
                <>
                  <div className="col-lg-7">
                    <div className="border-radius-12 bg-light-white-color p-3">
                      <ProductHeader />
                      <div className="row g-3 mt-3">
                        {products.map((item, i) => (
                          <ProductCard key={i} item={item} idx={i} />
                        ))}
                      </div>
                      <button className="bg-blue-color text-white py-2 font-18 montserrat-medium mt-3 rounded border-0 w-100">
                        <GoPlus className="me-3 font-24" /> Add New Product
                      </button>
                    </div>
                    <EarningsSection />
                  </div>
                  <RightForm
                    title="Exciting Prizes"
                    fields={[
                      {
                        label: "Title",
                        name: "prizeTitle",
                        className: "col-lg-12",
                      },
                      {
                        label: "Upload Image",
                        name: "prizeImage",
                        type: "file",
                        className: "col-lg-4",
                      },
                      {
                        label: "Terms & Condition",
                        name: "terms",
                        type: "textarea",
                        className: "col-lg-8",
                      },
                    ]}
                  />
                </>
              ) : (
                <div className="col-12">
                  <EarningsSection />
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Miscellaneous */}
          {activeTab === "tab3" && (
            <div className="row gy-3 mt-3">
              <div className="col-lg-7 scrollable-card-wrapper hide-scroll">
                {cards.map((card, i) => (
                  <div
                    key={card.id}
                    className={`bg-light-white-color border-radius-16 p-3 ${
                      activeCardId === card.id
                        ? "border-blue box-shadow"
                        : "border-light"
                    }`}
                    style={{
                      cursor: "pointer",
                      marginTop: i > 0 ? "1.5rem" : "0",
                    }}
                    onClick={() => setActiveCardId(card.id)}
                  >
                    <p className="font-18 montserrat-semibold text-border-gray-color mb-0">
                      {card.title}
                    </p>
                    <p className="font-12 montserrat-medium text-blue-color">
                      {card.description}
                    </p>
                    <form className="row" onSubmit={handleSubmit(onSubmit)}>
                      {card.isFAQ
                        ? [1, 2].map((q) => (
                            <React.Fragment key={q}>
                              <div className="col-lg-12 mb-3">
                                <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                  Question {q}
                                </label>
                                <div className="d-flex gap-3">
                                  <input
                                    type="text"
                                    className="form-control login-input border-0"
                                    {...register(`q${q}`)}
                                  />
                                  <div className="login-input rounded-circle faq-add-btn d-flex align-items-center justify-content-center">
                                    <GoPlus className="font-24" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-12 mb-3">
                                <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                  Answer
                                </label>
                                <textarea
                                  className="form-control login-input rounded-3 border-0 py-2"
                                  rows="3"
                                  {...register(`a${q}`)}
                                />
                              </div>
                              <hr />
                            </React.Fragment>
                          ))
                        : card.fields?.map((label, j) => (
                            <div
                              key={j}
                              className={`${
                                card.fields.length === 1
                                  ? "col-lg-12"
                                  : "col-lg-6"
                              } mb-3`}
                            >
                              <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                {label}
                              </label>
                              <input
                                type="text"
                                className="form-control login-input border-0"
                                {...register(`${card.id}_${j}`)}
                              />
                            </div>
                          ))}
                      <div className="col-lg-4 my-3">
                        <Button
                          type="submit"
                          btn_class="text-white w-100 px-3 bg-blue-color border-0 mt-3"
                          btn_title="Save Changes"
                        />
                      </div>
                    </form>
                  </div>
                ))}
              </div>
              <div className="col-lg-5">
                <div className="bg-light-white-color border-radius-16 miscellaneous-screen-preview px-3">
                  <p className="text-blue-color font-24 montserrat-semibold pt-4 text-center">
                    Screen Preview
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EarningRedemption;
