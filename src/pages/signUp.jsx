import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isManager, setIsManager] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsManager(event.target.checked);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   fetch('/register', {
  //   method: 'POST',
  //   headers: {
  //   'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //     isManager: isManager
  //   })
  //   })
  //   .then((response) => {
  //     if (!response.ok) {
  //     throw new Error('An error occurred while registering the user');
  //   }
  //   return response.text();
  //   })
  //   .then((data) => {
  //     navigate('/login');
  //   })
  //   .catch((error) => {
  //   setError('Wrong email or password');
  //   });
  //  };



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
  
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
  
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        isManager: isManager
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('An error occurred while registering the user');
        }
        return response.text();
      })
      .then((data) => {
        navigate('/login');
      })
      .catch((error) => {
        setError('Wrong email or password');
      });
  };
  
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />

              {error && (
              <FormHelperText error>{error}</FormHelperText>
              )}
              </Grid>

              <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isManager"
                    color="primary"
                    checked={isManager}
                    onChange={handleCheckboxChange}
                  />
                }
                label="I am a manager"
              />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick={handleClick}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}