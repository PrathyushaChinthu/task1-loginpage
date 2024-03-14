import { Box, Button } from '@mui/material';
import React from 'react';

type Props = {};

const DemoPage = (props: Props) => {
  return (
    <Box sx={{ m: 4 }}>
      <Button variant='contained'>Login</Button>
    </Box>
  );
};

export default DemoPage;
