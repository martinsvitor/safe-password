import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Switch,
  TextField,
} from '@mui/material';

import React, { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { Password } from '../services/Password-logic';

const PasswordGenerator = () => {
  const [passwordConfig, setPasswordConfig] = useState({
    generatedPassword: '',
    passwordLength: 20,
    symbol: false,
    number: false,
    lowerCase: false,
    upperCase: false,
    showPassword: true,
  });
  const [activateButton, setActivateButton] = useState(true);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfig({
      ...passwordConfig,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckbox = (event: React.SyntheticEvent) => {
    setPasswordConfig({
      ...passwordConfig,
      [(event.target as HTMLInputElement).name]: (
        event.target as HTMLInputElement
      ).checked,
    });
  };
  useEffect(() => {
    if (
      passwordConfig.symbol ||
      passwordConfig.number ||
      passwordConfig.lowerCase ||
      passwordConfig.upperCase
    ) {
      setActivateButton(false);
    } else {
      setActivateButton(true);
    }
  }, [passwordConfig]);
  const handleShowPassword = () => {
    setPasswordConfig({
      ...passwordConfig,
      showPassword: !passwordConfig.showPassword,
    });
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    Password.getPasswordConfig(passwordConfig);
    const newPassword = Password.createPassword();
    setPasswordConfig({ ...passwordConfig, generatedPassword: newPassword });
  };

  return (
    <>
      <Box
        sx={{
          m: 10,
          p: 5,
          width: 300,
          height: 400,
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'flex-start',
          border: '1px solid black',
          borderRadius: 5,
          flexWrap: 'wrap',
        }}
      >
        <form>
          <FormControl
            sx={{ m: 1, width: '25ch', backgroundColor: 'white' }}
            variant='outlined'
          >
            <InputLabel htmlFor='outlined-adornment-password'>
              Random Password
            </InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={passwordConfig.showPassword ? 'text' : 'password'}
              value={passwordConfig.generatedPassword}
              name='generatedPassword'
              onChange={handleInput}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleShowPassword}
                    edge='end'
                  >
                    {passwordConfig.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>
          <FormControl>
            <TextField
              type='number'
              name='passwordLength'
              value={passwordConfig.passwordLength}
              onChange={handleInput}
              label='Password Length'
            />
          </FormControl>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <FormControlLabel
              control={<Switch />}
              label='Symbol'
              name='symbol'
              onChange={handleCheckbox}
            />
            <FormControlLabel
              control={<Switch />}
              label='Number'
              name='number'
              onChange={handleCheckbox}
            />
            <FormControlLabel
              control={<Switch />}
              label='Lowercase'
              name='lowerCase'
              onChange={handleCheckbox}
            />
            <FormControlLabel
              control={<Switch />}
              label='Uppercase'
              name='upperCase'
              onChange={handleCheckbox}
            />
          </Box>
          <Button
            type='submit'
            onClick={handleSubmit}
            sx={{ mt: 6 }}
            disabled={activateButton}
          >
            {' '}
            Generate Password{' '}
          </Button>
        </form>
      </Box>
    </>
  );
};

{
  /* <div>

<Box
component='form'
sx={{
m: 10,
width: 300,
height: 400,
backgroundColor: 'primary.light',
}}>
    <TextField
    id='outlined-read-only-input'
    label='Read Only'
    defaultValue='Hello World'
    placeholder='Generated password...'
    value={passwordConfig.generatedPassword}
    InputProps={{
        readOnly: true,
    }}
/>
<div>Password Generator</div>
</Box>
</div> */
}
export default PasswordGenerator;
