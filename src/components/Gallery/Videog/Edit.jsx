import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { getVideoById, updateVideoById } from '../../../API/VideoAPI';
import FormLoader from '../../../common/FormLoader';

const validationSchema = yup.object().shape({
  Title: yup.string().required('Title is required'),
  Video: yup.mixed().required('Video is required'),
});

const VideoEdit = () => {
  const { Id } = useParams();
  const [videoPreview, setVideoPreview] = useState(null);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      if (Id) {
        const VideoData = await getVideoById(Id);
        formik.setValues(VideoData);
        if (VideoData.Video) {
          setVideoPreview(VideoData.Video);
        }
      } else {
        console.error('Error: No ID provided');
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
      Title: '',
      Id: Id,
      SchoolId: '',
      Video: '',
      Hid_Video: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      setIsFormLoading(true);
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });
        await updateVideoById(formData);
        navigate('/video/listing');
        fetchData();
      } catch (error) {
        console.error('Error updating video:', error);
      } finally {
        setIsFormLoading(false);
      }
    },
  });

  const handleGoBack = () => {
    navigate('/video/listing');
  };

  const handleVideoChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue('Video', file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <Breadcrumb pageName="Video Edit" />
      {isFormLoading && <FormLoader loading={isFormLoading} />}
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
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
                      <span className="text-danger">* (Below 10 MB)</span>
                    </label>
                    <input
                      type="file"
                      name="Video"
                      onChange={handleVideoChange}
                      accept="video/mp4"
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                    {formik.touched.Video && formik.errors.Video && (
                      <small className="text-red-500">
                        {formik.errors.Video}
                      </small>
                    )}
                    <p>Please select a MP4 file only.</p>
                  </div>
                  <div className="mt-5">
                    <p>Your Existing Video File*</p>
                    <div className="grid gap-2 relative">
                      <div className="relative">
                        {videoPreview && (
                          <video
                            controls
                            muted
                            className="w-50 rounded border p-2 h-50"
                            autoPlay
                          >
                            <source src={videoPreview} type="video/mp4" />
                          </video>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-5.5 py-3.5 px-5.5">
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

export default VideoEdit;
