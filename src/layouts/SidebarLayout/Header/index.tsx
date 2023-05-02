import { useContext, useEffect, useState, useRef } from "react";

import { NavLink as RouterLink } from "react-router-dom";

import {
  Box,
  alpha,
  Stack,
  lighten,
  Divider,
  IconButton,
  Tooltip,
  styled,
  useTheme,
  Button,
  Card,
  Typography,
} from "@mui/material";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import { SidebarContext } from "src/contexts/SidebarContext";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";

import { isMobile } from "react-device-detect";
import useMediaQuery from "@mui/material/useMediaQuery";
import QuotaBox from "./Quota";

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background-color: ${alpha(theme.header.background, 0.95)};
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);

const HeaderTypograpy = styled(Typography)({
  display: "flex",
  fontSize: "16px",
  marginRight: "10px",
  color: "#52b202",
});

const CarouselTypograpy = styled(Typography)({
  display: "flex",
  fontSize: "16px",
  ml: "0",
  color: "#52b202",
});

function Header() {
  const { sidebarToggle, closeSidebar, toggleSidebar } =
    useContext(SidebarContext);
  const theme = useTheme();
  const matches = useMediaQuery("(min-width:900px)");
  const signmatches = useMediaQuery("(min-width:600px)");
  // const [matches, setMatches] = useState<boolean>(false);
  // useEffect(() => {
  //   let temp = useMediaQuery('(min-width:900px)');
  //   console.log(temp);
  //   setMatches(temp);
  // }, []);

  // const isComponentMounted = useRef(true);

  const signOut = () => {
    window.localStorage.setItem("priority", "none");
    closeSidebar();
  }

  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        boxShadow:
          theme.palette.mode === "dark"
            ? `0 1px 0 ${alpha(
                lighten(theme.colors.primary.main, 0.7),
                0.15
              )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
            : `0px 2px 8px -3px ${alpha(
                theme.colors.alpha.black[100],
                0.2
              )}, 0px 5px 22px -4px ${alpha(
                theme.colors.alpha.black[100],
                0.1
              )}`,
      }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
        spacing={2}
      >
        <QuotaBox />
      </Stack>
      <Box display="flex" alignItems="center">
        {/* <HeaderButtons /> */}
        {/* <HeaderUserbox /> */}
        {signmatches && (
          <Button
            variant="contained"
            component={RouterLink}
            onClick={signOut}
            to="/admin"
          >
            Sign Out
          </Button>
        )}

        <Box
          component="span"
          sx={{
            ml: 2,
            display: { lg: "none", xs: "inline-block" },
          }}
        >
          <Tooltip arrow title="Toggle Menu">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? (
                <MenuTwoToneIcon fontSize="small" />
              ) : (
                <CloseTwoToneIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
