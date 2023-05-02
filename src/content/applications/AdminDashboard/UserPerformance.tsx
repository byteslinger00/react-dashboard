import {
  Grid,
  Card,
  Box,
  CardContent,
  Typography,
  Avatar,
  useTheme,
  LinearProgress,
  styled
} from '@mui/material';
import RadioIcon from '@mui/icons-material/Radio';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';
import CancelPresentationTwoToneIcon from '@mui/icons-material/CancelPresentationTwoTone';
import {dashboardData} from './GameDatas';
import { FristStatiscData } from 'src/models/crypto_order';

const RootWrapper = styled(Card)(
  ({ theme }) => `
    background: ${theme.colors.gradients.green1};
    color: ${theme.colors.alpha.white[100]};
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const AvatarError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.main};
      color: ${theme.palette.error.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.error};
`
);

const TypographySecondary = styled(Typography)(
  ({ theme }) => `
      color: ${theme.colors.alpha.white[70]};
`
);

const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
        flex-grow: 1;
        margin-right: ${theme.spacing(1)};
        height: 10px;
        background-color: ${theme.colors.error.main};

        .MuiLinearProgress-barColorPrimary {
          background-color: ${theme.colors.alpha.white[100]};
          border-top-right-radius: ${theme.general.borderRadius};
          border-bottom-right-radius: ${theme.general.borderRadius};
        }
`
);

interface UserPerformanceProps{
  datas: FristStatiscData;
}

function UserPerformance({datas}:UserPerformanceProps) {

  const theme = useTheme();
  return (
    <Card
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around"
      }}
    >
      <Grid
        container
        display="flex"
        direction={'column'}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#cbccd2"
          }}
        >
          User Active
        </Typography>
        <Box
          sx={{
            fontSize: "14px"
          }}
          display={'flex'}
          flexDirection={'row'}
        >
          &nbsp;&nbsp;&nbsp;
          <Typography
            sx={{ color: "green" }}
          >
            (+23)
          </Typography>
          &nbsp;
          <Typography>
            than lastweek
          </Typography>
        </Box>
      </Grid>
      <Grid
        container
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-around'}
        sx={{
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem"
        }}
      >
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          sx={{mb:0.5}}
        >
          <Box
            sx={{
              width: "30px",
              height: "30px",
              padding: "0.25rem",
              backgroundColor: "#0075FF",
              borderRadius: "0.5rem"
            }}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <RadioIcon />
          </Box>
          &nbsp;&nbsp;&nbsp;
          <Typography>
            Today Players
          </Typography>
        </Box>
        <Box>
          <Typography>
            {datas.toPyNum}
          </Typography>
          <LinearProgress
            value={65}
            color="primary"
            variant="determinate"
          />
        </Box>
      </Grid>
      <Grid
        container
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        sx={{
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem"
        }}
      >
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          sx={{mb:0.5}}
        >
          <Box
            sx={{
              width: "30px",
              height: "30px",
              padding: "0.25rem",
              backgroundColor: "#0075FF",
              borderRadius: "0.5rem"
            }}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <MilitaryTechIcon />
          </Box>
          &nbsp;&nbsp;&nbsp;
          <Typography>
            Today Winnigs
          </Typography>
        </Box>
        <Box>
          <Typography>
            {datas.toPyWinNum}
          </Typography>
          <LinearProgress
            value={70}
            color="primary"
            variant="determinate"
          />
        </Box>
      </Grid>
    </Card>
  );
}

export default UserPerformance;
