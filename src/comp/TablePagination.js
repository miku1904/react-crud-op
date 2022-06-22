
import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const TablePagination = () => {
  return (
    <div className="pagination">
    <Stack spacing={2} >
       <Pagination count={10} color="secondary" />
    </Stack>
    </div>
  )
}

export default TablePagination;
