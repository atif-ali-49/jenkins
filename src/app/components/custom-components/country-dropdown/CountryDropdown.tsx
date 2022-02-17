import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import axios from "axios";
// import useStyles from './AutoCompletetStyles';

export function CountryDropdown(props:any){

  const[countries, setCountries] = useState<any | null>([]);
  const baseurl = process.env.REACT_APP_API_END_POINT;

  const getCountries = () =>{
		axios.get(baseurl+'/country_list')
			.then(function (response) {
				if(response.status === 200){
					setCountries(response.data.country)
				}
			})
			.catch(function (error){
				console.log(error);
			})
	}
	useEffect(()=>{
		getCountries();
	},[]);

  return (
    <>
      <Autocomplete
      options={countries}
      // getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
    />
    </>
  )
}