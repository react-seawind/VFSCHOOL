import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../Breadcrumb';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa6';
import { Export } from 'react-data-table-component-extensions/dist/ui';
import { CSVLink } from 'react-csv';
import { format } from 'date-fns';
import { deleteStudent, getAllStudent } from '../../API/StudentApi';

const StudentDataManager = () => {
  const [Student, setStudent] = useState([]);
  const [search, setsearch] = useState('');
  const [filterdata, setfilterdata] = useState([]);

  const Navigate = useNavigate();

  // =============action button===============
  const [selectedRow, setSelectedRow] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllStudent();
        setStudent(result);
        setfilterdata(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  // -------------------delete Student------------------
  const handleDelete = async (row) => {
    try {
      await deleteStudent(row.Id);
      setStudent((prevStudent) =>
        prevStudent.filter((item) => item.Id !== row.Id),
      );
      setfilterdata((prevFilterData) =>
        prevFilterData.filter((item) => item.Id !== row.Id),
      );
    } catch (error) {
      console.error('Error deleting Student:', error);
    }
  };

  useEffect(() => {
    const mySearch = Student.filter(
      (item) =>
        item.Title && item.Title.toLowerCase().match(search.toLowerCase()),
    );
    setfilterdata(mySearch);
  }, [search]);

  const csvHeaders = [
    { label: 'StudentName', key: 'StudentName' },
    { label: 'StudentEmail', key: 'StudentEmail' },
    { label: 'StudentPhone', key: 'StudentPhone' },
    { label: 'ParentName', key: 'ParentName' },
    { label: 'ParentEmail', key: 'ParentEmail' },
    { label: 'ParentPhone', key: 'ParentPhone' },
    { label: 'Country', key: 'Country' },
    { label: 'State', key: 'State' },
    { label: 'City', key: 'City' },
    { label: 'Area', key: 'Area' },
    { label: 'Pincode', key: 'Pincode' },
    { label: 'TAddress', key: 'TAddress' },
    { label: 'PAddress', key: 'PAddress' },
    { label: 'Photo', key: 'Photo' },
    { label: 'AddressProof', key: 'AddressProof' },
    { label: 'IdProof', key: 'IdProof' },
    { label: 'StandardId', key: 'StandardId' },
    { label: 'DivisionId', key: 'DivisionId' },
    { label: 'TeacherId', key: 'TeacherId' },

    { label: 'Status', key: 'Status' },
  ];

  const columns = [
    {
      name: '#',
      selector: (row) => <h1 className="text-base">{row.Id}</h1>,
    },
    {
      name: 'StudentName',
      selector: (row) => <h1 className="text-base">{row.StudentName}</h1>,
    },
    {
      name: 'StudentEmail',
      selector: (row) => <h1 className="text-base">{row.StudentEmail}</h1>,
    },

    {
      name: 'Image',
      selector: (row) => (
        <img
          className="p-2 overflow-hidden h-40 rounded-md w-40 border my-2 border-slate-200 bg-white "
          src={row.Photo}
        />
      ),
    },

    {
      name: 'Entry Date',
      selector: (row) => (
        <h1 className="text-base">
          {format(new Date(row.EntDt), 'MM/dd/yyyy hh:mm a')}
        </h1>
      ),
    },
    {
      name: 'Action',
      cell: (row) => (
        <div>
          <div className="bg-red-600 text-white p-3 pl-5 w-26 flex relative">
            <button>Actions</button>
            <button
              onClick={() => {
                setSelectedRow((prevRow) => (prevRow === row ? null : row));
              }}
            >
              <FaChevronDown className=" my-auto ml-4 " />
            </button>
          </div>

          {selectedRow && selectedRow.Id === row.Id && (
            <div className="action-buttons  absolute z-99">
              <button
                className=" text-black bg-white border  p-2 w-26"
                onClick={() => {
                  if (
                    window.confirm(
                      `Are you sure you want to delete ${row.StudentName}?`,
                    )
                  ) {
                    handleDelete(row); // Call handleDelete function on click of delete button
                  }
                  setSelectedRow(null);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb pageName="Student Listing" />
      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9 ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <DataTable
                className="text-2xl"
                columns={columns}
                data={filterdata}
                pagination
                highlightOnHover
                actions={
                  <CSVLink
                    data={filterdata}
                    headers={csvHeaders}
                    filename={'Studentreport.csv'}
                    className="bg-blue-500 text-white px-5 py-3"
                  >
                    Export CSV
                  </CSVLink>
                }
                subHeader
                subHeaderComponent={
                  <input
                    type="text"
                    placeholder="search"
                    className="text-start me-auto -mt-25  border-2 py-3 px-2 md:px-5"
                    value={search}
                    onChange={(e) => {
                      setsearch(e.target.value);
                    }}
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDataManager;
