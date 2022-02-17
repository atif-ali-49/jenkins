import React,{ useEffect, useState,useRef } from "react";
import {
    MBox,
    MTypography,
    MPaper,
    MForm,
    MFormik,
    MGrid,
    MTextField,
    MButton,
    MCircularProgress
} from "src/app/components/mui";
import Typography from "@material-ui/core/Typography";
import ReactPlayer from 'react-player';
import { Grid ,TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {useHistory} from 'react-router-dom';
function CoinTransfer(props: any) {
    const player = useRef<ReactPlayer>(null);
    const [showNextButton, setShowNextButton] = React.useState(false)
    const [open, setOpen] = React.useState(false);
     const history = useHistory();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        history.push('/client/university/courses');
    };
    const [playing,setPlaying] = useState(true)

    useEffect(()=>{
        if(playing){
            setOpen(true);
            setPlaying(false)
        }

    })

    return (
        <div>


            <MBox className="contentBox" component={MPaper} justifyContent="center">
                <Grid container spacing={3} >


                        <Dialog
                            fullWidth={true}
                            open={open}
                            aria-labelledby="max-width-dialog-title"
                        >
                            <DialogTitle id="max-width-dialog-title"><b>We are Transferring PeaceCoins to Your PeaceCoin Wallet.</b></DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <ReactPlayer
                                        ref={player}
                                        playsinline={true}
                                        url="https://media.peacecoin.io/university_videos/vistapoint.mp4"
                                        onEnded={handleClose}
                                        controls={false}
                                        pip={true}
                                        width="100%"
                                        onContextMenu={(e) => e.preventDefault()}
                                        playing={true}
                                        light={true}

                                        volume={1}
                                        config={{ file: {
                                                attributes: {
                                                    controlsList: 'nodownload'
                                                }
                                            }}}
                                        progressInterval={200}


                                        loop={false}

                                    />
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    close
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </Grid>




            </MBox>

        </div>
    );
}

export default CoinTransfer;
