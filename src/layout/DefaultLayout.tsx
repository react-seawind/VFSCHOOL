import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Link, Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>

          <div className="py-6 bg-white dark:bg-boxdark w-full text-center mx-auto loader-first1 mt-auto">
            © {currentYear} Virtual Filaments Design and Develop By {'  '}
            <Link
              target="_blank"
              to={'https://www.seawindsolution.com/'}
              className="text-[#29aae1] ml-1"
            >
              Seawind Solution Pvt. Ltd.{' '}
            </Link>
            <Link
              target="_blank"
              to={'https://www.seawindsolution.ae/'}
              className="text-[#29aae1] ml-1"
            >
              <img
                src="https://www.seawindsolution.ae/assets/front/images/loaderimage.png"
                alt=""
                className="animate-spin"
              />
            </Link>
          </div>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
