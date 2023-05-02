import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import { useState, useRef } from "react";

import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Switch,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import { NotificationManager } from "react-notifications";
import { useGlobalApiClient } from "../../../../core/useApiClient";
import Checkbox from "@mui/material/Checkbox";
import { blue, pink } from "@mui/material/colors";

const emails = ["username@gmail.com", "user02@gmail.com"];

function EditAgentInfoDialog(props) {
  const { onClose, selectedValue, open, userID, currentQuota } = props;
  const quota = useRef<HTMLInputElement>();
  const [isActive, setActive] = useState(true);

  const api = useGlobalApiClient();

  const handleActivate = () => {
    setActive(!isActive);
  };

  const handlePass = () => {
    if (
      !quota.current.value
    ) {
      NotificationManager.warning(
        `Please fill out all inputs`,
        "Invalid Input"
      );
    } else {
      passEditInfo();
    }
  };
 
  const passEditInfo = async () => {
    const { response } = await api.admin_update_agent_post({
      id:userID,
      quota: Number(quota.current.value),
      active:isActive,
    });
    const { success } = await api.admin_update_agent_post({
        id:userID,
        quota:Number(quota.current.value),
        active:isActive,
    });
   
    if (!response) {
      NotificationManager.error(
        `Something went wrong`,
        "Failed"
      );
    } else {
      NotificationManager.success(`The Agent Information Updated`, "Success");
    }
    handleClose();
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle
        sx={{
          fontSize: "25px",
          fontWeight: "bold",
          color: "white",
          pt: "3rem",
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
          Edit Agent Info
        </Typography>
      </DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem sx={{ justifyContent: "space-between" }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography>User ID</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                size="small"
                sx={{ width: "100%" }}
                value={userID}
                disabled
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem sx={{ justifyContent: "space-between" }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography mr={3}>Adjust Quota</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                type="number"
                size="small"
                defaultValue={currentQuota}
                sx={{ width: "100%" }}
                inputRef={quota}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem sx={{ justifyContent: "center" }}>
          <Typography>Activate</Typography>
          <Switch
            sx={{ marginLeft: "40px" }}
            onChange={handleActivate}
            defaultChecked
          />
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

EditAgentInfoDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  userID: PropTypes.string.isRequired,
  currentQuota: PropTypes.number
  // selectedValue: PropTypes.string.isRequired
};

export function EditAgentInfo(props:{ userID:string, quota:number }) {
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
        sx={{ backgroundColor: "#e65100" }}
        disableRipple
        startIcon={<EditIcon />}
        onClick={handleClickOpen}
      >
        <Typography noWrap>Edit Agent Info</Typography>
      </Button>
      <EditAgentInfoDialog currentQuota={props.quota} userID={props.userID} open={open} onClose={handleClose} />
    </>
  );
}

export default EditAgentInfoDialog;

EditAgentInfo.propTypes = {
  userID: PropTypes.string.isRequired,
  currentQuota: PropTypes.number
};
