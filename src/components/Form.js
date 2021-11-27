import React, { useEffect } from "react";
import axios from "axios";
import { getToaster } from "./getToaster";
import Toastify from "toastify-js";

function Form(props) {
  const {
    _id,
    name,
    age,
    dept,
    location,
    updating,
    setName,
    setAge,
    setDept,
    setLocation,
    setUpdating,
  } = props;
  let handleSubmit = async (e) => {
    e.preventDefault();
    if (updating) {
      await axios.put(`${process.env.REACT_APP_APIENDPOINT}/students/${_id}`, {
        name: name,
        age: parseInt(age),
        dept: dept,
        location: location,
      });

      setUpdating(false);
    } else {
      try {
        await axios.post(process.env.REACT_APP_APIENDPOINT + "/students", {
          name: name,
          age: parseInt(age),
          dept: dept,
          location: location,
        });
      } catch (ex) {
        Toastify(getToaster(ex.response.data)).showToast();
      }
    }
    setName("");
    setAge("");
    setDept("");
    setLocation("");
  };

  useEffect(() => {}, [name, age, dept, location]);

  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        value={name}
        placeholder="Put the name here..."
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={dept}
        placeholder="Put the department here..."
        onChange={(e) => setDept(e.target.value)}
      />
      <input
        type="text"
        value={age}
        placeholder="Put the age here..."
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        value={location}
        placeholder="Put the location(city) here..."
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="submit"
        className="btn"
        value={updating ? "Update" : "Submit"}
      />
    </form>
  );
}

export default Form;
