import React from 'react';
import Breadcrumb from '../../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Logo from './../../../images/logo.jpg';
import { BsChevronDown } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';

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
  wnumber: yup
    .string()
    .matches(/^[0-9]+$/, 'Only Number are allowed for this field ')
    .min(10, 'User Phone must be at most 10 characters')
    .max(10, 'User Phone must be at most 10 characters')
    .required('WhatsApp Number is required'),
  facebook: yup.string().required('Facebook is required'),
  twitter: yup.string().required('Twitter is required'),
  linkedIn: yup.string().required('LinkedIn is required'),
  instagram: yup.string().required('Instagram is required'),
  photo: yup.string().required('Photo is required'),
  idproof: yup.string().required('IdProof is required'),
  addressproof: yup.string().required('Address Proof is required'),
  role: yup.string().required('Role is required'),
  password: yup.string().required('Password is required'),
  cpassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const UserEdit = () => {
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
      wnumber: '',
      facebook: '',
      twitter: '',

      linkedIn: '',
      instagram: '',
      photo: '',
      idproof: '',
      addressproof: '',
      role: '',
      password: '',
      cpassword: '',
      Status: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      localStorage.setItem('UserEditData', JSON.stringify(values));
    },
  });

  return (
    <div>
      <Breadcrumb pageName="User Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* Input Fields */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                User Edit
              </h3>
              <p>Please fill all detail and edit User in your User directory</p>
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
                    WhatsApp Number
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="wnumber"
                    onChange={formik.handleChange}
                    placeholder="Enter Your WhatsApp Number
                  "
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.wnumber && formik.errors.wnumber && (
                    <small className="text-red-500">
                      {formik.errors.wnumber}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Facebook <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="facebook"
                    onChange={formik.handleChange}
                    placeholder="Enter Your Facebook"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.facebook && formik.errors.facebook && (
                    <small className="text-red-500">
                      {formik.errors.facebook}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Twitter <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="twitter"
                    onChange={formik.handleChange}
                    placeholder="Enter Your Twitter"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.twitter && formik.errors.twitter && (
                    <small className="text-red-500">
                      {formik.errors.twitter}
                    </small>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Permanent/Home Address{' '}
                    <span className="text-danger">*</span>
                  </label>

                  <textarea
                    rows={1}
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
                    LinkedIn <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="linkedIn"
                    onChange={formik.handleChange}
                    placeholder="Enter Your LinkedIn"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.linkedIn && formik.errors.linkedIn && (
                    <small className="text-red-500">
                      {formik.errors.linkedIn}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Instagram <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="instagram"
                    onChange={formik.handleChange}
                    placeholder="Enter Your Instagram"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.instagram && formik.errors.instagram && (
                    <small className="text-red-500">
                      {formik.errors.instagram}
                    </small>
                  )}
                </div>

                <div>
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
                  <div className="mt-5">
                    <p>Your Exsisting Img File*</p>
                    <div className="grid grid-cols-4 gap-2 relative">
                      <div className="relative">
                        <img
                          src={Logo}
                          alt=""
                          className="w-full rounded border p-2 "
                        />
                        <IoMdClose className="absolute top-1 right-1 bg-black text-white cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
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
                  <div className="mt-5">
                    <p>Your Exsisting Img File*</p>
                    <div className="grid grid-cols-4 gap-2 relative">
                      <div className="relative">
                        <img
                          src={Logo}
                          alt=""
                          className="w-full rounded border p-2 "
                        />
                        <IoMdClose className="absolute top-1 right-1 bg-black text-white cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
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
                  <div className="mt-5">
                    <p>Your Exsisting Img File*</p>
                    <div className="grid grid-cols-4 gap-2 relative">
                      <div className="relative">
                        <img
                          src={Logo}
                          alt=""
                          className="w-full rounded border p-2 "
                        />
                        <IoMdClose className="absolute top-1 right-1 bg-black text-white cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Select Role
                  </label>
                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select
                      name="role"
                      onChange={formik.handleChange}
                      className="relative z-20   w-full appearance-none rounded border border-stroke bg-transparent py-1.5   px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    >
                      <option>Select Role</option>
                      <option value="school">School</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                      <BsChevronDown />
                    </span>
                    {formik.touched.role && formik.errors.role && (
                      <small className="text-red-500">
                        {formik.errors.role}
                      </small>
                    )}
                  </div>
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

export default UserEdit;
