import React from 'react';

// Material UI
import Button from '@material-ui/core/Button';

const ButtonComponent = (prop) => {
  return (
    <Button
      disabled={prop.disabled}
      fullWidth={prop.fullWidth}
      onClick={prop.function}
      variant={prop.variant ? prop.variant : 'contained'}
      type={prop.type ? prop.type : 'button'}
      size={prop.size ? prop.size : 'small'}
      color={prop.color}
      className={prop.style}
      style={prop.inlineStyle}
      startIcon={prop.icon}
    >
      {prop.text}
    </Button>
  );
};

export default ButtonComponent;
