import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Logo from '../../images/logo.jpg';
import { BsChevronDown } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';
import { getAllStandard } from '../../API/StandardApi';
import { getSyllabusById, updateSyllabusById } from '../../API/SyllabusApi';

const validationSchema = yup.object().shape({
  Title: yup.string().required('Title is required'),
  StandardId: yup.string().required('Standard is required'),
});
const SyllabusEdit = () => {
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
  // ================ Get data by Id============
  const { Id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Id) {
          const SyllabusData = await getSyllabusById(Id);
          formik.setValues({
            Id: SyllabusData.Id || '',
            path: SyllabusData.path || '',
            SchoolId: SyllabusData.SchoolId || '',
            StandardId: SyllabusData.StandardId || '',
            Title: SyllabusData.Title || '',
            PDF: SyllabusData.PDF || '',
            Hid_PDF: SyllabusData.Hid_PDF || '',
            Status: SyllabusData.Status || '0',
          });
        } else {
          console.log('error');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [Id]);
  const formik = useFormik({
    initialValues: {
      SchoolId: Id,
      StandardId: '',
      Title: '',
      PDF: '',
      Hid_PDF: '',
      Status: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('Id', values.Id);
        formData.append('Title', values.Title);
        formData.append('SchoolId', values.SchoolId);
        formData.append('StandardId', values.StandardId);
        if (values.PDF instanceof File) {
          formData.append('PDF', values.PDF);
        } else {
          formData.append('PDF', values.PDF);
        }
        if (values.Hid_PDF instanceof File) {
          formData.append('Hid_PDF', values.Hid_PDF);
        } else {
          formData.append('Hid_PDF', values.Hid_PDF);
        }
        formData.append('Status', values.Status);
        await updateSyllabusById(formData);
      } catch (error) {
        console.error('Error adding Photo:', error);
      }
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/syllabus/listing');
  };

  return (
    <div>
      <Breadcrumb pageName="Syllabus Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Syllabus Edit
              </h3>
              <p>
                Please fill all detail and Edit new Syllabus in your Syllabus
                directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <input
                type="hidden"
                name="Hid_PDF"
                value={formik.values.Hid_PDF}
              />
              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Title"
                    value={formik.values.Title}
                    onChange={formik.handleChange}
                    placeholder="Enter Your Title"
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
                    value={formik.values.StandardId}
                    onChange={formik.handleChange}
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
                </div>
                <div className="mt-5">
                  <p>Your Exsisting PDF File*</p>
                  <div className="  gap-2 relative ">
                    <div className="relative">
                      <Link
                        to={formik.values.path + formik.values.Hid_PDF}
                        target="_blank"
                      >
                        <button
                          type="button"
                          className="mt-2 bg-blue-600 p-2 rounded border  text-white"
                        >
                          Download Syllabus
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 py-3.5 px-5.5">
                <label className="mb-3 block text-black dark:text-white">
                  Status <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <div>
                    <input
                      type="radio"
                      onChange={formik.handleChange}
                      name="Status"
                      className="mx-2"
                      value="1"
                      checked={formik.values.Status == '1'}
                    />
                    Active
                  </div>
                  <div>
                    <input
                      type="radio"
                      onChange={formik.handleChange}
                      name="Status"
                      className="mx-2"
                      value="0"
                      checked={formik.values.Status == '0'}
                    />
                    In Active
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
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
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

export default SyllabusEdit;
