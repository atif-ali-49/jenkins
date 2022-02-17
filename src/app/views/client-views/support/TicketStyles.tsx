import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonBase:{
    width:'100%',
    boxShadow: '1px 1px 1px 1px rgba(210,210,210,0.75)',
    padding:'6px 20px 3px 20px',
    backgroundColor:'#f5f5f5',
    marginTop:'10px',
    '& .MuiTypography-gutterBottom':{
        fontSize:'16px',
        fontWeight:'300'
    },
    },
    gridContainer:{
      '& .MuiGrid-item':{
          textAlign:'center'
      }  
    },
    leftAlign:{
      textAlign:'left',
      paddingLeft:'20px'
    },
    rightAlign:{
      textAlign:'right',
      paddingRight:'20px'
    },
    submitButton:{
      textAlign:'right',
      
    },
    dflex:{
      display:'flex',
      justifyContent:'space-between'

    },
    listWrapper:{
      width: "100%",
      display: "block",
      boxShadow: "0px 0px 32px 0px rgb(214 215 226 / 30%)",
      borderRadius: 4,
  },
  avatar:{
    width: theme.spacing(5),
    height: theme.spacing(5),
    textTransform: 'uppercase',
  },
  label:{
    color: theme.palette.text.hint,
    fontSize: theme.typography.pxToRem(13),
  },
  editorParent:{
  ' & .MuiBox-root-104':{
    padding:'10px 0',
    border:'1px solid #e2e2e2'

  },
  ' & .MuiGrid-container':{
    borderBottom:'1px solid #e2e2e2',
    margin:0,
    width:'100%'
  },
 
  },
  responsiveText:{
     minWidth:'220px'
  },
 
  textdecoration:{
    textDecoration:'none'
  },
   avatarStyle:{
        width:'70px',
        height:'70px'
    },
  })
);

export default useStyles;