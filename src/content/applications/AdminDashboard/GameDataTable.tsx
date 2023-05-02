import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Checkbox
} from '@mui/material';

import Label from 'src/components/Label';
import { GameStatisticData, AccountStatus } from 'src/models/crypto_order';
import { ArrowBack, CheckBox } from '@mui/icons-material';


interface GameDataTableProps {
  className?: string;
  userDatas: GameStatisticData[];
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
  userDatas: GameStatisticData[],
  filters: Filters
): GameStatisticData[] => {
  return userDatas.filter((userData) => {
    let matches = true;

    // if (filters.status && userData.status !== filters.status) {
    //   matches = false;
    // }

    return matches;
  });
};


const applyPagination = (
  userDatas: GameStatisticData[],
  page: number,
  limit: number
): GameStatisticData[] => {
  return userDatas.slice(page * limit, page * limit + limit);
};

const GameDataTable: FC<GameDataTableProps> = ({ userDatas, func1 }) => {
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

  const filteredUserDatas = applyFilters(userDatas, filters);
  const paginatedUserDatas = applyPagination(
    filteredUserDatas,
    page,
    limit
  );
  const selectedSomeUserDatas =
    selectedUserDatas.length > 0 &&
    selectedUserDatas.length < userDatas.length;
  const selectedAllUserDatas =
    selectedUserDatas.length === userDatas.length;

  
  const handleSelectAllUseroOrders = (
      event: ChangeEvent<HTMLInputElement>
    ): void => {
      setSelectedUserDatas(
        event.target.checked
          ? userDatas.map((userData) => userData.id)
          : []
      );
    };
  
    const handleSelectOneUser = (
      event: ChangeEvent<HTMLInputElement>,
      userId: number
    ): void => {
      if (!selectedUserDatas.includes(userId)) {
        setSelectedUserDatas((prevSelected) => [
          ...prevSelected,
          userId
        ]);
      } else {
        setSelectedUserDatas((prevSelected) =>
          prevSelected.filter((id) => id !== userId)
        );
      }
    };
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
        <Box sx={{
          marginTop:"30px",
          border:"#232843 solid 1px",
          borderRadius:"0.5rem"
          }}>
          {/* <Typography>Genral Statistic</Typography>
          <Divider /> */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selectedAllUserDatas}
                      indeterminate={selectedSomeUserDatas}
                      onChange={handleSelectAllUseroOrders}
                    />
                  </TableCell>
                  <TableCell align="center">Game Avata</TableCell>
                  <TableCell align="center">Game Name</TableCell>
                  <TableCell align="center">Winnings</TableCell>
                  <TableCell align="center">Players</TableCell>
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
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isUserDataSelected}
                          onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleSelectOneUser(event, userData.id)
                          }
                          value={isUserDataSelected}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <img src={userData.avataUrl} style={{width:"30px", height:"30px"}}/>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {userData.gameName}
                        </Typography>
                      </TableCell >
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {userData.winNum}
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
                          {userData.playerNum}
                        </Typography>
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
        </Box>
    )}
    </>
  );
};

GameDataTable.propTypes = {
  userDatas: PropTypes.array.isRequired
};

GameDataTable.defaultProps = {
  userDatas: []
};

export default GameDataTable;
