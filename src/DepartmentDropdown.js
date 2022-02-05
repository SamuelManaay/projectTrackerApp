import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles();

const StatusDropdown = () => {
    const classes = useStyles();

    const dept = [
        {
            id: 1,
            name: 'HR',
        },
        {
            id: 2,
            name: 'IT',
        },
        {
            id: 3,
            name: 'NURSING',
        },

    ];

    return (
        <TextField
            style={{
                background: '#fff',
            }}
            InputProps={{
                className: classes.input,
            }}
            variant="outlined"
            select
            size='small'
            fullWidth
            label={'Status'}
            value={1}
        >
            {dept.map((dpt, index) => (
                <MenuItem key={index} value={dpt.id}>
                    {dpt.name}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default StatusDropdown;
