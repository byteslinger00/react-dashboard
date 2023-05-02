import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  FormControl,
  Grid,
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
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { UserData } from "src/models/crypto_order";
import { ArrowBack } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import TableDetails from "./TableDetails";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { ellipseText } from "src/library/DataItemLib";
import { useGlobalApiClient } from "../../../core/useApiClient";

interface UserDataTableProps {
  className?: string;
  userDatas: UserData[];
  func1: Function;
}

const applyPagination = (
  userDatas: UserData[],
  page: number,
  limit: number
): UserData[] => {
  return userDatas.slice(page * limit, page * limit + limit);
};

const UserDataTable: FC<UserDataTableProps> = ({ userDatas, func1 }) => {
  const [selectedUserDatas, setSelectedUserDatas] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [userList, setUserList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState("username");
  const [isFilter, setIsFilter] = useState(false);
  const [detailDataID, setDetailDataID] = useState<string>();
  const [detailUserName, setDetailUserName] = useState<string>();
  const [detailBalance, setDetailBalance] = useState(0);
  const [detailEmail, setDetailEmail] = useState("")

  const searchKey = useRef<HTMLInputElement>();
  const api = useGlobalApiClient();
  useEffect(() => {
    getData();
  }, [page, limit]);

  const statusOptions = [
    {
      id: "username",
      name: "User name",
    },
    {
      id: "email",
      name: "Email",
    },
  ];
  const handleResponse = (response) => {
    response?.items ? setUserList(response.items) : setUserList(response);
    response?.total
      ? setTotalCount(response.total)
      : setTotalCount(response.length);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
    getData();
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
    getData();
  };

  const getData = async () => {
    setIsFilter(false);
    const { response } = await api.user_list_all_users_post({
      params: { page: page + 1, size: limit },
    });
    response
      ? handleResponse(response)
      : NotificationManager.error("Error", "API Failed to Respond");
  };

  const getFilterData = async () => {
    setIsFilter(true);
    let body;
    if (filters == "username") body = { "name": searchKey.current.value };
    else body = { "email": searchKey.current.value };
    const { response } = await api.admin_search_users_post({
      type: "user",
      ...body,
    });
    response ? handleResponse(response) : NotificationManager.warning(`Please try another.`, "No matches!")
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== "all") {
      value = e.target.value;
    }

    setFilters(value);
  };

  const navigateToDetails = (id, email, userName, currentBalance) => {
    setDetailDataID(id);
    setDetailUserName(userName);
    setDetailBalance(currentBalance);
    setDetailEmail(email);
  };

  // const filteredUserDatas = applyFilters(userDatas, filters);
  const paginatedUserDatas = applyPagination(userList, page, limit);
  const selectedSomeUserDatas =
    selectedUserDatas.length > 0 && selectedUserDatas.length < userDatas.length;
  const selectedAllUserDatas = selectedUserDatas.length === userDatas.length;
  const theme = useTheme();

  const handleBack = () => {
    getData();
    setDetailDataID("");
  };
  const searchKeyChanged = () => {
    if (!searchKey.current.value) getData();
  };

  const getDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString();
  };

  return (
    <>
      {detailDataID ? (
        <Box sx={{ marginBottom: "30px" }}>
          <Box textAlign="left">
            <Button
              sx={{ mt: { xs: 2, md: 0 }, alignSelf: "right" }}
              variant="contained"
              startIcon={<ArrowBack fontSize="small" />}
              onClick={handleBack}
            >
              Back To Main List
            </Button>
          </Box>
          <Card sx={{ marginTop: "20px" }}>
            <TableDetails userID={detailDataID} userEmail={detailEmail} userName={detailUserName} balance={detailBalance} />
          </Card>
        </Box>
      ) : (
        <Card sx={{ marginBottom: "30px" }}>
          <CardHeader
            action={
              <Grid container spacing={2}>
                <Grid item xs={5} sm={4}>
                  <Box width={150}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Filter</InputLabel>
                      <Select
                        onChange={handleStatusChange}
                        defaultValue={statusOptions[0].id}
                        label="Filter"
                        autoWidth
                      >
                        {statusOptions.map((statusOption) => (
                          <MenuItem
                            key={statusOption.id}
                            value={statusOption.id}
                          >
                            {statusOption.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} sx={{ display: "flex" }}>
                  <TextField
                    id="outlined-search"
                    label="Search"
                    type="search"
                    inputRef={searchKey}
                    onChange={searchKeyChanged}
                  />
                  <Button
                    sx={{
                      marginLeft: "0.25rem",
                      padding: "5px",
                    }}
                    onClick={getFilterData}
                  >
                    <SearchIcon sx={{ fontSize: "40px" }} />
                  </Button>
                </Grid>
              </Grid>
            }
          />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Avatar</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">User Name</TableCell>
                  <TableCell align="center">User ID</TableCell>
                  <TableCell align="center">Credit</TableCell>
                  <TableCell align="center">Last TopUp</TableCell>
                  <TableCell align="center">Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((userData) => {
                  const isUserDataSelected = selectedUserDatas.includes(
                    userData.id
                  );
                  return (
                    <TableRow
                      hover
                      sx={{ cursor: "pointer" }}
                      key={userData.id}
                      selected={isUserDataSelected}
                      onClick={() =>
                        navigateToDetails(userData.id, 
                          userData["email"],
                          userData["name"], 
                          userData["creditAccount"]?userData["creditAccount"]["balance"]:0)
                      }
                    >
                      <TableCell align="center">
                        <img src="https://img.icons8.com/fluency/48/null/user-male-circle.png" />
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {ellipseText(userData["email"])}
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
                          {ellipseText(userData["name"])}
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
                          {ellipseText(userData.id)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {userData["creditAccount"]?userData["creditAccount"]["balance"]:0}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {getDate(userData["creditAccount"]?userData["creditAccount"]["updatedAt"]:0)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {getDate(userData["createdAt"])}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}>
            {!isFilter ? (
              <TablePagination
                component="div"
                count={totalCount}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25, 30]}
              />
            ) : (
              <></>
            )}
          </Box>
        </Card>
      )}
    </>
  );
};

UserDataTable.propTypes = {
  userDatas: PropTypes.array.isRequired,
};

UserDataTable.defaultProps = {
  userDatas: [],
};

export default UserDataTable;
