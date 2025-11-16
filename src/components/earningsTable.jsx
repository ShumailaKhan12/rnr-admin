import React from "react";

const EarningsTable = ({ headings, data, isExpanded }) => {
  return (
    <div
      className={`table-responsive ${
        isExpanded ? "overflow-visible" : "table-body-scroll"
      }`}
    >
      <table className="table text-center earning-table middle-align text-nowrap">
        <thead className="position-sticky top-0">
          <tr>
            {headings.map((heading, index) => (
              <th
                key={index}
                className={`font-14 montserrat-regular ${
                  index === 0
                    ? "text-blue-color ps-5 text-start d-flex align-items-center"
                    : ""
                }`}
              >
                {index === 0 ? (
                  <>
                    <input type="checkbox" className="purple-checkbox me-2" />
                    {heading}
                  </>
                ) : (
                  heading
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="font-14 montserrat-medium ps-5 text-start py-3 d-flex align-items-center">
                <input type="checkbox" className="purple-checkbox me-2" />
                {item.name}
              </td>
              <td className="font-14 montserrat-medium py-3">{item.email}</td>
              <td className="font-14 montserrat-medium py-3">{item.game}</td>
              <td className="font-14 montserrat-medium py-3">
                {item.earnings}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EarningsTable;
