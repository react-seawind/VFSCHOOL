import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Config from '../../API/Config';
import { getAllDivision } from '../../API/DivisionApi';
import { AddClassTT } from '../../API/ClasstimetableApi';
import { getAllStandard } from '../../API/StandardApi';
import { AddExamTT } from '../../API/ExamtimetableApi';
import { getAllSubject } from '../../API/SubjectAPI';
import { AddExamPaper } from '../../API/ExampaperApi';
import FormLoader from '../../common/FormLoader';

const validationSchema = yup.object().shape({
  Title: yup.string().required('Title is required'),
  StandardId: yup.string().required('Standard is required'),
  DivisionId: yup.string().required('Division is required'),
  SubjectId: yup.string().required('Subject is required'),
  PDF: yup.string().required('Paper is required'),
});
const PaperAdd = () => {
  const Id = Config.getId();

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

  useEffect(() => {
    const fetchDivision = async () => {
      try {
        const DivisionData = await getAllDivision();
        setdiv(DivisionData);
      } catch (error) {
        console.error('Error fetching Division:', error);
      }
    };
    fetchDivision();
  }, []);
  // ------------subject DATA-------------------
  const [subject, setsubject] = useState([]);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const SubjectData = await getAllSubject();
        setsubject(SubjectData);
      } catch (error) {
        console.error('Error fetching Subject:', error);
      }
    };
    fetchSubject();
  }, []);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      SchoolId: Id,
      StandardId: '',
      DivisionId: '',
      SubjectId: '',
      Title: '',
      PDF: '',
      Status: '1',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsFormLoading(true);
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });
        await AddExamPaper(formData);
        navigate('/paper/listing');
      } catch (error) {
        console.error('Error adding Photo:', error);
      } finally {
        setIsFormLoading(false); // Set loading state to false when submission ends
      }
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/paper/listing');
  };
  return (
    <div>
      {isFormLoading && <FormLoader loading={isFormLoading} />}
      <Breadcrumb pageName="Exam Paper Add " />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Exam Paper Add
              </h3>
              <p>
                Please fill all detail and add new Exam Paper in your Exam Paper
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
                    value={formik.values.Title}
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
                    Select Standard <span className="text-danger">*</span>
                  </label>

                  <select
                    name="StandardId"
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
                    onChange={formik.handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option>Select Division</option>
                    {div.map((div) => (
                      <option key={div.Id} value={div.Id}>
                        {div.Title}
                      </option>
                    ))}
                  </select>

                  {formik.touched.DivisionId && formik.errors.DivisionId && (
                    <small className="text-red-500">
                      {formik.errors.DivisionId}
                    </small>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Select Subject <span className="text-danger">*</span>
                  </label>

                  <select
                    name="SubjectId"
                    onChange={formik.handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option>Select Subject</option>
                    {subject.map((subject) => (
                      <option key={subject.Id} value={subject.Id}>
                        {subject.Title}
                      </option>
                    ))}
                  </select>

                  {formik.touched.SubjectId && formik.errors.SubjectId && (
                    <small className="text-red-500">
                      {formik.errors.SubjectId}
                    </small>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Upload Syllabus
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

export default PaperAdd;
