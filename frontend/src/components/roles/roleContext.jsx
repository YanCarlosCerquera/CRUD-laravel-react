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
const roleReducer = (role, action) => {
  switch (action.type) {
    case 'set': {
      return action.role;
    }

    // Create a new entry in the list
    case 'created': {
      return [...role, {
        name: action.name,
        username: action.username,
        email: action.email,
        password: action.password,
        password_confirmation: action.password_confirmation,
      }];
    }

    case 'changed': {
      if (role.id === action.role.id) {
        return action.role;
      }else {
        return role;
      }
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const RoleContext = createContext('')
const RoleDispatchContext = createContext('')
const useRole = () => {
  return useContext(RoleContext);
}
const useRoleDispatch = () => {
  return useContext(RoleDispatchContext);
}

const initRole = {
  id: '',
  title: '',
  name: '',
  status: [],
};

const RoleProvider = (props) => {
  const [allPagingRoles, setAllPagingRoles] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
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
  const fetchAllRoles = useCallback(async (signal) => {
    setLoading(true);
    try {
      const result = await axiosInstance.get("/roles", {
        params: {
          page: pageRef.current + 1,
          pageSize: pageSizeRef.current,
          sortModel: JSON.stringify(sortModel),
          filterModel: JSON.stringify(filterModel),
        },
        signal,
      });

      if (result.data.status === 'success') {
        // const rolesWithSrl = result.data.role.map((role, index) => ({
        //   ...role,
        //   srl: pageRef.current * pageSizeRef.current + index + 1,
        // }));
        // setAllPagingRoles(rolesWithSrl);

        setAllPagingRoles(await formatDatasWithSrl(result.data.role));
        setAllRoles(await formatDatasWithSrl(result.data.allRoles));
        
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
    fetchAllRoles();
  }, [fetchAllRoles]);

  // const handleSetEditedRole = (roleData) => {
  //   if (roleData) {
  //     roleDispatch({ 
  //       type: 'set', 
  //       role: {
  //         ...role,
  //         ...roleData,
  //       }
  //     });
  //   }
  // };

  const [role, roleDispatch] = useReducer (roleReducer, initRole)

  return (
    <RoleContext.Provider value={{
      role, 
      allRoles,
      allPagingRoles,
      rowCount,
      page,
      pageSize,
      loading,
      sortModel,
      filterModel,
      setAllPagingRoles,
      setPage,
      setPageRef,
      setPageSize,
      setPageSizeRef,
      setSortModel,
      setFilterModel,
      fetchAllRoles,
      initRole, 
      // handleSetEditedRole
    }}>
      <RoleDispatchContext.Provider value={roleDispatch}>
        {props.children}
      </RoleDispatchContext.Provider>
    </RoleContext.Provider>
  )
}

export 
{
  RoleProvider, 
  useRole, 
  useRoleDispatch,
};