import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MBox, MButton } from 'src/app/components/mui';
import { showComingSoonModal } from 'src/app/store';
import useStyles from './GlobalModalStyle';

export function ComingSoonModal(props:any) {

    const isComingSoonModal = useSelector((store: any) => store.alert.comingSoonModal);
    const [isComingSoonModalOpen, setIsComingSoonModalOpen] = useState(false);

    const classes = useStyles({});
    
    const dispatch = useDispatch();

    useEffect(() => {
        setIsComingSoonModalOpen(isComingSoonModal);
    }, [isComingSoonModal])

    return (
            <Dialog className={classes.dialogWrapper} open={(props.modalOpen || isComingSoonModalOpen )} onClose={() => dispatch(showComingSoonModal(false))} maxWidth="xs">
                <DialogContent className={classes.dialogContent}>
                    <MBox p={3} pb={0} pt={1} textAlign="center" minHeight={390}>
                        <img src="/img/coming-soon.jpg" alt="comming soon" width="100%" />
                    </MBox>
                </DialogContent>
                <DialogActions style={{borderTop: '1px solid #dbdbdb'}}>
                    <MBox pt={1} pb={1} pr={2}>
                        <MButton variant="contained" color="primary" onClick={() => dispatch(showComingSoonModal(false))}>Close</MButton>
                    </MBox>
                </DialogActions>
            </Dialog>
    )
}