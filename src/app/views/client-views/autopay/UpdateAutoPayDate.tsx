import React, {useState} from 'react'
import { MBox, MTypography, MPaper,MButton } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Moment from "moment";

import {useHistory} from "react-router-dom";
import { useDispatch} from 'react-redux';

import axios from "axios";
import {showAlert} from "../../../store";
function UpdateAutoPayDate(props:any) {
    const baseurl = process.env.REACT_APP_API_END_POINT;
    let currentDate = new Date();
    const history = useHistory();
    const [selectedDate, setSelectedDate] = React.useState(new Date(currentDate));
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // upDate Date of Auto pAy
    const upDateAutoPayDate = () =>{
            setLoading(true);
            axios.post(baseurl+'/update_autopay_date', {
                date:Moment(selectedDate).format('YYYY-MM-DD') ? Moment(selectedDate).format('YYYY-MM-DD') : Moment(currentDate).format('YYYY-MM-DD'),
            })
                .then(function (response) {
                    if(response.status === 200){
                        history.push('/client/auto-pay');
                        dispatch(showAlert({
                            message: 'Your auto pay subscription Date successfully',
                            messageType:'success',
                            showAlertMessage:true
                        }));
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(()=>setLoading(false));
    }
    return (
        <div>
            <MBox className="pageHeader">
                <MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Update Auto Pay</MTypography>
                <RouterBreadcrumbs />
            </MBox>
            <MBox className="contentBox" component={MPaper}>
                <MBox align="center">
                    Please select your desired new date from which your monthly auto-pay will start occuring.
                </MBox>
                <MBox display="flex" justifyContent="center"  m={1} p={1}>
                    <MBox p={1}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                variant="inline"
                                inputVariant="outlined"
                                emptyLabel="mm / dd / yyyy"
                                size="small"
                                format="MM/dd/yyyy"
                                fullWidth
                                id="date-picker-inline"
                                label="Select AutoPay Date"
                                value={selectedDate}
                                disableFuture={false}
                                disablePast={true}
                                InputProps={{ readOnly: true }}
                                maxDateMessage="You can't select future date"
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </MBox>


                </MBox>

                <MBox m={1} p={1} display="flex" justifyContent="center">
                    <MBox>
                        <MButton size="large" type="submit"  color="primary" variant="contained" disabled={loading} loading={loading} onClick={()=>upDateAutoPayDate()}>Update</MButton>
                    </MBox>
                </MBox>
            </MBox>
        </div>
    );
}

export default UpdateAutoPayDate;