// import React, { useEffect, useState } from 'react';
// import DataTable from 'react-data-table-component';
// import Breadcrumb from '../Breadcrumb';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { FaChevronDown } from 'react-icons/fa6';
// import { getServicedata } from '../API';

// const TeacherListing = () => {
//   const [service, setservice] = useState([]);
//   const [search, setsearch] = useState('');
//   const [filterdata, setfilterdata] = useState([]);

//   const Navigate = useNavigate();

//   // =============action button===============
//   const [selectedRow, setSelectedRow] = useState(null);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await getServicedata();
//         setservice(result);
//         setfilterdata(result);
//         console.log(result);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const columns = [
//     {
//       name: ' # ',
//       selector: (row) => <h1 className="text-base">{row.Id}</h1>,
//       sortable: true,
//     },
//     {
//       name: 'Title',
//       selector: (row) => <h1 className="text-base">{row.Title}</h1>,
//       sortable: true,
//     },
//     {
//       name: 'SubTitle',
//       selector: (row) => <h1 className="text-base">{row.SubTitle}</h1>,
//       sortable: true,
//     },
//     {
//       name: 'Image',
//       selector: (row) => (
//         <img className="p-1 overflow-hidden h-50 w-50 border" src={row.Image} />
//       ),
//       sortable: true,
//     },
//     {
//       name: 'Status',
//       selector: (row) => (
//         <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
//           Active
//         </span>
//       ),
//       sortable: true,
//     },
//     {
//       name: 'Action',
//       cell: (row) => (
//         <div>
//           <div className="bg-red-600 text-white p-3 pl-5 w-26 flex relative">
//             <button>Actions</button>
//             <button
//               onClick={() => {
//                 setSelectedRow((prevRow) => (prevRow === row ? null : row));
//               }}
//             >
//               <FaChevronDown className=" my-auto ml-4 " />
//             </button>
//           </div>

//           {selectedRow && selectedRow.Id === row.Id && (
//             <div className="action-buttons  absolute z-99">
//               <button
//                 className="text-black bg-white border  p-2 w-26"
//                 onClick={() => {
//                   setSelectedRow(null);
//                   Navigate('/teacher/edit');
//                 }}
//               >
//                 Edit
//               </button>
//               <br />
//               <button
//                 className=" text-black bg-white border  p-2 w-26"
//                 onClick={() => {
//                   alert(`Deleting ${row.Title}`);
//                   setSelectedRow(null);
//                 }}
//               >
//                 Delete
//               </button>
//             </div>
//           )}
//         </div>
//       ),
//     },
//   ];

//   useEffect(() => {
//     const mySearch = service.filter(
//       (item) =>
//         item.Title && item.Title.toLowerCase().match(search.toLowerCase()),
//     );
//     setfilterdata(mySearch);
//   }, [search]);
//   return (
//     <div>
//       <Breadcrumb pageName="teacher Listing" />
//       <div className="grid grid-cols-1 gap-9 ">
//         <div className="flex flex-col gap-9 ">
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//               <DataTable
//                 className="text-2xl"
//                 columns={columns}
//                 data={filterdata}
//                 pagination
//                 highlightOnHover
//                 actions={
//                   <Link
//                     to="/teacher/add"
//                     className="bg-blue-500 text-white p-3 px-10 text-sm"
//                   >
//                     Add
//                   </Link>
//                 }
//                 subHeader
//                 subHeaderComponent={
//                   <input
//                     type="text"
//                     placeholder="search"
//                     className="text-start me-auto -mt-25 border-2 py-3 px-5"
//                     value={search}
//                     onChange={(e) => {
//                       setsearch(e.target.value);
//                     }}
//                   />
//                 }
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherListing;
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa6';
import Logo from '../../images/logo.jpg';
import { MdClose } from 'react-icons/md';
import Multiselect from 'multiselect-react-dropdown';
import Breadcrumb from '../Breadcrumb';

const TeacherListing = () => {
  const data = [
    {
      Id: '1',
      Title: 'school 1',
      SubTitle: 'school 1',
      Image: Logo,
      Status: 'Avtive',
    },
    {
      Id: '2',
      Title: 'school 2',
      SubTitle: 'school 2',
      Image: Logo,
      Status: 'Avtive',
    },
    {
      Id: '3',
      Title: 'school 3',
      SubTitle: 'school 3',
      Image: Logo,
      Status: 'Avtive',
    },
  ];

  const [service, setservice] = useState(data);
  const [search, setsearch] = useState('');
  const [filterdata, setfilterdata] = useState(data);

  const Navigate = useNavigate();

  // =============action button===============
  const [selectedRow, setSelectedRow] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getServicedata();
        setservice(result);
        setfilterdata(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      name: ' # ',
      selector: (row) => <h1 className="text-base">{row.Id}</h1>,
      sortable: true,
    },
    {
      name: 'Title',
      selector: (row) => <h1 className="text-base">{row.Title}</h1>,
      sortable: true,
    },
    {
      name: 'SubTitle',
      selector: (row) => <h1 className="text-base">{row.SubTitle}</h1>,
      sortable: true,
    },
    {
      name: 'Image',
      selector: (row) => (
        <img
          className="p-1 overflow-hidden h-20 w-20 lg:h-40 lg:w-40 border"
          src={row.Image}
        />
      ),
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => (
        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
          Active
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Assign',
      cell: (row) => (
        <div>
          <div className=" text-white">
            <Link
              to={'/teacher/view'}
              className="w-26 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Assign Standard
            </Link>
          </div>
        </div>
      ),
    },
    {
      name: 'Action',
      cell: (row) => (
        <div>
          <div className="bg-red-600 text-white p-3 pl-5 w-26 flex relative">
            <button>Actions</button>
            <button
              onClick={() => {
                setSelectedRow((prevRow) => (prevRow === row ? null : row));
              }}
            >
              <FaChevronDown className=" my-auto ml-4 " />
            </button>
          </div>

          {selectedRow && selectedRow.Id === row.Id && (
            <div className="action-buttons  absolute z-99">
              <button
                className="text-black bg-white border  p-2 w-26"
                onClick={() => {
                  setSelectedRow(null);
                  Navigate('/teacher/edit');
                }}
              >
                Edit
              </button>

              <br />
              <button
                className=" text-black bg-white border  p-2 w-26"
                onClick={() => {
                  alert(`Deleting ${row.Title}`);
                  setSelectedRow(null);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  useEffect(() => {
    const mySearch = service.filter(
      (item) =>
        item.Title && item.Title.toLowerCase().match(search.toLowerCase()),
    );
    setfilterdata(mySearch);
  }, [search]);
  return (
    <div>
      <Breadcrumb pageName="Teacher Listing" />
      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9 ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <DataTable
                className="text-2xl"
                columns={columns}
                data={filterdata}
                pagination
                highlightOnHover
                actions={
                  <Link
                    to="/teacher/add"
                    className="bg-blue-500 text-white p-3 px-10 text-sm"
                  >
                    Add
                  </Link>
                }
                subHeader
                subHeaderComponent={
                  <input
                    type="text"
                    placeholder="search"
                    className="text-start me-auto -mt-25 border-2 py-3 px-5"
                    value={search}
                    onChange={(e) => {
                      setsearch(e.target.value);
                    }}
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherListing;
