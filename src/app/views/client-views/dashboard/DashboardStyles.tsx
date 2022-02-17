import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    statCard:{
      minHeight: 145,
      position: 'relative',
      color: theme.palette.primary.contrastText,
      overflow: 'hidden',
      transition: 'all .4s',
      "&.blue":{
        backgroundColor: '#2e3192',
      },
      "&.orange":{
        backgroundColor: theme.palette.primary.main,
      },
      "&.sky":{
        backgroundColor: theme.palette.info.main,
      },
      "&.red":{
        backgroundColor: theme.palette.error.main,
      },
      "& .icon":{
        color: theme.palette.primary.contrastText,
      },
      "&:hover .smBubble":{
        transition: 'all .4s',
        top: 79,
      },
      '& .MuiTypography-h5': {
         [theme.breakpoints.down(1660)]: {
       fontSize: '1.1rem'
      },
    
}
    },
    bgBubble:{
      backgroundColor: 'rgba(255,255,255, 0.19)',
      borderRadius: 100,
      position: 'absolute',
      transition: 'all .4s',
      "&.lgBubble":{
        width: '140px',
        height: '140px',
        top: 50,
        right: '-40px',
        
      },
      "&.smBubble":{
        width: '90px',
        height: '90px',
        top: '-10px',
        right: '-30px',
      },
    },
    commonDashboardCard:{
      height: '100%',
      "&.supportCard .MuiCardContent-root":{
        padding: "16px 0",
      },
      "& a":{
       color:theme.palette.text.primary
      },
       "& a:hover":{
       color:theme.palette.text.primary
      },
           
    },
    inviteReferalList:{
     listStyle:'none',
     margin:0,
     padding:0,
     "li":{
       textAlign:"left"
     }
    },
    ticketsTable: {
      minWidth: 650,
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
  setHeight:{
    minHeight:'250px'
  },
  lineBreak:{
   lineBreak:'anywhere'
  },
  justifyresponsive:{
  justifyContent: "space-between", 
  [theme.breakpoints.down(767)]: {
    justifyContent: "center", 
      },
    },

    // for svg chart 
 svgChartSetting:{
   marginLeft:"60px",
   marginTop:"60px"
},
//world,ap
textColor:{
color:'#EF9318'
},
newsandEventsContainer:{
height:'100%',
'& .carousel-slider':{
  maxHeight:'500px'
}
},
dashboardBanner:{
  // backgroundColor:'#fee5b6',
  // borderRadius:'5px' ,
  '& img':{
    // maxHeight:'450px',
  }, 
  "& h4":{
    lineHeight:1,
    fontWeight:'600',
  }

}
  }),

  
);

export default useStyles;