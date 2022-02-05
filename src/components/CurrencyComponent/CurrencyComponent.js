import React from 'react'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import InputAdornment from '@material-ui/core/InputAdornment';
const CurrencyComponent = (prop) => {
    return (
        <CurrencyTextField
        currencySymbol="₱"
        size={prop.size ? prop.size : undefined}
        style={prop.style}
        inputProps={{
          readOnly: Boolean(prop.readOnly ? true : false),
          disabled: Boolean(prop.disabled ? true : false),
        }}
        fullWidth
        type={prop.type}
        label={prop.label}
        name={prop.name}
        variant={prop.variant ? prop.variant : undefined}
        value={prop.value}
        onChange={prop.handleChange}
        onBlur={prop.onBlur}
        helperText={prop.helperText}
        error={prop.error}
        InputLabelProps={prop.InputLabelProps ? { shrink: prop.InputLabelProps } : undefined}
        InputProps={
          prop.InputProps
            ? {
                endAdornment: <InputAdornment>{prop.icon}</InputAdornment>,
              }
            : undefined
        }
        
        />
    )
}

export default CurrencyComponent
