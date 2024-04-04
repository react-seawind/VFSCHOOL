import React, { useEffect, useState } from 'react';
import CardFour from '../../components/CardFour';
import CardOne from '../../components/CardOne';
import CardThree from '../../components/CardThree';
import CardTwo from '../../components/CardTwo';

import { getAllStandard } from '../../API/StandardApi.jsx';
import { getAllSubject } from '../../API/SubjectAPI.jsx';
import { getAllStudent } from '../../API/StudentApi.jsx';
import { getAllDivision } from '../../API/DivisionApi.jsx';
import { getAllStudent } from '../../API/StudentApi.jsx';

const ECommerce = () => {
  // --------------------school data------------------------
  const [divdata, setdivdata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allDivision = await getAllDivision();
        setdivdata(allDivision);
      } catch (error) {
        console.error('Error fetching Division data:', error);
      }
    };

    fetchData();
  }, []);
  // --------------------Standard data------------------------
  const [StandardData, setStandardData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allStandard = await getAllStandard();
        setStandardData(allStandard);
      } catch (error) {
        console.error('Error fetching School data:', error);
      }
    };

    fetchData();
  }, []);
  // --------------------Subject data------------------------
  const [SubjectData, setSubjectData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allSubject = await getAllSubject();
        setSubjectData(allSubject);
      } catch (error) {
        console.error('Error fetching School data:', error);
      }
    };

    fetchData();
  }, []);
  // --------------------Student data------------------------
  const [StudentData, setStudentData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allStudent = await getAllStudent();
        setStudentData(allStudent);
      } catch (error) {
        console.error('Error fetching School data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardTwo StandardData={StandardData} />
        <CardOne divdata={divdata} />
        <CardThree SubjectData={SubjectData} />
        <CardFour StudentData={StudentData} />
      </div>
      {/*<div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartThree />
      </div>*/}
    </div>
  );
};

export default ECommerce;
