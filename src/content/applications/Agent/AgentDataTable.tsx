import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ellipseText } from "src/library/DataItemLib";
import Label from "src/components/Label";
import { AccountStatus, FiterType } from "src/models/crypto_order";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useGlobalApiClient } from "../../../core/useApiClient";
import { AgentUser } from "src/core/api-clients";
import { ArrowBack } from "@mui/icons-material";
import AgentDataDetails from "./AgentDataDetail";

interface agentDataTableProps {
  className?: string;
  func1: Function;
}

// const applyPagination = (
//   userDatas: any,
//   page: number,
//   limit: number
// ) => {
//   return userDatas.slice(page * limit, page * limit + limit);
// };

const getStatusLabel = (accountStatus: AccountStatus): JSX.Element => {
  const map = {
    disabled: {
      text: "Disabled",
      color: "error",
    },
    active: {
      text: "Active",
      color: "success",
    },
  };

  const { text, color }: any = map[accountStatus];

  return <Label color={color}>{text}</Label>;
};

const AgentDataTable: FC<agentDataTableProps> = ({ func1 }) => {
  const [selectedUserDatas, setSelectedUserDatas] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const [filterTypes, setFilterTypes] = useState("username");

  const [agentList, setAgentList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [detailDataID, setDetailDataID] = useState<string>();
  const [detailUserName, setDetailUserName] = useState<string>();
  const [detailQuota, setDetailQuota] = useState(0);
  const [detailEmail, setDetailEmail] = useState("");

  const [isFilter, setIsFilter] = useState(false);
  const searchKey = useRef<HTMLInputElement>();
  const api = useGlobalApiClient();

  const handleResponse = (response) => {
    response?.items ? setAgentList(response.items) : setAgentList(response);
    response?.total
      ? setTotalCount(response.total)
      : setTotalCount(response.length);
  };

  //   const paginatedUserDatas: AgentUser[] = applyPagination(
  //     agentList,
  //     page,
  //     limit
  // );

  useEffect(() => {
    getData();
  }, [page, limit]);

  const getData = async () => {
    setIsFilter(false);
    const { response } = await api.agent_list_agents_post({
      params: { size: limit, page: page + 1 },
    });
    response
      ? handleResponse(response)
      : NotificationManager.warning("API Error", "Unable to fetch users");
  };

  const getFilterData = async () => {
    setIsFilter(true);
    let body;
    if (filterTypes == "name") body = { name: searchKey.current.value };
    else body = { email: searchKey.current.value };
    const { response } = await api.admin_search_users_post({
      type: "agent",
      ...body,
    });
    response
      ? handleResponse(response)
      : NotificationManager.warning(`Please try another.`, "No matches!");
  };

  const getDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString();
  };

  const statusOptions = [
    {
      id: "name",
      name: "User name",
    },
    {
      id: "email",
      name: "Email",
    },
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== "all") {
      value = e.target.value;
    }
    setFilterTypes(value);
  };

  const searchKeyChanged = () => {
    if (!searchKey.current.value) getData();
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const navigateToDetails = (id, userName, userEmail, quota) => {
    setDetailDataID(id);
    setDetailUserName(userName);
    setDetailQuota(quota);
    setDetailEmail(userEmail);
  };

  const handleBack = () => {
    getData();
    setDetailDataID("");
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
            <AgentDataDetails userID={detailDataID} userName={detailUserName} userEmail={detailEmail} quota={detailQuota} /> 
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
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Name</TableCell>
                  {/* <TableCell align="center">Password</TableCell> */}
                  <TableCell align="center">Email</TableCell>
                  {/* <TableCell align="center">AccessToken</TableCell>
                  <TableCell align="center">AdminId</TableCell> */}
                  <TableCell align="center">Quota</TableCell>
                  <TableCell align="center">CreatAt</TableCell>
                  <TableCell align="center">UpdateAt</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {agentList.map((userData) => {
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
                        navigateToDetails(userData.id, userData["name"], userData.email, userData.quota)
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
                          {ellipseText(userData.id)}
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
                          {ellipseText(userData.name)}
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
                          {ellipseText(userData.email)}
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
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {getDate(userData["createdAt"])}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {getDate(userData["updatedAt"])}
                      </TableCell>
                      <TableCell align="center">
                        {userData.active ? (
                          <>{getStatusLabel("active")}</>
                        ) : (
                          <>{getStatusLabel("disabled")}</>
                        )}
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

export default AgentDataTable;
