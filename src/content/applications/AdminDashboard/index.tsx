import { ChangeEvent, useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import PageHeader from "./StatisticHeader";
import {
  Grid,
  Container,
  Card,
  Box,
  useTheme,
  styled,
  Typography,
} from "@mui/material";
import PrimaryBox from "./PrimaryBox";
import StatisticTable from "./StatisticTable";
import WatchListColumn from "./WatchListChat";
import UserStatisticChart from "./UserStatisticChart";
import { userStatisticData, winOverviewData, dashboardData } from "./GameDatas";
import UserPerformance from "./UserPerformance";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { gameStatisticDatas } from "./GameDatas";
import GameDataTable from "./GameDataTable";
import { UserPriorityContext } from "src/contexts/UserPriorityProvider";

function GeneralStatistic() {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState<string>("analytics");
  const { setPriority } = useContext(UserPriorityContext);
  // useEffect(() => {
  //   setPriority(0);
  // },[])

  const tabs = [
    { value: "analytics", label: "Analytics Overview" },
    { value: "taskSearch", label: "Task Search" },
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const func1 = (userID) => {
    alert(userID);
  };
  return (
    <Box>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container>
          <Grid xs={12} item sm={5} md={3}>
            <PrimaryBox data={dashboardData} />
          </Grid>
        </Grid>
        <Grid item md={8} sm={6}></Grid>
        <Grid item xs={6} sx={{ marginTop: "40px" }}>
          <Card sx={{ p: 3 }}>
            <Typography sx={{ fontSize: "24px" }}>General Statistic</Typography>
            <GameDataTable userDatas={gameStatisticDatas} func1={func1} />
          </Card>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "50px" }}>
          <Card
            sx={{
              p: 3,
            }}
          >
            <Box
              mb={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography sx={{ fontSize: "24px" }}>User Statistic</Typography>
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={8} md={8}>
                <UserStatisticChart datas={userStatisticData} />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <UserPerformance datas={dashboardData} />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "50px" }}>
          <WatchListColumn datas={winOverviewData} />
        </Grid>
      </Container>
    </Box>
  );
}

export default GeneralStatistic;
