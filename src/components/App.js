import "./App.css";
import Form from "./Form";
import Students from "./Students";
import { useState } from "react";
import { Context } from "./Context";

function App() {
  const [_id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dept, setDept] = useState("");
  const [location, setLocation] = useState("");
  const [updating, setUpdating] = useState(false);

  let handleEdit = (data) => {
    const { _id, name, age, dept, location } = data.data;
    setId(_id);
    setName(name);
    setAge(age);
    setDept(dept);
    setLocation(location);
    setUpdating(_id === "" ? false : true);
  };

  return (
    <div className="App">
      <h1>University Student Form</h1>
      <Form
        setName={setName}
        setAge={setAge}
        setDept={setDept}
        setLocation={setLocation}
        setUpdating={setUpdating}
        _id={_id}
        name={name}
        age={age}
        dept={dept}
        location={location}
        updating={updating}
      />
      <Context.Provider
        value={{
          handleEdit: handleEdit,
          sName: name,
          sAge: age,
          sDept: dept,
          sLocation: location,
        }}
      >
        <Students />
      </Context.Provider>
    </div>
  );
}

export default App;
