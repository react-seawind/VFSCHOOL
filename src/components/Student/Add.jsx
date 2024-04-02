import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[A-Z a-z]+$/, 'Only alphabets are allowed for this field ')
    .required('Name is required'),
  useremail: yup.string().email().required('Email is required'),
  userphone: yup
    .string()
    .matches(/^[0-9]+$/, 'Only Number are allowed for this field ')
    .min(10, 'User Phone must be at most 10 characters')
    .max(10, 'User Phone must be at most 10 characters')
    .required('Phone is required'),
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  area: yup.string().required('Area is required'),
  pincode: yup
    .string()
    .matches(/^[0-9]+$/, 'Only numbres are allowed for this field ')
    .max(6)
    .min(6)
    .required('Pincode is required'),
  taddress: yup.string().required('Temporary/Current Address is required'),
  paddress: yup.string().required('Permanent/Home Address is required'),

  photo: yup.string().required('Photo is required'),
  idproof: yup.string().required('IdProof is required'),
  addressproof: yup.string().required('Address Proof is required'),
  password: yup.string().required('Password is required'),
  cpassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),

  standard: yup.string().required('Standard is required'),
  division: yup.string().required('Division is required'),
  classteacher: yup.string().required('Class Teacher Name is required'),
});
const StudentAdd = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      useremail: '',
      userphone: '',
      country: '',
      state: '',
      city: '',
      area: '',
      pincode: '',
      taddress: '',
      paddress: '',

      photo: '',
      idproof: '',
      addressproof: '',
      role: 'student',
      password: '',
      cpassword: '',
      standard: '',
      division: '',
      classteacher: '',
      Status: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      localStorage.setItem('NEWSTUDENTDATA', JSON.stringify(values));
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/chapter/listing');
  };
  return (
    <div>
      <Breadcrumb pageName="Student Add " />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Student Add
              </h3>
              <p>
                Please fill all detail and add new Student in your Student
                directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    onChange={formik.handleChange}
                    placeholder="Enter Your Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.username && formik.errors.username && (
                    <small className="text-red-500">
                      {formik.errors.username}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    name="useremail"
                    onChange={formik.handleChange}
                    placeholder="Enter Your Email"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.useremail && formik.errors.useremail && (
                    <small className="text-red-500">
                      {formik.errors.useremail}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="userphone"
                    onChange={formik.handleChange}
                    placeholder="Enter Your Phone"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.userphone && formik.errors.userphone && (
                    <small className="text-red-500">
                      {formik.errors.userphone}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Country <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    onChange={formik.handleChange}
                    placeholder="Enter Your Country"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.country && formik.errors.country && (
                    <small className="text-red-500">
                      {formik.errors.country}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    State <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    onChange={formik.handleChange}
                    placeholder="Enter Your State"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.state && formik.errors.state && (
                    <small className="text-red-500">
                      {formik.errors.state}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    City <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    onChange={formik.handleChange}
                    placeholder="Enter Your City"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.city && formik.errors.city && (
                    <small className="text-red-500">{formik.errors.city}</small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Area <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="area"
                    onChange={formik.handleChange}
                    placeholder="Enter Your Area"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.area && formik.errors.area && (
                    <small className="text-red-500">{formik.errors.area}</small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Pincode <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    onChange={formik.handleChange}
                    placeholder="Enter Your Pincode"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.pincode && formik.errors.pincode && (
                    <small className="text-red-500">
                      {formik.errors.pincode}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Temporary/Current Address{' '}
                    <span className="text-danger">*</span>
                  </label>
                  <textarea
                    rows={1}
                    name="taddress"
                    onChange={formik.handleChange}
                    placeholder="Enter Your Temporary/Current Address"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                  {formik.touched.taddress && formik.errors.taddress && (
                    <small className="text-red-500">
                      {formik.errors.taddress}
                    </small>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Permanent/Home Address{' '}
                    <span className="text-danger">*</span>
                  </label>

                  <textarea
                    rows={2}
                    name="paddress"
                    onChange={formik.handleChange}
                    placeholder="Enter Your Permanent/Home Address"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                  {formik.touched.paddress && formik.errors.paddress && (
                    <small className="text-red-500">
                      {formik.errors.paddress}
                    </small>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Photo
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="photo"
                    onChange={formik.handleChange}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.photo && formik.errors.photo && (
                    <small className="text-red-500">
                      {formik.errors.photo}
                    </small>
                  )}

                  <p>Please select an a png,jpeg,jpg,gif file only.</p>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    IdProof
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="idproof"
                    onChange={formik.handleChange}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.idproof && formik.errors.idproof && (
                    <small className="text-red-500">
                      {formik.errors.idproof}
                    </small>
                  )}

                  <p>Please select an a png,jpeg,jpg,gif file only.</p>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Address Proof
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="addressproof"
                    onChange={formik.handleChange}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.addressproof &&
                    formik.errors.addressproof && (
                      <small className="text-red-500">
                        {formik.errors.addressproof}
                      </small>
                    )}
                  <p>Please select an a png,jpeg,jpg,gif file only.</p>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="password"
                    onChange={formik.handleChange}
                    placeholder="Enter Your Password"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <small className="text-red-500">
                      {formik.errors.password}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="cpassword"
                    onChange={formik.handleChange}
                    placeholder="Enter Your Confirm Password"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.cpassword && formik.errors.cpassword && (
                    <small className="text-red-500">
                      {formik.errors.cpassword}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Standard Name <span className="text-danger">*</span>
                  </label>
                  <select
                    name="standard"
                    onChange={formik.handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option>Select Standard</option>
                    <option value="1">std 1</option>
                    <option value="2">std 2</option>
                  </select>
                  {formik.touched.standard && formik.errors.standard && (
                    <small className="text-red-500">
                      {formik.errors.standard}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Division Name <span className="text-danger">*</span>
                  </label>
                  <select
                    name="division"
                    onChange={formik.handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option>Select Division</option>
                    <option value="1">division 1</option>
                    <option value="2">division 2</option>
                  </select>
                  {formik.touched.division && formik.errors.division && (
                    <small className="text-red-500">
                      {formik.errors.division}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Class Teacher Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="classteacher"
                    onChange={formik.handleChange}
                    placeholder="Enter Class Teacher Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.classteacher &&
                    formik.errors.classteacher && (
                      <small className="text-red-500">
                        {formik.errors.classteacher}
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

export default StudentAdd;
