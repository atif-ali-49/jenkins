import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    instructionsList:{
      "& .MuiTypography-body1":{
      fontSize:'0.87rem'
      },
     "& .MuiBox-root-65":{
           height:'22px'
     } 
    },
    table: {
      minWidth: 650,
    },
    marginBottom:{
      marginBottom:'10px',
    },
    
    iconCustomize:{
      fontSize:'26px',
      color:'green'
    },
    avatarCustomize:{
      backgroundColor: theme.palette.primary.light,
    },
    peaceicon:{
    color:'#EF9318',
    }
  })
);

export default useStyles;