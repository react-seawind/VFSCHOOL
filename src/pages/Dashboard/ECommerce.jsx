import React, { useEffect, useState } from 'react';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { BiCategory, BiRupee } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { getAllDashbaord } from '../../API/DashboardApi.jsx';
import standard from '../../images/icon/standard.png';
import division from '../../images/icon/division.png';
import subject from '../../images/icon/book-stack.png';
import teacher from '../../images/icon/teacher.png';
import student from '../../images/icon/students.png';
const ECommerce = () => {
  const [TotalStandard, setTotalStandard] = useState([]);
  const [TotalDivision, setTotalDivision] = useState([]);
  const [TotalSubject, setTotalSubject] = useState([]);
  const [TotalTeacher, setTotalTeacher] = useState([]);
  const [TotalStudent, setTotalStudent] = useState([]);
  const [YearWiseStudentDetails, setYearWiseStudentDetails] = useState([]);
  const [YearWiseEventDetails, setYearWiseEventDetails] = useState([]);
  const [StandardWiseStudentDetails, setStandardWiseStudentDetails] = useState(
    [],
  );

  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state
  // =============action button===============
  const fetchTotalDivision = async () => {
    try {
      const result = await getAllDashbaord();
      setTotalStandard(result.TotalStandard);
      setTotalDivision(result.TotalDivision);
      setTotalSubject(result.TotalSubject);
      setTotalTeacher(result.TotalTeacher);
      setTotalStudent(result.TotalStudent);
      setYearWiseStudentDetails(result.YearWiseStudentDetails);
      setYearWiseEventDetails(result.YearWiseEventDetails);
      setStandardWiseStudentDetails(result.StandardWiseStudentDetails);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };
  useEffect(() => {
    fetchTotalDivision();
  }, []);
  // --------------------Income-------------------
  // Extract YearWiseStudentDetails
  const YearWiseStudentDetailslabels = YearWiseStudentDetails.map(
    (country) => country.Year,
  );
  const YearWiseStudentDetailsCounts = YearWiseStudentDetails.map(
    (country) => country.TotalStudent,
  );
  // // --------------------Income-------------------
  // // Extract YearWiseStudentDetails
  const YearWiseEventDetailslabels = YearWiseEventDetails.map(
    (country) => country.Year,
  );
  const YearWiseEventDetailsCount = YearWiseEventDetails.map(
    (country) => country.TotalEvent,
  );
  // // --------------------Income-------------------
  // // Extract YearWiseStudentDetails
  const StandardWiseStudentDetailslabels = StandardWiseStudentDetails.map(
    (country) => country.StandardName,
  );
  const StandardWiseStudentDetailsCount = StandardWiseStudentDetails.map(
    (country) => country.TotalStudent,
  );

  // ----------------------Pie--------------------
  const PieChartdata = {
    labels: YearWiseStudentDetailslabels,
    datasets: [
      {
        label: 'Student',
        data: YearWiseStudentDetailsCounts,
        backgroundColor: [
          '#fd6285',
          '#fd9e49',
          '#50c0bf',
          '#9968fc',
          '#3ca3e9',
        ],
        borderColor: ['#fd6285', '#fd9e49', '#50c0bf', '#9968fc', '#3ca3e9'],
        borderWidth: 1,
      },
    ],
  };
  // ----------------------Pie--------------------
  const ActiveInactiveChartdata = {
    labels: YearWiseEventDetailslabels,
    datasets: [
      {
        label: 'Total Event',
        data: YearWiseEventDetailsCount,
        backgroundColor: [
          '#fd6285',
          '#fd9e49',
          '#50c0bf',
          '#9968fc',
          '#3ca3e9',
        ],
        borderColor: ['#fd6285', '#fd9e49', '#50c0bf', '#9968fc', '#3ca3e9'],
        borderWidth: 1,
      },
    ],
  };

  // ----------------------Pie--------------------
  const StandardWiseStudentDetailsData = {
    labels: StandardWiseStudentDetailslabels,
    datasets: [
      {
        label: 'Student',
        data: StandardWiseStudentDetailsCount,
        backgroundColor: [
          '#3ca3e9',
          '#fd9e49',
          '#50c0bf',
          '#fd6285',
          '#9968fc',
        ],
        borderColor: ['#3ca3e9', '#fd9e49', '#50c0bf', '#fd6285', '#9968fc'],
        borderWidth: 1,
      },
    ],
  };

  const Pieoptions = {
    maintainAspectRatio: false, // Disable the default aspect ratio
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-7.5">
        <Link to={'/std/listing'}>
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 p-2">
              <img src={standard} alt="" />
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {TotalStandard}
                </h4>
                <span className="text-sm font-medium">Total Standard</span>
              </div>
            </div>
          </div>
        </Link>

        <Link to={'/div/listing'}>
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 p-2">
              <img src={division} alt="" />
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {TotalDivision}
                </h4>
                <span className="text-sm font-medium">Total Division</span>
              </div>
            </div>
          </div>
        </Link>

        <Link to={'/subject/listing'}>
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 p-2">
              <img src={subject} alt="" />
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {TotalSubject}
                </h4>
                <span className="text-sm font-medium">Total Subject</span>
              </div>
            </div>
          </div>
        </Link>

        <Link to={'/teacher/listing'}>
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 p-2">
              <img src={teacher} alt="" />
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {TotalTeacher}
                </h4>
                <span className="text-sm font-medium">Total Teacher</span>
              </div>
            </div>
          </div>
        </Link>
        <Link to={'/student/listing'}>
          <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 p-2">
              <img src={student} alt="" />
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-title-md font-bold text-black dark:text-white">
                  {TotalStudent}
                </h4>
                <span className="text-sm font-medium">Total Student</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:gap-7.5 my-7">
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="h-80">
            <Bar data={PieChartdata} options={Pieoptions} />
          </div>
          <p className="text-center mt-3 font-bold">Total Student</p>
        </div>

        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="h-80">
            <Bar data={ActiveInactiveChartdata} options={Pieoptions} />
          </div>
          <p className="text-center mt-3 font-bold">Total Event</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4  md:gap-6 2xl:gap-7.5 my-7">
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="h-80">
            <Bar data={StandardWiseStudentDetailsData} options={Pieoptions} />
          </div>
          <p className="text-center mt-3 font-bold">Total Student</p>
        </div>
      </div>
    </div>
  );
};

export default ECommerce;
