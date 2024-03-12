import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaChevronDown, FaTrash } from 'react-icons/fa6';
import Logo from '../../images/logo.jpg';
import { MdClose } from 'react-icons/md';
import Multiselect from 'multiselect-react-dropdown';
import Breadcrumb from '../Breadcrumb';

const TeacherView = () => {
  const data = [
    {
      Id: '1',
      Standard: 'Standard 1',
      Division: 'Division 1',
      Subject: 'Subject 1',
    },
    {
      Id: '2',
      Standard: 'Standard 2',
      Division: 'Division 2',
      Subject: 'Subject 2',
    },
    {
      Id: '3',
      Standard: 'Standard 3',
      Division: 'Division 3',
      Subject: 'Subject 3',
    },
  ];

  const [isModalOpen, setModalOpen] = useState(false);

  // =============action button===============
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const result = await getServicedata();
  //         setservice(result);
  //         setfilterdata(result);
  //         console.log(result);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

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

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <Breadcrumb pageName="Assign Standard" />
      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9 ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <div className="flex">
                <div className=" text-white">
                  <button
                    className="w-26 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={handleGoBack}
                  >
                    Back
                  </button>
                </div>
                <div className=" text-white ml-auto">
                  <button
                    className="w-26 bg-blue-700 hover:bg-blue-800 focus:ring-4  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={openModal}
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <table class="w-full table-auto">
                  <thead>
                    <tr class="bg-gray-2 text-left dark:bg-meta-4">
                      <th class="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Id{' '}
                      </th>
                      <th class="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Standard
                      </th>
                      <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        Division
                      </th>
                      <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                        Subject
                      </th>
                      <th class="py-4 px-4 font-medium text-black dark:text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((val) => {
                      return (
                        <tr>
                          <td class="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            <h5 class="font-medium text-black dark:text-white">
                              {val.Id}
                            </h5>
                          </td>
                          <td class="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                            <h5 class="font-medium text-black dark:text-white">
                              {val.Standard}
                            </h5>
                          </td>
                          <td class="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p class="text-black dark:text-white">
                              {val.Division}
                            </p>
                          </td>
                          <td class="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p class="text-black dark:text-white">
                              {val.Subject}
                            </p>
                          </td>
                          <td class="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <div class="flex items-center space-x-3.5">
                              <button class="hover:text-primary">
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
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
            <form className="p-4 md:p-5">
              <div className="mb-3">
                <label className="block text-black dark:text-white">
                  Select Standard <span className="text-danger">*</span>
                </label>
                <select
                  name="standard"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option>Select Standard</option>
                  <option value="1">std 1</option>
                  <option value="2">std 2</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block text-black dark:text-white">
                  Select Division <span className="text-danger">*</span>
                </label>
                <select
                  name="standard"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option>Select Division</option>
                  <option value="1">div 1</option>
                  <option value="2">div 2</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block text-black dark:text-white">
                  Select Subject <span className="text-danger">*</span>
                </label>
                <Multiselect
                  selectedValues={selectedStd}
                  onSelect={handleSelectStd}
                  displayValue="stdname"
                  name="stdname"
                  isObject={false}
                  options={['std 1', 'std 2', 'std 3', 'std 4', 'std 5']}
                />
              </div>

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

export default TeacherView;
