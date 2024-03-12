import React from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Logo from '../../images/logo.jpg';
import { BsChevronDown } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';

const validationSchema = yup.object().shape({
  subjectname: yup.string().required('Subject Name is required'),
  stdname: yup.string().required('Standard Name is required'),
  divname: yup.string().required('Division Name is required'),
});
const SubjectEdit = () => {
  const formik = useFormik({
    initialValues: {
      subjectname: '',
      stdname: '',
      divname: '',
      Status: 1,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      localStorage.setItem('NEWSUBJECTEDITDATA', JSON.stringify(values));
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Breadcrumb pageName="Subject Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Subject Edit
              </h3>
              <p>
                Please fill all detail and Edit new Subject in your Subject
                directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Subject Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="subjectname"
                    onChange={formik.handleChange}
                    placeholder="Enter Your Subject Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.subjectname && formik.errors.subjectname && (
                    <small className="text-red-500">
                      {formik.errors.subjectname}
                    </small>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Select Standard <span className="text-danger">*</span>
                  </label>

                  <select
                    name="stdname"
                    onChange={formik.handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option>Select Standard</option>
                    <option value="1">std 1</option>
                    <option value="2">std 2</option>
                  </select>

                  {formik.touched.stdname && formik.errors.stdname && (
                    <small className="text-red-500">
                      {formik.errors.stdname}
                    </small>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Select Division <span className="text-danger">*</span>
                  </label>

                  <select
                    name="divname"
                    onChange={formik.handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option>Select Division</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                  </select>

                  {formik.touched.divname && formik.errors.divname && (
                    <small className="text-red-500">
                      {formik.errors.divname}
                    </small>
                  )}
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
                      // checked={blogadd.Status === '1'}
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
                      // checked={blogadd.Status == = '0'}
                    />
                    In Active
                  </div>
                </div>
                <p>Please select an a one status by default is inactive.</p>
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
                  type="submit"
                  onClick={handleGoBack}
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

export default SubjectEdit;
