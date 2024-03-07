import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../images/logo.jpg';
import SidebarLinkGroup from './SidebarLinkGroup';
import {
  MdDashboard,
  MdEmojiEvents,
  MdEmojiTransportation,
  MdFastfood,
  MdMenuBook,
  MdOutlineHolidayVillage,
} from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';
import { TbFileReport } from 'react-icons/tb';
import { CiViewBoard, CiViewTimeline } from 'react-icons/ci';
import { IoIosContact, IoMdAdd } from 'react-icons/io';
import { AiOutlineApartment } from 'react-icons/ai';
import {
  FaBook,
  FaBookOpenReader,
  FaChevronDown,
  FaChild,
  FaDivide,
  FaImage,
  FaMoneyBill,
  FaRegNewspaper,
  FaSchool,
  FaUser,
  FaVideo,
} from 'react-icons/fa6';

import {
  FaAddressCard,
  FaArrowLeft,
  FaBlog,
  FaBookOpen,
  FaClipboardList,
  FaDatabase,
  FaEdit,
  FaHome,
  FaRegUser,
  FaSitemap,
  FaUserCircle,
} from 'react-icons/fa';
import { BsChatQuoteFill } from 'react-icons/bs';

const Sidebar = ({ sidebarOpen, setSidebarOpen }, SidebarProps) => {
  const location = useLocation();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebarOpen || !sidebar.current || !trigger.current) return;
      if (sidebar.current.contains(target) || trigger.current.contains(target))
        return;
      setSidebarOpen(false);
    };

    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (sidebarOpen && keyCode === 27) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center lg:justify-center   gap-2 px-6 py-2.5 lg:py-4.5">
        <NavLink to="/dashboard">
          <img
            src={Logo}
            alt="Logo"
            className="w-15 bg-white p-2 rounded lg:w-40 lg:mx-auto"
          />
        </NavLink>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden ms-auto text-1xl text-white"
        >
          <FaArrowLeft />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* ===============DASHBOARD============== */}
              <li>
                <NavLink
                  to="/dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                >
                  <MdDashboard />
                  Dashboard
                </NavLink>
              </li>
              {/* ===============USER MANAGER============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaUser />
                        User Manager
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <SidebarLinkGroup>
                              {(handleClick, open) => {
                                return (
                                  <React.Fragment>
                                    <NavLink
                                      to="#"
                                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4  `}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        sidebarExpanded
                                          ? handleClick()
                                          : setSidebarExpanded(true);
                                      }}
                                    >
                                      <FaUserCircle />
                                      User
                                      <span
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                          open && 'rotate-180'
                                        }`}
                                      >
                                        <FaChevronDown />
                                      </span>
                                    </NavLink>
                                    {/* <!-- Dropdown Menu Start --> */}
                                    <div
                                      className={`translate transform overflow-hidden ${
                                        !open && 'hidden'
                                      }`}
                                    >
                                      <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                                        <li>
                                          <NavLink
                                            to="/user/listing"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                          >
                                            <FaClipboardList />
                                            Listing
                                          </NavLink>
                                        </li>
                                        <li>
                                          <NavLink
                                            to="/user/add"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                          >
                                            <IoMdAdd />
                                            Add
                                          </NavLink>
                                        </li>
                                      </ul>
                                    </div>
                                    {/* <!-- Dropdown Menu End --> */}
                                  </React.Fragment>
                                );
                              }}
                            </SidebarLinkGroup>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* ===============Standard MANAGER============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaChild />
                        Standard Manager
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <SidebarLinkGroup>
                              {(handleClick, open) => {
                                return (
                                  <React.Fragment>
                                    <NavLink
                                      to="#"
                                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4  `}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        sidebarExpanded
                                          ? handleClick()
                                          : setSidebarExpanded(true);
                                      }}
                                    >
                                      <FaChild />
                                      Standard
                                      <span
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                          open && 'rotate-180'
                                        }`}
                                      >
                                        <FaChevronDown />
                                      </span>
                                    </NavLink>
                                    {/* <!-- Dropdown Menu Start --> */}
                                    <div
                                      className={`translate transform overflow-hidden ${
                                        !open && 'hidden'
                                      }`}
                                    >
                                      <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                                        <li>
                                          <NavLink
                                            to="/std/listing"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                          >
                                            <FaClipboardList />
                                            Listing
                                          </NavLink>
                                        </li>
                                        <li>
                                          <NavLink
                                            to="/std/add"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                          >
                                            <IoMdAdd />
                                            Add
                                          </NavLink>
                                        </li>
                                      </ul>
                                    </div>
                                    {/* <!-- Dropdown Menu End --> */}
                                  </React.Fragment>
                                );
                              }}
                            </SidebarLinkGroup>
                          </li>
                        </ul>
                      </div>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <SidebarLinkGroup>
                              {(handleClick, open) => {
                                return (
                                  <React.Fragment>
                                    <NavLink
                                      to="#"
                                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        sidebarExpanded
                                          ? handleClick()
                                          : setSidebarExpanded(true);
                                      }}
                                    >
                                      <AiOutlineApartment />
                                      Div
                                      <span
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                          open && 'rotate-180'
                                        }`}
                                      >
                                        <FaChevronDown />
                                      </span>
                                    </NavLink>
                                    {/* <!-- Dropdown Menu Start --> */}
                                    <div
                                      className={`translate transform overflow-hidden ${
                                        !open && 'hidden'
                                      }`}
                                    >
                                      <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                                        <li>
                                          <NavLink
                                            to="/div/listing"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                          >
                                            <FaClipboardList />
                                            Listing
                                          </NavLink>
                                        </li>
                                        <li>
                                          <NavLink
                                            to="/div/add"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                          >
                                            <FaEdit />
                                            Add
                                          </NavLink>
                                        </li>
                                      </ul>
                                    </div>
                                    {/* <!-- Dropdown Menu End --> */}
                                  </React.Fragment>
                                );
                              }}
                            </SidebarLinkGroup>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* ===============Gallery MANAGER============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaImage />
                        Gallery Manager
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <SidebarLinkGroup>
                              {(handleClick, open) => {
                                return (
                                  <React.Fragment>
                                    <NavLink
                                      to="#"
                                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4  `}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        sidebarExpanded
                                          ? handleClick()
                                          : setSidebarExpanded(true);
                                      }}
                                    >
                                      <FaImage />
                                      Image Gallery
                                      <span
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                          open && 'rotate-180'
                                        }`}
                                      >
                                        <FaChevronDown />
                                      </span>
                                    </NavLink>
                                    {/* <!-- Dropdown Menu Start --> */}
                                    <div
                                      className={`translate transform overflow-hidden ${
                                        !open && 'hidden'
                                      }`}
                                    >
                                      <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                                        <li>
                                          <NavLink
                                            to="/image/listing"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                          >
                                            <FaClipboardList />
                                            Listing
                                          </NavLink>
                                        </li>
                                        <li>
                                          <NavLink
                                            to="/image/add"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                          >
                                            <IoMdAdd />
                                            Add
                                          </NavLink>
                                        </li>
                                      </ul>
                                    </div>
                                    {/* <!-- Dropdown Menu End --> */}
                                  </React.Fragment>
                                );
                              }}
                            </SidebarLinkGroup>
                          </li>
                        </ul>
                      </div>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <SidebarLinkGroup>
                              {(handleClick, open) => {
                                return (
                                  <React.Fragment>
                                    <NavLink
                                      to="#"
                                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        sidebarExpanded
                                          ? handleClick()
                                          : setSidebarExpanded(true);
                                      }}
                                    >
                                      <FaVideo />
                                      Video Gallery
                                      <span
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                          open && 'rotate-180'
                                        }`}
                                      >
                                        <FaChevronDown />
                                      </span>
                                    </NavLink>
                                    {/* <!-- Dropdown Menu Start --> */}
                                    <div
                                      className={`translate transform overflow-hidden ${
                                        !open && 'hidden'
                                      }`}
                                    >
                                      <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                                        <li>
                                          <NavLink
                                            to="/video/listing"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                          >
                                            <FaClipboardList />
                                            Listing
                                          </NavLink>
                                        </li>
                                        <li>
                                          <NavLink
                                            to="/video/add"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                          >
                                            <FaEdit />
                                            Add
                                          </NavLink>
                                        </li>
                                      </ul>
                                    </div>
                                    {/* <!-- Dropdown Menu End --> */}
                                  </React.Fragment>
                                );
                              }}
                            </SidebarLinkGroup>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* ===============Subject Manager============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaBook />
                        Subject Manager
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                              <li>
                                <NavLink
                                  to="/subject/listing"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <FaClipboardList />
                                  Listing
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/subject/add"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <IoMdAdd />
                                  Add
                                </NavLink>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* ===============Teacher Manager============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaUser />
                        Teacher Manager
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                              <li>
                                <NavLink
                                  to="/teacher/listing"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <FaClipboardList />
                                  Listing
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/teacher/add"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <IoMdAdd />
                                  Add
                                </NavLink>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* ===============student Manager============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaUser />
                        Student Manager
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                              <li>
                                <NavLink
                                  to="/student/listing"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <FaClipboardList />
                                  Listing
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/student/add"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <IoMdAdd />
                                  Add
                                </NavLink>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* ===============Meal Manager============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <MdFastfood />
                        Meal Manager
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                              <li>
                                <NavLink
                                  to="/meal/listing"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <FaClipboardList />
                                  Listing
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/meal/add"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <IoMdAdd />
                                  Add
                                </NavLink>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* ===============syllabus Manager============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaBookOpen />
                        Syllabus Manager
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                              <li>
                                <NavLink
                                  to="/syllabus/listing"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <FaClipboardList />
                                  Listing
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/syllabus/add"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <IoMdAdd />
                                  Add
                                </NavLink>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* ===============classtimetable Manager============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <MdMenuBook />
                        Class Timetable
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                              <li>
                                <NavLink
                                  to="/classtimetable/listing"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <FaClipboardList />
                                  Listing
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/classtimetable/add"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <IoMdAdd />
                                  Add
                                </NavLink>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* ===============holiday Manager============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <MdOutlineHolidayVillage />
                        Holiday Manager
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                              <li>
                                <NavLink
                                  to="/holiday/listing"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <FaClipboardList />
                                  Listing
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/holiday/add"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <IoMdAdd />
                                  Add
                                </NavLink>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* ===============Transportation Manager============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <MdEmojiTransportation />
                        Transportation
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                              <li>
                                <NavLink
                                  to="/transportation/listing"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <FaClipboardList />
                                  Listing
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/transportation/add"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <IoMdAdd />
                                  Add
                                </NavLink>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* ===============ExamtimeTable Manager============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <CiViewTimeline />
                        Exam Time Table
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                              <li>
                                <NavLink
                                  to="/examtimetable/listing"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <FaClipboardList />
                                  Listing
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/examtimetable/add"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <IoMdAdd />
                                  Add
                                </NavLink>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* ===============Paper Manager============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaRegNewspaper />
                        Paper Manager
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                              <li>
                                <NavLink
                                  to="/paper/listing"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <FaClipboardList />
                                  Listing
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/paper/add"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <IoMdAdd />
                                  Add
                                </NavLink>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* ===============reportcard============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <TbFileReport />
                        Report Card
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                              <li>
                                <NavLink
                                  to="/reportcard/listing"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <FaClipboardList />
                                  Listing
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/reportcard/add"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <IoMdAdd />
                                  Add
                                </NavLink>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* ===============NoticeCircular============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <CiViewBoard />
                        Notice/Circular
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                              <li>
                                <NavLink
                                  to="/notice/listing"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <FaClipboardList />
                                  Listing
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/notice/add"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <IoMdAdd />
                                  Add
                                </NavLink>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* ===============Event============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <MdEmojiEvents />
                        Event
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                              <li>
                                <NavLink
                                  to="/event/listing"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <FaClipboardList />
                                  Listing
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/event/add"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <IoMdAdd />
                                  Add
                                </NavLink>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* ===============Report============== */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaDatabase />
                        Data Manager
                        <div
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                        >
                          <FaChevronDown />
                        </div>
                      </NavLink>

                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-1 mb-1.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <ul className="mt-2 mb-1.5 flex flex-col gap-2.5 ">
                              <li>
                                <NavLink
                                  to="/schoolreport"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <FaSchool />
                                  School Report
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to="/paymentreport"
                                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 `}
                                >
                                  <FaMoneyBill />
                                  Payment Report
                                </NavLink>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
