import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAllStudent } from '../../API/StudentApi';
import {
  getReportcardById,
  updateReportcardById,
} from '../../API/ReportcardApi';
import FormLoader from '../../common/FormLoader';

const validationSchema = yup.object().shape({
  Title: yup.string().required('Title is required'),
  StudentId: yup.string().required('Student Name is required'),
  PDF: yup.string().required('Please Upload PDF file'),
});
const ReportCardEdit = () => {
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

  // ================ Get data by Id============
  const { Id } = useParams();
  const [imagePreview, setImagePreview] = useState();
  const fetchData = async () => {
    try {
      if (Id) {
        const ReportcardData = await getReportcardById(Id);
        formik.setValues(ReportcardData);
        if (ReportcardData.PDF) {
          setImagePreview(ReportcardData.PDF); // Update Photo preview if Photo exists
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
  const [isFormLoading, setIsFormLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      Id: Id,
      SchoolId: '',
      Title: '',
      StudentId: '',
      PDF: '',
      Hid_PDF: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsFormLoading(true);
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });
        await updateReportcardById(formData);
        fetchData();
      } catch (error) {
        console.error('Error adding Photo:', error);
      } finally {
        setIsFormLoading(false); // Set loading state to false when submission ends
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
    navigate('/reportcard/listing');
  };

  return (
    <div>
      <Breadcrumb pageName="Report Card Edit" />
      {isFormLoading && <FormLoader loading={isFormLoading} />}
      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Report Card Edit
              </h3>
              <p>
                Please fill all detail and Edit new ReportCard in your
                ReportCard directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <input
                type="hidden"
                name="Hid_PDF"
                value={formik.values.Hid_PDF}
              />

              <div className="grid md:grid-cols-2 grid-cols-1 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={formik.values.Title}
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
                    value={formik.values.StudentId}
                    onChange={formik.handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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

                <div>
                  <p>Your Exsisting File*</p>
                  <div className="grid   gap-2 relative">
                    <div className="relative">
                      {imagePreview ? (
                        getFileExtension(imagePreview) === 'pdf' ? (
                          <Link to={imagePreview} target="_blank">
                            <button
                              type="button"
                              className="mt-2 bg-blue-600 p-2 rounded border  text-white"
                            >
                              Download Report card
                            </button>
                          </Link>
                        ) : (
                          <img
                            src={imagePreview}
                            alt=""
                            className="rounded border p-2 h-28 w-28"
                          />
                        )
                      ) : (
                        <p>No Report card available</p>
                      )}
                    </div>
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

export default ReportCardEdit;
