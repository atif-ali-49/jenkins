import { useEffect, useState } from 'react';
import {connect} from 'react-redux';

import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { MIconButton } from 'src/app/components/mui';
import CloseIcon from '@material-ui/icons/Close';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  
function GlobalAlert(){
    
    const [open, setOpen] = useState(false);
    const alertData = useSelector((store:any) => store.alert);
    const { enqueueSnackbar } = useSnackbar();
    
    const showSnacksInQueue = (message, variant: VariantType) => {
        enqueueSnackbar(message, { variant, autoHideDuration: 5000, persist: false });
    };

    useEffect(() => {
        {
            alertData.showAlertMessage === true &&
            showSnacksInQueue(alertData.message, alertData.messageType);
        }
    }, [alertData]);

    return (
        <></>
            
            // <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{vertical:'bottom' , horizontal:'left'}}>
            //     <Alert onClose={handleClose} severity={alertData && alertData.messageType}>
            //         {alertData && alertData.message}
            //     </Alert>
            // </Snackbar>
    )
}

export default connect()(GlobalAlert);
