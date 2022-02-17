import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topstyle:{
        position:'absolute',
        top:'-25px',
        content:'',
        width:'90%',
        left:0,
        right:0,
        height:'50px',
        marginLeft:'auto',
        marginRight:'auto',
        borderRadius:'15px',
        zIndex:1
    },
    bottomstyle:{
     position:'absolute',
     bottom:'-25px',
     content:'',
     width:'90%',
     left:0,
     right:0,
     height:'50px',
     marginLeft:'auto',
     marginRight:'auto',
     borderRadius:'15px',
     zIndex:1
 },

 goldbackground:{
     backgroundColor:'#ef9318',
     color:'#fff',
     '&:hover':{
        backgroundColor:'#ef9318'
    }
 },

 
  })
);

export default useStyles;