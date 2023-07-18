import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UserComponent.module.css';
import { RotatingSquare } from 'react-loader-spinner';

const UserComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedConstraintClass, setSelectedConstraintClass] = useState(null);
  const [selectedInRule, setSelectedInRule] = useState(null);
  const [selectedOutRule, setSelectedOutRule] = useState(null);

  const [selectedData, setSelectedData] = useState({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3001/Constraint_Class');
      setData(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDataBasedOnSelection = async () => {
      if (selectedId !== null) {
        setLoading(true);
        try {
          const res = await axios.get(`http://localhost:3001/Constraint_Class/${selectedId}`);
          setSelectedData(res.data.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDataBasedOnSelection();
  }, [selectedId, selectedConstraintClass, selectedInRule, selectedOutRule]);

  const handleChange = (event, setSelectedValue) => {
    setSelectedValue(event.target.value);
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
          <div key={index} className={styles.record}>
            <select className={styles.dropdown} value={selectedId} onChange={(e) => handleChange(e, setSelectedId)}>
              {data.map((option, index) => (
                <option key={index} value={option.Id}>{option.Id}</option>
              ))}
            </select>
            <select className={styles.dropdown} value={selectedConstraintClass} onChange={(e) => handleChange(e, setSelectedConstraintClass)}>
              {data.map((option, index) => (
                <option key={index} value={option.Constraint_Class}>{option.Constraint_Class}</option>
              ))}
            </select>
            <select className={styles.dropdown} value={selectedInRule} onChange={(e) => handleChange(e, setSelectedInRule)}>
              {data.map((option, index) => (
                <option key={index} value={option.In_rule}>{option.In_rule}</option>
              ))}
            </select>
            <select className={styles.dropdown} value={selectedOutRule} onChange={(e) => handleChange(e, setSelectedOutRule)}>
              {data.map((option, index) => (
                <option key={index} value={option.Out_Rule}>{option.Out_Rule}</option>
              ))}
            </select>
          </div>
        ))}
    </div>
  );
};

export default UserComponent;
