import React from "react";

const ConfirmDeleteModal = ({ show, onClose, onConfirm, title, message }) => {
  if (!show) return null;

  return (
    <>
      {/* Modal */}
      <div className="modal fade show " style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-gradient-color dlt-modal border-0 ">

            <div className="modal-header border-0">
              <h5 className="modal-title montserrat-semibold font-24 text-primary-color">{title || "Confirm Delete"}</h5>
              <button className="btn-close close-btn" onClick={onClose}></button>
            </div>

            <div className="modal-body text-center font-18 ">
              <p>{message || "Are you sure you want to delete this item?"}</p>
            </div>

            <div className="modal-footer border-0">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={onConfirm}>
                Delete
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default ConfirmDeleteModal;
