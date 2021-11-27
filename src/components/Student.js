import axios from "axios";
import React, { useContext } from "react";
import { Context } from "./Context";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { getToaster } from "./getToaster";

function Student({
  _id,
  isAdmin,
  name,
  age,
  dept,
  location,
  studentData,
  setStudentData,
}) {
  const { handleEdit } = useContext(Context);

  let handleDelete = async () => {
    if (isAdmin) {
      Toastify(
        getToaster("You can't delete this user's info, as he is the admin")
      ).showToast();
      return;
    }
    const confirmation = window.confirm(
      `Do you really want to delete ${name}'s info?`
    );
    if (confirmation) {
      await axios.delete(
        `${process.env.REACT_APP_APIENDPOINT}/students/${_id}`
      );
      const newData = studentData.filter((d) => d._id !== _id);
      setStudentData(newData);
    }
  };
  let handleUpdate = async () => {
    if (isAdmin) {
      Toastify(
        getToaster("You can't update this user's info, as he is the admin")
      ).showToast();
      const data = {
        data: {
          _id: "",
          name: "",
          age: "",
          dept: "",
          location: "",
        },
      };

      handleEdit(data);
      return;
    }

    const confirmation = window.confirm(
      `Do you really want to edit ${name}'s info?`
    );
    if (confirmation) {
      const { data } = await axios.get(
        `${process.env.REACT_APP_APIENDPOINT}/students/${_id}`
      );
      handleEdit({ data });
    }
  };

  return (
    <li className="student">
      <div className="cross">
        <a href="#id" className="cross-btn" onClick={() => handleDelete()}>
          X
        </a>
      </div>
      <div className="cross">
        <a href="#id" className="cross-btn" onClick={() => handleUpdate()}>
          E
        </a>
      </div>
      <div>Name: {name}</div>
      <div>Department: {dept}</div>
      <div>Age: {age}</div>
      <div>Location: {location}</div>
    </li>
  );
}

export default Student;
