import { FormControlLabel, Switch } from '@mui/material';
import React from 'react';
import { InputProps } from '../services/types';

const CheckboxInput = ({ name, handleInput }: InputProps) => {
  const capitalize = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const label = capitalize(name);
  return (
    <FormControlLabel
      control={<Switch />}
      label={label}
      name={name}
      onChange={handleInput}
    />
  );
};

export default CheckboxInput;
