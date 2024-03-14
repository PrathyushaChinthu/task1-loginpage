'use client';
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

type Props = {};

const DemoPage = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = React.useState(0);

  const toggleDialog = () => {
    setOpen(!open);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ m: 4 }}>
      <Button variant='contained' onClick={toggleDialog}>
        Login
      </Button>
      <Dialog open={open} fullWidth onClose={toggleDialog}>
        <DialogTitle>Welcome</DialogTitle>
        <DialogContent>
          <Box>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label='Login' />
              <Tab label='Signup' />
            </Tabs>
            {tabValue === 0 && <div>Login Form</div>}
            {tabValue === 1 && <div>Signup Form</div>}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DemoPage;
