import React, { useState } from 'react'
import NavBar from '../../components/navbar';
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { PiPencilSimple, PiUploadSimpleBold } from 'react-icons/pi';
import Button from '../../components/button';
import { GoPlus } from 'react-icons/go';

// Import json
const products = [
    { name: "Product Name", oldPrice: 1000, newPrice: 800, status: "live" },
    { name: "Product Name", oldPrice: 1000, newPrice: 800, status: "paused" },
    { name: "Product Name", oldPrice: 1000, newPrice: 800, status: "live" },
    // { name: "Product Name", oldPrice: 1000, newPrice: 800, status: "paused" },
];
const Product = () => {
    const {
        register,
        // handleSubmit,
        formState: { errors },
    } = useForm();

    const [showAddProduct, setShowAddProduct] = useState(false);
    const [discountList, setDiscountList] = useState([{}]); // default one form
    const [offerList, setOfferList] = useState([{}]);
    const [ExclusivePerk, setExclusivePerk] = useState([{}])
    const [ExcitingPrizes, setExcitingPrizes] = useState([{}])

    const handleAddDiscount = () => {
        setDiscountList([...discountList, {}]);
    };
    const handleAddOffer = () => {
        setOfferList([...offerList, {}]);
    };
    const handleAddExclusivePerk = () => {
        setExclusivePerk([...ExclusivePerk, {}]);
    };
    const handleAddExcitingPrize = () => {
        setExcitingPrizes([...ExcitingPrizes, {}]);
    };



    return (
        <>
            <NavBar />
            <div className='container py-5'>
                <NavLink to={"/dashboard"}>
                    <p className='font-14 montserrat-medium text-blue-color'><IoIosArrowBack className="font-18" /> Back </p>
                </NavLink>
                <p className="text-blue-color font-24 montserrat-semibold mb-0">
                    Your Products
                </p>
                <p className="text-blue-color font-12 montserrat-medium">
                    Manage and showcase your products with exclusive offers, discounts, and other rewards
                </p>

                <div className='row py-4'>
                    <div className='col-lg-6'>
                        <>
                            <div className='border-radius-12 bg-white border-light-gray p-3 mb-3'>
                                <div className='d-flex flex-wrap gap-2 gap-md-3 align-items-center text-end justify-content-end'>
                                    <div className='pause-btn text-muted-blue-color rounded-3 p-2 px-4 font-12 montserrat-medium'>
                                        <span className='live-circle d-inline-block rounded-circle bg-muted-blue-color me-1'></span>
                                        Pause
                                    </div>

                                    <div className='live-btn rounded-3 text-live-green-color py-2 px-4 font-12 montserrat-medium'>
                                        <span className='live-circle d-inline-block rounded-circle bg-live-green-color me-1'></span>
                                        Live
                                    </div>

                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="light"
                                            className='bg-purple-color text-white px-3 border-radiu-8 font-12 montserrat-medium py-2'
                                            id="dropdown-basic"
                                        >
                                            Reward Type
                                            <IoIosArrowDown className='font-18 ms-2' />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className='border-0 border-radius-8'>
                                            <Dropdown.Item className='border-bottom text-purple-color'>Discount</Dropdown.Item>
                                            <Dropdown.Item className='border-bottom text-purple-color'>Bonus Points</Dropdown.Item>
                                            <Dropdown.Item className='border-bottom text-purple-color'>Exclusive offers</Dropdown.Item>
                                            <Dropdown.Item className='border-bottom text-purple-color'>Exciting Prizes</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>

                                {/* Products cards */}
                                <div className='row mt-3 g-3'>
                                    {products.map((item, index) => (
                                        <div className='col-lg-4 col-md-4'>
                                            <div className="product-card w-100 rounded-3" key={index}>
                                                <div className='product-card-header d-flex justify-content-between align-items-center rounded-top pb-2'>
                                                    <div
                                                        className={`rounded d-flex ms-2 justify-content-center align-items-center active-transparent-bg ${item.status === "live" ? "bg-transparent-green" : "bg-transparent-muted-blue"
                                                            }`}
                                                    >
                                                        <span
                                                            className={`live-circle d-inline-block rounded-circle ${item.status === "live" ? "bg-live-green-color" : "bg-muted-blue-color"
                                                                }`}
                                                        ></span>
                                                    </div>
                                                    <div className='product-edit d-flex justify-content-center align-items-center w-32 h-32'>
                                                        <PiPencilSimple className='font-20 text-blue-color' />
                                                    </div>
                                                </div>
                                                <div className='p-2'>
                                                    <p className="text-blue-color font-14 montserrat-medium mb-0 text-center">{item.name}</p>
                                                    <p className="mb-1 montserrat-semibold">
                                                        <span className="text-red-color font-12 text-decoration-line-through">₹{item.oldPrice}/-</span>
                                                        <span className="ms-2 font-14 text-blue-color">₹{item.newPrice}/-</span>
                                                    </p>
                                                    <p className="text-blue-color font-12 montserrat-medium mb-0">
                                                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit  Consectetur Adipiscing Elit, S...
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className='bg-blue-color text-white py-2 font-18 montserrat-medium mt-3 rounded-pill border-0 w-100'
                                    onClick={() => setShowAddProduct(!showAddProduct)}
                                > <GoPlus className='me-3 font-24' />Add New Product</button>
                            </div>

                            {/* Accordian Start Here */}
                            <div
                                class="accordion accordion-flush mb-2 border-0"
                                id="accordionFlushExample"
                            >
                                {/* Discount Codes */}
                                <div className="accordion-item bg-white box-shadow border-light-gray border-radius-12 mb-3">
                                    <h2 className="accordion-header" id="flush-headingOne">
                                        <button
                                            className="accordion-button collapsed font-18 montserrat-semibold text-gray-color border-radius-12 pb-1"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseOne"
                                            aria-expanded="true"
                                            aria-controls="flush-collapseOne"
                                        >
                                            Discount Codes
                                        </button>
                                        <p className="px-3 font-12 montserrat-medium text-blue-color">
                                            {" "}
                                            Fill the data below to create a discount code
                                        </p>
                                    </h2>
                                    <div
                                        id="flush-collapseOne"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="flush-headingOne"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        {/* Accordian Body */}
                                        <div className="accordion-body text-blue-color">
                                            <div className='row'>
                                                {discountList.map((_, index) => (
                                                    <div className="row" key={index}>
                                                        <div className='col-lg-12 mb-3'>
                                                            <label className="form-label font-14 montserrat-regular text-border-gray-color">Discount Title</label>
                                                            <input
                                                                type="text"
                                                                className="form-control login-input rounded-3 border-0 py-2"
                                                                {...register(`discount_title_${index}`)}
                                                            />
                                                        </div>

                                                        <div className='col-lg-6 mb-3'>
                                                            <label className="form-label font-14 montserrat-regular text-border-gray-color">Product to apply discount on</label>
                                                            <select className="form-select login-input border-0" {...register(`product_${index}`)}>
                                                                <option value="">Select</option>
                                                                <option value="Set as discount">Set as discount</option>
                                                                <option value="Make it exclusive">Make it exclusive</option>
                                                                <option value="Offer as Bonus">Offer as Bonus</option>
                                                                <option value="Instagram">Instagram</option>
                                                            </select>
                                                        </div>

                                                        <div className='col-lg-6 mb-3'>
                                                            <label className="form-label font-14 montserrat-regular text-border-gray-color">Upload Image</label>
                                                            <div className="upload-box d-flex text-center bg-light-white-3-color rounded-3 form-control login-input border-0 py-2 text-blue-color font-12 montserrat-medium">
                                                                <div className="upload-icon"><PiUploadSimpleBold className='font-16 me-3 mb-2' /></div>
                                                                Upload
                                                                <input type="file" id={`formFile_${index}`} {...register(`image_${index}`)} />
                                                            </div>
                                                        </div>

                                                        <div className='col-lg-6 mb-3'>
                                                            <label className="form-label font-14 montserrat-regular text-border-gray-color">Coupon Code</label>
                                                            <input
                                                                type="text"
                                                                className="form-control login-input rounded-3 border-0 py-2"
                                                                {...register(`coupon_code_${index}`)}
                                                            />
                                                        </div>

                                                        <div className='col-lg-6 mb-3'>
                                                            <label className="form-label font-14 montserrat-regular text-border-gray-color">Validity Till</label>
                                                            <input
                                                                type="date"
                                                                className="form-control login-input text-blue-color rounded-3 border-0 py-2"
                                                                {...register(`date_${index}`)}
                                                            />
                                                        </div>

                                                        <hr className="my-4" />
                                                    </div>
                                                ))}
                                            </div>

                                            <div className='row'>
                                                <div className='col-lg-5'>
                                                    <Button
                                                        btn_title={"Save Changes"}
                                                        btn_class={"text-white w-100 bg-purple-color border-purple mt-3 px-5"}
                                                    />
                                                </div>
                                                <div className='col-lg-5'>
                                                    <Button
                                                        btn_title={"Create New"}
                                                        btn_class={"text-purple-color w-100 bg-transparent border-purple mt-3 px-5"}
                                                        onClick={handleAddDiscount}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* Add Exclusive Offers */}
                                <div className="accordion-item bg-white box-shadow border-light-gray border-radius-12 mb-3">
                                    <h2 className="accordion-header" id="flush-headingTwo">
                                        <button
                                            className="accordion-button collapsed font-18 montserrat-semibold text-gray-color border-radius-12 pb-1"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseTwo"
                                        >
                                            Exclusive Offers
                                        </button>
                                        <p className="px-3 font-12 montserrat-medium text-blue-color">
                                            Fill the data below to create an offer
                                        </p>
                                    </h2>
                                    <div
                                        id="flush-collapseTwo"
                                        className="accordion-collapse collapse text-blue-color"
                                        aria-labelledby="flush-headingTwo"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        {/* Exclusive Offer Body */}
                                        <div className="accordion-body text-blue-color">
                                            {offerList.map((_, index) => (
                                                <div className='row' key={index}>
                                                    <div className='col-lg-6 mb-3'>
                                                        <label className="form-label font-14 montserrat-regular text-border-gray-color">Offer Title</label>
                                                        <input
                                                            type="text"
                                                            className="form-control login-input rounded-3 border-0 py-2"
                                                            {...register(`offer_title_${index}`)}
                                                        />
                                                    </div>

                                                    <div className='col-lg-6 mb-3'>
                                                        <label className="form-label font-14 montserrat-regular text-border-gray-color">One Liner</label>
                                                        <input
                                                            type="text"
                                                            className="form-control login-input rounded-3 border-0 py-2"
                                                            {...register(`one_liner_${index}`)}
                                                        />
                                                    </div>

                                                    <div className='col-lg-6 mb-3'>
                                                        <label className="form-label font-14 montserrat-regular text-border-gray-color">Attach Image/Icon</label>
                                                        <div className="upload-box d-flex text-center rounded-3 form-control login-input border-0 py-2 text-blue-color font-12 montserrat-medium">
                                                            <div className="upload-icon"><PiUploadSimpleBold className='font-16 me-3 mb-2' /></div>
                                                            Upload
                                                            <input type="file" {...register(`icon_${index}`)} />
                                                        </div>
                                                    </div>

                                                    <div className='col-lg-6 mb-3'>
                                                        <label className="form-label font-14 montserrat-regular text-border-gray-color">Button Text</label>
                                                        <input
                                                            type="text"
                                                            className="form-control login-input rounded-3 border-0 py-2"
                                                            {...register(`button_text_${index}`)}
                                                        />
                                                    </div>

                                                    <div className='col-lg-4 mb-3'>
                                                        <label className="form-label font-14 montserrat-regular text-border-gray-color">Start Date</label>
                                                        <input
                                                            type="date"
                                                            className="form-control login-input text-blue-color rounded-3 border-0 py-2"
                                                            {...register(`start_date_${index}`)}
                                                        />
                                                    </div>

                                                    <div className='col-lg-4 mb-3'>
                                                        <label className="form-label font-14 montserrat-regular text-border-gray-color">End Date</label>
                                                        <input
                                                            type="date"
                                                            className="form-control login-input text-blue-color rounded-3 border-0 py-2"
                                                            {...register(`end_date_${index}`)}
                                                        />
                                                    </div>

                                                    <div className='col-lg-4 mb-3'>
                                                        <label className="form-label font-14 montserrat-regular text-border-gray-color">Time</label>
                                                        <input
                                                            type="time"
                                                            className="form-control login-input text-blue-color rounded-3 border-0 py-2"
                                                            {...register(`time_${index}`)}
                                                        />
                                                    </div>

                                                    <hr className="my-4" />
                                                </div>
                                            ))}

                                            <div className='row'>
                                                <div className='col-lg-5'>
                                                    <Button
                                                        btn_title={"Save Changes"}
                                                        btn_class={"text-white w-100 bg-purple-color border-purple mt-3 px-5"}
                                                    />
                                                </div>
                                                <div className='col-lg-5'>
                                                    <Button
                                                        btn_title={"Create New"}
                                                        btn_class={"text-purple-color w-100 bg-transparent border-purple mt-3 px-5"}
                                                        onClick={handleAddOffer}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                                {/* Add Exclusive Perks */}
                                <div class="accordion-item bg-white box-shadow border-light-gray border-radius-12 mb-3">
                                    <h2 class="accordion-header" id="flush-headingThree">
                                        <button
                                            className="accordion-button collapsed font-18 montserrat-semibold text-gray-color border-radius-12 pb-1"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseThree"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseThree"
                                        >
                                            Exclusive Perks
                                        </button>
                                        <p className="px-3 font-12 montserrat-medium text-blue-color">
                                            Fill the data below to create an offer
                                        </p>
                                    </h2>
                                    <div
                                        id="flush-collapseThree"
                                        className="accordion-collapse collapse text-blue-color"
                                        aria-labelledby="flush-headingThree"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        {/* Exclusive Perks Body */}
                                        <div className="accordion-body text-blue-color">
                                            {ExclusivePerk.map((_, index) => (
                                                <div className="row" key={index}>
                                                    <div className="col-lg-12 mb-3">
                                                        <label className="form-label font-14 montserrat-regular text-border-gray-color">Exclusive Perk Title</label>
                                                        <input
                                                            type="text"
                                                            className="form-control login-input rounded-3 border-0 py-2"
                                                            placeholder="Enter perk title"
                                                            {...register(`Exclusive_Perk_title_${index}`)}
                                                        />
                                                    </div>

                                                    <div className="col-lg-6 mb-3">
                                                        <label className="form-label font-14 montserrat-regular text-border-gray-color">Additional info/unlocking details</label>
                                                        <select className="form-select login-input border-0"
                                                            {...register(`unlocking_details_${index}`)}
                                                        >
                                                            <option value="" selected disabled>Select</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-lg-6 mb-3">
                                                        <label className="form-label font-14 montserrat-regular text-border-gray-color">Attach Image/Icon</label>
                                                        <div className="upload-box d-flex text-center rounded-3 form-control login-input border-0 py-2 text-blue-color font-12 montserrat-medium">
                                                            <div className="upload-icon">
                                                                <PiUploadSimpleBold className="font-16 me-3 mb-2" />
                                                            </div>
                                                            Upload
                                                            <input type="file" className="d-none" id={`formFile_${index}`} {...register(`image_${index}`)} />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12 mb-3">
                                                        <label className="form-label font-14 montserrat-regular text-border-gray-color">Terms & Conditions applied</label>
                                                        <textarea
                                                            className="form-control login-input rounded-3 border-0 py-2"
                                                            rows="3"
                                                            {...register(`terms_${index}`)}
                                                            placeholder="Enter terms & conditions"
                                                        ></textarea>
                                                    </div>
                                                    <hr className="my-4" />
                                                </div>
                                            ))}
                                            {/* Create New Button */}
                                            <div className="row">
                                                <div className='col-lg-5'>
                                                    <Button
                                                        btn_title={"Save Changes"}
                                                        btn_class={"text-white w-100 bg-purple-color border-purple mt-3 px-5"}
                                                    />
                                                </div>
                                                <div className="col-lg-5">
                                                    <Button
                                                        btn_title="Create New"
                                                        btn_class="text-purple-color w-100 bg-transparent border-purple mt-3 px-5"
                                                        onClick={handleAddExclusivePerk}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* Add Exciting Prizes */}
                                <div class="accordion-item bg-white box-shadow border-light-gray border-radius-12 mb-3">
                                    <h2 class="accordion-header" id="flush-headingFour">
                                        <button
                                            className="accordion-button collapsed font-18 montserrat-semibold text-gray-color border-radius-12 pb-1"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseFour"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseFour"
                                        >
                                            Exciting Prizes
                                        </button>
                                        <p className="px-3 font-12 montserrat-medium text-blue-color">
                                            Fill the data below to create an offer
                                        </p>
                                    </h2>
                                    <div
                                        id="flush-collapseFour"
                                        className="accordion-collapse collapse text-blue-color"
                                        aria-labelledby="flush-headingFour"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        {/* Exciting Prizes Body */}
                                        <div className="accordion-body text-blue-color">
                                            {ExcitingPrizes.map((_, index) => (
                                                <div className='row' key={index}>
                                                    <div className='col-lg-12 mb-3'>
                                                        <label className="form-label font-14 montserrat-regular text-border-gray-color">Title</label>
                                                        <input
                                                            type="text"
                                                            className="form-control login-input rounded-3 border-0 py-2"
                                                            placeholder="Enter Title"
                                                            {...register(`title_${index}`)}
                                                        />
                                                    </div>

                                                    <div className='col-lg-3 mb-3'>
                                                        <label className="form-label font-14 montserrat-regular text-border-gray-color" htmlFor={`image_${index}`}>Upload Image</label>
                                                        <div className="upload-box d-flex justify-content-center flex-column text-center rounded-3 form-control bg-light-white-3-color border-light-gray px-4 py-4 text-blue-color font-12 montserrat-medium">
                                                            <div className="upload-icon mx-auto text-center">
                                                                <PiUploadSimpleBold className='font-16 mb-2' />
                                                            </div>
                                                            Upload
                                                            <input
                                                                type="file"
                                                                className="d-none"
                                                                id={`image_${index}`}
                                                                {...register(`image_${index}`)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-9 mb-3">
                                                        <label className="form-label font-14 montserrat-regular text-border-gray-color">
                                                            Terms & Conditions applied
                                                        </label>
                                                        <textarea
                                                            className="form-control login-input rounded-3 border-0 py-2"
                                                            rows="3"
                                                            placeholder="Enter Terms & Conditions"
                                                            {...register(`terms_${index}`)}
                                                        />
                                                    </div>

                                                    <hr className="my-4" />

                                                </div>
                                            ))}

                                            <div className='row'>
                                                <div className='col-lg-5'>
                                                    <Button
                                                        btn_title={"Save Changes"}
                                                        btn_class={"text-white w-100 bg-purple-color border-purple mt-3 px-5"}
                                                    />
                                                </div>
                                                <div className='col-lg-5'>
                                                    <Button
                                                        btn_title="Create New"
                                                        btn_class="text-purple-color w-100 bg-transparent border-purple mt-3 px-5"
                                                        onClick={handleAddExcitingPrize}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                    </div>
                    <div className='col-lg-6'>
                        {showAddProduct && (
                            <>
                                {/* Add New Products Section Start Here */}
                                <div className='border-radius-12 border-light-gray bg-white p-3'>
                                    <p className='font-24 montserrat-semibold text-blue-color mb-0'>Add  New product</p>
                                    <p className='text-blue-color font-12 montserrat-medium'>Fill the details below to add a new product to your list</p>
                                    <form className='row'>
                                        <div className='col-lg-6 mb-3'>
                                            <label className="form-label font-14 montserrat-regular text-border-gray-color">Product Name</label>
                                            <input
                                                type="text"
                                                className="form-control login-input rounded-3 border-0 py-2 "
                                                {...register('productName')}
                                            />
                                        </div>
                                        <div className='col-lg-3 mb-3'>
                                            <label className="form-label font-14 montserrat-regular text-border-gray-color">Original Amt</label>
                                            <input
                                                type="number"
                                                className="form-control login-input rounded-3 border-0 py-2 "
                                                {...register('discountAmt')}
                                            />
                                        </div>
                                        <div className='col-lg-3 mb-3'>
                                            <label className="form-label font-14 montserrat-regular text-border-gray-color">Discount Amt</label>
                                            <input
                                                type="number"
                                                className="form-control login-input rounded-3 border-0 py-2 "
                                                {...register('originalAmt')}
                                            />
                                        </div>
                                        <div className='col-lg-6 mb-3'>
                                            <label className="form-label font-14 montserrat-regular text-border-gray-color">Short Description</label>
                                            <input
                                                type="text"
                                                className="form-control login-input rounded-3 border-0 py-2 "
                                                {...register('shortDescription')}
                                            />
                                        </div>
                                        <div className='col-lg-6 mb-3'>
                                            <label className="form-label font-14 montserrat-regular text-border-gray-color">Attach Image/Icon</label>
                                            <div class="upload-box d-flex text-center bg-light-white-3-color rounded-3 form-control login-input border-0 py-2 text-blue-color font-12 montserrat-medium">
                                                <div class="upload-icon"><PiUploadSimpleBold className='font-16 me-3 mb-2' /></div>
                                                Upload
                                                <input type="file" id="formFile" />
                                            </div>
                                        </div>
                                        <div className='col-lg-12 mb-3'>
                                            <label className="form-label font-14 montserrat-regular text-border-gray-color">Select the type of reward you want to set this product on</label>
                                            <select class="form-select login-input border-0 w-50" aria-label="Default select example">
                                                <option selected> Reward Type</option>
                                                <option value="Set as discount">Set as discount</option>
                                                <option value="Make it exclusive">Make it exclusive</option>
                                                <option value="Offer as Bonus">Offer as Bonus</option>
                                                <option value="Instagram">Instagram</option>
                                            </select>
                                        </div>
                                        <div className='col-lg-5 mb-3'>
                                            <label className="form-label font-14 montserrat-regular text-border-gray-color">Select the status of the product</label>
                                            <select class="form-select login-input border-0 w-75" aria-label="Default select example">
                                                <option selected>Status</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                        <div className='col-lg-7 mb-3'>
                                            <label className="form-label font-14 montserrat-regular text-border-gray-color">Visibility date (Till)</label>
                                            <input
                                                type="date"
                                                className="form-control login-input text-blue-color w-50 rounded-3 border-0 py-2 "
                                                {...register('date')}
                                            />
                                        </div>
                                        <div className='col-lg-4'>
                                            <Button btn_class={"text-white px-4 w-100 bg-purple-color border-0 mt-3"}
                                                btn_title={"Save Changes"}
                                            />

                                        </div>
                                        <div className='col-lg-4'>
                                            <Button
                                                btn_class={"text-purple-color w-100 bg-transparent border-purple mt-3 px-5"}
                                                btn_title={"Cancel"}
                                                onClick={() => setShowAddProduct(false)}
                                            />
                                        </div>
                                    </form>
                                </div>
                            </>
                        )}
                    </div>

                </div>

            </div >
        </>
    );
};

export default Product;