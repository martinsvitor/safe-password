import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';

import Grid2 from '@mui/material/Unstable_Grid2';
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
  const [inactiveButton, setInactiveButton] = useState(true);

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
      setInactiveButton(false);
    } else {
      setInactiveButton(true);
    }
  }, [checkboxInput]);
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid black',
          borderRadius: 5,
          minWidth: '300px',
        }}
      >
        <Grid2
          container
          spacing={4}
          minHeight={160}
          sx={{
            m: 1.5,
            p: 0.5,
          }}
        >
          <form>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FormControl
                sx={{ m: 1, backgroundColor: 'white' }}
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
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 4,
                flexWrap: 'wrap',
              }}
            >
              <CheckboxInput name='symbol' handleInput={handleCheckboxInput} />
              <CheckboxInput name='number' handleInput={handleCheckboxInput} />
              <CheckboxInput
                name='lowercase'
                handleInput={handleCheckboxInput}
              />
              <CheckboxInput
                name='uppercase'
                handleInput={handleCheckboxInput}
              />
            </Box>
            <Button
              type='submit'
              onClick={handleSubmit}
              variant='contained'
              sx={{ mt: 6 }}
              disabled={inactiveButton}
            >
              {' '}
              Generate Password{' '}
            </Button>
          </form>
        </Grid2>
      </Box>
    </>
  );
};

export default PasswordGenerator;
