import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { BsChevronDown } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';

const validationSchema = yup.object().shape({
  mondaymeal: yup.string().required('Monday Meal is required'),
  tuesdaymeal: yup.string().required('Tuesday Meal is required'),
  wednesdaymeal: yup.string().required('Wednesday Meal is required'),
  thursdaymeal: yup.string().required('Thursday Meal is required'),
  fridaymeal: yup.string().required('Friday Meal is required'),
  saturdaymeal: yup.string().required('Saturday Meal is required'),
});
const MealAdd = () => {
  const formik = useFormik({
    initialValues: {
      mondaymeal: '',
      tuesdaymeal: '',
      wednesdaymeal: '',
      thursdaymeal: '',
      fridaymeal: '',
      saturdaymeal: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      localStorage.setItem('NEWMEALDATA', JSON.stringify(values));
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/chapter/listing');
  };
  return (
    <div>
      <Breadcrumb pageName="Meal Add " />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Meal Add
              </h3>
              <p>
                Please fill all detail and add new Meal in your Meal directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Monday Meal <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="mondaymeal"
                    onChange={formik.handleChange}
                    placeholder="Enter Monday Meal"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.mondaymeal && formik.errors.mondaymeal && (
                    <small className="text-red-500">
                      {formik.errors.mondaymeal}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Tuesday Meal <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="tuesdaymeal"
                    onChange={formik.handleChange}
                    placeholder="Enter Tuesday Meal"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.tuesdaymeal && formik.errors.tuesdaymeal && (
                    <small className="text-red-500">
                      {formik.errors.tuesdaymeal}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Wednesday Meal <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="wednesdaymeal"
                    onChange={formik.handleChange}
                    placeholder="Enter Wednesday Meal"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.wednesdaymeal &&
                    formik.errors.wednesdaymeal && (
                      <small className="text-red-500">
                        {formik.errors.wednesdaymeal}
                      </small>
                    )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Thursday Meal <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="thursdaymeal"
                    onChange={formik.handleChange}
                    placeholder="Enter Thursday Meal"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.thursdaymeal &&
                    formik.errors.thursdaymeal && (
                      <small className="text-red-500">
                        {formik.errors.thursdaymeal}
                      </small>
                    )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Friday Meal <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="fridaymeal"
                    onChange={formik.handleChange}
                    placeholder="Enter Friday Meal"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.fridaymeal && formik.errors.fridaymeal && (
                    <small className="text-red-500">
                      {formik.errors.fridaymeal}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Saturday Meal <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="saturdaymeal"
                    onChange={formik.handleChange}
                    placeholder="Enter Saturday Meal"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.saturdaymeal &&
                    formik.errors.saturdaymeal && (
                      <small className="text-red-500">
                        {formik.errors.saturdaymeal}
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

export default MealAdd;
