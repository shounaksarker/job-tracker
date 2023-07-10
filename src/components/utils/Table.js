/* eslint-disable no-restricted-globals */
import { getAuth, signOut } from "firebase/auth";
import {
  getDatabase,
  onValue,
  orderByChild,
  query,
  ref,
  remove,
} from "firebase/database";
import { Button, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import app from "../Auth/firebase.config";
import MyModal from "./CreateModal";
import EditModal from "./EditModal";

const db = getDatabase(app);

const MyTable = () => {
  const [show, setShow] = useState(false);
  const [editProps, setEditProps] = useState({
    show: false,
    uniqId:""
  });

  const [data, setData] = useState([]);
  const auth = getAuth();
  const navigate = useNavigate();
  const uid = localStorage.getItem("uid");
  const url = "/application-tracker";

  useEffect(() => {
    const arr = [];
    const appData = query(
      ref(db, `${url}/${uid}/applications-list`),
      orderByChild("position")
    );
    onValue(appData, (snapshot) => {
      const objects = snapshot.val();
      for (const key in objects) {
        arr.push(objects[key]);
      }
      setData(arr);
    });
  }, [uid]);

  /**============================================
   *               Delete function
   *=============================================**/
  const handleDlt = (e) => {
    if (confirm("Confirm Delete.....??")) {
      remove(ref(db, url + "/" + uid + "/applications-list/" + e)).then(() => {
      });
      location.reload();
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <Button
          gradientMonochrome="purple"
          onClick={() => setShow(!show)}
          className="mb-4"
        >
          Add new
        </Button>
        <Button
          gradientMonochrome="failure"
          onClick={() => {
            signOut(auth).then(() => {
              alert("Sign out!");
              navigate("/");
              localStorage.clear();
              window.location.reload();
            });
          }}
        >
          Signout
        </Button>
      </div>
        <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell className="text-start">SL</Table.HeadCell>
          <Table.HeadCell className="text-start">Company name & Position</Table.HeadCell>
          <Table.HeadCell className="text-start">Type</Table.HeadCell>
          <Table.HeadCell className="text-start">Date</Table.HeadCell>
          <Table.HeadCell className="text-start">Job Link</Table.HeadCell>
          <Table.HeadCell className="text-start">Comment</Table.HeadCell>
          <Table.HeadCell className="text-start">Status</Table.HeadCell>
          <Table.HeadCell className="text-start">Action</Table.HeadCell>
        </Table.Head>
      {data?.length > 0 ?
        <Table.Body className="divide-y capitalize">
          {data?.map((x, i) => {
            return (
              <Table.Row key={i} className="bg-white text-lg text-start">
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell className="truncate max-w-[220px]">
                  {x.position}
                </Table.Cell>
                <Table.Cell>{x.type}</Table.Cell>
                <Table.Cell>
                  {new Date(x.date).toLocaleDateString("en-IN")}
                </Table.Cell>
                <Table.Cell className="truncate max-w-[180px] lowercase">
                  <a
                    href={`${x.joblink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {x.joblink}
                  </a>
                </Table.Cell>
                <Table.Cell>{x.comment}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center justify-start">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        x.status === "applied" ? "bg-red-700" : "bg-green-400"
                      } mr-2`}
                    ></div>
                    {x.status}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center justify-start gap-4">
                    <button className="text-blue-500" onClick={() => setEditProps({show: true, uniqueId: x.uniqId})}>
                      <AiFillEdit />
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDlt(x.uniqId)}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      :
      setTimeout(() => {
        <h2 className="text-3xl font-semibold underline my-16 text-center">No Data Stored yet...</h2>
      }, 2000)
      }
      </Table>

      <MyModal show={show} setShow={setShow} />
      <EditModal editProps={editProps} setEditProps={setEditProps} />
    </div>
  );
};

export default MyTable;
