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
];

const routes = [...coreRoutes];
export default routes;
