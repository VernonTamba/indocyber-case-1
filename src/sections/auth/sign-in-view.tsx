import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Alert, Button, Snackbar } from '@mui/material';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const getRandomToken = () => localStorage.getItem('token');

export function SignInView() {
  const router = useRouter();

  const [emailValue, setEmailValue] = useState('');

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showInfoSnackbar, setShowInfoSnackbar] = useState(false);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

  const handleClose = () => {
    setShowSnackbar(false);
  };

  const handleSignIn = useCallback(() => {
    const currentToken = localStorage.getItem('token');

    if (!currentToken) {
      setShowSnackbar(true);
    } else {
      setShowSuccessSnackbar(true);
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }
  }, [router]);

  const handleGenerateKey = useCallback(() => {
    const randomToken = Math.random().toString(36).substring(2);
    localStorage.setItem('token', randomToken);
    setShowInfoSnackbar(true);
  }, []);

  const isEmailValid =
    emailValue.includes('@') && emailValue.trim().length > 0 && emailValue.includes('gmail.com');

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showSnackbar}
        onClose={handleClose}
        autoHideDuration={3000}
        message="No token found! Click the magic link first!"
        key={1}
      >
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
          Token not found! Try clicking the magic link first!
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showInfoSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        key={2}
      >
        <Alert onClose={handleClose} severity="info" variant="filled" sx={{ width: '100%' }}>
          Token is set! You can now login!
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showSuccessSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        key={3}
      >
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
          Token found! Redirecting to main page...
        </Alert>
      </Snackbar>

      <TextField
        fullWidth
        name="email"
        label="Email address"
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
        onChange={(e) => setEmailValue(e.target.value)}
        value={emailValue}
      />
      {!isEmailValid && (
        <Typography variant="body2" color="text.secondary">
          Valid Email:
        </Typography>
      )}
      {emailValue.trim().length <= 0 && (
        <Typography variant="body2" color="text.secondary">
          ❌ Must not be empty
        </Typography>
      )}
      {!emailValue.includes('@') && (
        <Typography variant="body2" color="text.secondary">
          ❌ Includes &quot;@&quot;
        </Typography>
      )}
      {!emailValue.includes('gmail.com') && (
        <Typography variant="body2" color="text.secondary">
          ❌ Includes &quot;gmail.com&quot;
        </Typography>
      )}
      <Button
        sx={{ mb: 3, mt: 3 }}
        fullWidth
        variant="contained"
        onClick={handleGenerateKey}
        disabled={!isEmailValid}
      >
        Magic Link 🔗
      </Button>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignIn}
      >
        Sign in
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Enter your email address and click the magic link button!
        </Typography>
      </Box>

      {renderForm}
    </>
  );
}
