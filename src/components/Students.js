import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Context } from "./Context";
import Student from "./Student";

function Students(props) {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { sName, sAge, sDept, sLocation } = useContext(Context);

  useEffect(() => {
    let fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get(
        process.env.REACT_APP_APIENDPOINT + "/students"
      );
      setLoading(false);
      setStudentData(data);
    };
    fetchData();
  }, [sName, sAge, sDept, sLocation]);

  return (
    <ul className="students">
      {!loading ? (
        studentData.map((d) => (
          <Student
            key={d._id}
            {...d}
            {...props}
            studentData={studentData}
            setStudentData={setStudentData}
          />
        ))
      ) : (
        <div className="loading">Loading...</div>
      )}
    </ul>
  );
}

export default Students;
