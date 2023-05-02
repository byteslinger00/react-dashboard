import {ChangeEvent, FC, useState} from 'react';
import {format} from 'date-fns';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';

import Label from 'src/components/Label';
import {AccountStatus, AgentData} from 'src/models/crypto_order';
import {ArrowBack} from '@mui/icons-material';


interface agentDataTableProps {
  className?: string;
  agentDatas: AgentData[];
  func1: Function;
}

interface Filters {
  status?: AccountStatus;
}

interface Props {
  func1:() => void;
}

const getStatusLabel = (accountStatus: AccountStatus): JSX.Element => {
  const map = {
    disabled: {
      text: 'Disabled',
      color: 'error'
    },
    active: {
      text: 'Active',
      color: 'success'
    }
  };

  const { text, color }: any = map[accountStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  userDatas: AgentData[],
  filters: Filters
): AgentData[] => {
  return userDatas.filter((userData) => {
    let matches = true;

    if (filters.status && userData.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};


const applyPagination = (
  userDatas: AgentData[],
  page: number,
  limit: number
): AgentData[] => {
  return userDatas.slice(page * limit, page * limit + limit);
};

const AgentDataTable: FC<agentDataTableProps> = ({ agentDatas, func1 }) => {
  const [selectedUserDatas, setSelectedUserDatas] = useState<number[]>(
    []
  );
  const selectedBulkActions = selectedUserDatas.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });
  const [detailDataID, setDetailDataID] = useState<number>();

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'active',
      name: 'Active'
    },
    {
      id: 'disabled',
      name: 'Disabled'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const navigateToDetails = (id) => {
    setDetailDataID(id);
  }

  const filteredUserDatas = applyFilters(agentDatas, filters);
  const paginatedUserDatas = applyPagination(
    filteredUserDatas,
    page,
    limit
  );
  const selectedSomeUserDatas =
    selectedUserDatas.length > 0 &&
    selectedUserDatas.length < agentDatas.length;
  const selectedAllUserDatas =
    selectedUserDatas.length === agentDatas.length;
  const theme = useTheme();

  const handleBack = () => {
    setDetailDataID(0); 
  }

  return (
    <>
    {detailDataID?(
      <Box sx={{marginBottom:'30px'}}>
        <Box textAlign='right'>
          <Button
            sx={{ mt: { xs: 2, md: 0 }, alignSelf:'right' }}
            variant="contained"
            startIcon={<ArrowBack fontSize="small" />}
            onClick={handleBack}
          >
            Back To Main List
          </Button>
        </Box>
        <Card sx={{marginTop:"20px"}}>
          
        </Card>
      </Box>
    ):(
        <Card sx={{marginBottom:'30px'}}>
            <CardHeader
              action={
                <Box width={150}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={filters.status || 'all'}
                      onChange={handleStatusChange}
                      label="Status"
                      autoWidth
                    >
                      {statusOptions.map((statusOption) => (
                        <MenuItem key={statusOption.id} value={statusOption.id}>
                          {statusOption.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              }
              title="Game Data"
            />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Avatar</TableCell>
                  <TableCell align="center">Agent Name</TableCell>
                  <TableCell align="center">Agent ID</TableCell>
                  <TableCell align="center">Quota</TableCell>
                  <TableCell align="center">Balance</TableCell>
                  <TableCell align="center">Due Date</TableCell>
                  <TableCell align="center">Created At</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUserDatas.map((userData) => {
                  const isUserDataSelected = selectedUserDatas.includes(
                    userData.id
                  );
                  return (
                    <TableRow
                      hover
                      sx={{cursor:'pointer'}}
                      key={userData.id}
                      selected={isUserDataSelected}
                      // onClick={() => navigateToDetails(userData.id)}
                    >
                      <TableCell align='center'>
                        <img src="https://img.icons8.com/fluency/48/null/user-male-circle.png"/>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {userData.userName}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {userData.id}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {userData.quota}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {userData.balance}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {format(userData.duedate, 'MMMM dd yyyy')}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {format(userData.createdAt, 'MMMM dd yyyy')}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {getStatusLabel(userData.status)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}>
            <TablePagination
              component="div"
              count={filteredUserDatas.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25, 30]}
            />
          </Box>
        </Card>
    )}
    </>
  );
};

AgentDataTable.propTypes = {
  agentDatas: PropTypes.array.isRequired
};

AgentDataTable.defaultProps = {
  agentDatas: []
};

export default AgentDataTable;
