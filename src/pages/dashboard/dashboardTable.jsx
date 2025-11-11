import React, { useState } from 'react'

const DashboardTable = ({ tabelHeading = [], tableData = [] }) => {
    // UseState's
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Pagination Function Start Here
    // const totalPages = Math.ceil(ParticipantsData.length / rowsPerPage);
    const totalPages = Math.ceil(tableData.length / rowsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1); // reset to first page
    };

    const paginatedData = tableData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );
    return (
        <>
            <div className='table-responsive hide-scroll'>
                <table className="table text-nowrap middle-align">
                    <thead className='border-light-purple border-start-0 channel-table border-end-0'>
                        <tr>
                            {tabelHeading.map((col, idx) => (
                                <th key={idx} className="font-14 montserrat-medium px-3">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData?.map((item, index) => (
                            <tr key={index}>
                                {tabelHeading?.map((col, colIndex) => (
                                    <td key={colIndex} className="font-14 montserrat-semibold py-3 px-3">
                                        {col.isBadge ? (
                                            <span className="referral-bg-blue px-2 py-1 rounded-3">{item[col.accessor]}</span>
                                        ) : col.isGreenBadge ? (
                                            <span className="text-live-green-color referral-bg-green px-2 py-1 rounded-3">
                                                {item[col.accessor]}
                                            </span>
                                        ) : (
                                            item[col.accessor]
                                        )}
                                    </td>
                                ))}
                                {/* <td className="font-16 montserrat-semibold py-3 px-3">{item.ranking}</td>
                                <td className="font-16 montserrat-semibold py-3 px-3">{item.name}</td>
                                <td className="font-16 montserrat-semibold py-3 px-3">{item.email}</td>
                                <td className="font-16 montserrat-semibold py-3 px-3">{item.mobile}</td>
                                <td className="font-16 montserrat-semibold py-3 px-3">{item.referralCode}</td>
                                <td className="font-16 montserrat-semibold py-3 px-3">
                                    <span className='referral-bg-blue px-2 py-1 rounded-3'>{item.referrals}</span>
                                </td>
                                <td className="font-16 montserrat-semibold py-3 px-3">
                                    <span className='text-live-green-color referral-bg-green px-2 py-1 rounded-3'>{item.successfullReferral}</span>
                                </td>
                                <td className="font-16 montserrat-semibold py-3 px-3">{item.earnings}</td>
                                <td className="font-16 montserrat-semibold py-3 px-3">{item.totalEarnings}</td> */}

                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <div className='row gy-2 d-flex align-items-center m-3'>
                <div className='col-lg-7 d-flex justify-content-end gap-4 '>
                    <button className='text-gray-color border-gray border-radiu-8 px-3 py-2 bg-transparent font-14 poppins-medium'
                        disabled={currentPage === 1}
                        onClick={handlePrevious}>
                        Previous</button>
                    <button className='border-0 border-radiu-8 bg-blue-color text-white px-3 py-2 font-14 poppins-medium'
                        disabled={currentPage === totalPages}
                        onClick={handleNext}>
                        Next</button>
                </div>
                <div className='col-lg-5 d-flex align-items-center justify-content-end gap-2'>
                    <label className='font-14 poppins-medium'>Rows per page</label>
                    <select
                        className='form-select border-gray border-radiu-8 bg-transparent w-auto font-14 poppins-medium text-gray-color'
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                </div>
            </div>

        </>
    );
};

export default DashboardTable