import { useRoutes, Routes, Route, Navigate, Link    } from 'react-router-dom';
import { useContext } from 'react';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { Box, CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import {NotificationContainer} from 'react-notifications';
import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from './layouts/BaseLayout';
import SignIn from './content/SignIn';
import AdminDashboard from './content/applications/AdminDashboard';
import { UserPriorityContext } from 'src/contexts/UserPriorityProvider';
import AgentManagement from './content/applications/Agent';
import UserManagement from './content/applications/Transactions';


function Main(props:{type:string}) {
  const content = useRoutes(router);
  const {userPriority} = useContext(UserPriorityContext);
  return (
    
    <>
    {props.type=="admin"?(
        <SidebarLayout type="admin">
        <Routes>
            <Route path='/dashboard' element={<AdminDashboard/>}/>
            <Route path='/management/agents' element={<AgentManagement/>}/>
            <Route path='/management/users' element={<UserManagement/>}/>
            <Route path='*' element={<Navigate to={'/admin/app/dashboard'} />} />
        </Routes>
        </SidebarLayout>
    ):(
        <SidebarLayout type="agent">
          <Routes>
            <Route path='*' element={<Navigate to={'/agent/app/management/users'} />} />
          </Routes>        
        </SidebarLayout>
    )}
    </>
    
  );
}
export default Main;
