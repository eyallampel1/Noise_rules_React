import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RotatingSquare } from 'react-loader-spinner';
//import the css file 



const UserComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3001/Constraint_Class');
      setData(res.data.data);
      // Initialize selectedValues with same length as data and default values
      setSelectedValues(res.data.data.map(() => ({
        selectedId: "",
        selectedConstraintClass: "",
        selectedInRule: "",
        selectedOutRule: ""
      })));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event, index, key) => {
    // Use function form of setState when new state depends on previous state
    setSelectedValues(prevValues => {
      // Create a new array for immutability
      const newValues = [...prevValues];
      // Update the value for the specific field (key) in the object at position (index)
      newValues[index][key] = event.target.value;
      return newValues;
    });
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch</button>
      {loading ?
        <RotatingSquare
          color="#00BFFF"
          height={200}
          width={200}
          timeout={3000}
        />
        :
        data.map((record, index) => (
          <div key={index}>
            <label className="text-3xl font-bold">{record.Id}</label>
            <input type='text' className='text-3xl bg-purple-300' value={record.Constraint_Class}></input>
            <select value={selectedValues[index]?.selectedInRule || ""} onChange={(e) => handleChange(e, index, "selectedInRule")}>
              <option value={record.In_rule || ""}>{record.In_rule || "Default"}</option>
            </select>
            <select value={selectedValues[index]?.selectedOutRule || ""} onChange={(e) => handleChange(e, index, "selectedOutRule")}>
              <option value={record.Out_Rule || ""}>{record.Out_Rule || "Default"}</option>
            </select>
          </div>
        ))}
    </div>
  );
};

export default UserComponent;
