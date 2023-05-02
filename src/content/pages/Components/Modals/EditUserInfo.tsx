import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import { useState, useRef, HtmlHTMLAttributes } from "react";
import { useConfirm } from "material-ui-confirm";

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

function EditUserInfoDialog(props) {
  const { onClose, selectedValue, open, userID, balance } = props;
  const newName = useRef<HTMLInputElement>();
  const newEmail = useRef<HTMLInputElement>();
  const newCredit = useRef<HTMLInputElement>();
  const [newPassword, setNewPassword] = useState("");
  const [isActive, setActive] = useState(true);

  const confirm = useConfirm();

  const api = useGlobalApiClient();

  const handleActivate = () => {
    setActive(!isActive);
  };

  const handlePass = () => {
    if (
      !newEmail.current.value || !newCredit.current.value
    ) {
      NotificationManager.warning(
        `Please fill out all inputs`,
        "Invalid Input"
      );
    } else if (! newPassword) {
      passEditInfoWithoutPass();
    } else {
      passEditInfo();
    }
  };
  // id: string;
  // password?: string;
  // email?: string;
  // username?: string;
  // active?: boolean;
  const passEditInfo = async () => {
    const { response } = await api.agent_update_user_post({
      id: userID,
      password: newPassword,
      email: newEmail.current.value,
      active: isActive,
    });
   
    if (!response) {
      NotificationManager.error(
        `Please input correct user id`,
        "User does not exist"
      );
    } else {
        const { response } = await api.credit_update_credit_post({
          ownerId: userID,
          balance: newCredit.current.value ? Number(newCredit.current.value) : 0,
        });
        if(!response) {
          NotificationManager.error(
            `Please input correct user id`,
            "User does not exist"
          );
        } else NotificationManager.success(`The User Information Updated`, "Success");
    }
    handleClose();
  };

  const passEditInfoWithoutPass = async () => {
    const { response } = await api.agent_update_user_post({
      id: userID,
      email: newEmail.current.value,
      active: isActive,
    });
   
    if (!response) {
      NotificationManager.error(
        `Please input correct user id`,
        "User does not exist"
      );
    } else {
      const { response } = await api.credit_update_credit_post({
        ownerId: userID,
        balance: newCredit.current.value ? Number(newCredit.current.value) : 0,
      });
      if(!response) {
        NotificationManager.error(
          `Please input correct user id`,
          "User does not exist"
        );
      } else NotificationManager.success(`The User Information Updated`, "Success");
    }
    handleClose();
  };

  const handleConfirm = () => {
    confirm({ description: "You want to change the user's password?" })
      .then(() => {
        handleGeneratePassword();
      })
      .catch(() => {
      });
  }

  const handleGeneratePassword = async () => {
    const { response } = await api.auth_generate_password_post({userId:userID});
    if (!response) {
      NotificationManager.error(
        `Something went wrong`,
        "Failed"
      );
    } else {
      setNewPassword(response.password);
      NotificationManager.success(`New Password : `+response.password, "Success");
    }
  }

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
          Edit User Info
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
              <Typography>New Email</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                size="small"
                sx={{ width: "100%" }}
                inputRef={newEmail}
              />
            </Grid>
          </Grid>
        </ListItem>
        <ListItem sx={{ justifyContent: "space-between" }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography>Balance</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                size="small"
                sx={{ width: "100%" }}
                inputRef={newCredit}
                defaultValue={balance}
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
        <ListItem sx={{ justifyContent: "space-between" }}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Button sx={{ width:"100%" }} onClick={handleConfirm} variant="contained">
                New Password
              </Button>
            </Grid>
            <Grid item md={6}>
              <Button
                sx={{ width:"100%" }}
                variant="contained"
                onClick={handlePass}
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Dialog>
  );
}

EditUserInfoDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  userID: PropTypes.string.isRequired,
  balance: PropTypes.number
  // selectedValue: PropTypes.string.isRequired
};

export function EditUserInfo(props) {
  const { userID, balance } = props;
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
        <Typography noWrap>Edit User Info</Typography>
      </Button>
      <EditUserInfoDialog userID={userID} balance={balance} open={open} onClose={handleClose} />
    </>
  );
}

export default EditUserInfoDialog;

EditUserInfo.propTypes = {
  userID: PropTypes.string.isRequired,
  balance: PropTypes.number
};
