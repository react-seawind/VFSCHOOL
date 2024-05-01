import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Config from '../../API/Config';
import { AddReportcard } from '../../API/ReportcardApi';
import { getAllStudent } from '../../API/StudentApi';

const validationSchema = yup.object().shape({
  Title: yup.string().required('Title is required'),
  StudentId: yup.string().required('Student Name is required'),
  PDF: yup.string().required('Please Upload PDF file'),
});
const ReportCardAdd = () => {
  const Id = Config.getId();

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
  const formik = useFormik({
    initialValues: {
      SchoolId: Id,
      Title: '',
      StudentId: '',
      PDF: '',
      Status: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });
        await AddReportcard(formData);
        navigate('/reportcard/listing');
      } catch (error) {
        console.error('Error adding Photo:', error);
      }
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/reportcard/listing');
  };

  return (
    <div>
      <Breadcrumb pageName="Report Card Add " />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Report Card Add
              </h3>
              <p>
                Please fill all detail and add new ReportCard in your ReportCard
                directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Title"
                    onChange={formik.handleChange}
                    placeholder="Enter Title"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Title && formik.errors.Title && (
                    <small className="text-red-500">
                      {formik.errors.Title}
                    </small>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Select Student <span className="text-danger">*</span>
                  </label>

                  <select
                    name="StudentId"
                    onChange={formik.handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option>Select Student</option>
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
                    Upload Report card
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="PDF"
                    onChange={(event) => {
                      formik.setFieldValue('PDF', event.currentTarget.files[0]);
                    }}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {formik.touched.PDF && formik.errors.PDF && (
                    <small className="text-red-500">{formik.errors.PDF}</small>
                  )}
                  <p>Please select an a pdf file only.</p>
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

export default ReportCardAdd;
