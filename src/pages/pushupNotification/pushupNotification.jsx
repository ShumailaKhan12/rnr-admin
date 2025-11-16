import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Components
import NavBar from "../../components/navbar";
import Button from "../../components/button";
import { postData } from "../../services/api";
import { toastError, toastSuccess } from "../../utils/toster";

// React icon
import { IoIosArrowForward } from "react-icons/io";
import {
  PiPencilSimple,
  PiTrashSimple,
  PiPauseCircle,
  PiCopySimpleLight,
} from "react-icons/pi";

const PushupNotification = () => {
  const [NotifTable, setNotifTable] = useState([]);
  const { register, handleSubmit } = useForm();

  const GetAdminUid = sessionStorage.getItem("Auth");
  const ProgramId = sessionStorage.getItem("Prgid");

  // ------------------
  //  CREATE PUSHUP NOTIFICATION
  // ------------------
  const onSubmit = async (data) => {
    try {
      const auth = await postData("/admin/auths", { admin_uid: GetAdminUid });

      const payload = {
        admin_uid: GetAdminUid,
        program_id: ProgramId,
        mode: auth?.mode,
        log_alt: auth?.log_alt,
        title: data.notifyTitle,
        message: data.message,
        button_text: data.buttonText,
        button_url: data.buttonUrl,
        segment: data.segment,
        specific_users: data.specific_users,
        date: new Date(data.date).toLocaleDateString("en-GB"),
        time: data.time,
      };

      const response = await postData("/admin/push-notification", payload);
      toastSuccess(response?.message);
    } catch (error) {
      toastError(error?.message);
    }
  };

  // ------------------
  //  FETCH EXISTING NOTIFICATIONS
  // ------------------
  const GetNotfiData = async () => {
    try {
      const auth = await postData("/admin/auths", { admin_uid: GetAdminUid });
      const payload = {
        admin_uid: GetAdminUid,
        program_id: ProgramId,
        mode: auth?.mode,
        log_alt: auth?.log_alt,
      };

      const response = await postData(
        "/admin/table-push-notifications",
        payload
      );
      setNotifTable(response?.notifications || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetNotfiData();
  }, []);

  return (
    <>
      <NavBar />

      <div className="bg-light-white-3-color py-5 min-vh-100">
        <div className="container mb-5 d-flex justify-content-between">
          <div>
            <p className="text-blue-color font-24 montserrat-semibold mb-0">
              Pushup Notification
            </p>
            <p className="font-12 text-blue-color montserrat-medium">
              Create, schedule, and manage push notifications.
            </p>
          </div>
          <p className="font-14 text-blue-color montserrat-medium">
            Existing Notification List <IoIosArrowForward />
          </p>
        </div>

        <div className="container py-4">
          <div className="row gy-3">
            {/* =====================
                CREATE FORM
            ====================== */}
            <div className="col-lg-7">
              <form className="row" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-lg-6 mb-3">
                  <label>Title</label>
                  <input
                    className="form-control"
                    {...register("notifyTitle")}
                  />
                </div>

                <div className="col-lg-6 mb-3">
                  <label>Message</label>
                  <input className="form-control" {...register("message")} />
                </div>

                <div className="col-lg-4 mb-3">
                  <label>Button Text</label>
                  <input className="form-control" {...register("buttonText")} />
                </div>

                <div className="col-lg-4 mb-3">
                  <label>Button URL</label>
                  <input className="form-control" {...register("buttonUrl")} />
                </div>

                <p className="border-top pt-3">Select Users</p>

                <div className="col-lg-4 mb-3">
                  <label>Segment</label>
                  <select className="form-select" {...register("segment")}>
                    <option>All</option>
                    <option>One</option>
                    <option>Two</option>
                  </select>
                </div>

                <div className="col-lg-4 mb-3">
                  <label>Specific User</label>
                  <select
                    className="form-select"
                    {...register("specific_users")}
                  >
                    <option>Select User</option>
                    <option>One</option>
                    <option>Two</option>
                  </select>
                </div>

                <p className="border-top pt-3">Schedule</p>

                <div className="col-lg-4 mb-3">
                  <label>Date</label>
                  <input
                    type="date"
                    className="form-control"
                    {...register("date")}
                  />
                </div>

                <div className="col-lg-4 mb-3">
                  <label>Time</label>
                  <input
                    type="time"
                    className="form-control"
                    {...register("time")}
                  />
                </div>

                <div className="col-lg-6 mt-3">
                  <Button
                    btn_class="text-white bg-blue-color px-5"
                    btn_title="Save & Send"
                  />
                </div>
              </form>
            </div>

            {/* =====================
                SCREEN PREVIEW BOX
            ====================== */}
            <div className="col-lg-5 d-flex justify-content-center">
              <div className="pushup-preview-box w-100 bg-white p-3 border-radius-16 text-center">
                <p className="text-blue-color font-24">Screen Preview</p>
              </div>
            </div>

            {/* =====================
                TABLE — EXISTING LIST
            ====================== */}
            <div className="col-12 mt-5">
              <div className="table-responsive">
                <table className="table notification-table text-center">
                  <thead>
                    <tr>
                      <th>Notification Title</th>
                      <th>Message</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {NotifTable.map((item, i) => (
                      <tr key={i}>
                        <td>{item.title}</td>
                        <td>{item.message}</td>
                        <td>
                          <div className="d-flex gap-2 justify-content-center">
                            <PiPencilSimple className="font-16" />
                            <PiCopySimpleLight className="font-16" />
                            <PiPauseCircle className="font-16" />
                            <PiTrashSimple className="font-16" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PushupNotification;
