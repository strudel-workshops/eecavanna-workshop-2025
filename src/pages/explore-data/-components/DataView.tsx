import {
  Alert,
  Box,
  Chip,
  LinearProgress,
  Skeleton,
  Stack,
} from '@mui/material';
import { GridPaginationModel } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useFilters } from '../../../components/FilterContext';
import { SciDataGrid } from '../../../components/SciDataGrid';
import { filterData } from '../../../utils/filters.utils';
import { useListQuery } from '../../../hooks/useListQuery';
import { FilterConfig } from '../../../types/filters.types';

interface DataViewProps {
  filterConfigs: FilterConfig[];
  searchTerm: string;
  setPreviewItem: React.Dispatch<React.SetStateAction<any>>;
  onRefetchReady?: (refetch: () => void) => void;
}
/**
 * Query the data rows and render as an interactive table
 */
export const DataView: React.FC<DataViewProps> = ({
  filterConfigs,
  searchTerm,
  setPreviewItem,
  onRefetchReady,
}) => {
  const { activeFilters } = useFilters();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [offset, setOffest] = useState(page * pageSize);
  // CUSTOMIZE: the unique ID field for the data source
  const dataIdField = 'id';
  // CUSTOMIZE: query mode, 'client' or 'server'
  const queryMode = 'client';
  const { isPending, isFetching, isError, data, error, refetch } = useListQuery(
    {
      activeFilters,
      // CUSTOMIZE: the table data source
      dataSource: 'data/getUsersResponseBody.json',
      filterConfigs,
      offset,
      page,
      pageSize,
      queryMode,
      staticParams: null,
    }
  );

  // Notify parent component when refetch function is ready
  useEffect(() => {
    if (onRefetchReady && refetch) {
      onRefetchReady(refetch);
    }
  }, [onRefetchReady, refetch]);

  const handleRowClick = (rowData: any) => {
    setPreviewItem(rowData.row);
  };

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    // Reset page to first when the page size changes
    const newPage = model.pageSize !== pageSize ? 0 : model.page;
    const newPageSize = model.pageSize;
    const newOffset = newPage * newPageSize;
    setPage(newPage);
    setPageSize(newPageSize);
    setOffest(newOffset);
  };

  // Show a loading skeleton while the initial query is pending
  if (isPending) {
    const emptyRows = new Array(pageSize).fill(null);
    const indexedRows = emptyRows.map((row, i) => i);
    return (
      <Box
        sx={{
          padding: 2,
        }}
      >
        {indexedRows.map((row) => (
          <Skeleton key={row} height={50} />
        ))}
      </Box>
    );
  }

  // Show an error message if the query fails
  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  // Show the data when the query completes
  return (
    <>
      {isFetching && <LinearProgress variant="indeterminate" />}
      <SciDataGrid
        rows={filterData(data, activeFilters, filterConfigs, searchTerm)}
        pagination
        paginationMode={queryMode}
        onPaginationModelChange={handlePaginationModelChange}
        getRowId={(row) => row[dataIdField]}
        // CUSTOMIZE: the table columns
        columns={[
          {
            field: 'id',
            headerName: 'ID',
            width: 100,
          },
          {
            field: 'firstName',
            headerName: 'First Name',
            width: 150,
          },
          {
            field: 'lastName',
            headerName: 'Last Name',
            width: 150,
          },
          {
            field: 'emailAddr',
            headerName: 'Email Address',
            width: 250,
          },
          {
            field: 'roleNames',
            headerName: 'Roles',
            width: 200,
            renderCell: (params: any) => {
              const roles = params.value;
              if (!Array.isArray(roles)) return null;
              return (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={0.5}
                    flexWrap="wrap"
                    useFlexGap
                  >
                    {roles.map((role: string, index: number) => (
                      <Chip
                        key={index}
                        label={role}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </Box>
              );
            },
          },
        ]}
        disableColumnSelector
        autoHeight
        initialState={{
          pagination: { paginationModel: { page, pageSize } },
        }}
        onRowClick={handleRowClick}
      />
    </>
  );
};
