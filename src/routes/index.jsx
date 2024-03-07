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
import MyQuillEditor from '../components/QuillEditor';
import JODEDITROR from '../components/Form';
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
import MealListing from '../components/Meal/Listing';
import MealAdd from '../components/Meal/Add';
import MealEdit from '../components/Meal/Edit';
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
import ExamTimetableListing from '../components/Transportation/Listing';
import ExamTimetableAdd from '../components/Transportation/Add';
import ExamTimetableEdit from '../components/Transportation/Edit';
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

const coreRoutes = [
  {
    path: '/',
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
    path: '/div/edit',
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
    path: '/std/edit',
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
    path: '/teacher/edit',
    component: TeacherEdit,
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
    path: '/student/edit',
    component: StudentEdit,
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
    path: '/subject/edit',
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
    path: '/user/edit',
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
  {
    path: '/editor',
    component: MyQuillEditor,
  },
  {
    path: '/editor2',
    component: JODEDITROR,
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
    path: '/image/edit',
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
    path: '/video/edit',
    component: VideoEdit,
  },
  // =================meal=============
  {
    path: '/meal/listing',
    component: MealListing,
  },
  {
    path: '/meal/add',
    component: MealAdd,
  },
  {
    path: '/meal/edit',
    component: MealEdit,
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
    path: '/syllabus/edit',
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
    path: '/classtimetable/edit',
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
    path: '/holiday/edit',
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
    path: '/transportation/edit',
    component: TransportationEdit,
  },
  // =================examtimetable=============
  {
    path: '/examtimetable/listing',
    component: ExamTimetableListing,
  },
  {
    path: '/examtimetable/add',
    component: ExamTimetableAdd,
  },
  {
    path: '/examtimetable/edit',
    component: ExamTimetableEdit,
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
    path: '/paper/edit',
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
    path: '/reportcard/edit',
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
    path: '/notice/edit',
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
    path: '/event/edit',
    component: EventEdit,
  },
];

const routes = [...coreRoutes];
export default routes;
