import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import TipsAndUpdatesOutlined from '@mui/icons-material/TipsAndUpdatesSharp';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import PermDeviceInformationOutlinedIcon from '@mui/icons-material/PermDeviceInformationOutlined';
import ContactSupportTwoToneIcon from '@mui/icons-material/ContactSupportTwoTone';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupIcon from '@mui/icons-material/Group';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

import AuthLayout from 'components/layouts/auth-layouts/authLayout';
import DefaultLayout from 'src/components/layouts/default-layouts/defaultLayout';
import DrawerLayout from "components/layouts/drawer-layouts/drawerLayout";
import Login from "pages/Login";
import Register from "pages/Register";
import Dashboard from 'pages/Dashboard';
import ProfileEdit from "pages/users/profile/Edit"
import About from "pages/about/About";
import AboutChild from "pages/about/AboutChild";
import AboutGrandChild from "pages/about/AboutGrandChild";
import UserCreate from 'pages/users/users/Create';
import UserEdit from 'pages/users/users/Edit';
import UserList from 'pages/users/users/List';
import RoleCreate from 'pages/roles/Create';
import RoleEdit from 'pages/roles/Edit';
import RoleList from 'pages/roles/List';
import ErrorPage from "pages/ErrorPage";
import TestPage from "pages/TestPage";




const AuthPrivateLayout = () => {
  return <AuthLayout />
};

const CommonLayout = () => {
  return <DrawerLayout />
};

// const AuthOnlyPrivateRoute = () => {
//   const { isProfile } = useAuth(); // check if is logged in user profile
//   const {currentFirstPath} = useCurrentPages(); // check if only 'auth' route
//   return isProfile ? (
//     <Navigate to={"/dashboard"} />
//   ) : (
//     <Navigate to={"/auth/login"} />
//   )
// };

// const PrivateRoute = () => {
//   const { isProfile } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isProfile) {
//       navigate('/dashboard');
//     } else {
//       navigate('/auth/login');
//     }
//   }, [isProfile, navigate]);

//   return null; // Render nothing
// };

const createLoader = function() {
  return this.path;
};

const rootChildRouter = [
  {
    path: "dashboard",
    element: <Dashboard />,
    icon: <DashboardIcon />,
  },
  {
    path: "profile",
    element: <ProfileEdit />,
    // loader: async () => {
    //   const profile = await getProfile();
    //   if (profile) {
    //     return profile;
    //     // return null;
    //   }else {
    //     return redirect('/auth/login');
    //   }
    // },
    icon: <AccountBoxIcon />,
  },
  {
    path: "about",
    element: <About />,
    icon: <InfoSharpIcon />,
    children: [
      {
        path: "about-child1",
        loader: createLoader,
        element: <AboutChild />,
        icon: <TipsAndUpdatesOutlined />,
        children: [
          {
            path: "about-child1-grand-child",
            loader: createLoader,
            element: <AboutGrandChild />,
            icon: <PrivacyTipOutlinedIcon />,
          },
        ],
      },
      {
        path: "about-child2",
        loader: createLoader,
        element: <AboutChild />,
        icon: <ContactSupportTwoToneIcon />,
        children: [
          {
            path: "about-child2-grand-child1",
            loader: createLoader,
            element: <AboutGrandChild />,
            icon: <PermDeviceInformationOutlinedIcon />,
          },
          {
            path: "about-child2-grand-child2",
            loader: createLoader,
            element: <AboutGrandChild />,
            icon: <PermDeviceInformationOutlinedIcon />,
          },
        ],
      },
      {
        path: "about-child3",
        loader: createLoader,
        element: <AboutChild />,
        icon: <ContactSupportTwoToneIcon />,
        children: [
          {
            path: "about-child3-grand-child1",
            loader: createLoader,
            element: <AboutGrandChild />,
            icon: <PermDeviceInformationOutlinedIcon />,
          },
          {
            path: "about-child3-grand-child2",
            loader: createLoader,
            element: <AboutGrandChild />,
            icon: <PermDeviceInformationOutlinedIcon />,
          },
          {
            path: "about-child3-grand-child3",
            loader: createLoader,
            element: <TestPage />,
            icon: <PermDeviceInformationOutlinedIcon />,
          },
        ],
      },
    ],
  },
];

const rootRouter = [
  {
    path: "/",
      // loader: async () => {
      //   const contentloader = await contentLoader();
      //   if (contentloader) {
      //     return contentloader
      //   } else {
      //     return redirect("/auth/login");
      //   }
      // },

      // loader: async () => {
      //   const profile = await getProfile();
      //   if (profile) {
      //     return profile;
      //     // return null;
      //   }
      // },

      // loader: async () => {
      //   if (useContentLoader()) {
      //     return "some"
      //   }else {
      //     return redirect("/auth/login");
      //   }
      // },

    element: <CommonLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      ...rootChildRouter,
    ],
  }
];

const userRouter = [
  {
    path: "user",
    element: <CommonLayout />,
    errorElement: <ErrorPage />,
    icon: <GroupIcon />,
    children: [
      {
        path: "create",
        element: <UserCreate />,
        icon: <PersonAddAltOutlinedIcon />,
      },
      {
        path: "edit/:id",
        element: <UserEdit />,
        icon: <EditOutlinedIcon />,
      },
      {
        path: "list",
        element: <UserList />,
        icon: <PeopleOutlineIcon />,
      },
    ],
  },
];

const roleRouter = [
  {
    path: "role",
    element: <CommonLayout />,
    errorElement: <ErrorPage />,
    icon: <ManageAccountsOutlinedIcon />,
    children: [
      {
        path: "create",
        element: <RoleCreate />,
        icon: <PersonAddAltOutlinedIcon />,
      },
      {
        path: "edit/:id",
        element: <RoleEdit />,
        icon: <EditOutlinedIcon />,
      },
      {
        path: "list",
        element: <RoleList />,
        icon: <PeopleOutlineIcon />,
      },
    ],
  },
];

const authRouter = [{
  path: "auth",
  element: <AuthPrivateLayout />,
  errorElement: <ErrorPage />,
  children: [
    // {
    //   path: "",
    //   // loader: async () => {
    //   //   const profile = await getProfile();
    //   //   if (profile) {
    //   //     return {profile};
    //   //     // return null;
    //   //   } else {
    //   //     return redirect("/auth/login");
    //   //   }
    //   // },
    //   element: <AuthLayout />,
    // },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ],
}];

// Bind the loader functions to their respective objects
rootChildRouter.forEach(obj => {
  if (obj.children) {
    obj.children.forEach(child => {
      child.loader = createLoader.bind(child);
      if (child.children) {
        child.children.forEach(grandChild => {
          if (typeof grandChild.loader === 'function') {
            grandChild.loader = grandChild.loader.bind(grandChild);
          }
        });
      }
    });
  }
});

export default rootRouter;
export {authRouter, rootChildRouter, userRouter, roleRouter};