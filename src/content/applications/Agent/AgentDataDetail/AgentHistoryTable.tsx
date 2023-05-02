import {ChangeEvent, useContext, useEffect, useState} from 'react';
import {
    Box,
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
    Typography
} from '@mui/material';
import {AccountStatus} from 'src/models/crypto_order';
import {ellipseText} from 'src/library/DataItemLib';
import {useGlobalApiClient} from "../../../../core/useApiClient";
import {BetHistory} from "../../../../core/api-clients";
import { UserPriorityContext } from 'src/contexts/UserPriorityProvider';

interface Filters {
    status?: AccountStatus;
}


const applyPagination = (
    userDatas: any,
    page: number,
    limit: number
) => {
    return userDatas?.slice(page * limit, page * limit + limit);
};

const AgentHistoryTable = (props: { userID: string }) => {
    const [selectedUserDatas, setSelectedUserDatas] = useState<any[]>(
        []
    );
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);
    const [gameList, setGameList] = useState<BetHistory[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [filters, setFilters] = useState<Filters>({
        status: null
    });
    const api = useGlobalApiClient();

    const handleResponse = (response) => {
        response?.items ? setGameList(response.items) : setGameList(response);
        response?.total ? setTotalCount(response.total) : setTotalCount(response?.length ? response?.length : 0);
    };
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

    const {userPriority} = useContext(UserPriorityContext); 
    const adminId = userPriority;
    

    useEffect(() => {
        getData(props.userID);
    }, [page, limit]);

    const handlePageChange = (event: any, newPage: number): void => {
        setPage(newPage);
    };

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value));
    };

    const getData = async (userId) => {
        const {response} = await api.history_get_action_history__post({
            adminID: adminId,
            agentId: userId
        })
        handleResponse(response);
    };

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

    // const filteredUserDatas = applyFilters(userDatas, filters);
    const paginatedUserDatas: BetHistory[] = applyPagination(
        gameList,
        page,
        limit
    );

    const getDate = (createdAt) => {
        const date = new Date(createdAt);
        return date.toLocaleString();
    };

    return (

        <Card sx={{marginBottom: '30px'}}>
            <CardHeader
                action={<Box width={150}>
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
                </Box>}
                title="User Data"/>
            <Divider/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>ID</TableCell>
                            <TableCell align='center'>Game ID</TableCell>
                            <TableCell align="center">Before Score</TableCell>
                            <TableCell align="center">Bet Score</TableCell>
                            <TableCell align="center">New Score</TableCell>
                            <TableCell align="center">Win Score</TableCell>
                            <TableCell align="center">Created At</TableCell>
                            <TableCell align="center">Updated At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        paginatedUserDatas ?
                        (paginatedUserDatas.map((history) => {
                            return (
                                <TableRow
                                    hover
                                    sx={{cursor: 'pointer'}}
                                    key={history.id}
                                >
                                    <TableCell align="center">
                                        {ellipseText(history.id)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography
                                            variant="body1"
                                            fontWeight="bold"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                        >
                                            {history.game?.id}
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
                                            {history.beforeScore}
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
                                            {history.betScore}
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
                                            {history.newScore}
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

                                            {history.winScore}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                            {getDate(history.createdAt)}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        {getDate(history.updatedAt)}
                                    </TableCell>
                                </TableRow>
                            );
                        })):(
                            <TableRow>
                            <TableCell colSpan={8} align="center">
                                <Typography variant="body2" color="text.secondary">
                                    No data found
                                </Typography>
                            </TableCell>
                        </TableRow>
                        )
                    }
                    </TableBody>

                </Table>


            </TableContainer>


            <Box p={2}>

                <TablePagination
                    component="div"
                    count={totalCount}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25, 30]}/>
            </Box>
        </Card>
    )};


    export default AgentHistoryTable;
