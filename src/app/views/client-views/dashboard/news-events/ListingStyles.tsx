
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
   ListingBackground:{
  //  backgroundColor:'#181818',
   margin:'30px -25px',
   padding:'20px'
   },
   cardListing:{
   backgroundColor:'#222',
   height:'100%',
   padding:'20px',
   borderRadius:'5px',
   color:"#f5f5f5",
   boxShadow: "2px 20px 30px -15px rgb(0 0 0 / 80%)",
   },
   datetime:{
   fontSize:'12px'
   }
  })
);

export default useStyles;