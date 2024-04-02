import React, { useEffect } from 'react';
import Breadcrumb from '../../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Logo from './../../../images/logo.jpg';
import { BsChevronDown } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { getVideoById, updateVideoById } from '../../../API/VideoAPI';

const validationSchema = yup.object().shape({
  Title: yup.string().required('Title is required'),
});

const VideoEdit = () => {
  // ================ Get data by Id============
  const { Id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Id) {
          const VideoData = await getVideoById(Id);
          formik.setValues({
            Id: VideoData.Id || '',
            SchoolId: VideoData.SchoolId || '',
            path: VideoData.path || '',
            Title: VideoData.Title || '',
            Video: VideoData.Video || '',
            Hid_Video: VideoData.Hid_Video || '',
            Status: VideoData.Status || '',
          });
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
      Title: '',
      Id: Id,
      SchoolId: '',
      Video: '',
      Hid_Video: '',
      Status: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const formData = new FormData();
        formData.append('Id', values.Id);
        formData.append('SchoolId', values.SchoolId);
        formData.append('Title', values.Title);
        if (values.Video instanceof File) {
          formData.append('Video', values.Video);
        }

        formData.append('Hid_Video', values.Hid_Video);

        formData.append('Status', values.Status);
        await updateVideoById(formData);
      } catch (error) {
        console.error('Error updating slider:', error);
      }
    },
  });
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/video/listing');
  };

  return (
    <div>
      <Breadcrumb pageName="Video Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* Input Fields */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Video Edit
              </h3>
              <p>
                Please fill all detail and Edit Video in your Video directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <input
                type="hidden"
                name="Hid_Video"
                value={formik.values.Hid_Video}
              />
              <div className="grid md:grid-cols-2 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Title"
                    onChange={formik.handleChange}
                    value={formik.values.Title}
                    placeholder="Enter Your Title"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1.5 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {formik.touched.Title && formik.errors.Title && (
                    <small className="text-red-500">
                      {formik.errors.Title}
                    </small>
                  )}
                </div>

                <div>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Video
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      name="Video"
                      onChange={(event) => {
                        formik.setFieldValue(
                          'Video',
                          event.currentTarget.files[0],
                        );
                      }}
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                    {formik.touched.Video && formik.errors.Video && (
                      <small className="text-red-500">
                        {formik.errors.Video}
                      </small>
                    )}
                    <p>Please select an a MP4 file only.</p>
                  </div>
                  <div className="mt-5">
                    <p>Your Exsisting Video File*</p>
                    <div className="grid  gap-2 relative">
                      <div className="relative">
                        <video
                          controls
                          // muted
                          className="w-50 rounded border p-2 h-50  "
                          // autoPlay
                        >
                          <source src={formik.values.Video} type="video/mp4" />
                        </video>
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

export default VideoEdit;
