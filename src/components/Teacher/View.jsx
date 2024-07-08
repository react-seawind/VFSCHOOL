import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Multiselect from 'multiselect-react-dropdown';
import Breadcrumb from '../Breadcrumb';
import { getAllSubject } from '../../API/SubjectAPI';
import { getAllStandard } from '../../API/StandardApi';
import { getAllDivision } from '../../API/DivisionApi';
import { useNavigate, useParams } from 'react-router-dom';
import Config from '../../API/Config';
import {
  AddTeacherAssign,
  deleteTeacherAssign,
  getAllTeacherAssign,
} from '../../API/TeacherApi';
import { useFormik } from 'formik';
import FormLoader from '../../common/FormLoader';
import {
  getDivisionByStandardId,
  getStandardByTeacherId,
  getSubjectByDivisionId,
} from '../../API/GetStdDivSub';

const TeacherView = () => {
  const schoolId1 = Config.getId();
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  // -------------------------------------------
  const { Id } = useParams();
  const fetchData = async () => {
    try {
      const result = await getAllTeacherAssign(Id);
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const [isFormLoading, setIsFormLoading] = useState(false);
  const handleDelete = async (row) => {
    setIsFormLoading(true);
    try {
      await deleteTeacherAssign(row.Id);
      setData((prevData) => prevData.filter((item) => item.Id !== row.Id));
    } catch (error) {
      console.error('Error deleting assignment:', error);
    } finally {
      setIsFormLoading(false); // Set loading state to false when submission ends
    }
  };

  useEffect(() => {
    fetchData();
  }, [Id]);
  // -------------------delete/print over-------------

  const formik = useFormik({
    initialValues: {
      SchoolId: schoolId1,
      TeacherId: Id,
      DivisionId: '',
      StandardId: '',
      SubjectId: '',
    },
    onSubmit: async (values, actions) => {
      setIsFormLoading(true);
      try {
        await AddTeacherAssign(values);
        fetchData();
      } catch (error) {
        console.error('Error adding Teacher:', error);
      } finally {
        setIsFormLoading(false); // Set loading state to false when submission ends
      }
    },
  });

  // ------------Standard DATA-------------------
  const [std, setstd] = useState([]);

  useEffect(() => {
    const fetchStandard = async () => {
      try {
        const StandardData = await getStandardByTeacherId();
        setstd(StandardData);
      } catch (error) {
        console.error('Error fetching Standard:', error);
      }
    };
    fetchStandard();
  }, []);
  // ------------Division DATA-------------------
  const [div, setdiv] = useState([]);

  useEffect(() => {
    const fetchDivision = async () => {
      if (formik.values.StandardId) {
        try {
          const DivisionData = await getDivisionByStandardId(
            formik.values.StandardId,
          );
          setdiv(DivisionData);
        } catch (error) {
          console.error('Error fetching Division:', error);
        }
      }
    };
    fetchDivision();
  }, [formik.values.StandardId]);
  // ------------Subject DATA-------------------
  const [sub, setSub] = useState([]);
  const [selectedStd, setSelectedStd] = useState([]);
  useEffect(() => {
    const fetchSubject = async () => {
      if (formik.values.StandardId && formik.values.DivisionId) {
        try {
          const subjectData = await getSubjectByDivisionId(
            formik.values.StandardId,
            formik.values.DivisionId,
          );

          console.log('subjectData', subjectData);
          const combinedArray = subjectData.map((obj) => ({
            SubjectId: obj.Id.toString(),
            SubjectTitles: obj.Title,
          }));

          setSub(combinedArray);
        } catch (error) {
          console.error('Error fetching Subject:', error);
        }
      }
    };
    fetchSubject();
  }, [formik.values.StandardId, formik.values.DivisionId]);

  const handleSelectStd = (selectedList) => {
    const selectedSubjectIds = selectedList.map((subject) => subject.SubjectId); // Extract IDs from selected subjects
    console.log('Selected List:', selectedList);
    console.log('Selected Subject IDs:', selectedSubjectIds);

    setSelectedStd(selectedList);
    formik.setFieldValue('SubjectId', selectedSubjectIds.join(',')); // Set only IDs to the formik field
  };

  const handleGoBack = () => {
    navigate('/teacher/listing');
  };

  return (
    <div>
      <Breadcrumb pageName="Assign Standard" />
      {isFormLoading && <FormLoader loading={isFormLoading} />}
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
              </div>
              <div className="">
                <form
                  onSubmit={formik.handleSubmit}
                  className="border mt-3 rounded-sm"
                >
                  <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5.5 py-3.5 px-2">
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Select Standard <span className="text-danger">*</span>
                      </label>
                      <select
                        name="StandardId"
                        onChange={formik.handleChange}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option>Select Standard</option>
                        {std.map((stdItem) => (
                          <option key={stdItem.Id} value={stdItem.Id}>
                            {stdItem.Title}
                          </option>
                        ))}
                      </select>
                      {formik.touched.StandardId &&
                        formik.errors.StandardId && (
                          <small className="text-red-500">
                            {formik.errors.StandardId}
                          </small>
                        )}
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Select Division<span className="text-danger">*</span>
                      </label>
                      <select
                        name="DivisionId"
                        onChange={formik.handleChange}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option>Select Division</option>
                        {div.map((divItem) => (
                          <option key={divItem.Id} value={divItem.Id}>
                            {divItem.Title}
                          </option>
                        ))}
                      </select>
                      {formik.touched.DivisionId &&
                        formik.errors.DivisionId && (
                          <small className="text-red-500">
                            {formik.errors.DivisionId}
                          </small>
                        )}
                    </div>
                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Select Subject <span className="text-danger">*</span>
                      </label>

                      <Multiselect
                        options={sub} // Options to display in the dropdown
                        selectedValues={selectedStd} // Preselected value to persist in dropdown
                        onSelect={handleSelectStd} // Function will trigger on select event
                        onRemove={handleSelectStd} // Function will trigger on remove event
                        displayValue="SubjectTitles" // Property name to display in the dropdown options
                        isObject={true} // This ensures that the options are treated as objects
                        name="SubjectId" // Name attribute for the form field
                      />
                      {formik.touched.SubjectId && formik.errors.SubjectId && (
                        <small className="text-red-500">
                          {formik.errors.SubjectId}
                        </small>
                      )}
                    </div>
                    <div></div>
                    <div></div>
                    <div className="ml-auto mt-auto">
                      <button
                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="mt-5 table-responsive overflow-scroll overflow-y-hidden">
                <table className="w-full  ">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Id{' '}
                      </th>
                      <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Standard
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        Division
                      </th>
                      <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                        Subject
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((val, index) => (
                      <tr key={val.Id}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {index + 1}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {val.StandardTitle}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {val.DivisionTitle}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {val.SubjectTitles}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <button
                              className="hover:text-primary"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    `Are you sure you want to delete ${val.StandardId}?`,
                                  )
                                ) {
                                  handleDelete(val); // Call handleDelete function on click of delete button
                                }
                              }}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherView;
