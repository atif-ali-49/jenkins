import React, { useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import useStyles from './AutoCompletetStyles';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

interface iProps{
  label: string,
  name?: string,
  className?: string,
  id: string,
  options: Array<any>,
  getOptionLabel: any,
  onOpen?: any,
  onChange?: any,
  onInputChange?: any,
  multiple?: any,
  disabled?: any,
  filterSelectedOptions?:any,
  defaultValue?:any,
  disableClearable?:boolean,
  autoComplete?:any,
  clearOnEscape?:any,
  limitTags?:number,
  style?:any,
  value?:any,
  renderOption?:any,
  disableCloseOnSelect?:any,
  loading?:boolean,
  loadingText?:string
}

export function MAutoComplete(props:iProps){

  const autocomplete = (defaultValue?:any) => {
    return(
      <Autocomplete
        size="small"
        defaultValue={defaultValue && defaultValue}
        limitTags={props.limitTags!==undefined?props.limitTags:1}
        popupIcon={<KeyboardArrowDownIcon />}
        {...props}
          renderInput={(params) => <TextField  {...params} color="primary" label={props.label} variant="outlined" />}
      />
    )
  }

  return (
    <>
    {props.defaultValue &&
      autocomplete(props.defaultValue)
    }
    {!props.defaultValue &&
      autocomplete()
    }
    </>
  )
}