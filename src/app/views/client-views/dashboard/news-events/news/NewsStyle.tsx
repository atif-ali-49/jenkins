import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
  
   mainContainer:{
   "& carousel-slider":{
     '& ul li':{
		 "&:hover":{
 		cursor:'pointer',
	 }}
   }
   },
   ImageContainer:{
   
   }
  })
);

export default useStyles;