import {
  Typography,
  Button,
  Box,
  alpha,
  lighten,
  Avatar,
  styled,
} from "@mui/material";
import InsightsIcon from "@mui/icons-material/Insights";
import DocumentScannerTwoToneIcon from "@mui/icons-material/DocumentScannerTwoTone";
import AddAlertTwoToneIcon from "@mui/icons-material/AddAlertTwoTone";

const AvatarPageTitle = styled(Avatar)(
  ({ theme }) => `
      width: ${theme.spacing(6)};
      height: ${theme.spacing(6)};
      color: ${theme.colors.primary.main};
      margin-right: ${theme.spacing(2)};
      background: ${
        theme.palette.mode === "dark"
          ? theme.colors.alpha.trueWhite[10]
          : theme.colors.alpha.white[50]
      };
      box-shadow: ${
        theme.palette.mode === "dark"
          ? "0 1px 0 " +
            alpha(lighten(theme.colors.primary.main, 0.8), 0.2) +
            ", 0px 2px 4px -3px rgba(0, 0, 0, 0.3), 0px 5px 16px -4px rgba(0, 0, 0, .5)"
          : "0px 2px 4px -3px " +
            alpha(theme.colors.alpha.black[100], 0.4) +
            ", 0px 5px 16px -4px " +
            alpha(theme.colors.alpha.black[100], 0.2)
      };
`
);

function PageHeader() {
  const user = {
    name: "Catherine Pike",
    avatar: "/static/images/avatars/1.jpg",
  };

  return (
    <Box
      display="flex"
      alignItems={{ xs: "stretch", md: "center" }}
      flexDirection={{ xs: "column", md: "row" }}
      justifyContent="space-between"
      sx={{ backgroundColor: "transparent" }}
    >
      <Box display="flex" alignItems="center">
        {/* <AvatarPageTitle sx={{borderRadius:"0.5rem"}}>
          <InsightsIcon fontSize="large" />
        </AvatarPageTitle> */}
        <Box>
          <Typography
            component="h2"
            sx={{ fontSize: "28px", fontWeight: "bold" }}
          >
            {/* welcome, {user.name}! */}
            General Statistic
          </Typography>
          <Typography variant="subtitle2"></Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default PageHeader;
