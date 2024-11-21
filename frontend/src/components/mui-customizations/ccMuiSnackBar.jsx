import React, {useState} from 'react';
import {Box, Button} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useAuth } from 'auths/hooks/authHook';
import { useMessage } from 'messages/messageContext';


const CCMuiSnackBar = () => {
  const { isProfile } = useAuth();
  const { message } = useMessage();

  const checkHaveMessage = message && 
  message.find(message => message.success)?.success || null

  const [state, setState] = useState({
    open: true,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <>
      {
        checkHaveMessage 
        ?
          <Box sx={{ width: 500 }}>
            <Snackbar 
              open={open} 
              anchorOrigin={{ vertical, horizontal }} 
              autoHideDuration={3000} 
              onClose={handleClose}
              // message="I love snacks"
              key={vertical + horizontal}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
              >
                {message && message.find(message => message.success)?.success}
              </Alert>
            </Snackbar>
          </Box>
        : ''
      }
    </>
  );
}

export default CCMuiSnackBar;
