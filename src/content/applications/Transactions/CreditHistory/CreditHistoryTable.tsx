import {ChangeEvent, useEffect, useState} from 'react';
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
    TableRow,
    Typography,
} from '@mui/material';

import {AccountStatus} from 'src/models/crypto_order';
import {ellipseText} from 'src/library/DataItemLib';
import {useGlobalApiClient} from "../../../../core/useApiClient";
import {PaymentHistory} from "../../../../core/api-clients";



interface Filters {
    status?: AccountStatus;
}

const CreditHistoryTable = (props: { userID: string }) => {
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);
    const [user, setUser] = useState<PaymentHistory>();
    const [history, setHistory] = useState<PaymentHistory[]>([]);
    const [filters, setFilters] = useState<Filters>({
        status: null
    });
    const api = useGlobalApiClient();
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

    useEffect(() => {
        getData(props.userID);
    }, [page, limit]);

    const getData = async (userID) => {
        const {response} = await api.history_get_payment_history__post({ownerId: userID});
        response ? setUser(response[0]) : setUser(null);
        setHistory(response);
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

    const getDate = (createdAt) => {
        const date = new Date(createdAt);
        return date.toLocaleString();
    };

    return (
        <Card sx={{marginBottom: '30px'}}>
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
                title="User Data"
            />
            <Divider/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>ID</TableCell>
                            <TableCell align='center'>Email</TableCell>
                            <TableCell align="center">Approval</TableCell>
                            <TableCell align="center">Approved At</TableCell>
                            <TableCell align="center">Before Score</TableCell>
                            <TableCell align="center">Change Score</TableCell>
                            <TableCell align="center">Created At</TableCell>
                            <TableCell align="center">New Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {/* {(user) => (
                            <TableRow
                                hover
                                sx={{cursor: 'pointer'}}
                            >
                                <TableCell align="center">
                                    <Typography
                                        variant="body1"
                                        fontWeight="bold"
                                        color="text.primary"
                                        gutterBottom
                                        noWrap
                                    >
                                        {user ? (ellipseText(user.id)) : (<></>)}
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
                                        {user ? (ellipseText(user.email)) : (<></>)}
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
                                        {user.approval}
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
                                        {user.approvedAt ? (getDate(user.approvedAt)) : (<>Null</>)}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )} */}
                        {
                            history &&
                            history.map((paymentHistory, index) => (
                                <TableRow
                                    hover
                                    sx={{cursor: 'pointer'}}
                                    key={index}
                                >
                                    <TableCell align="center">
                                        <Typography
                                        variant="body1"
                                        fontWeight="bold"
                                        color="text.primary"
                                        gutterBottom
                                        noWrap
                                        >
                                            {paymentHistory["owner"]?(ellipseText(paymentHistory["owner"].id)):(<></>)}
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
                                            {paymentHistory["owner"]?(ellipseText(paymentHistory["owner"].email)):(<></>)}
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
                                        {paymentHistory["approval"]}
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
                                            {paymentHistory["approvedAt"]?(getDate(paymentHistory["approvedAt"])):(<>Null</>)}
                                        </Typography>           
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                        {paymentHistory["beforeScore"]?(paymentHistory["beforeScore"]):(paymentHistory["beforeScore"])}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                        {paymentHistory["changeScore"]}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                        {getDate(paymentHistory["createdAt"])}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="body2" color="text.secondary" noWrap>
                                        {paymentHistory["newScore"]}
                                        </Typography>
                                    </TableCell>

                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>

    );

};
export default CreditHistoryTable;
