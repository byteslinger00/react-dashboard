import PropTypes from "prop-types";
import { useState, useRef } from "react";

import { Grid, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Typography from "@mui/material/Typography";
import { NotificationManager } from "react-notifications";
import { useGlobalApiClient } from "../../../../core/useApiClient";

const emails = ["username@gmail.com", "user02@gmail.com"];

function AddAgentDialog(props) {
  const { onClose, selectedValue, open } = props;
  const agentName = useRef<HTMLInputElement>();
  const agentEmail = useRef<HTMLInputElement>();
  const agentPassword = useRef<HTMLInputElement>();
  const agentPasswordConfirm = useRef<HTMLInputElement>();
  const api = useGlobalApiClient();

  const handlePass = () => {
    if (
      !agentName.current.value ||
      !agentEmail.current.value ||
      !agentPassword.current.value ||
      !agentPasswordConfirm.current.value
    ) {
      NotificationManager.warning(
        `Please fill out all inputs`,
        "Invalid Input"
      );
    } else if (
      agentPassword.current.value != agentPasswordConfirm.current.value
    ) {
      NotificationManager.warning(
        `Please input password again`,
        "Password Confirm Error"
      );
    } else {
      passAgentInfo();
    }
  };

  const passAgentInfo = async () => {
    const { response } = await api.admin_create_agent_post({
      email: agentEmail.current.value,
      password: agentPassword.current.value,
      name: agentName.current.value,
    });
    if (response)
      NotificationManager.success(`The Agent Information Added`, "Success");
    else NotificationManager.error(`Something went wrong`, "Failed");
    handleClose();
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{ margin: "0px", padding: "0.5rem" }}
    >
      <DialogTitle
        sx={{
          fontSize: "25px",
          fontWeight: "bold",
          color: "white",
          pt: "4rem",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "bold",
            textShadow: "1px 1px 10px #8c7cf0",
          }}
        >
          Add Agent
        </Typography>
      </DialogTitle>
      <List sx={{ padding: "20px" }}>
        <ListItem>
          <Grid container spacing={0}>
            <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
              <Typography mr={1}>Name</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                size="small"
                sx={{ width: "100%" }}
                inputRef={agentName}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
              <Typography mr={1}>Email</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                size="small"
                sx={{ width: "100%" }}
                inputRef={agentEmail}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
              <Typography mr={1}>Password</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                size="small"
                type="password"
                sx={{ width: "100%" }}
                inputRef={agentPassword}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container>
            <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
              <Typography mr={1}>Confirm</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                size="small"
                type="password"
                sx={{ width: "100%" }}
                inputRef={agentPasswordConfirm}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem sx={{ justifyContent: "center" }}>
          <Button
            sx={{ marginRight: "70px" }}
            variant="contained"
            onClick={handlePass}
          >
            Confirm
          </Button>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );
}

AddAgentDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // selectedValue: PropTypes.string.isRequired
};

export function AddAgent() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <Button 
        variant="contained" 
        sx={{ backgroundColor: "#2e7d32" }}
        disableRipple
        startIcon={<AdminPanelSettingsIcon />}
        onClick={handleClickOpen}
      >
        Add Agent
      </Button>
      <AddAgentDialog
        // selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}

export default AddAgentDialog;
