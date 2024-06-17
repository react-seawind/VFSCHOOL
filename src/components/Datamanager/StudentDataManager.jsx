import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { deleteStudent, getAllStudent } from '../../API/StudentApi';
import { format } from 'date-fns';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import ClipLoader from 'react-spinners/BounceLoader';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import Breadcrumb from '../Breadcrumb';
import { CSVLink } from 'react-csv';

const StudentDataManager = () => {
  const [photo, setphoto] = useState([]);
  const [search, setsearch] = useState('');
  const [filterData, setfilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [csvData, setCsvData] = useState([]);
  const navigate = useNavigate();
  const dt = useRef(null);

  // =============action button===============
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllStudent();
        setphoto(result);
        setfilterData(result);
        setCsvData(
          result.map((item) => ({
            StudentName: item.StudentName,
            StudentEmail: item.StudentEmail,
            StudentPhone: item.StudentPhone,
            ParentName: item.ParentName,
            ParentEmail: item.ParentEmail,
            ParentPhone: item.ParentPhone,
            Country: item.Country,
            State: item.State,
            City: item.City,
            Area: item.Area,
            Pincode: item.Pincode,
            TAddress: item.TAddress,
            PAddress: item.PAddress,
            Photo: item.Photo,
            AddressProof: item.AddressProof,
            IdProof: item.IdProof,
            StandardId: item.StandardId,
            DivisionId: item.DivisionId,
            TeacherId: item.TeacherId,
            Status: item.Status,
          })),
        );
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
          icon={<FaTrash />}
          className="border border-red-600 text-red-600 rounded-full py-2.5"
          onClick={() => {
            Swal.fire({
              title: 'Are you sure?',
              text: `You won't be able to revert this! Are you sure you want to delete ${rowData.StudentName}?`,
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
                  `${rowData.StudentName} has been deleted.`,
                  'success',
                );
              }
            });
          }}
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
      <Breadcrumb pageName="Student Report" />
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
                  ref={dt}
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
                      <CSVLink
                        data={csvData}
                        headers={[
                          { label: 'Student Name', key: 'StudentName' },
                          { label: 'Student Email', key: 'StudentEmail' },
                          { label: 'Student Phone', key: 'StudentPhone' },
                          { label: 'Parent Name', key: 'ParentName' },
                          { label: 'Parent Email', key: 'ParentEmail' },
                          { label: 'Parent Phone', key: 'ParentPhone' },
                          { label: 'Country', key: 'Country' },
                          { label: 'State', key: 'State' },
                          { label: 'City', key: 'City' },
                          { label: 'Area', key: 'Area' },
                          { label: 'Pincode', key: 'Pincode' },
                          { label: 'TAddress', key: 'TAddress' },
                          { label: 'PAddress', key: 'PAddress' },
                          { label: 'Photo', key: 'Photo' },
                          { label: 'Address Proof', key: 'AddressProof' },
                          { label: 'Id Proof', key: 'IdProof' },
                          { label: 'Standard Id', key: 'StandardId' },
                          { label: 'Division Id', key: 'DivisionId' },
                          { label: 'Teacher Id', key: 'TeacherId' },
                          { label: 'Status', key: 'Status' },
                        ]}
                        filename={'students.csv'}
                        className="bg-blue-500 text-white p-3 px-10 text-sm"
                      >
                        Export
                      </CSVLink>
                    </div>
                  }
                >
                  <Column
                    field="Id"
                    header="#"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="StudentName"
                    header="Student Name"
                    sortable
                    className="border border-stroke"
                  />
                  <Column
                    field="image"
                    header="Image"
                    className="border border-stroke"
                    body={imageBodyTemplate}
                  />
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
                      format(new Date(rowData.EntDt), 'MM/dd/yyyy hh:mm a')
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

export default StudentDataManager;
