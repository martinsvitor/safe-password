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
import CheckboxInput from './CheckboxInput';

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(20);
  const [newPassword, setNewPassword] = useState('');
  const [checkboxInput, setCheckboxInput] = useState({
    symbol: false,
    number: false,
    lowercase: false,
    uppercase: false,
  });
  const [showPassword, setShowPassword] = useState(true);
  const [activeButton, setActiveButton] = useState(true);

  const handleCheckboxInput = (event: React.SyntheticEvent) => {
    setCheckboxInput({
      ...checkboxInput,
      [(event.target as HTMLInputElement).name]: (
        event.target as HTMLInputElement
      ).checked,
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    Password.getPasswordConfig(checkboxInput, passwordLength);
    setNewPassword(Password.createPassword());
  };

  useEffect(() => {
    if (
      checkboxInput.symbol ||
      checkboxInput.number ||
      checkboxInput.lowercase ||
      checkboxInput.uppercase
    ) {
      setActiveButton(false);
    } else {
      setActiveButton(true);
    }
  }, [checkboxInput]);
  return (
    <>
      <pre>
        {JSON.stringify(newPassword)} {JSON.stringify(passwordLength)}{' '}
        {JSON.stringify(checkboxInput)} {JSON.stringify(showPassword)}{' '}
        {JSON.stringify(activeButton)}
      </pre>
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
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              name='generatedPassword'
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleShowPassword}
                    edge='end'
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
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
              value={passwordLength}
              onChange={(e) => {
                setPasswordLength(Number(e.currentTarget.value));
              }}
              label='Password Length'
            />
          </FormControl>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CheckboxInput name='symbol' handleInput={handleCheckboxInput} />
            <CheckboxInput name='number' handleInput={handleCheckboxInput} />
            <CheckboxInput name='lowercase' handleInput={handleCheckboxInput} />
            <CheckboxInput name='uppercase' handleInput={handleCheckboxInput} />
          </Box>
          <Button
            type='submit'
            onClick={handleSubmit}
            sx={{ mt: 6 }}
            disabled={activeButton}
          >
            {' '}
            Generate Password{' '}
          </Button>
        </form>
      </Box>
    </>
  );
};

export default PasswordGenerator;
