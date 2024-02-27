import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from '../../Breadcrumb';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa6';
import { getServicedata } from '../../API';
import Logo from '../../../images/logo.jpg';
import { MdClose } from 'react-icons/md';
import Multiselect from 'multiselect-react-dropdown';

const UserListing = () => {
  const data = [
    {
      Id: '1',
      Title: 'school 1',
      SubTitle: 'school 1',
      Image: Logo,
      Status: 'Avtive',
    },
    {
      Id: '2',
      Title: 'school 2',
      SubTitle: 'school 2',
      Image: Logo,
      Status: 'Avtive',
    },
    {
      Id: '3',
      Title: 'school 3',
      SubTitle: 'school 3',
      Image: Logo,
      Status: 'Avtive',
    },
  ];

  const [isModalOpen, setModalOpen] = useState(false);
  const [service, setservice] = useState(data);
  const [search, setsearch] = useState('');
  const [filterdata, setfilterdata] = useState(data);

  const Navigate = useNavigate();

  // =============action button===============
  const [selectedRow, setSelectedRow] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getServicedata();
        setservice(result);
        setfilterdata(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      name: ' # ',
      selector: (row) => <h1 className="text-base">{row.Id}</h1>,
      sortable: true,
    },
    {
      name: 'Title',
      selector: (row) => <h1 className="text-base">{row.Title}</h1>,
      sortable: true,
    },
    {
      name: 'SubTitle',
      selector: (row) => <h1 className="text-base">{row.SubTitle}</h1>,
      sortable: true,
    },
    {
      name: 'Image',
      selector: (row) => (
        <img
          className="p-1 overflow-hidden h-20 w-20 lg:h-40 lg:w-40 border"
          src={row.Image}
        />
      ),
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => (
        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
          Active
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Assign',
      cell: (row) => (
        <div>
          <div className=" text-white">
            <button
              className="w-26 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={openModal}
            >
              Assign Standard
            </button>
          </div>
        </div>
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
                className="text-black bg-white border  p-2 w-26"
                onClick={() => {
                  setSelectedRow(null);
                  Navigate('/School/edit');
                }}
              >
                Edit
              </button>
              <br />
              <button
                className=" text-black bg-white border  p-2 w-26"
                onClick={() => {
                  alert(`Deleting ${row.Title}`);
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
  useEffect(() => {
    const mySearch = service.filter(
      (item) =>
        item.Title && item.Title.toLowerCase().match(search.toLowerCase()),
    );
    setfilterdata(mySearch);
  }, [search]);

  // ==================popup assign task==============
  const [selectedStd, setSelectedStd] = useState([]);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSelectStd = (selectedList) => {
    setSelectedStd(selectedList);
    setFieldValue('stdname', selectedList);
    // formik.setFieldValue('stdname', selectedList);
  };
  return (
    <div>
      <Breadcrumb pageName="User Listing" />
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
                  <Link
                    to="/user/add"
                    className="bg-blue-500 text-white p-3 px-10 text-sm"
                  >
                    Add
                  </Link>
                }
                subHeader
                subHeaderComponent={
                  <input
                    type="text"
                    placeholder="search"
                    className="text-start me-auto -mt-25 border-2 py-3 px-5"
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
      <div
        id="crud-modal"
        tabindex="-1"
        aria-hidden="true"
        className={`  bg-[#888b939b]  z-9999 fixed top-0 right-0 left-0 justify-center items-center w-full md:inset-0   max-h-full ${
          isModalOpen ? 'flex' : 'hidden'
        }`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Assign Standard
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closeModal}
              >
                <MdClose />
              </button>
            </div>
            <form className="p-4 md:p-5 text-center">
              <Multiselect
                selectedValues={selectedStd}
                onSelect={handleSelectStd}
                displayValue="stdname"
                name="stdname"
                isObject={false}
                options={['std 1', 'std 2', 'std 3', 'std 4', 'std 5']}
              />
              <button
                type="bsubmit"
                className="bg-primary text-white py-2 px-4 mt-3 "
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListing;
