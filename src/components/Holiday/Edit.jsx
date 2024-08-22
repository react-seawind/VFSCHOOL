import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAllStandard } from '../../API/StandardApi';
import { getAllDivision } from '../../API/DivisionApi';
import { getClassTTById, updateClassTTById } from '../../API/ClasstimetableApi';
import { updateExamTTById } from '../../API/ExamtimetableApi';
import {
  getHolidayHWById,
  updateHolidayHWById,
} from '../../API/HolidayHomeWorkApi';
import FormLoader from '../../common/FormLoader';
import { getDivisionByStandardId } from '../../API/GetStdDivSub';

const validationSchema = yup.object().shape({
  Title: yup.string().required('Title is required'),
  StandardId: yup.string().required('Standard is required'),
  DivisionId: yup.string().required('Division is required'),
  // PDF: yup.string().required('Timetable is required'),
});
const HolidayEdit = () => {
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

  // ================ Get data by Id============
  const { Id } = useParams();
  const [imagePreview, setImagePreview] = useState();

  const fetchData = async () => {
    try {
      if (Id) {
        const HolidayData = await getHolidayHWById(Id);
        formik.setValues(HolidayData);
        if (HolidayData.PDF) {
          setImagePreview(HolidayData.PDF); // Update Photo preview if Photo exists
        }
      } else {
        console.log('error');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [Id]);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      Id: Id,
      SchoolId: '',
      StandardId: '',
      DivisionId: '',
      Title: '',
      PDF: '',
      Hid_PDF: '',
      Status: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsFormLoading(true);
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });
        await updateHolidayHWById(formData);
        fetchData();
      } catch (error) {
        console.error('Error adding Photo:', error);
      } finally {
        setIsFormLoading(false); // Set loading state to false when submission ends
      }
    },
  });

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

  function getFileExtension(filename) {
    if (typeof filename !== 'string') {
      return 'Invalid filename';
    }
    if (filename.indexOf('.') === -1) {
      return 'No file extension found';
    }
    return filename.split('.').pop().toLowerCase();
  }
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/holiday/listing');
  };

  return (
    <div>
      <Breadcrumb pageName="Holiday Edit" />
      {isFormLoading && <FormLoader loading={isFormLoading} />}
      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Holiday Edit
              </h3>
              <p>
                Please fill all detail and Edit new Holiday in your Holiday
                directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <input
                type="hidden"
                name="Hid_PDF"
                value={formik.values.Hid_PDF}
              />
              <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-2 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Title"
                    onChange={formik.handleChange}
                    value={formik.values.Title}
                    placeholder="Enter Title"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Title && formik.errors.Title && (
                    <small className="text-red-500">
                      {formik.errors.Title}
                    </small>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Select Standard <span className="text-danger">*</span>
                  </label>

                  <select
                    name="StandardId"
                    onChange={formik.handleChange}
                    value={formik.values.StandardId}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    {std.map((std) => (
                      <option key={std.Id} value={std.Id}>
                        {std.Title}
                      </option>
                    ))}
                  </select>

                  {formik.touched.StandardId && formik.errors.StandardId && (
                    <small className="text-red-500">
                      {formik.errors.StandardId}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Select Division <span className="text-danger">*</span>
                  </label>

                  <select
                    name="DivisionId"
                    value={formik.values.DivisionId}
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

                  {formik.touched.DivisionId && formik.errors.DivisionId && (
                    <small className="text-red-500">
                      {formik.errors.DivisionId}
                    </small>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Upload Syllabus
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="PDF"
                    onChange={(event) => {
                      formik.setFieldValue('PDF', event.currentTarget.files[0]);
                    }}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.PDF && formik.errors.PDF && (
                    <small className="text-red-500">{formik.errors.PDF}</small>
                  )}
                  <p>Please select an a PDF file only.</p>
                  <div className="mt-5">
                    <p>Your Exsisting Homework File*</p>
                    <div className="  gap-2 relative ">
                      <div className="relative">
                        {imagePreview ? (
                          getFileExtension(imagePreview) === 'pdf' ? (
                            <Link to={imagePreview} target="_blank">
                              <button
                                type="button"
                                className="mt-2 bg-blue-600 p-2 rounded border  text-white"
                              >
                                Download Homework
                              </button>
                            </Link>
                          ) : (
                            <img
                              src={imagePreview}
                              alt=""
                              className="rounded border p-2 h-28 w-28"
                            />
                          )
                        ) : (
                          <p>No Homework available</p>
                        )}
                      </div>
                    </div>
                  </div>
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

export default HolidayEdit;
