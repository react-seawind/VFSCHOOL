import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { getAllDivision } from '../../../API/DivisionApi';
import { getAllStandard } from '../../../API/StandardApi';
import Config from '../../../API/Config';
import { AddSubject } from '../../../API/SubjectAPI';
import FormLoader from '../../../common/FormLoader';
import { getDivisionByStandardId } from '../../../API/GetStdDivSub';

const validationSchema = yup.object().shape({
  Title: yup.string().required('Subject Name is required'),
  SchoolStandardId: yup.string().required('Standard is required'),
  SchoolDivisionId: yup.string().required('Division is required'),
});
const SubjectAdd = () => {
  const Id = Config.getId();

  // ------------Standard DATA-------------------
  const [std, setstd] = useState([]);

  useEffect(() => {
    const fetchStandard = async () => {
      try {
        const StandardData = await getAllStandard();
        setstd(StandardData);
      } catch (error) {
        console.error('Error fetching Standard:', error);
      }
    };
    fetchStandard();
  }, []);
  // ------------Division DATA-------------------
  const [div, setdiv] = useState([]);

  const [isFormLoading, setIsFormLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      SchoolId: Id,
      Title: '',
      SchoolStandardId: '',
      SchoolDivisionId: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      setIsFormLoading(true);
      try {
        await AddSubject(values);
        actions.resetForm();
        navigate('/subject/listing');
      } catch (error) {
        console.error('Error adding standard:', error);
      } finally {
        setIsFormLoading(false); // Set loading state to false when submission ends
      }
    },
  });

  useEffect(() => {
    const fetchDivision = async () => {
      if (formik.values.SchoolStandardId) {
        try {
          const DivisionData = await getDivisionByStandardId(
            formik.values.SchoolStandardId,
          );
          setdiv(DivisionData);
        } catch (error) {
          console.error('Error fetching Division:', error);
        }
      }
    };
    fetchDivision();
  }, [formik.values.SchoolStandardId]);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/subject/listing');
  };
  return (
    <div>
      <Breadcrumb pageName="Subject Add " />
      {isFormLoading && <FormLoader loading={isFormLoading} />}
      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Subject Add
              </h3>
              <p>
                Please fill all detail and add new Subject in your Subject
                directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Select Standard <span className="text-danger">*</span>
                  </label>

                  <select
                    name="SchoolStandardId"
                    onChange={formik.handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option>Select Standard</option>
                    {std.map((std) => (
                      <option key={std.Id} value={std.Id}>
                        {std.Title}
                      </option>
                    ))}
                  </select>

                  {formik.touched.SchoolStandardId &&
                    formik.errors.SchoolStandardId && (
                      <small className="text-red-500">
                        {formik.errors.SchoolStandardId}
                      </small>
                    )}
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Select Division <span className="text-danger">*</span>
                  </label>
                  <select
                    name="SchoolDivisionId"
                    onChange={formik.handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    {div.length === 0 ? (
                      <option>No Division</option>
                    ) : (
                      <>
                        <option>Select Division</option>
                        {div.map((div) => (
                          <React.Fragment>
                            <option key={div.Id} value={div.Id}>
                              {div.Title}
                            </option>
                          </React.Fragment>
                        ))}
                      </>
                    )}
                  </select>

                  {formik.touched.SchoolDivisionId &&
                    formik.errors.SchoolDivisionId && (
                      <small className="text-red-500">
                        {formik.errors.SchoolDivisionId}
                      </small>
                    )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Subject Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Title"
                    onChange={formik.handleChange}
                    placeholder="Enter Your Subject Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Title && formik.errors.Title && (
                    <small className="text-red-500">
                      {formik.errors.Title}
                    </small>
                  )}
                </div>
              </div>

              <div className="flex   gap-5.5 py-3.5 px-5.5">
                <button
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                  type="submit"
                >
                  Submit
                </button>
                <button
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-white dark:text-white"
                  onClick={handleGoBack}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectAdd;
