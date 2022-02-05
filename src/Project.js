import React, { Suspense, lazy, useState } from 'react';

// Material UI
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';

import CircularProgress from '@material-ui/core/CircularProgress';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { DataGrid } from '@material-ui/data-grid';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';

// JSS
import { ButtonStyles, TypographyStyles, SpacingStyles, TextFieldStyles } from './jss';

// Formik
import { Formik, FieldArray } from 'formik';

// Lazy Load
const DialogFormFilled = lazy(() => import('./Demo/DialogFormFilled'));
const DialogFormNormal = lazy(() => import('./Demo/DialogFormNormal'));
const DialogFormOutlined = lazy(() => import('./Demo/DialogFormOutlined'));
const TextFieldComponent = lazy(() => import('./components/TextFieldComponent/TextFieldComponent'));
const ButtonComponent = lazy(() => import('./components/ButtonComponent/ButtonComponent'));
const DatePickerComponent = lazy(() => import('./components/DatePickerComponent/DatePickerComponent'));
const DropdownComponent = lazy(() => import('./components/DropdownComponent/DropdownComponent'));
const SearchComponent = lazy(() => import('./components/SearchComponent/SearchComponent'));

const useStyles = makeStyles(() => ({
  icon: {
    height: 32,
    width: 32,
  },
}));

export default function Demo() {
  const classes = useStyles();
  const buttonClasses = ButtonStyles();
  const spacingClasses = SpacingStyles();
  const typographyClasses = TypographyStyles();
  const textFieldClasses = TextFieldStyles();

  const isLoading = false;
  const [openAdFormFilledDialog, setAddDialogFormFilledOpen] = React.useState(false);
  const [openAdFormOutlinedDialog, setAddDialogFormOutlinedOpen] = React.useState(false);
  const [openAdFormNormalDialog, setAddDialogFormNormalOpen] = React.useState(false);

  

  const [selectedDate, handleDateChange] = useState(new Date());
  const [dtopen, setDtOpen] = useState(false);

  const TextFieldComponent = (props) => {
    const textFieldClasses = TextFieldStyles();
    return (
      <TextField
        style={{
          background: '#fff',
        }}
        {...props}
        disabled={true}
        size="small"
        className={textFieldClasses.datepicker}
        inputProps={{ style: { cursor: 'pointer' } }}
      />
    );
  };

  const openAddFormFilledDialog = () => {
    setAddDialogFormFilledOpen(true);
  };

  const openAddFormOutlinedDialog = () => {
    setAddDialogFormOutlinedOpen(true);
  };
  const openAddFormNormalDialog = () => {
    setAddDialogFormNormalOpen(true);
  };

  var timeFrom = (X) => {
    var dates = [];
    for (let I = 0; I < Math.abs(X); I++) {
      dates.push(new Date(new Date().getTime() - ((X >= 0 ? I : (I - I - I)) * 24 * 60 * 60 * 1000)).toLocaleString());
    }
    return dates;
  }
  const gendate = timeFrom(-7);
  // console.log(gendate); // Future 7 Days

  function createDates(dateString) {
    let baseDate = new Date(dateString);
    const dateList = [];
    for (var i = 0; i < 6; i++) {
      if (i == 0) {
        dateList.push(baseDate.toLocaleDateString());
      }

      const newDate = new Date(baseDate);
      baseDate = newDate;

      baseDate.setDate(baseDate.getDate() + 1);

      dateList.push(baseDate.toLocaleDateString())
    }

    return dateList;
  }
  const gendate2 = createDates(selectedDate);

  // const handleEditRowsModelChange = React.useCallback((model) => {
  //   setEditRowsModel(model);
  //   console.log(model)
  // }, []);
  const [id, setID] = React.useState({});
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editRowData, setEditRowData] = React.useState({});

  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      setID(editedIds)
      if (editedIds.length === 0) {
        console.log(editRowData, "expected output")
        // alert(JSON.stringify(editRowData, null, 4));
        // update on firebase
      } else {
        setEditRowData(model[editedIds[0]]);
      }
      console.log(editedIds, "ID's")
      setEditRowsModel(model);

    },
    [editRowData]
  );
console.log(editRowData)
console.log(editRowsModel, "MODEL HERE")




  const columns = [
    { field: 'Date', headerName: 'Attendance Date', width: 200, editable: false },
    { field: 'num1', headerName: 'Number 1', width: 200, type: 'number', editable: true},
    { field: 'num2', headerName: 'Number 2', width: 200, type: 'number', editable: true },
    { field: 'num3', headerName: 'Number 3', width: 200, type: 'number', editable: true },
    { field: 'num4', headerName: 'Number 4', width: 200, type: 'number', editable: true },
    { field: 'num5', headerName: 'Number 5', width: 200, type: 'number', editable: true },

  ];


  const rows = [
    {
      id: 1,
      Date: '',
      num1: 20,
      num2: 10,
      num3: 0,
      num4: 0,
      num5: 0,
    },
    {
      id: 2,
      Date: '',
      num1: 80,
      num2: 0,
      num3: 0,
      num4: 30,
      num5: 0,
    },
    {
      id: 3,
      Date: '',
      num1: 31,
      num2: 0,
      num3: 0,
      num4: 0,
      num5: 50,
    },
    {
      id: 4,
      Date: '',
      num1: 46,
      num2: 20,
      num3: 20,
      num4: 0,
      num5: 0,
    },
    {
      id: 5,
      Date: '',
      num1: 22,
      num2: 0,
      num3: 0,
      num4: 0,
      num5: 0,
    },
    {
      id: 61,
      num1: 200,
      num2: 30,
      num3: 0,
      num4: 0,
      num5: 0,
    },
    {
      id: 7,
      Date: '',
      num1:20,
      num2: 0,
      num3: 0,
      num4: 10,
      num5: 0,
    },
  ];

  const [data1, setData] = React.useState(rows);
  gendate2.forEach((element, index) => {
    rows[index].Date = element;
  });


  function num1total(item) {
    return item.num1;
  }

  function sumnum1(prev, next) {
    return prev + next;
  }
  rows.map(num1total).reduce(sumnum1);
  const total1 = rows.map(item => item.num1).reduce((prev, next) => prev + next);

  function num2total(item) {
    return item.num2;
  }

  function sumnum2(prev, next) {
    return prev + next;
  }
  rows.map(num2total).reduce(sumnum2);
  const total2 = rows.map(item => item.num2).reduce((prev, next) => prev + next);

  function num3total(item) {
    return item.num3;
  }

  function sumnum3(prev, next) {
    return prev + next;
  }

  rows.map(num3total).reduce(sumnum3);
  const total3 = rows.map(item => item.num3).reduce((prev, next) => prev + next);


  function num4total(item) {
    return item.num3;
  }

  function sumnum4(prev, next) {
    return prev + next;
  }
  rows.map(num4total).reduce(sumnum4);
  const total4 = rows.map(item => item.num4).reduce((prev, next) => prev + next);


  function num5total(item) {
    return item.num3;
  }

  function sumnum5(prev, next) {
    return prev + next;
  }
  rows.map(num5total).reduce(sumnum5);
  const total5 = rows.map(item => item.num5).reduce((prev, next) => prev + next);

  const array = [total1, total2, total3, total4, total5];
  console.log(array, "array here");



  const columns2 = [
    { field: 'Date', headerName: ' ', width: 200, editable: false },
    { field: 'num1', headerName: 'Total for Num 1', width: 200, type: 'number', editable: false},
    { field: 'num2', headerName: 'Total for Num 2', width: 200, type: 'number', editable: false },
    { field: 'num3', headerName: 'Total for Num 3', width: 200, type: 'number', editable: false },
    { field: 'num4', headerName: 'Total for Num 4', width: 200, type: 'number', editable: false },
    { field: 'num5', headerName: 'Total for Num 5', width: 200, type: 'number', editable: false },

  ];
  const rows2 = [
    {
      id: 1,
      Date: '',
      num1: total1,
      num2: total2,
      num3: total3,
      num4: total4,
      num5: total5,
    }
  ];

const objIndex = data1.findIndex((obj => obj.id == id));
console.log(objIndex, "INDEX HERE")

  return (
    <div>
      <Suspense fallback={<CircularProgress color="inherit" size={50} style={{ marginTop: 30 }} />}>
        <Grid container spacing={2} className={spacingClasses.marginBottom2}>
          <Grid item lg={8} md={7} sm={6} xs={12}>
            <Typography variant="h3" className={typographyClasses.fontBold}>
              Project
            </Typography>
          </Grid>
        </Grid>



        <Grid container spacing={2}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid container spacing={2} className={spacingClasses.marginBottom2}>

              <Grid item lg={10} md={6} sm={12} xs={12}>
                <SearchComponent />
              </Grid>
              <Grid item lg={2} md={6} sm={12} xs={12}>
                {/* <DatePickerComponent /> */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    error={false}
                    helperText={null}
                    autoOk
                    fullWidth
                    inputVariant="outlined"
                    value={selectedDate}
                    onChange={handleDateChange}
                    format="MM/dd/yyyy"
                    TextFieldComponent={TextFieldComponent}
                    onClick={() => setDtOpen(!dtopen)}
                    open={dtopen}
                    onClose={() => setDtOpen(false)}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>


            {isLoading ? (
              <LinearProgress />
            ) : rows && rows.length > 0 ? (
              <div style={{ height: 490, width: '100%' }}>
                <DataGrid
                  rows={data1}
                  columns={columns}
                  // editRowsModel={editRowsModel}
                  // onCellEditCommit={handleEditRowsModelChange}
                  editRowsModel={editRowsModel}
                  onEditRowsModelChange={handleEditRowsModelChange}
                />
                {/* <DataGrid rows={rows}
                 columns={columns} 
                 pageSize={7} 
                 editRowsModel={editRowsModel}
                 onEditRowsModelChange={handleEditRowsModelChange}
                 /> */}
              </div>
            ) : (
              <Typography variant="h6">No Employee Data Available...</Typography>
            )}
          </Grid>

        </Grid>

      </Suspense>

      <div style={{ height:200, width: '100%' }}>
        <DataGrid rows={rows2} columns={columns2} />
      </div>
    </div>
  );
            }
// }
// import React from 'react';

// import DataGrid, {
//   Column,
//   Editing,
//   Paging,
//   Selection,
//   Lookup,
//   Toolbar,
//   Item,
// } from 'devextreme-react/data-grid';

// import { Button } from 'devextreme-react/button';

// import ArrayStore from 'devextreme/data/array_store';
// import DataSource from 'devextreme/data/data_source';
// import { employees, states } from './data.js';

// const dataSource = new DataSource({
//   store: new ArrayStore({
//     data: employees,
//     key: 'ID',
//   }),
// });
// const [test,UseTest]

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedItemKeys: [],
//     };
//     this.selectionChanged = this.selectionChanged.bind(this);
//     this.deleteRecords = this.deleteRecords.bind(this);
//   }
  

//   render() {
//     return (
//       <div id="data-grid-demo">
//         <DataGrid id="gridContainer"
//           dataSource={dataSource}
//           showBorders={true}
//           selectedRowKeys={this.state.selectedItemKeys}
//           onSelectionChanged={this.selectionChanged}
//         >
//           <Selection mode="multiple" />
//           <Paging enabled={false} />
//           <Editing
//             mode="cell"
//             allowUpdating={true}
//             allowAdding={true}
//             allowDeleting={true} />

//           <Column dataField="Prefix" caption="Title" width={55} />
//           <Column dataField="FirstName" />
//           <Column dataField="LastName" />
//           <Column dataField="Position" width={170} />
//           <Column dataField="StateID" caption="State" width={125}>
//             <Lookup dataSource={states} valueExpr="ID" displayExpr="Name" />
//           </Column>
//           <Column dataField="BirthDate" dataType="date" />
//           <Toolbar>
//             <Item name="addRowButton" showText="always" />
//             <Item location="after">
//               <Button
//                 onClick={this.deleteRecords}
//                 icon="trash"
//                 disabled={!this.state.selectedItemKeys.length}
//                 text="Delete Selected Records" />
//             </Item>
//           </Toolbar>
//         </DataGrid>
//       </div>
//     );
//   }

//   deleteRecords() {
//     this.state.selectedItemKeys.forEach((key) => {
//       dataSource.store().remove(key);
//     });
//     this.setState({
//       selectedItemKeys: [],
//     });
//     dataSource.reload();
//   }

//   selectionChanged(data) {
//     this.setState({
//       selectedItemKeys: data.selectedRowKeys,
//     });
//   }
// }

// export default App;

// import * as React from 'react';
// import { DataGrid, GridCellEditCommitParams, GridRowModel } from '@mui/x-data-grid';
// import {
//   randomCreatedDate,
//   randomTraderName,
//   randomUpdatedDate,
// } from '@mui/x-data-grid-generator';
// import '@mui/x-data-grid';

// export default function BasicEditingGrid() {
// const [state, setState] = React.useState<GridRowModel[]>(rows);
// const handleCommit = (GridCellEditCommitParams)=>{
//   const array = rows.map(r=>{
//     if(r.id === e.id){
//       return {...r,[e.field]:e.value}
//     }
//     else{
//       return{...r}
//     }
//   });
//   setState(array);
//   } 
  
//   return (
//     <div style={{ height: 300, width: '100%' }}>
//       <DataGrid onCellEditCommit={handleCommit} rows={state} columns={columns} />
//     </div>
//   );
// }


// const columns = [
//   { field: 'name', headerName: 'Name', width: 180, editable: true },
//   { field: 'age', headerName: 'Age', type: 'number', editable: true },
//   {
//     field: 'dateCreated',
//     headerName: 'Date Created',
//     type: 'date',
//     width: 180,
//     editable: true,
//   },
//   {
//     field: 'lastLogin',
//     headerName: 'Last Login',
//     type: 'dateTime',
//     width: 220,
//     editable: true,
//   },
// ];

// const rows = [
//   {
//     id: 1,
//     name: randomTraderName(),
//     age: 25,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 2,
//     name: randomTraderName(),
//     age: 36,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 3,
//     name: randomTraderName(),
//     age: 19,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 4,
//     name: randomTraderName(),
//     age: 28,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
//   {
//     id: 5,
//     name: randomTraderName(),
//     age: 23,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },
// ];
