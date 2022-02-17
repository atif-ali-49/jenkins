import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {BsTrophy} from 'react-icons/bs'
import useStyles from './ModalStyles';



export default function AlertDialog() {
  const [open, setOpen] = useState(true);
  const [confetti, setConfetti]=useState(true)

  const classes = useStyles({});
  const handleClose=()=>{
    setOpen(false)
  }

  const stopConfetti = ()=>{
  setConfetti(false)
  setOpen(false)
   }
   
   useEffect(()=>{
     confetti &&
    acceptConfetti();
    },[confetti]);
    
   const acceptConfetti =()=>{
       
	for(let i=0; i<100; i++) {
    // Random rotation
    var randomRotation = Math.floor(Math.random() * 360);
      // Random Scale
    var randomScale = Math.random() * 1;
    // Random width & height between 0 and viewport
    var randomWidth = Math.floor(Math.random() * Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
    var randomHeight =  Math.floor(Math.random() * Math.max(document.documentElement.clientHeight, window.innerHeight || 500));
    
    // Random animation-delay
    var randomAnimationDelay = Math.floor(Math.random() * 15);

    // Random colors
    var colors = ['#0CD977', '#FF1C1C', '#FF93DE', '#5767ED', '#FFC61C', '#8497B0']
    var randomColor = colors[Math.floor(Math.random() * colors.length)];

    // Create confetti piece
    var confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.top=randomHeight + 'px';
    confetti.style.right=randomWidth + 'px';
    confetti.style.backgroundColor=randomColor;
    // confetti.style.transform='scale(' + randomScale + ')';
  //   confetti.style.oacity=randomScale;
    confetti.style.transform='skew(15deg) rotate(' + randomRotation + 'deg)';
    confetti.style.animationDelay=randomAnimationDelay + 's';
    document.getElementById("confetti-wrapper")?.appendChild(confetti);
  }};



  return (
    <div>
      {
        confetti &&
      <div id='confetti-wrapper'></div>  
      } 
      <Dialog
        open={open}
        className={classes.cofettiDialogParent}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Congratulations</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           You have made it to our Top earnings list.
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
           <BsTrophy className="confettiTrophyAnimation"/>
          </DialogContentText>
        </DialogContent>
        <DialogActions> 
          <Button variant="contained" onClick={handleClose} size="small"  color="primary">
            Celebrate
          </Button>
          <Button variant="contained" size="small" onClick={stopConfetti}  color="secondary">
            Ignore
          </Button>
        </DialogActions>
      </Dialog> 
    </div>
  );
}