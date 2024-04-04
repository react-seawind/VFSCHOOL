import { lazy } from 'react';

import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import ECommerce from '../pages/Dashboard/ECommerce';
import SignIn from '../pages/Authentication/SignIn';
import Paymentreport from '../components/Datamanager/Paymentreport';
import Schoolreport from '../components/Datamanager/Schoolreport';
import DivListing from '../components/Standard/Div/Listing';
import DivAdd from '../components/Standard/Div/Add';
import DivEdit from '../components/Standard/Div/Edit';
import StdListing from '../components/Standard/Std/Listing';
import StdAdd from '../components/Standard/Std/Add';
import StdEdit from '../components/Standard/Std/Edit';
import SubjectListing from '../components/Subject/Listing';
import SubjectAdd from '../components/Subject/Add';
import SubjectEdit from '../components/Subject/Edit';
import UserListing from '../components/User/User/Listing';
import UserAdd from '../components/User/User/Add';
import UserEdit from '../components/User/User/Edit';
import TeacherListing from '../components/Teacher/Listing';
import TeacherAdd from '../components/Teacher/Add';
import TeacherEdit from '../components/Teacher/Edit';
import StudentListing from '../components/Student/Listing';
import StudentAdd from '../components/Student/Add';
import StudentEdit from '../components/Student/Edit';
import ImageListing from '../components/Gallery/Imageg/Listing';
import ImageAdd from '../components/Gallery/Imageg/Add';
import ImageEdit from '../components/Gallery/Imageg/Edit';
import VideoListing from '../components/Gallery/Videog/Listing';
import VideoAdd from '../components/Gallery/Videog/Add';
import VideoEdit from '../components/Gallery/Videog/Edit';
import MealAdd from '../components/Meal/Add';
import SyllabusListing from '../components/Syllabus/Listing';
import SyllabusAdd from '../components/Syllabus/Add';
import SyllabusEdit from '../components/Syllabus/Edit';
import ClassTimetableListing from '../components/Class-TimeTable/Listing';
import ClassTimetableAdd from '../components/Class-TimeTable/Add';
import ClassTimetableEdit from '../components/Class-TimeTable/Edit';
import HolidayListing from '../components/Holiday/Listing';
import HolidayAdd from '../components/Holiday/Add';
import HolidayEdit from '../components/Holiday/Edit';
import TransportationListing from '../components/Transportation/Listing';
import TransportationAdd from '../components/Transportation/Add';
import TransportationEdit from '../components/Transportation/Edit';
import PaperListing from '../components/Paper/Listing';
import PaperAdd from '../components/Paper/Add';
import PaperEdit from '../components/Paper/Edit';
import ReportCardListing from '../components/ReportCard/Listing';
import ReportCardAdd from '../components/ReportCard/Add';
import ReportCardEdit from '../components/ReportCard/Edit';
import NoticeListing from '../components/NoticeCircular/Listing';
import NoticeAdd from '../components/NoticeCircular/Add';
import NoticeEdit from '../components/NoticeCircular/Edit';
import EventListing from '../components/Event/Listing';
import EventAdd from '../components/Event/Add';
import EventEdit from '../components/Event/Edit';
import ExamTTListing from '../components/ExamTT/Listing';
import ExamTTAdd from '../components/ExamTT/Add';
import ExamTTEdit from '../components/ExamTT/Edit';
import TeacherView from '../components/Teacher/View';
import ChangePassword from '../components/Student/ChangePassword';
// import MainForm from '../components/TINY';

const coreRoutes = [
  {
    path: '/login',
    title: 'Login',
    component: SignIn,
  },
  {
    path: '/profile', //Profile
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/dashboard', //dashboard
    title: 'dashboard',
    component: ECommerce,
  },
  {
    path: '/settings', //Setting
    title: 'Settings',
    component: Settings,
  },

  // =================Div=============
  {
    path: '/div/listing',
    component: DivListing,
  },
  {
    path: '/div/add',
    component: DivAdd,
  },
  {
    path: '/div/edit/:Id',
    component: DivEdit,
  },
  // =================STD=============
  {
    path: '/std/listing',
    component: StdListing,
  },
  {
    path: '/std/add',
    component: StdAdd,
  },
  {
    path: '/std/edit/:Id',
    component: StdEdit,
  },

  // =================teacher=============
  {
    path: '/teacher/listing',
    component: TeacherListing,
  },
  {
    path: '/teacher/add',
    component: TeacherAdd,
  },
  {
    path: '/teacher/edit/:Id',
    component: TeacherEdit,
  },
  {
    path: '/teacher/view',
    component: TeacherView,
  },
  // =================student=============
  {
    path: '/student/listing',
    component: StudentListing,
  },
  {
    path: '/student/add',
    component: StudentAdd,
  },
  {
    path: '/student/edit/:Id',
    component: StudentEdit,
  },
  {
    path: '/student/changepassword/:Id',
    component: ChangePassword,
  },
  // =================Subject=============
  {
    path: '/subject/listing',
    component: SubjectListing,
  },
  {
    path: '/subject/add',
    component: SubjectAdd,
  },
  {
    path: '/subject/edit/:Id',
    component: SubjectEdit,
  },

  // =================User=============
  {
    path: '/user/listing',
    component: UserListing,
  },
  {
    path: '/user/add',
    component: UserAdd,
  },
  {
    path: '/user/edit/:Id',
    component: UserEdit,
  },
  // =================REPOET=============
  {
    path: '/schoolreport',
    component: Schoolreport,
  },
  {
    path: '/paymentreport',
    component: Paymentreport,
  },

  // =================image=============
  {
    path: '/image/listing',
    component: ImageListing,
  },
  {
    path: '/image/add',
    component: ImageAdd,
  },
  {
    path: '/image/edit/:Id',
    component: ImageEdit,
  },
  // =================video=============
  {
    path: '/video/listing',
    component: VideoListing,
  },
  {
    path: '/video/add',
    component: VideoAdd,
  },
  {
    path: '/video/edit/:Id',
    component: VideoEdit,
  },
  // =================meal=============

  {
    path: '/meal/add',
    component: MealAdd,
  },
  // =================Syllabus=============
  {
    path: '/syllabus/listing',
    component: SyllabusListing,
  },
  {
    path: '/syllabus/add',
    component: SyllabusAdd,
  },
  {
    path: '/syllabus/edit/:Id',
    component: SyllabusEdit,
  },
  // =================classtimetable=============
  {
    path: '/classtimetable/listing',
    component: ClassTimetableListing,
  },
  {
    path: '/classtimetable/add',
    component: ClassTimetableAdd,
  },
  {
    path: '/classtimetable/edit/:Id',
    component: ClassTimetableEdit,
  },
  // =================holiday=============
  {
    path: '/holiday/listing',
    component: HolidayListing,
  },
  {
    path: '/holiday/add',
    component: HolidayAdd,
  },
  {
    path: '/holiday/edit/:Id',
    component: HolidayEdit,
  },
  // =================transportation=============
  {
    path: '/transportation/listing',
    component: TransportationListing,
  },
  {
    path: '/transportation/add',
    component: TransportationAdd,
  },
  {
    path: '/transportation/edit/:Id',
    component: TransportationEdit,
  },
  // =================examtimetable=============
  {
    path: '/examtimetable/listing',
    component: ExamTTListing,
  },
  {
    path: '/examtimetable/add',
    component: ExamTTAdd,
  },
  {
    path: '/examtimetable/edit/:Id',
    component: ExamTTEdit,
  },
  // =================paper=============
  {
    path: '/paper/listing',
    component: PaperListing,
  },
  {
    path: '/paper/add',
    component: PaperAdd,
  },
  {
    path: '/paper/edit/:Id',
    component: PaperEdit,
  },
  // =================reportcard=============
  {
    path: '/reportcard/listing',
    component: ReportCardListing,
  },
  {
    path: '/reportcard/add',
    component: ReportCardAdd,
  },
  {
    path: '/reportcard/edit/:Id',
    component: ReportCardEdit,
  },
  // =================notice=============
  {
    path: '/notice/listing',
    component: NoticeListing,
  },
  {
    path: '/notice/add',
    component: NoticeAdd,
  },
  {
    path: '/notice/edit/:Id',
    component: NoticeEdit,
  },
  // =================event=============
  {
    path: '/event/listing',
    component: EventListing,
  },
  {
    path: '/event/add',
    component: EventAdd,
  },
  {
    path: '/event/edit/:Id',
    component: EventEdit,
  },

  // {
  //   path: '/form',
  //   component: MainForm,
  // },
];

const routes = [...coreRoutes];
export default routes;
