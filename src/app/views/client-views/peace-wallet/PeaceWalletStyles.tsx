import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
   bluebox:{
       backgroundColor:'purple',
       width:'100%',
       height:'180px',

       "& .MuiTypography-h4":{
           color:'#fff'
       }
   },
   dflex:{
      display:'flex',
      justifyContent:'space-between',

      '& .MuiBox-root-60':{
          color:'#fff'
      },
      "& .MuiSvgIcon-root":{
        color:'#fff'
      },
    
   },
   righttext:{
    color:'#fff'
   },

   yellowbox:{
    backgroundColor:theme.palette.primary.main,
    width:'100%',
    height:'180px',

    "& .MuiTypography-h4":{
        color:'#fff'
    }
},
// Dashboard Repeated JSS
commonDashboardCard:{

    "& .MuiCardHeader-content":{
      color: '#EF9318',
    },
    "&.supportCard .MuiCardContent-root":{
      padding: "16px 0",
    }
  },
  incomeBox:{
    '& .MuiChip-root':{
      minWidth: 58,
      height: 20,
    },
  },
  pieChartBox:{
    marginTop: "-20px",
  },
  lightColor:{
      color:theme.palette.text.hint,
  },
  btninvex:{
      margin:'10px 0',
  },
  boxparent:{
    position:'relative'
  },
  childdata:{
    position:'absolute',
    top:'40%',
    left:0,
    right:0,
    margin:'0 auto'
  },
  WalletOwnerName:{
  color: '#EF9318',
  }

  })
);

export default useStyles;