import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getTransportationById,
  updateTransportationById,
} from '../../API/TransportationAPI';
import { getAllStudent } from '../../API/StudentApi';
import FormLoader from '../../common/FormLoader';

const validationSchema = yup.object().shape({
  StudentId: yup.string().required('Student Name is required'),
  DriverName: yup.string().required('Driver Name is required'),
  DriverPhone: yup
    .string()
    .required('Driver Number is required')
    .matches(/^[0-9]{10}$/, 'Driver Number must be exactly 10 digits'),
  ConductorName: yup.string().required('Conductor Name is required'),
  ConductorPhone: yup
    .string()
    .required('Conductor Number is required')
    .matches(/^[0-9]{10}$/, 'Conductor Number must be exactly 10 digits'),
  BusNo: yup.string().required('Vehicle Name is required'),
});
const TransporationEdit = () => {
  // ================ Get data by Id============
  const { Id } = useParams();

  const fetchData = async () => {
    try {
      if (Id) {
        const TransportationData = await getTransportationById(Id);
        formik.setValues(TransportationData);
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
  // ------------Student DATA-------------------
  const [student, setstudent] = useState([]);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const StudentData = await getAllStudent();
        setstudent(StudentData);
      } catch (error) {
        console.error('Error fetching Student:', error);
      }
    };
    fetchStudent();
  }, []);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      Id: Id,
      SchoolId: '',
      StudentId: '',
      DriverName: '',
      DriverPhone: '',
      ConductorName: '',
      ConductorPhone: '',
      BusNo: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      setIsFormLoading(true);
      try {
        await updateTransportationById(values);
      } catch (error) {
        console.error('Error updating transportation:', error);
      } finally {
        setIsFormLoading(false); // Set loading state to false when submission ends
      }
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/transportation/listing');
  };

  return (
    <div>
      <Breadcrumb pageName="Transporation Edit" />
      {isFormLoading && <FormLoader loading={isFormLoading} />}
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
              <input
                type="hidden"
                name="SchoolId"
                value={formik.values.SchoolId}
              />
              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    StudentId Name <span className="text-danger">*</span>
                  </label>
                  <select
                    name="StudentId"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={formik.handleChange}
                    value={formik.values.StudentId}
                  >
                    {student.map((student) => (
                      <option key={student.Id} value={student.Id}>
                        {student.StudentName}
                      </option>
                    ))}
                  </select>

                  {formik.touched.StudentId && formik.errors.StudentId && (
                    <small className="text-red-500">
                      {formik.errors.StudentId}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Driver Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="DriverName"
                    value={formik.values.DriverName}
                    onChange={formik.handleChange}
                    placeholder="Enter Driver Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.DriverName && formik.errors.DriverName && (
                    <small className="text-red-500">
                      {formik.errors.DriverName}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Driver Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={formik.values.DriverPhone}
                    name="DriverPhone"
                    onChange={formik.handleChange}
                    placeholder="Enter Driver Number"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.DriverPhone && formik.errors.DriverPhone && (
                    <small className="text-red-500">
                      {formik.errors.DriverPhone}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Conductor Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="ConductorName"
                    value={formik.values.ConductorName}
                    onChange={formik.handleChange}
                    placeholder="Enter Conductor Name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.ConductorName &&
                    formik.errors.ConductorName && (
                      <small className="text-red-500">
                        {formik.errors.ConductorName}
                      </small>
                    )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Conductor Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="ConductorPhone"
                    value={formik.values.ConductorPhone}
                    onChange={formik.handleChange}
                    placeholder="Enter Conductor Number"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.ConductorPhone &&
                    formik.errors.ConductorPhone && (
                      <small className="text-red-500">
                        {formik.errors.ConductorPhone}
                      </small>
                    )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Vehicle Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="BusNo"
                    value={formik.values.BusNo}
                    onChange={formik.handleChange}
                    placeholder="Enter Your Vehicle Number"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.BusNo && formik.errors.BusNo && (
                    <small className="text-red-500">
                      {formik.errors.BusNo}
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

export default TransporationEdit;
