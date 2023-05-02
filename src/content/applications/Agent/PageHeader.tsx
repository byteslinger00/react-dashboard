import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { AddAgent } from 'src/content/pages/Components/Modals/AddAgent';

function PageHeader() {
  const user = {
    name: 'Agent1',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Agent Manager
        </Typography>
        <Typography variant="subtitle2">
          Manage all agents' accounts here.  
        </Typography>
      </Grid>
      <Grid item>
        <AddAgent/>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
