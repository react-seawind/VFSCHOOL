import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { BsChevronDown } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';

const validationSchema = yup.object().shape({
  Mealname: yup.string().required('Meal Name is required'),
  stdname: yup
    .array()
    .min(1, 'Select at least one Standard')
    .required('Standard is required'),
});
const MealAdd = () => {
  const [selectedStd, setSelectedStd] = useState([]);
  const formik = useFormik({
    initialValues: {
      Mealname: '',
      stdname: [],
      Status: 1,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      localStorage.setItem('MealData', JSON.stringify(values));
    },
  });

  const handleSelectStd = (selectedList) => {
    setSelectedStd(selectedList);
    formik.setFieldValue('stdname', selectedList);
  };
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
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
                Please fill all detail and add new Meal in your Meal
                directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Meal Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Mealname"
                    onChange={formik.handleChange}
                    placeholder="Enter Your Meal Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Mealname && formik.errors.Mealname && (
                    <small className="text-red-500">
                      {formik.errors.Mealname}
                    </small>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Standard Name <span className="text-danger">*</span>
                  </label>
                  <Multiselect
                    selectedValues={selectedStd}
                    onSelect={handleSelectStd}
                    displayValue="stdname"
                    name="stdname"
                    isObject={false}
                    options={['std 1', 'std 2', 'std 3', 'std 4', 'std 5']}
                  />
                  {formik.touched.stdname && formik.errors.stdname && (
                    <small className="text-red-500">
                      {formik.errors.stdname}
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

export default MealAdd;
