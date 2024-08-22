import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Logo from '../../images/logo.jpg';
import { BsChevronDown } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';
import { getAllDivision } from '../../API/DivisionApi';
import { getAllStandard } from '../../API/StandardApi';
import { getStudentById, updateStudentById } from '../../API/StudentApi';
import { getAllTeacher } from '../../API/TeacherApi';
import FormLoader from '../../common/FormLoader';
import { format } from 'date-fns';
import { getDivisionByStandardId } from '../../API/GetStdDivSub';

const validationSchema = Yup.object().shape({
  StudentName: Yup.string()
    // .matches(/^[A-Za-z]+$/, 'Only alphabets are allowed for this field')
    .required('Student Name is required'),
  StudentEmail: Yup.string().email().required('Student Email is required'),
  StudentPhone: Yup.string()
    .matches(/^[0-9]+$/, 'Only numbers are allowed for this field')
    .min(10, 'Student Phone must be at least 10 characters')
    .max(10, 'Student Phone must be at most 10 characters')
    .required('Student Phone is required'),
  ParentName: Yup.string().required('Parent Name is required'),
  ParentEmail: Yup.string().email().required('Parent Email is required'),
  ParentPhone: Yup.string()
    .matches(/^[0-9]+$/, 'Only numbers are allowed for this field')
    .min(10, 'User Phone must be at least 10 characters')
    .max(10, 'User Phone must be at most 10 characters')
    .required('Parent Phone is required'),
  RollNo: Yup.string()
    .matches(/^[0-9]+$/, 'RollNo must be only digits')
    .required('RollNo is required'),
  GrNo: Yup.string()
    .matches(/^[0-9]+$/, 'GrNo must be only digits')
    .required('GrNo is required'),
  MotherName: Yup.string().required('Mother Name is required'),
  DOB: Yup.string().required('Date Of Birth is required'),
  BloodGroup: Yup.string().required('BloodGroup is required'),
  Gender: Yup.string().required('Gender is required'),
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
  StandardId: Yup.string().required('Standard is required'),
  DivisionId: Yup.string().required('Division is required'),
  TeacherId: Yup.string().required('teacher is required'),
  // Password: Yup.string().required('Password is required'),
});
const StudentEdit = () => {
  // ================ Get data by Id============
  const { Id } = useParams();
  const [PhotoPreview, setPhotoPreview] = useState();
  const [AddressProofPreview, setAddressProofPreview] = useState();
  const [IdProofPreview, setIdProofPreview] = useState();
  const [DOB, setDOB] = useState();
  const fetchData = async () => {
    try {
      if (Id) {
        const SchoolData = await getStudentById(Id);
        formik.setValues(SchoolData);
        if (SchoolData.Photo) {
          setPhotoPreview(SchoolData.Photo); // Update Photo preview if Photo exists
        }
        if (SchoolData.AddressProof) {
          setAddressProofPreview(SchoolData.AddressProof); // Update AddressProof preview if AddressProof exists
        }
        if (SchoolData.IdProof) {
          setIdProofPreview(SchoolData.IdProof); // Update IdProof preview if IdProof exists
        }
        const DOB = format(new Date(SchoolData.DOB), 'yyyy-MM-dd');
        formik.setValues({
          ...SchoolData,
          DOB: DOB,
        });
        const formattedDOB = format(new Date(SchoolData.DOB), 'yyyy-MM-dd'); // Use 'yyyy-MM-dd' format for HTML date input
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
  // ------------Division DATA-------------------
  const [div, setdiv] = useState([]);

  // ------------Teacher DATA-------------------
  const [teacher, setteacher] = useState([]);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const TeacherData = await getAllTeacher();
        setteacher(TeacherData);
      } catch (error) {
        console.error('Error fetching Teacher:', error);
      }
    };
    fetchTeacher();
  }, []);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      Id: Id,
      StudentName: '',
      StudentEmail: '',
      StudentPhone: '',
      ParentName: '',
      ParentEmail: '',
      ParentPhone: '',
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
      StandardId: '',
      DivisionId: '',
      TeacherId: '',
      Status: '',

      RollNo: '',
      GrNo: '',
      MotherName: '',
      DOB: '',
      BloodGroup: '',
      Gender: '',
    },

    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      setIsFormLoading(true);
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });

        await updateStudentById(formData);
        fetchData();
      } catch (error) {
        console.error('Error adding student:', error);
      } finally {
        setIsFormLoading(false); // Set loading state to false when submission ends
      }
    },
  });

  useEffect(() => {
    const fetchDivision = async () => {
      if (formik.values.StandardId) {
        try {
          const DivisionData = await getDivisionByStandardId(
            formik.values.StandardId,
          );
          setdiv(DivisionData);
        } catch (error) {
          console.error('Error fetching Division:', error);
        }
      }
    };
    fetchDivision();
  }, [formik.values.StandardId]);
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
    navigate('/student/listing');
  };

  return (
    <div>
      <Breadcrumb pageName="Student Edit" />
      {isFormLoading && <FormLoader loading={isFormLoading} />}
      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Student Edit
              </h3>
              <p>
                Please fill all detail and Edit new Student in your Student
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
                    Roll No <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="RollNo"
                    value={formik.values.RollNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Student Roll No"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.RollNo && formik.errors.RollNo && (
                    <small className="text-red-500">
                      {formik.errors.RollNo}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Gr No <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="GrNo"
                    value={formik.values.GrNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Student Gr No"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.GrNo && formik.errors.GrNo && (
                    <small className="text-red-500">{formik.errors.GrNo}</small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Student Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="StudentName"
                    value={formik.values.StudentName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Student Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.StudentName && formik.errors.StudentName && (
                    <small className="text-red-500">
                      {formik.errors.StudentName}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Student Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="StudentEmail"
                    value={formik.values.StudentEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Student Email"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.StudentEmail &&
                    formik.errors.StudentEmail && (
                      <small className="text-red-500">
                        {formik.errors.StudentEmail}
                      </small>
                    )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Student Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="StudentPhone"
                    value={formik.values.StudentPhone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Student Phone"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.StudentPhone &&
                    formik.errors.StudentPhone && (
                      <small className="text-red-500">
                        {formik.errors.StudentPhone}
                      </small>
                    )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Parent Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="ParentName"
                    value={formik.values.ParentName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.ParentName && formik.errors.ParentName && (
                    <small className="text-red-500">
                      {formik.errors.ParentName}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Parent Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="ParentEmail"
                    value={formik.values.ParentEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Email"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.ParentEmail && formik.errors.ParentEmail && (
                    <small className="text-red-500">
                      {formik.errors.ParentEmail}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Parent Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="ParentPhone"
                    value={formik.values.ParentPhone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Phone"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.ParentPhone && formik.errors.ParentPhone && (
                    <small className="text-red-500">
                      {formik.errors.ParentPhone}
                    </small>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Mother Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="MotherName"
                    value={formik.values.MotherName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transMother py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.MotherName && formik.errors.MotherName && (
                    <small className="text-red-500">
                      {formik.errors.MotherName}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Date Of Birth <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    name="DOB"
                    value={formik.values.DOB}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Email"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.DOB && formik.errors.DOB && (
                    <small className="text-red-500">{formik.errors.DOB}</small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Select Blood Group <span className="text-danger">*</span>
                  </label>

                  <select
                    name="BloodGroup"
                    value={formik.values.BloodGroup}
                    onChange={formik.handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option>Select Blood Group</option>
                    <option value="O-">O-</option>
                    <option value="O+">O+</option>
                    <option value="A-">A-</option>
                    <option value="A+">A+</option>
                    <option value="B-">B-</option>
                    <option value="B+">B+</option>
                    <option value="AB-">AB-</option>
                    <option value="AB+">AB+</option>
                  </select>

                  {formik.touched.BloodGroup && formik.errors.BloodGroup && (
                    <small className="text-red-500">
                      {formik.errors.BloodGroup}
                    </small>
                  )}
                </div>
                <div className="flex flex-col gap-2.5 py-3.5 px-5.5">
                  <label className="block text-black dark:text-white">
                    Gender <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <div>
                      <input
                        type="radio"
                        onChange={formik.handleChange}
                        name="Gender"
                        className="mr-2"
                        value="Male"
                        checked={formik.values.Gender == 'Male'}
                      />
                      Male
                      <input
                        type="radio"
                        onChange={formik.handleChange}
                        name="Gender"
                        className="mx-2"
                        value="Female"
                        checked={formik.values.Gender == 'Female'}
                      />
                      Female
                    </div>
                    {formik.touched.Gender && formik.errors.Gender && (
                      <small className="text-red-500">
                        {formik.errors.Gender}
                      </small>
                    )}
                  </div>
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
                    Select Standard <span className="text-danger">*</span>
                  </label>

                  <select
                    name="StandardId"
                    value={formik.values.StandardId}
                    onChange={formik.handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option>Select Standard</option>
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
                    Select Division <span className="text-danger">*</span>
                  </label>

                  <select
                    name="DivisionId"
                    value={formik.values.DivisionId}
                    onChange={formik.handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    {div.length === 0 ? (
                      <option>No Division</option>
                    ) : (
                      <>
                      <option>Select Division</option>
                        {div.map((div) => (
                          <React.Fragment>
                            <option key={div.Id} value={div.Id}>
                              {div.Title}
                            </option>
                          </React.Fragment>
                        ))}
                      </>
                    )}
                  </select>

                  {formik.touched.DivisionId && formik.errors.DivisionId && (
                    <small className="text-red-500">
                      {formik.errors.DivisionId}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Select Teacher <span className="text-danger">*</span>
                  </label>

                  <select
                    name="TeacherId"
                    value={formik.values.TeacherId}
                    onChange={formik.handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    {teacher.map((teacher) => (
                      <option key={teacher.Id} value={teacher.Id}>
                        {teacher.TeacherName}
                      </option>
                    ))}
                  </select>

                  {formik.touched.TeacherId && formik.errors.TeacherId && (
                    <small className="text-red-500">
                      {formik.errors.TeacherId}
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
                                Download Address Proof
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
                          <p>No Address Proof available</p>
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
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-white dark:text-white"
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

export default StudentEdit;
