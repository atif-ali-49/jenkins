import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import {useEffect, useState} from 'react';
import { 
    MBox,
    MButton,
    MTextField,
    MForm,
    MFormik, 
    MCircularProgress,
} from 'src/app/components/mui';
import axios from 'axios';
import * as Yup from 'yup';
import useStyles from './SettingModalStyle';
import { useDispatch, useSelector } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { showAlert } from "src/app/store";


export function SettingModal(props:any) {

    const dispatch = useDispatch();
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const classes = useStyles({});
    const [loading, setLoading] = useState(false);
    const userId = useSelector((store: any) => store.auth.currentUser.id);
    const [radioValue, setRadioValue] = useState('L');

    useEffect(() => {
        console.log(radioValue);
    },[radioValue]);

    const getGenealogySetting = async  () => {
        setLoading(true);
        await axios.get(baseurl+'/get_geneology_setting')
        .then(function (response) {
            if(response.status === 200){
                // console.log('setting res', response);
                setRadioValue(response.data.geneology_setting[0].selected_position);
            }
        })
        .catch(function (err) {
            console.log(err);

            // dispatch(showAlert({
            //     message: 'something went wrong',
            //     messageType: 'error',
            //     showAlertMessage: true
            // }));
        })
        .then(function(){
            setLoading(false);
        })
    }

    useEffect(() => {
        getGenealogySetting();
    },[]);


    const updateGenealogySetting = async (values:any) => {
        // console.log('valuies', values);
        setLoading(true);
        await axios.post(baseurl+'/store_geneology_setting', {
            id: userId && userId,
            setting: values.position,
        })
        .then(function (res) {
            if(res.status === 200){
                console.log(res)
                dispatch(showAlert({
                    message: "Genealogy Settings Updated",
                    messageType: 'success',
                    showAlertMessage: true
                }));
            }
        })
        .catch(function (error) {
            dispatch(showAlert({
                message: 'something went wrong',
                messageType: 'error',
                showAlertMessage: true
            }));
        })
        .then(()=>{
            setLoading(false);
            props.setIsModal(false);
        })

    }

    const handleChangeRadioGroup = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue((event.target as HTMLInputElement).value);
    };

    useEffect(()=>{
        // console.log('adasd',radioValue);
    },[radioValue])

    return (
        <Dialog className={classes.dialogWrapper} open={props.open} onClose={()=> props.setIsModal(false)} maxWidth="xs">
            <MFormik
                enableReinitialize="true"
                initialValues={{
                    position: radioValue,
                }}
                validationSchema={
                    Yup.object().shape({
                        position: Yup.string().required('Required')
                    })
                }
                onSubmit={(values: any, {resetForm}) => {
                    console.log('values', values);
                    updateGenealogySetting(values).then(() => {
                        // resetForm();
                    });
                }}
            >
                {() => (
                    <MForm>
            <DialogTitle id="customized-dialog-title">Genealogy Setting</DialogTitle>
            {loading ?
				<MBox position="relative" py={2} textAlign="center" minHeight="40px" mb={2}>
					<MCircularProgress />
				</MBox>
				:
            <>
                <DialogContent dividers>
                    <MBox>
                        <MBox className="formFieldWrapper" mb={2}>
                        <FormControl component="fieldset">
							<RadioGroup aria-label="position" name="position" value={radioValue} onChange={handleChangeRadioGroup} defaultValue={radioValue}>
								<FormControlLabel value="L" control={<Radio color="primary" />} label="Left" />
								<FormControlLabel value="R" control={<Radio color="primary" />} label="Right" />
								<FormControlLabel value="C" control={<Radio color="primary" />} label="Center" />
								<FormControlLabel value="A" control={<Radio color="primary" />} label="Auto Pilot" />
							</RadioGroup>
                        </FormControl>
                        </MBox>
                    </MBox>
                </DialogContent>
                <DialogActions>
                    <MBox pt={1} pb={1} pr={2} display="flex" alignItems="center">
                        <MBox mr={1}>
                            <MButton href="javascript:void(0);" className="LinkDanger" onClick={()=> props.setIsModal(false)}>Close</MButton>
                        </MBox>
                        <MBox><MButton fullWidth color="primary" loading={loading} variant="contained" type="submit" disabled={loading}>Update</MButton></MBox>
                    </MBox>
                </DialogActions>
                </>
                }
            </MForm>
            )}
        </MFormik>
        </Dialog>
    )
}
