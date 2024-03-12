import React from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object().shape({
  student: yup.string().required('Student Name is required'),
  dname: yup.string().required('Driver Name is required'),
  dnumber: yup.string().required('Driver Number is required'),
  cname: yup.string().required('Conductor Name is required'),
  cnumber: yup.string().required('Conductor Number is required'),
  vnubmer: yup.string().required('Vehicle Name is required'),
});
const TransporationEdit = () => {
  const formik = useFormik({
    initialValues: {
      student: '',
      dname: '',
      dnumber: '',
      cname: '',
      cnumber: '',
      vnubmer: '',
      Status: 1,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      localStorage.setItem('NEWTRANSPORATIONEDITDATA', JSON.stringify(values));
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Breadcrumb pageName="Transporation Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Transporation Edit
              </h3>
              <p>
                Please fill all detail and Edit new Transporation in your
                Transporation directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Student Name <span className="text-danger">*</span>
                  </label>
                  <select
                    name="student"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={formik.handleChange}
                  >
                    <option>Select Student</option>
                    <option value="Rajan">Rajan</option>
                    <option value="Test">Test</option>
                  </select>

                  {formik.touched.student && formik.errors.student && (
                    <small className="text-red-500">
                      {formik.errors.student}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Driver Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="dname"
                    onChange={formik.handleChange}
                    placeholder="Enter Driver Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.dname && formik.errors.dname && (
                    <small className="text-red-500">
                      {formik.errors.dname}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Driver Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="dnumber"
                    onChange={formik.handleChange}
                    placeholder="Enter Driver Number"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.dnumber && formik.errors.dnumber && (
                    <small className="text-red-500">
                      {formik.errors.dnumber}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Conductor Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="cname"
                    onChange={formik.handleChange}
                    placeholder="Enter Conductor Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.cname && formik.errors.cname && (
                    <small className="text-red-500">
                      {formik.errors.cname}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Conductor Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="cnumber"
                    onChange={formik.handleChange}
                    placeholder="Enter Conductor Number"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.cnumber && formik.errors.cnumber && (
                    <small className="text-red-500">
                      {formik.errors.cnumber}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Vehicle Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="vnubmer"
                    onChange={formik.handleChange}
                    placeholder="Enter Your Vehicle Number"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.vnubmer && formik.errors.vnubmer && (
                    <small className="text-red-500">
                      {formik.errors.vnubmer}
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

export default TransporationEdit;
