import React, { useState } from 'react';

// Material UI
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import clsx from 'clsx';

// JSS
import { TextFieldStyles } from '../../jss';

const SearchComponent = ({ placeholder, value, onSearch }) => {
  const textFieldClasses = TextFieldStyles();

  const [inputFocused, setInputFocused] = useState(false);

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  return (
    <Paper
      component="form"
      className={clsx(textFieldClasses.searchBarSection, { [textFieldClasses.searchBarFocused]: inputFocused })}
    >
      <InputBase
        value={value}
        placeholder={placeholder ? placeholder : 'Search with keyword'}
        className={textFieldClasses.input}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        inputProps={{ 'aria-label': 'search...' }}
        onKeyDown={keyPress}
        onChange={(e) => onSearch ? onSearch(e) : undefined}
      />
      <SearchIcon className={textFieldClasses.searchIcon} />
    </Paper>
  );
};

export default SearchComponent;
