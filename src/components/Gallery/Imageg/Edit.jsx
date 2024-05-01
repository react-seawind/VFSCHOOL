import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../Breadcrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Logo from './../../../images/logo.jpg';
import { BsChevronDown } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { getPhotoById, updatePhotoById } from '../../../API/PhotoAPI';

const validationSchema = yup.object().shape({
  Title: yup.string().required('Title is required'),
  Image: yup.string().required('Image is required'),
});

const ImageEdit = () => {
  const [imagePreview, setImagePreview] = useState();
  // ================ Get data by Id============
  const { Id } = useParams();
  const fetchData = async () => {
    try {
      if (Id) {
        const PhotoData = await getPhotoById(Id);
        formik.setValues(PhotoData);
        if (PhotoData.Image) {
          setImagePreview(PhotoData.Image); // Update image preview if image exists
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
      Title: '',
      SchoolId: '',
      Id: Id,
      Image: '',
      Hid_Image: '',
      Status: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });
        await updatePhotoById(formData);
        fetchData();
      } catch (error) {
        console.error('Error updating slider:', error);
      }
    },
  });
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/image/listing');
  };

  return (
    <div>
      <Breadcrumb pageName="Image Edit" />

      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* Input Fields */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Division Edit
              </h3>
              <p>
                Please fill all detail and Edit Image in your Image directory
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <input
                type="hidden"
                name="Hid_Image"
                value={formik.values.Hid_Image}
              />
              <div className="grid md:grid-cols-2 gap-5.5 py-3.5 px-5.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Title"
                    value={formik.values.Title}
                    onChange={formik.handleChange}
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
                      Photo
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      name="Image"
                      onChange={(event) => {
                        formik.setFieldValue(
                          'Image',
                          event.currentTarget.files[0],
                        );
                      }}
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                    {formik.touched.Image && formik.errors.Image && (
                      <small className="text-red-500">
                        {formik.errors.Image}
                      </small>
                    )}
                    <p>Please select an a png,jpeg,jpg,gif file only.</p>
                  </div>
                  <div className="mt-5">
                    <p>Your Exsisting Img File*</p>
                    <div className="grid grid-cols-4 gap-2 relative">
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt=""
                          className="rounded border p-2 h-28 w-28  "
                        />
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

export default ImageEdit;
