import React, { useState, useEffect } from "react";

import CCRoleDataGrid from "src/components/mui-customizations/ccRoleDataGrid";

import { useRole } from "components/roles/roleContext";
import BulkDelete from "components/bulk-actions/bulkDelete";

// 500ms minimum load duration
const MIN_LOADING_DURATION = 500;

const RoleList = () => {
  const {
    allPagingRoles, 
    rowCount, 
    page, 
    pageSize,   
    sortModel, 
    filterModel, 
    setPageRef, 
    setPageSizeRef,
    setSortModel,
    setFilterModel, 
    fetchAllRoles,
    loading,
  } = useRole();

  const [bulkSelectedIds, setBulkSelectedIds] = useState([]);
  const [isMinLoading, setIsMinLoading] = useState(false);

  useEffect(() => {
    // AbortController is used to signal cancellation of operations
    // Particularly with fetch requests or any asynchronous task that supports aborting
    const controller = new AbortController();
    const loadStartTime = Date.now();

    // Set to true to display loading indicator
    setIsMinLoading(true);
    fetchAllRoles(controller.signal)
      // Catch fetch cancellation error without throwing
      .catch(() => {})
      .finally(() => {
        const loadDuration = Date.now() - loadStartTime;
        setTimeout(() => setIsMinLoading(false), Math.max(0, MIN_LOADING_DURATION - loadDuration));
      });

    // Cancel on unmount or effect re-run
    return () => controller.abort(); 

    // fetchAllRoles();
  }, [fetchAllRoles]);

  // Main loading state combining data fetch and UI loading duration
  const isLoading = loading || isMinLoading;

  return (
    <CCRoleDataGrid
      rows={allPagingRoles}
      rowCount={rowCount}
      page={page}
      setPage={!isLoading && setPageRef} // Prevents page change if loading
      pageSize={pageSize}
      setPageSize={!isLoading && setPageSizeRef}
      sortModel={sortModel}
      setSortModel={setSortModel}
      filterModel={filterModel}
      setFilterModel={setFilterModel}
      fetchAllRoles={fetchAllRoles}
      bulkSelectedIds={bulkSelectedIds}
      setBulkSelectedIds={setBulkSelectedIds}
      loading={isLoading}
    >
      <BulkDelete
        setBulkSelectedIds={setBulkSelectedIds}
        bulkSelectedIds={bulkSelectedIds}
        apiResource='roles'
        apiRelationMethod='users'
        // 'detach' for many to many relationship records delete
        // 'single' for single table records delete
        // 'many' for one to many relationship records delete
        apiRelationAction="detach" 
        afterDeleteRefreshTo={fetchAllRoles}
      />
    </CCRoleDataGrid>
  );
};

export default RoleList;
