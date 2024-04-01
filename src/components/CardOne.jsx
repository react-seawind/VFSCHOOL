import React from 'react';
import { BiBook } from 'react-icons/bi';
import { FaSchool } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CardOne = ({ divdata }) => {
  return (
    <Link to={'/div/listing'}>
      <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          <BiBook className="fill-primary dark:fill-white text-2xl" />
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <h4 className="text-title-md font-bold text-black dark:text-white">
              {divdata.length}
            </h4>
            <span className="text-sm font-medium">Total Division</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardOne;
