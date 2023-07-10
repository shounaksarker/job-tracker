/* eslint-disable no-restricted-globals */
import { getDatabase, onValue, ref, update } from "firebase/database";
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import app from "../Auth/firebase.config";

const db = getDatabase(app);

const EditModal = ({ editProps, setEditProps }) => {
  const url = "/application-tracker";
  const uid = localStorage.getItem("uid");

  const [info, setInfo] = useState({
    position: "",
    type: "",
    date: "",
    joblink: "",
    status: "",
    comment: "",
  });

  //? ------- fetching single data
  useEffect(() => {
    const appData = ref(
      db,
      `${url}/${uid}/applications-list/` + editProps.uniqueId
    );

    onValue(appData, (snapshot) => {
      const object = snapshot.val();
      object && setInfo(object);
    });
  }, [editProps.uniqueId, uid]);

  //? ---------- input data taking function
  const handleBlur = (e) => {
    let details = { ...info };
    details[e.target.name] = e.target.value;
    setInfo(details);
  };

  //! ---------- form submit function --> update application data

  const updateEdit = (e) => {
    e.preventDefault();
    update(
      ref(db, url + "/" + uid + "/applications-list/" + editProps.uniqueId),
      info
    )
      .then(() => {
        location.reload();
      })
      .catch((error) => {
        console.log("err", error);
      });
  };

  return (
    <React.Fragment>
      <Modal
        show={editProps.show}
        size="xl"
        popup={true}
        onClose={() => setEditProps({ ...editProps, show: false })}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Edit Job Application's Details
            </h3>
            <form onSubmit={updateEdit} className="py-4">
              <div className="mb-6">
                <Label htmlFor="position" value="Company name & Job position *" />
                <TextInput
                  name="position"
                  placeholder="Company name & Job position"
                  defaultValue={info.position}
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
                    required={true}
                    defaultValue={info.date}
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
                    defaultValue={info.joblink}
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
                    defaultValue={info.comment}
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

export default EditModal;
