import {
  createContext, 
  useContext, 
  useState, 
  useCallback, 
  useEffect, 
  useReducer,
  useRef,
} from "react"

import axiosInstance from "plugins/axiosInstance";
import {axios} from "plugins/axiosInstance";

import { useError } from "errors/errorHook";


// User reducer for handling creation and editing
const userReducer = (user, action) => {
  switch (action.type) {
    case 'set': {
      return action.user;
    }

    // Create a new entry in the list
    case 'created': {
      return [...user, {
        name: action.name,
        username: action.username,
        email: action.email,
        password: action.password,
        password_confirmation: action.password_confirmation,
      }];
    }

    case 'changed': {
      if (user.id === action.user.id) {
        return action.user;
      }else {
        return user;
      }
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const UserContext = createContext(null)
const UserDispatchContext = createContext(null)
const useUser = () => {
  return useContext(UserContext);
}
const useUserDispatch = () => {
  return useContext(UserDispatchContext);
}

const initUser = {
  id: '',
  name: '',
  username: '',
  email: '',
  status: [],
  roles: [],
  password: '',
  password_confirmation: '',
};

const UserProvider = (props) => {
  const [allPagingUsers, setAllPagingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  // Default page size to 20
  const [pageSize, setPageSize] = useState(20); 
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sortModel, setSortModel] = useState([]);
  const [filterModel, setFilterModel] = useState({
    items: [],
  });

  const pageRef = useRef(0);
  const pageSizeRef = useRef(20);

  // Syncs pagination and updates state
  const setPageRef = (newPage) => {
    pageRef.current = newPage;
    setPage(newPage);
  };

  const setPageSizeRef = (newPageSize) => {
    pageSizeRef.current = newPageSize;
    setPageSize(newPageSize);
  };

  // Adds a 'srl' column based on the page and page size
  const formatDatasWithSrl = async (datas) => {
    const withSrl = datas.map((data, index) => ({
      ...data,
      srl: pageRef.current * pageSizeRef.current + index + 1,
    }));
    return await withSrl;
  }

  // Displaying error
  const {ccGetError} = useError();

  // Fetches paginated datas with sorting and filtering
  // With signaling AbortController for better request cancellation handling (quick clicking problem).
  const fetchAllUsers = useCallback(async (signal) => {
    setLoading(true);
    try {
      const result = await axiosInstance.get("/users", {
        params: {
          page: pageRef.current + 1,
          pageSize: pageSizeRef.current,
          sortModel: JSON.stringify(sortModel),
          filterModel: JSON.stringify(filterModel),
        },
        signal,
      });
      
      if (result.data.status === 'success') {
        // const usersWithSrl = result.data.user.map((user, index) => ({
        //   ...user,
        //   srl: pageRef.current * pageSizeRef.current + index + 1,
        // }));
        // setAllPagingUsers(usersWithSrl);

        setAllPagingUsers(await formatDatasWithSrl(result.data.user));
        setAllUsers(await formatDatasWithSrl(result.data.allUsers));

        setRowCount(result.data.total);
        setPageRef(result.data.current_page -1);
      } else {
        await ccGetError(result)
      }
    } catch (error) {
      // From the main axios package to check if an error is due to a request cancellation
      if (axios.isCancel(error)) {
        // Log if request is canceled
        console.log("Fetch canceled:", error.message); 
      } else {
        await ccGetError(error);
      }

    } finally {
      setLoading(false);
    }
   
  }, [page, pageSize, sortModel, filterModel]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  // const handleSetEditedUser = useCallback((userData) => {
  //   if (userData) {
  //     userDispatch({ 
  //       type: 'set', 
  //       user: {
  //         ...user,
  //         ...userData,
  //         roles: userData.roles.map(role => role.id),
  //       }
  //     });
  //   } 
  // });

  const [user, userDispatch] = useReducer (userReducer, initUser)

  return (
    <UserContext.Provider value={{
      user, 
      allUsers,
      allPagingUsers,
      rowCount,
      page,
      pageSize,
      loading,
      sortModel,
      filterModel,
      setAllPagingUsers,
      setPage,
      setPageRef,
      setPageSize,
      setPageSizeRef,
      setSortModel,
      setFilterModel,
      fetchAllUsers,
      initUser, 
      // handleSetEditedUser
    }}>
      <UserDispatchContext.Provider value={userDispatch}>
        {props.children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  )
}

export 
{
  UserProvider, 
  useUser, 
  useUserDispatch,
};