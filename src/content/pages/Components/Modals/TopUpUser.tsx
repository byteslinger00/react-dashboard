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
  Switch,
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
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { blue ,pink} from '@mui/material/colors';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function TopUpDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const newName = useRef<HTMLInputElement>(); 

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle  sx={{fontSize:'25px', fontWeight:'bold', color:'white', pt:"3rem"}}>
        <Typography sx={{textAlign:'center', fontSize:'25px', fontWeight:'bold', textShadow:'1px 1px 10px #8c7cf0'}}>TopUp User</Typography>
      </DialogTitle>
      <List sx={{ pt: 0 }}>
          <ListItem sx={{justifyContent:'space-between'}}>
            <Typography mr={3}>UserName</Typography>
            <TextField size='small' sx={{width:'190px'}}/>
          </ListItem>
          <ListItem sx={{justifyContent:'space-between'}}>
            <Typography>User ID</Typography>
            <TextField size='small' sx={{width:'190px'}}/>
          </ListItem>
          <ListItem sx={{justifyContent:'center'}}>
            <Typography>Activate</Typography>
            <Switch sx={{marginLeft:'40px'}} defaultChecked />
          </ListItem>
          <ListItem sx={{justifyContent:'center'}}>
            <Button sx={{marginRight:'70px'}} variant="contained">Confirm</Button>
            <Button onClick={handleClose} variant="contained">Cancel</Button>
          </ListItem>
      </List>
    </Dialog>
  );
}

TopUpDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // selectedValue: PropTypes.string.isRequired
};

function TopUpUser() {
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
      <Button disableRipple startIcon={<DisplaySettingsIcon />} onClick={handleClickOpen}>
        TopUp User
      </Button>
      <TopUpDialog
        // selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}

export default TopUpDialog;
