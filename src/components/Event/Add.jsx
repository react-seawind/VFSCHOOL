import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import ContentEditor from '../EDITOR/NewEditor';

const validationSchema = yup.object().shape({
  ename: yup.string().required('Event Name is required'),
  edate: yup.string().required('Event Date is required'),
  content: yup.string().required('Content is required'),
});
const EventAdd = () => {
  const formik = useFormik({
    initialValues: {
      ename: '',
      edate: '',
      content: '',
      Status: 1,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      localStorage.setItem('NEWEVENTDATA', JSON.stringify(values));
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleContentChange = (content) => {
    formik.setFieldValue('content', content);
  };
  return (
    <div>
      <Breadcrumb pageName="Event Add " />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Event Add
              </h3>
              <p>
                Please fill all detail and add new Event in your Event directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="grid md:grid-cols-2 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Event Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="ename"
                    onChange={formik.handleChange}
                    placeholder="Enter Your Event Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.ename && formik.errors.ename && (
                    <small className="text-red-500">
                      {formik.errors.ename}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Event Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    name="edate"
                    onChange={formik.handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.edate && formik.errors.edate && (
                    <small className="text-red-500">
                      {formik.errors.edate}
                    </small>
                  )}
                </div>
              </div>
              <div className=" px-5.5">
                <label className="mb-3 block text-black dark:text-white">
                  Content <span className="text-danger">*</span>
                </label>
                <ContentEditor onChange={handleContentChange} />

                {formik.touched.content && formik.errors.content && (
                  <small className="text-red-500">
                    {formik.errors.content}
                  </small>
                )}
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

export default EventAdd;
