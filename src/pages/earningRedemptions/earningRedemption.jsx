import React, { useState } from 'react'
import NavBar from '../../components/navbar';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { CgArrowsExpandRight } from 'react-icons/cg';
import { useForm } from 'react-hook-form';
import { Nav } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { GoPlus } from 'react-icons/go';
import EarningsTable from '../../components/earningsTable';
import { PiPencilSimple, PiUploadSimpleBold } from 'react-icons/pi';
import Button from '../../components/button';
import DropdownFilter from '../../components/dropdown';

// Import json
const products = [
    { name: "Product Name", oldPrice: 1000, newPrice: 800, status: "live" },
    { name: "Product Name", oldPrice: 1000, newPrice: 800, status: "paused" },
    { name: "Product Name", oldPrice: 1000, newPrice: 800, status: "live" },
    { name: "Product Name", oldPrice: 1000, newPrice: 800, status: "paused" },
];


const tableGameHeadings = ['Name', 'E-mail', 'Game', 'Earnings'];
const tableReferringHeadings = ['Name', 'E-mail', 'No of Referrals', 'Earnings'];
const tableAcceptingHeadings = ['Name', 'E-mail', 'No of Acceptances', 'Earnings'];
const tableProductHeadings = ['Name', 'E-mail', 'Product Purchased', 'Earnings'];

const EarningGameData = [
    {
        name: 'Aditi Sharma',
        email: 'aditixyz@gmail.com',
        game: 'TIC TAC TOE',
        earnings: '2000 Meteors',
    },
    {
        name: 'Aditi Sharma',
        email: 'aditixyz@gmail.com',
        game: 'Spin the bottle',
        earnings: '2000 Meteors',
    },
    {
        name: 'Aditi Sharma',
        email: 'aditixyz@gmail.com',
        game: 'TIC TAC TOE',
        earnings: '2000 Meteors',
    },
    {
        name: 'Aditi Sharma',
        email: 'aditixyz@gmail.com',
        game: 'TIC TAC TOE',
        earnings: '2000 Meteors',
    },
    {
        name: 'Aditi Sharma',
        email: 'aditixyz@gmail.com',
        game: 'TIC TAC TOE',
        earnings: '2000 Meteors',
    },
];

const tabs = [
    { id: 0, title: 'Games', headings: tableGameHeadings, data: EarningGameData },
    { id: 1, title: 'On referring', headings: tableReferringHeadings, data: EarningGameData },
    { id: 2, title: 'On Accepting', headings: tableAcceptingHeadings, data: EarningGameData },
    { id: 3, title: 'On Product Purchase', headings: tableProductHeadings, data: EarningGameData }
];

const cards = [
    {
        id: 'how-it-works',
        title: 'How it Works',
        description: 'This will contain all the steps to explain the users how the program will work. Edit the data according to your need.',
        fields: ['Title 1', 'Add Description (25-30 words)', 'Title 2', 'Add Description (25-30 words)', 'Title 3', 'Add Description (25-30 words)'],
    },
    {
        id: 'advertisement',
        title: 'Advertisement Card 1',
        description: 'Customize this card to highlight your latest offer or referral perk.',
        fields: ['Title 1', 'Add Description (25-30 words)', 'Button Text', 'Add Image/illustration'],
    },
    {
        id: 'faq',
        title: 'Frequently Asked Questions',
        description: 'Edit questions and answers to keep your users informed and confident.',
        isFAQ: true,
    },
    {
        id: 'footer',
        title: 'Footer Section',
        description: 'Edit the content you want to display on your footer section',
        fields: ['Select or type the content'],
    },
];

const StatusFilter = [
    { label: "Upcoming" },
    { label: "Live" },
    { label: "Pause" },
];



const EarningRedemption = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

      const {
        register: registerHowItWork,
        handleSubmit: handleSubmitHowItWork,
        formState: { errors: errorsHowItWork, isSubmitting: isHowItWorkSubmitting },
        watch: watchHowItWork,
      } = useForm();

      const cards = [
    {
        id: 'how-it-works',
        title: 'How it Works',
        description: 'This will contain all the steps to explain the users how the program will work. Edit the data according to your need.',
        fields: ['Title 1', 'Add Description (25-30 words)', 'Title 2', 'Add Description (25-30 words)', 'Title 3', 'Add Description (25-30 words)'],
    },
    {
        id: 'advertisement',
        title: 'Advertisement Card 1',
        description: 'Customize this card to highlight your latest offer or referral perk.',
        fields: ['Title 1', 'Add Description (25-30 words)', 'Button Text', 'Add Image/illustration'],
    },
    {
        id: 'faq',
        title: 'Frequently Asked Questions',
        description: 'Edit questions and answers to keep your users informed and confident.',
        isFAQ: true,
    },
    {
        id: 'footer',
        title: 'Footer Section',
        description: 'Edit the content you want to display on your footer section',
        fields: ['Select or type the content'],
    },
];


    const [activeTab, setActiveTab] = useState('tab1');
    const [activeCardId, setActiveCardId] = useState('how-it-works');
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);


      // ======================
  // API FUNCTIONALITY
  // ======================

    const HandleFormSubmit = async (data) => {
    //   try {
    //     const getAuth = await postData("/admin/auths", {
    //       admin_uid: GetAdminUid,
    //     });
    //     const payload = {
    //       admin_uid: GetAdminUid,
    //       mode: getAuth?.access_token,
    //       log_alt: getAuth?.session_id,
    //       start_date: new Date(data?.start_date)?.toLocaleDateString("en-GB"),
    //       end_date: new Date(data?.end_date)?.toLocaleDateString("en-GB"),
    //       referrer_reward_type: data?.referrer_reward_type,
    //       referrer_reward_value: data?.referrer_reward_value,
    //       referee_reward_type: data?.referee_reward_type,
    //       referee_reward_value: data?.referee_reward_value,
    //       reward_condition: data?.reward_condition,
    //       success_reward: data?.success_reward,
    //       invite_link: data?.invite_link,
    //       active: data?.active,
    //     };
    //     const response = await postData("/admin/special-referral-link", payload);
    //     if (response?.success) {
    //       toastSuccess(response?.message);
    //     }
    //   } catch (error) {
    //     toastError(error?.error);
    //   }
    };

    return (
        <>
            <NavBar />
            <div className='bg-light-blue-color py-5 min-vh-100'>
                <div className='container'>
                    <div>
                        <p className='mb-0 text-blue-color montserrat-semibold font-24'>Earnings and Redemptions</p>
                        <p className='mb-0 text-blue-color montserrat-medium font-12'>All rewards, exciting prizes and etc</p>
                    </div>
                </div>
                <div className='nav-tab-bg'>
                    <Nav className='mt-4 container' activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)}>
                        <Nav.Item>
                            <Nav.Link eventKey="tab1" className='font-24 montserrat-semibold text-border-gray-color'>Exclusive Offers <IoIosArrowForward className='mx-4' /></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="tab2" className='font-24 montserrat-semibold text-border-gray-color'>
                                Exciting Prizes <IoIosArrowForward className='mx-4' />
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="tab3" className='font-24 montserrat-semibold text-border-gray-color'>
                                Miscellaneous
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div className='container'>
                    {/* Tab Content */}
                    <div className="p-lg-4">
                        {/* tab 1 (Exclusive Offer) Start Here */}
                        {activeTab === 'tab1' &&
                            <div className='row py-3 gy-3 mt-3'>
                                <div className='col-lg-7'>
                                    {!showAddProduct && (
                                        <>
                                            <div className='border-radius-12 bg-light-white-color p-3'>
                                                <div className='d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mt-3'>
                                                    <p className='font-18 montserrat-medium text-blue-color mb-0'>
                                                        Products / Services
                                                    </p>

                                                    <div className='d-flex flex-wrap gap-2 gap-md-3 align-items-center'>
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
                                                </div>
                                                {/* Products cards */}
                                                    <div className='row mt-3 g-3'>
                                                        {products.map((item, index) => (
                                                           <div className='col-lg-3 col-md-4'>
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
                                                                    <p className="text-blue-color font-14 montserrat-medium mb-0">{item.name}</p>
                                                                    <p className="mb-1 montserrat-semibold">
                                                                        <span className="text-red-color font-12 text-decoration-line-through">₹{item.oldPrice}/-</span>
                                                                        <span className="ms-2 font-14 text-blue-color">₹{item.newPrice}/-</span>
                                                                    </p>
                                                                    <p className="text-blue-color font-10 montserrat-medium mb-0">
                                                                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, S...
                                                                    </p>
                                                                </div>
                                                            </div>
                                                           </div>
                                                        ))}
                                                    </div>

                                                <button className='bg-blue-color text-white py-2 font-18 montserrat-medium mt-3 rounded border-0 w-100'
                                                    onClick={() => setShowAddProduct(true)}
                                                > <GoPlus className='me-3 font-24' />Add New Product</button>
                                            </div>

                                        </>
                                    )}

                                    {showAddProduct && (
                                        <>
                                            {/* Add New Products Section Start Here */}
                                            <p className='font-18 montserrat-semibold text-border-gray-color mb-0'>Add  New product</p>
                                            <p className='text-blue-color font-12 montserrat-medium'>Fill the details below to add a new product to your list</p>
                                            <form className='row'>
                                                <div className='col-lg-6 mb-3'>
                                                    <label className="form-label font-14 montserrat-regular text-border-gray-color">Product Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control rounded-3 border-0 py-2 "
                                                        {...register('productName')}
                                                    />
                                                </div>
                                                <div className='col-lg-3 mb-3'>
                                                    <label className="form-label font-14 montserrat-regular text-border-gray-color">Original Amt</label>
                                                    <input
                                                        type="number"
                                                        className="form-control rounded-3 border-0 py-2 "
                                                        {...register('discountAmt')}
                                                    />
                                                </div>
                                                <div className='col-lg-3 mb-3'>
                                                    <label className="form-label font-14 montserrat-regular text-border-gray-color">Discount Amt</label>
                                                    <input
                                                        type="number"
                                                        className="form-control rounded-3 border-0 py-2 "
                                                        {...register('originalAmt')}
                                                    />
                                                </div>
                                                <div className='col-lg-6 mb-3'>
                                                    <label className="form-label font-14 montserrat-regular text-border-gray-color">Short Description</label>
                                                    <input
                                                        type="text"
                                                        className="form-control rounded-3 border-0 py-2 "
                                                        {...register('shortDescription')}
                                                    />
                                                </div>
                                                <div className='col-lg-6 mb-3'>
                                                    <label className="form-label font-14 montserrat-regular text-border-gray-color">Attach Image/Icon</label>
                                                    <div class="upload-box d-flex text-center bg-light-white-3-color rounded-3 form-control border-0 py-2 text-blue-color font-12 montserrat-medium">
                                                        <div class="upload-icon"><PiUploadSimpleBold className='font-16 me-3 mb-2' /></div>
                                                        Upload
                                                        <input type="file" id="formFile" />
                                                    </div>
                                                </div>
                                                <div className='col-lg-12 mb-3'>
                                                    <label className="form-label font-14 montserrat-regular text-border-gray-color">Select the type of reward you want to set this product on</label>
                                                    <select class="form-select w-50" aria-label="Default select example">
                                                        <option selected> Reward Type</option>
                                                        <option value="Set as discount">Set as discount</option>
                                                        <option value="Make it exclusive">Make it exclusive</option>
                                                        <option value="Offer as Bonus">Offer as Bonus</option>
                                                        <option value="Instagram">Instagram</option>
                                                    </select>
                                                </div>
                                                <div className='col-lg-5 mb-3'>
                                                    <label className="form-label font-14 montserrat-regular text-border-gray-color">Select the status of the product</label>
                                                    <select class="form-select w-75" aria-label="Default select example">
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
                                                        className="form-control text-blue-color w-50 rounded-3 border-0 py-2 "
                                                        {...register('date')}
                                                    />
                                                </div>
                                                <div className='col-lg-4'>
                                                    <Button btn_class={"text-white px-4 w-100 bg-blue-color border-0 mt-3"}
                                                        btn_title={"Save Changes"}
                                                    />

                                                </div>
                                                <div className='col-lg-4'>
                                                    <Button
                                                        btn_class={"text-blue-color w-100 bg-transparent border-blue mt-3 px-5"}
                                                        btn_title={"Cancel"}
                                                        onClick={() => setShowAddProduct(false)}
                                                    />
                                                </div>
                                            </form>
                                        </>
                                    )}
                                </div>

                                <div className='col-lg-5'>
                                    <div className='bg-light-white-color p-4 border-radius-16'>
                                        <div className='gray-box border-radius-8'>
                                        </div>

                                        <div className='d-flex align-items-center justify-content-between mt-3'>
                                            <div>
                                                <p className='font-18 montserrat-semibold text-border-gray-color mb-0 '>Exclusive Offers</p>
                                            </div>
                                            <div className='d-flex align-items-center gap-2'>
                                                <button className='text-blue-color rounded-2 py-2 px-3 border-light-gray bg-light-white-1-color font-12 montserrat-medium'>Add New</button>
                                                <DropdownFilter title={"Sort"}
                                                    dropdownItems={StatusFilter}
                                                    dropIcon={<IoIosArrowDown className='font-18' />}
                                                />
                                            </div>
                                        </div>
                                                <p className='text-blue-color font-12 montserrat-medium'>Fill the data below to create an offer </p>
                                        <form className='row mt-3'>
                                            <div className='col-lg-6 mb-3'>
                                                <label className="form-label font-14 montserrat-regular text-border-gray-color">Offer Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control login-input rounded-3 border-0 py-2 "
                                                    {...register('name')}
                                                />
                                            </div>
                                            <div className='col-lg-6 mb-3'>
                                                <label className="form-label font-14 montserrat-regular text-border-gray-color">Add One Liner</label>
                                                <input
                                                    type="text"
                                                    className="form-control login-input rounded-3 border-0 py-2 "
                                                    {...register('oneLiner')}
                                                />
                                            </div>
                                            <div className='col-lg-6 mb-3'>
                                                <label className="form-label font-14 montserrat-regular text-border-gray-color">Upload Image/Logo</label>
                                                <label class="upload-box text-center d-flex login-input border-0 rounded-3 px-3 py-2 text-blue-color font-12 montserrat-medium">
                                                    <div class="upload-icon pb-1"><PiUploadSimpleBold className='font-16 me-2' /></div>
                                                    Upload
                                                    <input type="file" id="formFile" />
                                                </label>
                                            </div>
                                            <div className='col-lg-6 mb-3'>
                                                <label className="form-label font-14 montserrat-regular text-border-gray-color">Button Text</label>
                                                <input
                                                    type="text"
                                                    className="form-control login-input rounded-3 border-0 py-2 "
                                                    {...register('ButtonText')}
                                                />
                                            </div>
                                            <div className='col-lg-4 mb-3'>
                                                <label className="form-label font-14 montserrat-regular text-border-gray-color">Start Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control login-input rounded-3 border-0 py-2 "
                                                    {...register('date')}
                                                />
                                            </div>
                                            <div className='col-lg-4 mb-3'>
                                                <label className="form-label font-14 montserrat-regular text-border-gray-color">End Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control login-input rounded-3 border-0 py-2 "
                                                    {...register('date')}
                                                />
                                            </div>
                                            <div className='col-lg-4 mb-3'>
                                                <label className="form-label font-14 montserrat-regular text-border-gray-color">Time</label>
                                                <input
                                                    type="time"
                                                    className="form-control login-input rounded-3 border-0 py-2 "
                                                    {...register('time')}
                                                />
                                            </div>
                                            <div className='col-lg-6'>
                                                <Button btn_class={"text-white w-100 px-3 bg-blue-color border-0 mt-3"}
                                                    btn_title={"Save Changes"}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        }

                        {/* Tab 2 Content (Exciting Prizes) Start Here */}
                        {activeTab === 'tab2' &&
                            <div className='row gy-3 mt-3'>
                                {!isExpanded ? (
                                    <>
                                        {/* Left Side - Products & Earnings */}
                                        <div className='col-lg-7'>
                                            {/* Product / Services Section */}
                                            <div className='border-radius-12 bg-light-white-color p-3'>
                                                <div className='d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mt-3'>
                                                    <p className='font-18 montserrat-medium text-blue-color mb-0'>Products / Services</p>

                                                    <div className='d-flex flex-wrap gap-2 gap-md-3 align-items-center'>
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
                                                </div>

                                                {/* Product Cards */}
                                                <div className='row g-3 mt-3'>
                                                    {products.map((item, index) => (
                                                       <div className='col-lg-3 col-md-4'>
                                                         <div className="product-card w-100 rounded-3" key={index}>
                                                            <div className='product-card-header d-flex justify-content-between align-items-center rounded-top pb-3'>
                                                                <div className={`rounded d-flex ms-2 justify-content-center align-items-center active-transparent-bg ${item.status === "live" ? "bg-transparent-green" : "bg-transparent-muted-blue"
                                                                    }`}>
                                                                    <span className={`live-circle d-inline-block rounded-circle ${item.status === "live" ? "bg-live-green-color" : "bg-muted-blue-color"
                                                                        }`}></span>
                                                                </div>
                                                                <div className='product-edit d-flex justify-content-center align-items-center width-32 height-32 p-1'>
                                                                    <PiPencilSimple className='font-20 text-blue-color' />
                                                                </div>
                                                            </div>
                                                            <div className='p-2'>
                                                                <p className="text-blue-color font-14 montserrat-medium mb-0">{item.name}</p>
                                                                <p className="mb-1 montserrat-semibold">
                                                                    <span className="text-red-color font-12 text-decoration-line-through">₹{item.oldPrice}/-</span>
                                                                    <span className="ms-2 font-14 text-blue-color">₹{item.newPrice}/-</span>
                                                                </p>
                                                                <p className="text-blue-color font-10 montserrat-medium mb-0">
                                                                    Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, S...
                                                                </p>
                                                            </div>
                                                        </div>
                                                       </div>
                                                    ))}
                                                </div>

                                                <button className='bg-blue-color text-white py-2 font-18 montserrat-medium mt-3 rounded border-0 w-100'>
                                                    <GoPlus className='me-3 font-24' />
                                                    Add New Product
                                                </button>
                                            </div>

                                            {/* Earnings Section */}
                                            <div className='border-radius-16 bg-light-white-color mt-3'>
                                                <div className='p-3'>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <p className='font-18 montserrat-medium text-blue-color mb-0'>Earnings based on different categories</p>
                                                        <div
                                                            className='text-blue-color p-2 earning-circle-arrow rounded-circle d-flex justify-content-between align-items-center cursor-pointer'
                                                            onClick={() => setIsExpanded(true)}
                                                        >
                                                            <CgArrowsExpandRight className='font-24' />
                                                        </div>
                                                    </div>

                                                    <div className='mt-3'>
                                                        <ul className="nav nav-tabs border-0 d-flex gap-3" role="tablist">
                                                            {tabs.map((tab, index) => (
                                                                <li className="nav-item pills-tab" role="presentation" key={tab.id}>
                                                                    <button
                                                                        className={`nav-link font-12 montserrat-medium px-4 py-2 rounded-pill border-purple ${index === 0 ? 'active' : ''}`}
                                                                        id={`tab-${index}`}
                                                                        data-bs-toggle="tab"
                                                                        data-bs-target={`#tab-pane-${index}`}
                                                                        type="button"
                                                                        role="tab"
                                                                        aria-selected={index === 0 ? 'true' : 'false'}
                                                                    >
                                                                        {tab.title}
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="tab-content mt-3 px-3">
                                                    {tabs.map((tab, index) => (
                                                        <div
                                                            key={tab.id}
                                                            className={`tab-pane fade ${index === 0 ? 'show active' : ''}`}
                                                            id={`tab-pane-${index}`}
                                                            role="tabpanel"
                                                        >
                                                            <EarningsTable headings={tab.headings} data={tab.data} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side - Prizes Form */}
                                        <div className='col-lg-5'>
                                            <div className='bg-light-white-color p-4 border-radius-16'>
                                                <div className='gray-box border-radius-8'></div>

                                                <p className='font-18 montserrat-semibold text-border-gray-color mb-0 mt-3'>Exciting Prizes</p>
                                                <p className='text-blue-color font-12 montserrat-medium'>Fill the data below to create a Perfect exciting Prizes section</p>

                                                <form className='row mt-3'>
                                                    <div className='col-lg-12 mb-3'>
                                                        <label className="form-label font-14 montserrat-regular text-border-gray-color">Title</label>
                                                        <input type="text" className="form-control login-input rounded-3 border-0 py-2" {...register('title')} />
                                                    </div>

                                                    <div className='col-lg-4 mb-3'>
                                                        <label className="form-label font-14 montserrat-regular text-border-gray-color">Upload Image</label>
                                                        <div className="upload-box text-center bg-light-white-3-color border border-radius-10 p-4 text-blue-color font-12 montserrat-medium">
                                                            <div className="upload-icon"><PiUploadSimpleBold className='font-16 mb-2' /></div>
                                                            Upload
                                                            <input type="file" id="formFile" />
                                                        </div>
                                                    </div>

                                                    <div className='col-lg-8 mb-3'>
                                                        <label className="form-label font-14 montserrat-regular text-border-gray-color">Terms & Condition</label>
                                                        <textarea className="form-control login-input rounded-3 border-0 py-2" rows="3"></textarea>
                                                    </div>

                                                    <div className='col-lg-6'>
                                                        <Button
                                                            btn_class={"text-white w-100 px-3 bg-blue-color border-0 mt-3"}
                                                            btn_title={"Save Changes"}
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    // Expanded View
                                    <div className='col-12'>
                                        <div className='border-radius-16 bg-light-white-color mt-3'>
                                            <div className='p-3'>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <p className='font-18 montserrat-medium text-blue-color mb-0'>Earnings based on different categories</p>
                                                    <div
                                                        className='text-blue-color p-2 earning-circle-arrow rounded-circle d-flex justify-content-between align-items-center cursor-pointer'
                                                        onClick={() => setIsExpanded(false)}
                                                    >
                                                        <CgArrowsExpandRight className='font-24 rotate-180' />
                                                    </div>
                                                </div>

                                                <div className='mt-3'>
                                                    <ul className="nav nav-tabs border-0 d-flex gap-3" role="tablist">
                                                        {tabs.map((tab, index) => (
                                                            <li className="nav-item pills-tab" role="presentation" key={tab.id}>
                                                                <button
                                                                    className={`nav-link font-12 montserrat-medium px-4 py-2 rounded-pill border-purple ${index === 0 ? 'active' : ''}`}
                                                                    id={`tab-${index}`}
                                                                    data-bs-toggle="tab"
                                                                    data-bs-target={`#tab-pane-${index}`}
                                                                    type="button"
                                                                    role="tab"
                                                                    aria-selected={index === 0 ? 'true' : 'false'}
                                                                >
                                                                    {tab.title}
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="tab-content mt-3 px-3">
                                                {tabs.map((tab, index) => (
                                                    <div
                                                        key={tab.id}
                                                        className={`tab-pane fade ${index === 0 ? 'show active' : ''}`}
                                                        id={`tab-pane-${index}`}
                                                        role="tabpanel"
                                                    >
                                                        <EarningsTable headings={tab.headings} data={tab.data} isExpanded={true} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        }

                        {/* Tab 3 Content (Miscellaneous) Start Here */}
                        {activeTab === 'tab3' &&
                            <div className='row gy-3 mt-3'>
                                <div className='col-lg-7 scrollable-card-wrapper hide-scroll'>
                                    {cards.map((card, index) => (
                                        <div
                                            key={card.id}
                                            className={`bg-light-white-color border-radius-16 p-3 ${activeCardId === card.id ? 'border-blue box-shadow' : 'border-light'}`}
                                            style={{ cursor: 'pointer', marginTop: index > 0 ? '1.5rem' : '0' }}
                                            onClick={() => setActiveCardId(card.id)}
                                        >
                                            <p className="font-18 montserrat-semibold text-border-gray-color mb-0">{card.title}</p>
                                            <p className="font-12 montserrat-medium text-blue-color">{card.description}</p>

                                            <form className="row" onSubmit={handleSubmitHowItWork(HandleFormSubmit)}>
                                                {card.isFAQ ? (
                                                    <>
                                            
                                                        {[1, 2].map((q) => (
                                                            <React.Fragment key={q}>
                                                                <div className="col-lg-12 mb-3">
                                                                    <label className="form-label font-14 montserrat-regular text-border-gray-color">Question {q}</label>
                                                                    <div className="d-flex gap-3 justify-content-between">
                                                                        <input type="text" className="form-control login-input border-0" 
                                                                        {...register("value")}
                                                                        />
                                                                        <div className="login-input rounded-circle faq-add-btn d-flex align-items-center justify-content-center">
                                                                            <GoPlus className="font-24" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12 mb-3">
                                                                    <label className="form-label font-14 montserrat-regular text-border-gray-color">Answer</label>
                                                                    <textarea className="form-control login-input rounded-3 border-0 py-2" rows="3"></textarea>
                                                                </div>
                                                                <hr />
                                                            </React.Fragment>
                                                        ))}
                                                    </>
                                                ) : (
                                                    <>
                                                        {card.fields?.map((label, idx) => (
                                                            <div
                                                                key={idx}
                                                                className={`${card.fields.length === 1 ? 'col-lg-12' : 'col-lg-6'
                                                                    } mb-3`}
                                                            >
                                                                <label className="form-label font-14 montserrat-regular text-border-gray-color">{label}</label>
                                                                <input type="text" className="form-control login-input border-0" 
                                                                {...register("va")}
                                                                />
                                                            </div>
                                                        ))}
                                                    </>
                                                )}
                                                <div className="col-lg-4 my-3">
                                                    <Button
                                                        btn_class={"text-white w-100 px-3 bg-blue-color border-0 mt-3"}
                                                        type="submit"
                                                        btn_title={"Save Changes"}
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    ))}
                                </div>
                                <div className='col-lg-5'>
                                    <div className='bg-light-white-color border-radius-16 miscellaneous-screen-preview px-3'>
                                        <p className='text-blue-color font-24 montserrat-semibold pt-4 text-center'>Screen Preview</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>

        </>
    );
};

export default EarningRedemption;