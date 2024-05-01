import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getTeacherById, updateTeacherById } from '../../API/TeacherApi';

const validationSchema = Yup.object().shape({
  TeacherName: Yup.string().required('Teacher Name is required'),
  TeacherEmail: Yup.string().email().required('Teacher Email is required'),
  TeacherPhone: Yup.string()
    .matches(/^[0-9]+$/, 'Only numbers are allowed for this field')
    .min(10, 'Teacher Phone must be at least 10 characters')
    .max(10, 'Teacher Phone must be at most 10 characters')
    .required('Teacher Phone is required'),
  Country: Yup.string().required('Country is required'),
  State: Yup.string().required('State is required'),
  City: Yup.string().required('City is required'),
  Area: Yup.string().required('Area is required'),
  Pincode: Yup.string()
    .matches(/^[0-9]+$/, 'Only numbers are allowed for this field')
    .max(6, 'Pincode must be at most 6 characters')
    .min(6, 'Pincode must be at least 6 characters')
    .required('Pincode is required'),
  TAddress: Yup.string().required('Temporary Address is required'),
  PAddress: Yup.string().required('Current Address is required'),
  Photo: Yup.string().required('Photo is required'),
  AddressProof: Yup.string().required('AddressProof is required'),
  IdProof: Yup.string().required('Id Proof is required'),
});
const TeacherEdit = () => {
  // ================ Get data by Id============
  const { Id } = useParams();
  const [PhotoPreview, setPhotoPreview] = useState();
  const [AddressProofPreview, setAddressProofPreview] = useState();
  const [IdProofPreview, setIdProofPreview] = useState();
  const fetchData = async () => {
    try {
      if (Id) {
        const TeacherData = await getTeacherById(Id);
        formik.setValues(TeacherData);
        if (TeacherData.Photo) {
          setPhotoPreview(TeacherData.Photo); // Update Photo preview if Photo exists
        }
        if (TeacherData.AddressProof) {
          setAddressProofPreview(TeacherData.AddressProof); // Update AddressProof preview if AddressProof exists
        }
        if (TeacherData.IdProof) {
          setIdProofPreview(TeacherData.IdProof); // Update IdProof preview if IdProof exists
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

  const formik = useFormik({
    initialValues: {
      SchoolId: '',
      Id: Id,
      TeacherName: '',
      TeacherEmail: '',
      TeacherPhone: '',

      Country: '',
      State: '',
      City: '',
      Area: '',
      Pincode: '',

      TAddress: '',
      PAddress: '',

      Photo: '',
      Hid_Photo: '',
      AddressProof: '',
      Hid_AddressProof: '',
      IdProof: '',
      Hid_IdProof: '',
      Role: '',
      Status: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });

        await updateTeacherById(formData);
        fetchData();
      } catch (error) {
        console.error('Error adding Teacher:', error);
      }
    },
  });
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
    navigate('/teacher/listing');
  };
  return (
    <div>
      <Breadcrumb pageName="Teacher Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Teacher Edit
              </h3>
              <p>
                Please fill all detail and Edit new Teacher in your Teacher
                directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <input
                type="hidden"
                name="Hid_Photo"
                value={formik.values.Hid_Photo}
              />
              <input
                type="hidden"
                name="Hid_AddressProof"
                value={formik.values.Hid_AddressProof}
              />
              <input
                type="hidden"
                name="Hid_IdProof"
                value={formik.values.Hid_IdProof}
              />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Teacher Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="TeacherName"
                    value={formik.values.TeacherName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Teacher Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.TeacherName && formik.errors.TeacherName && (
                    <small className="text-red-500">
                      {formik.errors.TeacherName}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Teacher Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="TeacherEmail"
                    value={formik.values.TeacherEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Teacher Email"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.TeacherEmail &&
                    formik.errors.TeacherEmail && (
                      <small className="text-red-500">
                        {formik.errors.TeacherEmail}
                      </small>
                    )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Teacher Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="TeacherPhone"
                    value={formik.values.TeacherPhone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Teacher Phone"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.TeacherPhone &&
                    formik.errors.TeacherPhone && (
                      <small className="text-red-500">
                        {formik.errors.TeacherPhone}
                      </small>
                    )}
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Country <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Country"
                    value={formik.values.Country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Country"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Country && formik.errors.Country && (
                    <small className="text-red-500">
                      {formik.errors.Country}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    State <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="State"
                    value={formik.values.State}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your State"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.State && formik.errors.State && (
                    <small className="text-red-500">
                      {formik.errors.State}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    City <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="City"
                    value={formik.values.City}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your City"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.City && formik.errors.City && (
                    <small className="text-red-500">{formik.errors.City}</small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Area <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Area"
                    value={formik.values.Area}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Area"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Area && formik.errors.Area && (
                    <small className="text-red-500">{formik.errors.Area}</small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Pincode <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Pincode"
                    value={formik.values.Pincode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Pincode"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Pincode && formik.errors.Pincode && (
                    <small className="text-red-500">
                      {formik.errors.Pincode}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Temporary Address <span className="text-danger">*</span>
                  </label>

                  <input
                    type="text"
                    rows={1}
                    name="TAddress"
                    value={formik.values.TAddress}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Temporary Address"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.TAddress && formik.errors.TAddress && (
                    <small className="text-red-500">
                      {formik.errors.TAddress}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Permanent Address <span className="text-danger">*</span>
                  </label>

                  <input
                    type="text"
                    rows={1}
                    name="PAddress"
                    value={formik.values.PAddress}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Permanent Address"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.PAddress && formik.errors.PAddress && (
                    <small className="text-red-500">
                      {formik.errors.PAddress}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Role <span className="text-danger">*</span>
                  </label>
                  <select
                    name="Role"
                    onChange={formik.handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option>Select Role</option>
                    <option value="class">Class teacher</option>
                    <option value="subject">Subject teacher</option>
                  </select>
                  {formik.touched.Role && formik.errors.Role && (
                    <small className="text-red-500">{formik.errors.Role}</small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Photo
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="Photo"
                    onChange={(event) => {
                      formik.setFieldValue(
                        'Photo',
                        event.currentTarget.files[0],
                      );
                    }}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.Photo && formik.errors.Photo && (
                    <small className="text-red-500">
                      {formik.errors.Photo}
                    </small>
                  )}

                  <p>Please select an a jpg, png, gif, jpeg, webp file only.</p>
                  <div className="mt-5">
                    <p>Your Exsisting Img File</p>
                    <div className="  gap-2 relative">
                      <div className="relative">
                        {PhotoPreview ? (
                          getFileExtension(PhotoPreview) === 'pdf' ? (
                            <Link to={PhotoPreview} target="_blank">
                              <button
                                type="button"
                                className="mt-2 bg-blue-600 p-2 rounded border  text-white"
                              >
                                Download Photo
                              </button>
                            </Link>
                          ) : (
                            <img
                              src={PhotoPreview}
                              alt=""
                              className="rounded border p-2 h-28 w-28"
                            />
                          )
                        ) : (
                          <p>No Photo available</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Address Proof
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="AddressProof"
                    onChange={(event) => {
                      formik.setFieldValue(
                        'AddressProof',
                        event.currentTarget.files[0],
                      );
                    }}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.AddressProof &&
                    formik.errors.AddressProof && (
                      <small className="text-red-500">
                        {formik.errors.AddressProof}
                      </small>
                    )}

                  <p>Please select an a PDF file only.</p>
                  <div className="mt-5">
                    <p>Your Exsisting Img File</p>
                    <div className=" gap-2 relative">
                      <div className="relative">
                        {AddressProofPreview ? (
                          getFileExtension(AddressProofPreview) === 'pdf' ? (
                            <Link to={AddressProofPreview} target="_blank">
                              <button
                                type="button"
                                className="mt-2 bg-blue-600 p-2 rounded border  text-white"
                              >
                                Download Address Proof
                              </button>
                            </Link>
                          ) : (
                            <img
                              src={AddressProofPreview}
                              alt=""
                              className="rounded border p-2 h-28 w-28"
                            />
                          )
                        ) : (
                          <p>No Address Proof available</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    IdProof
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="IdProof"
                    onChange={(event) => {
                      formik.setFieldValue(
                        'IdProof',
                        event.currentTarget.files[0],
                      );
                    }}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.IdProof && formik.errors.IdProof && (
                    <small className="text-red-500">
                      {formik.errors.IdProof}
                    </small>
                  )}
                  <p>
                    Please select an a jpg, png, gif, jpeg, webp ,pdf file only.
                  </p>
                  <div className="mt-5">
                    <p>Your Exsisting Img File</p>
                    <div className=" gap-2 relative">
                      <div className="relative">
                        {IdProofPreview ? (
                          getFileExtension(IdProofPreview) === 'pdf' ? (
                            <Link to={IdProofPreview} target="_blank">
                              <button
                                type="button"
                                className="mt-2 bg-blue-600 p-2 rounded border  text-white"
                              >
                                Download Address Proof
                              </button>
                            </Link>
                          ) : (
                            <img
                              src={IdProofPreview}
                              alt=""
                              className="rounded border p-2 h-28 w-28 "
                            />
                          )
                        ) : (
                          <p>No address proof available</p>
                        )}
                      </div>
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

export default TeacherEdit;
