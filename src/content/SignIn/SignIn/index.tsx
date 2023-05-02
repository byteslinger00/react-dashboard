import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  Switch,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";

import { Navigate, Link as RouterLink, useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";

import { UserPriorityContext } from "src/contexts/UserPriorityProvider";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { ApiException } from "src/core/api-clients";
import { useGlobalApiClient } from "src/core/useApiClient";

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const TsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #dfebf6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

function Hero(props: { admin: Boolean; agent: Boolean }) {
  const navigate = useNavigate();
  const email = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();
  const api = useGlobalApiClient();
  const { userPriority, setPriority } = useContext(UserPriorityContext);

  useEffect(() => {
    window.localStorage.setItem("priority", "none");
  }, []);

  const handlePass = () => {
    if (!email.current.value || !password.current.value) {
      NotificationManager.warning(
        `Please fill out all inputs`,
        "Invalid Input"
      );
    } else {
      passLogIn();
    }
  };

  const passLogIn = async () => {
    if (props.admin == true) {
      const { response, success } = await api.auth_admin_login_post({
        email: email.current.value,
        password: password.current.value,
      });

      if (success) {
        NotificationManager.success(`Successfully logged in`, "Success");
          // window.localStorage.setItem("priority", "admin");
          setPriority(response.userClaim.id?response.userClaim.id:"");
          navigate("/admin/app");
      } else
        NotificationManager.error(
          `Please input correct email and password.`,
          "Wrong email and password!"
        );
    } else if (props.agent == true) {
      const { response, success } = await api.auth_agent_login_post({
        email: email.current.value,
        password: password.current.value,
      });
      if (success) {
        NotificationManager.success(`Successfully logged in`, "Success");
          // window.localStorage.setItem("priority", "agent1");
          // setPriority(2);
          navigate("/agent/app");
      } else
        NotificationManager.error(
          `Please input correct email and password.`,
          "Wrong email and password!"
        );
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid
        spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={8} mx="auto">
          <img
            src="/lock-icon.png"
            style={{ borderRadius: "150px", width: "180px" }}
          />
          <Box p={0} display="grid">
            <Box mt={2}>
              <Typography textAlign="left">Email</Typography>
              <TextField
                required
                InputLabelProps={{ shrink: false }}
                inputRef={email}
                id="outlined-required"
              />
            </Box>
            <Box mt={2}>
              <Typography textAlign="left">Password</Typography>
              <TextField
                id="outlined-password-input"
                InputLabelProps={{ shrink: false }}
                type="password"
                inputRef={password}
                autoComplete="current-password"
              />
            </Box>
          </Box>
          <Button
            // component={RouterLink}
            // to="/management/transactions"
            onClick={handlePass}
            size="large"
            sx={{ width: { xs: "100%", md: "100%" }, marginTop: "30px" }}
            variant="contained"
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
