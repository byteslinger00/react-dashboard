import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Typography, colors } from '@mui/material';
import styled from '@emotion/styled';
import { GameStatisticData } from 'src/models/crypto_order';

const CssTablecell = styled(TableCell)({
    color: "white",
    padding: "10px",
})

const TitleTypoGrapy = styled(Typography)({
    color: "#cbccd2",
    padding: "5px",
    border: "0px"
})

const ValueTypoGrapy = styled(Typography)({
    color: "#e563ab",
    padding: "5px",
    border: "0px",
})

interface StatisticTableProps{
    datas:GameStatisticData[];
}

export default function StatisticTable({datas}:StatisticTableProps) {

    return (
        <TableContainer 
            sx={{
                background: "transparent",
                color: "white",
            }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                    {datas.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <CssTablecell>
                                <img src={row.avataUrl} width={'40px'} height={'40px'} style={{ borderRadius: "3rem" }} />
                            </CssTablecell>
                            <CssTablecell>
                                <Stack direction={'column'} justifyContent={'space-between'}>
                                    <TitleTypoGrapy variant="body2">Game:</TitleTypoGrapy>
                                    <ValueTypoGrapy variant="body1">{row.gameName}</ValueTypoGrapy>
                                </Stack>
                            </CssTablecell>
                            <CssTablecell>
                                <Stack direction={'column'} justifyContent={'space-between'}>
                                    <TitleTypoGrapy variant="body2">Winnings:</TitleTypoGrapy>
                                    <ValueTypoGrapy variant="body1">{row.winNum}</ValueTypoGrapy>
                                </Stack>
                            </CssTablecell>
                            <CssTablecell>
                                <Stack direction={'column'} justifyContent={'space-between'}>
                                    <TitleTypoGrapy variant="body2">Players:</TitleTypoGrapy>
                                    <ValueTypoGrapy variant="body1">{row.playerNum}</ValueTypoGrapy>
                                </Stack>
                            </CssTablecell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

