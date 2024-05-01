import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { BsChevronDown } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';
import Config from '../../API/Config';
import { AddMeal, getMealById } from '../../API/MealAPI';

const validationSchema = yup.object().shape({
  Monday: yup.string().required('Monday Meal is required'),
  Tuesday: yup.string().required('Tuesday Meal is required'),
  Wednesday: yup.string().required('Wednesday Meal is required'),
  Thursday: yup.string().required('Thursday Meal is required'),
  Friday: yup.string().required('Friday Meal is required'),
  Saturday: yup.string().required('Saturday Meal is required'),
  Sunday: yup.string().required('Sunday Meal is required'),
});
const MealAdd = () => {
  const Id = Config.getId();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Id) {
          const MealData = await getMealById(Id);
          formik.setValues(MealData);
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
      Monday: '',
      SchoolId: Id,
      Tuesday: '',
      Wednesday: '',
      Thursday: '',
      Friday: '',
      Saturday: '',
      Sunday: '',
      Status: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await AddMeal(values);
      } catch (error) {
        console.error('Error adding Meal:', error);
      }
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/dashboard');
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
                    name="Monday"
                    onChange={formik.handleChange}
                    value={formik.values.Monday}
                    placeholder="Enter Monday Meal"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Monday && formik.errors.Monday && (
                    <small className="text-red-500">
                      {formik.errors.Monday}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Tuesday Meal <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Tuesday"
                    onChange={formik.handleChange}
                    value={formik.values.Tuesday}
                    placeholder="Enter Tuesday Meal"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Tuesday && formik.errors.Tuesday && (
                    <small className="text-red-500">
                      {formik.errors.Tuesday}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Wednesday Meal <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Wednesday"
                    onChange={formik.handleChange}
                    value={formik.values.Wednesday}
                    placeholder="Enter Wednesday Meal"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Wednesday && formik.errors.Wednesday && (
                    <small className="text-red-500">
                      {formik.errors.Wednesday}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Thursday Meal <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Thursday"
                    onChange={formik.handleChange}
                    value={formik.values.Thursday}
                    placeholder="Enter Thursday Meal"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Thursday && formik.errors.Thursday && (
                    <small className="text-red-500">
                      {formik.errors.Thursday}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Friday Meal <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Friday"
                    onChange={formik.handleChange}
                    value={formik.values.Friday}
                    placeholder="Enter Friday Meal"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Friday && formik.errors.Friday && (
                    <small className="text-red-500">
                      {formik.errors.Friday}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Saturday Meal <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Saturday"
                    onChange={formik.handleChange}
                    value={formik.values.Saturday}
                    placeholder="Enter Saturday Meal"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Saturday && formik.errors.Saturday && (
                    <small className="text-red-500">
                      {formik.errors.Saturday}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Sunday Meal <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Sunday"
                    onChange={formik.handleChange}
                    value={formik.values.Sunday}
                    placeholder="Enter Sunday Meal"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Sunday && formik.errors.Sunday && (
                    <small className="text-red-500">
                      {formik.errors.Sunday}
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

export default MealAdd;
