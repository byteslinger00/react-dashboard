import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  TextField
} from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { blue ,pink} from '@mui/material/colors';
import { useGlobalApiClient } from 'src/core/useApiClient';
import {NotificationManager} from 'react-notifications';

const emails = ['username@gmail.com', 'user02@gmail.com'];
// agent_create_user_post

// email: string;
// password: string;
// username?: string;
// credit_account?: CreditAccount;
function AddUserDialog(props) {
  const { onClose, selectedValue, open } = props;
  const userName = useRef<HTMLInputElement>();
  const userEmail = useRef<HTMLInputElement>();
  const [newPassword, setNewPassword] = useState("");
  const userPasswordConfirm = useRef<HTMLInputElement>();

  const api = useGlobalApiClient(); 
  
  const handlePass = () => {
    if(!userName.current.value || !userEmail.current.value) {
      NotificationManager.warning(`Please fill out all inputs`, "Invalid Input")
    } else {
      passUserInfo();
    }
  }

  const passUserInfo = async () => {
    const {response} = await api.agent_create_user_post({
      email: userEmail.current.value, 
      name:userName.current.value,
      headImage: "Initial-image",
      credit_account: {
        balance: 0
      }
    });
    if(response) NotificationManager.success(`The User Information Added`, "Success");
    else NotificationManager.error(`Something went wrong`, "Failed");
    handleClose();
  }

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{margin:"0px", padding:"0.5rem"}}>
      <DialogTitle  sx={{fontSize:'25px', fontWeight:'bold', color:'white', pt:"4rem"}}>
        <Typography sx={{textAlign:'center', fontSize:'25px', fontWeight:'bold', textShadow:'1px 1px 10px #8c7cf0'}}>Add User</Typography>
      </DialogTitle>
      <List sx={{ pt: 0 }}>
          <ListItem sx={{justifyContent:'space-between'}}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography mr={1}>Name</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField size='small' sx={{width:'100%'}} inputRef={userName}/>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{justifyContent:'space-between'}}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography mr={1}>Email</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField size='small' sx={{width:'100%'}} inputRef={userEmail}/>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{ justifyContent: "center", marginTop:'15px' }}>
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

AddUserDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // selectedValue: PropTypes.string.isRequired
};

export function AddUser() {
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
      <Button variant="contained" sx={{ backgroundColor: "#2e7d32" }} disableRipple startIcon={<PersonAddAltIcon />} onClick={handleClickOpen}>
        Add User
      </Button>
      <AddUserDialog
        // selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}

export default AddUserDialog;
