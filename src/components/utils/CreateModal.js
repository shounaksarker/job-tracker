import { getDatabase, ref, set } from "firebase/database";
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import app from "../Auth/firebase.config";

const db = getDatabase(app);

const CreateModal = ({ show, setShow }) => {
  const url = "/application-tracker";
  const uid = localStorage.getItem("uid");

  const [info, setInfo] = useState({
    position: "",
    type: "",
    date: "",
    joblink: "",
    status: "",
    comment: "--------",
  });

  //? ---------- input data taking function
  const handleBlur = (e) => {
    let details = { ...info };
    details[e.target.name] = e.target.value;
    setInfo(details);
  };

  //! ---------- form submit function --> create application data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const uniqId = Math.random().toString(36).substr(2, 9);
    // const dt = new Date();
    // const date = dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear() + " " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    if (
      info.position === "" ||
      info.type === "" ||
      info.date === "" ||
      info.joblink === ""
    ) {
      alert("Please Fill all the input feild");
    }
    if (info.comment === "" || info.comment === " ") {
      setInfo({ ...info, comment: "-----------------" });
    } else {
      set(ref(db, `${url}/${uid}/applications-list/${uniqId}`), {
        ...info,
        uniqId: uniqId,
      }).then(() => {
        e.target.reset();
        setInfo("");
        setShow(false);
        window.location.reload();
      });
    }
  };

  return (
    <React.Fragment>
      <Modal show={show} size="xl" popup={true} onClose={() => setShow(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Add New Job Application's Details
            </h3>
            <form onSubmit={handleSubmit} className="py-4">
              <div className="mb-6">
                <Label htmlFor="position" value="Company name & Job position *" />
                <TextInput
                  name="position"
                  placeholder="Company Name & Job position"
                  required={true}
                  onBlur={handleBlur}
                />
              </div>

              <div className="select flex flex-wrap justify-between mb-6">
                <div className="block w-1/2">
                  <Label htmlFor="type" value="Job Type *" />
                  <Select
                    name="type"
                    onChange={handleBlur}
                    required={true}
                    defaultValue="Type"
                  >
                    <option disabled>Type</option>
                    <option value="job">Job</option>
                    <option value="intern">Intern</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date" value="Date *" />
                  <TextInput
                    className="block md:min-w-[200px] "
                    type="date"
                    name="date"
                    defaultValue="dd-mm-yy"
                    required={true}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              <div className="flex justify-between flex-wrap">
                <div className="block w-1/2">
                  <Label htmlFor="joblink" value="Job Link" />
                  <TextInput
                    name="joblink"
                    type="text"
                    placeholder="must include http:// or https://"
                    onBlur={handleBlur}
                    className="w-full"
                  />
                </div>
                <div className="block w-1/2 pl-5">
                  <Label htmlFor="Status" value="Job Status *" />
                  <Select
                    name="status"
                    onChange={handleBlur}
                    required={true}
                    defaultValue="Status"
                  >
                    <option disabled>Status</option>
                    <option value="applied">Applied</option>
                    <option value="exam done">Exam done</option>
                    <option value="viva">Viva</option>
                  </Select>
                </div>
              </div>
              <div className="flex justify-between flex-wrap mt-6 items-center">
                <div className="block w-1/2">
                  <Label htmlFor="Comment" value="Comment" />
                  <TextInput
                    name="comment"
                    type="text"
                    placeholder="Comment"
                    onBlur={handleBlur}
                    className="w-full"
                  />
                </div>
                <Button
                  color="purple"
                  pill={true}
                  type="submit"
                  className="mt-6"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default CreateModal;
