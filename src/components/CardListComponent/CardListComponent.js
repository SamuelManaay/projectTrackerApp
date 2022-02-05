import React from 'react';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

// Material UI
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CardContent from '@material-ui/core/CardContent';

// JSS
import { ButtonStyles, SpacingStyles } from '../../jss';

const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: theme.spacing(1),
    textAlign: 'left',
  },
}));

const CardListComponent = ({ columns, row }) => {
  const classes = useStyles();
  const buttonClasses = ButtonStyles();
  const spacingClasses = SpacingStyles();

  return (
    <Card>
      <CardContent className={classes.content}>
        <Table className={classes.table}>
          <TableBody>
            {columns.map((column, index) => (
              <TableRow key={row.id + index}>
                <TableCell variant="head">{column.headerName}</TableCell>
                <TableCell variant="body">{row[column.field]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ButtonComponent
          fullWidth={true}
          style={clsx(buttonClasses.buttonPrimary, spacingClasses.marginTop3)}
          function={() => alert(row.id)}
          text={'View'}
        />
      </CardContent>
    </Card>
  );
};

export default CardListComponent;
