import { Typography, Button, Grid } from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { AddUser } from "src/content/pages/Components/Modals/AddUser";

function PageHeader() {
  
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{ backgroundColor: "transparent" }}
    >
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          User Manager
        </Typography>
        <Typography variant="subtitle2">
          Manage all users' accounts here.
        </Typography>
      </Grid>
      <Grid item>
        <AddUser/>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
