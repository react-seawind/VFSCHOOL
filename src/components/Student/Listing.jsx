import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa6';
import { deleteStudent, getAllStudent } from '../../API/StudentApi';
import { format } from 'date-fns';
import { FaLock, FaPencilAlt, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import ClipLoader from 'react-spinners/BounceLoader';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import Breadcrumb from '../Breadcrumb';

const StudentListing = () => {
  const [photo, setphoto] = useState([]);
  const [search, setsearch] = useState('');
  const [filterData, setfilterData] = useState([]);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // =============action button===============
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllStudent();
        setphoto(result);
        setfilterData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // -----------------------filter--------------------
  useEffect(() => {
    const mySearch = photo.filter((item) =>
      item.StudentName && item.StudentName
        ? item.StudentName.toLowerCase().includes(search.toLowerCase())
        : false,
    );
    setfilterData(mySearch);
  }, [search, photo]);

  // -------------------delete photo------------------
  const handleDelete = async (row) => {
    try {
      await deleteStudent(row.Id);
      setphoto((prevphoto) => prevphoto.filter((item) => item.Id !== row.Id));
      setfilterData((prevFilterData) =>
        prevFilterData.filter((item) => item.Id !== row.Id),
      );
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const actionTemplate = (rowData) => {
    return (
      <div>
        <Button
          icon={<FaPencilAlt />}
          className="border border-blue-600 text-blue-600 mr-2 rounded-full py-2.5 my-1"
          onClick={() => {
            navigate(`/student/edit/${rowData.Id}`);
          }}
          title="Edit"
        />

        <Button
          icon={<FaTrash />}
          className="border border-red-600 text-red-600 mr-2 rounded-full py-2.5 my-1"
          title="Delete"
          onClick={() => {
            Swal.fire({
              title: 'Are you sure?',
              text: `You won't be able to revert this! Are you sure you want to delete ${rowData.Title}?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!',
            }).then((result) => {
              if (result.isConfirmed) {
                handleDelete(rowData);
                Swal.fire(
                  'Deleted!',
                  `${rowData.Title} has been deleted.`,
                  'success',
                );
              }
            });
          }}
        />
        <Button
          icon={<FaLock />}
          className="border border-green-600 text-green-600 rounded-full py-2.5 my-1"
          onClick={() => {
            navigate(`/student/changepassword/${rowData.Id}`);
          }}
          title="Change Password"
        />
      </div>
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={rowData.Photo}
        alt={rowData.Photo}
        className="border-round mx-auto"
        style={{ width: '84px' }}
      />
    );
  };

  return (
    <div>
      <Breadcrumb pageName="Student Listing" />
      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9 ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark card">
              {loading ? (
                <div className="flex justify-center items-center py-60">
                  <ClipLoader color={'#00afee'} loading={loading} size={45} />
                </div>
              ) : (
                <DataTable
                  value={filterData}
                  tableStyle={{
                    minWidth: '50rem',
                    border: '1px solid #e0e0e0',
                  }}
                  paginator
                  rows={10}
                  rowsPerPageOptions={[5, 10, 25]}
                  emptyMessage="No Data found"
                  globalFilter={search}
                  header={
                    <div className="flex justify-between pb-5 p-ai-center">
                      <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText
                          type="text"
                          className="text-start me-auto text-sm border-2 py-2 mt-2 pl-2 md:pr-20 pr-5"
                          onInput={(e) => setsearch(e.target.value)}
                          placeholder="Search"
                        />
                      </span>
                      <Link
                        to="/student/add"
                        className="bg-blue-500 text-white p-3 px-10 text-sm"
                      >
                        Add
                      </Link>
                    </div>
                  }
                >
                  <Column
                    header="#"
                    className="border border-stroke"
                    body={(rowData, { rowIndex }) => rowIndex + 1}
                  />
                  <Column
                    field="StudentName"
                    header="StudentName"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="StudentEmail"
                    header="StudentEmail"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="StudentPhone"
                    header="StudentPhone"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="StandardName"
                    header="Standard Name"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="DivisionName"
                    header="Division Name"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="TeacherName"
                    header="Teacher Name"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="image"
                    header="Image"
                    className="border border-stroke"
                    body={imageBodyTemplate}
                  ></Column>
                  <Column
                    field="Status"
                    header="Status"
                    className="border border-stroke"
                    body={(rowData) => (
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          rowData.Status === 1
                            ? 'bg-green-600 text-white'
                            : 'bg-red-600 text-white'
                        }`}
                      >
                        {rowData.Status === 1 ? 'Active' : 'Inactive'}
                      </span>
                    )}
                  />
                  <Column
                    field="EntDt"
                    header="Entry Date"
                    className="border border-stroke"
                    body={(rowData) =>
                      format(new Date(rowData.EntDt), 'dd/MM/yyyy hh:mm a')
                    }
                  />
                  <Column
                    header="Action"
                    className="border border-stroke"
                    body={actionTemplate}
                  />
                </DataTable>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentListing;
