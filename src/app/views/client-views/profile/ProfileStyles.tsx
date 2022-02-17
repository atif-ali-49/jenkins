import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatarStyle:{
        width:'70px',
        height:'70px'
    },
    tabs:{
 justifyContent:'center',
 boxShadow: '0 0 3px #ddd',
 '& .MuiTabPanel-root':{
  boxShadow: '0 0 3px #ddd'
 }
    },
    tabspanel:{
      justifyContent:'center',
      boxShadow: '0 0 3px #ddd'
         },
    smallDetailsAvatar:{
        color:'#a4a4a4',
        fontSize:'12px',
        marginBottom:'0'
    },
    uploadBtn:{
     marginTop:'16px' ,
     marginLeft:'10px',
     marginRight:'10px',
    },

    dialogBoxContainer:{
     '& .MuiDialog-paper':{
        width: '100%',
        // textAlign:'center',
        margin:'0 auto',
        padding: '30px 0',
      },
     '& .MuiDialog-paperWidthSm':{ 
          padding:"20px 0"
     },
      '& .MuiDialog-paperScrollPaper':{
          padding:0
      },
      '& p':{
      
      },
      '& .MuiDialogContent-root':{
       padding:'50px 30px',
       textAlign:'center',
      }
    },
    dottedBorderContainer:{
      marginBottom: 0,
      border: "2px dashed #EF9318",
      padding: "15px",
      display: "flex",
      justifyContent: "center",
      cursor:'pointer',
      fontSize:'14px' ,
      alignItems:'center'       
    },
    contentTitle:{
     color:'#121212',
     fontWeight:500
    },
    spanText:{ 
    marginTop: "3px",
    marginLeft: "2px"

    }
    
  })
);

export default useStyles;