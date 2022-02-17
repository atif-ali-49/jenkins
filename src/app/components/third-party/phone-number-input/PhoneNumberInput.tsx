import React,{useEffect, useState} from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber, isPossiblePhoneNumber } from 'react-phone-number-input';
import './PhoneNumberInput.scss';

function PhoneField(props:any) {
	const[phone, setPhone]=useState<null | any | string>(undefined || props.value);
	let timer:any;
	useEffect(()=>{
		if(phone !== undefined){
			if(isValidPhoneNumber(phone)){
					props.isFormik ? props.setValue('mobile', phone) : props.setValue(phone);
			}else{
				props.isFormik ? props.setValue('mobile', '') : props.setValue('');
			}
		}
		else{
			props.isFormik ? props.setValue('mobile', '') : props.setValue('');
		}
	},[phone])

	const handleChangePhoneInput = (e:Event)=> {
		setPhone(e);
	}

	useEffect(() => {
		return ()=>clearTimeout(timer);
	},[]);
	
	return (
		    <div className="phoneInputWrapper" {...props}>
				<PhoneInput
					international={props.isInternationalCode ? true : false}
					// countryCallingCodeEditable={false}
					// initialValueFormat="international"
					   // useNationalFormatForDefaultCountryValue={false}
					defaultCountry={props.defaultCountry ? props.defaultCountry : 'US'}
					placeholder="Enter phone number"
					// onFocus={false}
					className={`form-control ${phone ?(isValidPhoneNumber(phone)? 'is-valid':'is-invalid'):''}`}
					value={props.value!==''? props.value: phone}
					onChange={(e:any)=> handleChangePhoneInput(e)}
				/>
				{ 
					(phone!==undefined && !isValidPhoneNumber(phone) || (props.isInvalid==true)) &&
					<span className={'text-danger error'}>
						{phone? (isValidPhoneNumber(phone)? '' : 'Invalid Phone number') :'Phone number Required' }
					</span>
				}
				{/* {
					phone!==	undefined && !isPossiblePhoneNumber(phone) &&
					<>
						not possible
					</>
				} */}
			</div>
	)
}

export default PhoneField;
