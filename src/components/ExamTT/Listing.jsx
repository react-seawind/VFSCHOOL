import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumb';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { deleteExamTT, getAllExamTT } from '../../API/ExamtimetableApi';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import ClipLoader from 'react-spinners/BounceLoader';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';

const ExamTTListing = () => {
  const [examtt, setexamtt] = useState([]);
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  // =============action button===============
  const [selectedRow, setSelectedRow] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllExamTT();
        setexamtt(result);
        setFilterData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // -------------------delete examtt------------------
  const handleDelete = async (row) => {
    try {
      await deleteExamTT(row.Id);
      setexamtt((prevexamtt) =>
        prevexamtt.filter((item) => item.Id !== row.Id),
      );
      setFilterData((prevFilterData) =>
        prevFilterData.filter((item) => item.Id !== row.Id),
      );
    } catch (error) {
      console.error('Error deleting examtt:', error);
    }
  };

  useEffect(() => {
    const mySearch = examtt.filter(
      (item) =>
        item.Title && item.Title.toLowerCase().includes(search.toLowerCase()),
    );
    setFilterData(mySearch);
  }, [search]);

  const imageBodyTemplate = (rowData) => {
    return (
      <Link to={rowData.PDF} target="_blank">
        <button
          type="button"
          className="mt-2 bg-blue-600 p-2 px-5 rounded border  text-white"
        >
          View
        </button>
      </Link>
    );
  };

  const actionTemplate = (rowData) => {
    return (
      <div>
        <Button
          icon={<FaPencilAlt />}
          className="border border-blue-600 text-blue-600 mr-2 rounded-full py-2.5 my-1"
          onClick={() => {
            navigate(`/examtimetable/edit/${rowData.Id}`);
          }}
        />
        <Button
          icon={<FaTrash />}
          className="border border-red-600 text-red-600 rounded-full py-2.5 my-1"
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
      </div>
    );
  };
  return (
    <div>
      <Breadcrumb pageName="Exam Timetable Listing" />
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
                          onInput={(e) => setSearch(e.target.value)}
                          placeholder="Search"
                        />
                      </span>
                      <Link
                        to="/examtimetable/add"
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
                    field="Title"
                    header="Title"
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
                    header="Time-Table"
                    className="border border-stroke"
                    body={imageBodyTemplate}
                  ></Column>
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

export default ExamTTListing;
