import React from 'react';

// Material UI
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const DropdownComponent = ({ label, variant, name, value, handleChange, onBlur, datas, disabled }) => {
  return (
    <TextField
      label={label ? label : ''}
      style={{
        background: '#fff',
      }}
      size="small"
      variant={variant ? variant : undefined}
      select
      fullWidth
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      disabled = {disabled}
    >
      {datas &&
        datas.map((data, index) => (
          <MenuItem key={index} value={data.Description}>
            {data.Description}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default DropdownComponent;
