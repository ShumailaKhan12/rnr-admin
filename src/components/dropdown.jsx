import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
// import { IoIosArrowDown } from 'react-icons/io';

const DropdownFilter = ({ title, dropIcon, dropdownItems = [], }) => {
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic"
                    className="w-100 text-start px-4 border-light-gray bg-light-white-1-color border-radius-8 d-flex justify-content-between align-items-center"

                >
                    <div className="d-flex font-14 montserrat-medium text-blue-color align-items-center gap-2 me-3">
                        {title}
                    </div>
                    <span className="text-blue-color" >
                        {dropIcon}
                    </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className='bg-light-white-color'>
                    {dropdownItems.map((item, index) => (
                        <Dropdown.Item className='text-blue-color border-bottom py-2' key={index} onClick={item.onClick || null}>
                            {item.label}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
};

export default DropdownFilter;