import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Tabsroot: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: 'auto',

      //    '& .MuiTab-fullWidth':{      
      //   flexBasis: 2
      //  },
      "& .MuiTab-textColorInherit.Mui-selected": {
       backgroundColor:theme.palette.primary.main,
       "& .MuiTab-wrapper":{
          color:'#fff'
       }
    },
    "& .MuiTab-textColorInherit":{
      borderBottom:'1px solid #e6e6e6',
      flexBasis:'unset'
    },
    "& .MuiTabPanel":{
      flexGrow:1
    },
    '& .MuiBox-root-175':{
      padding:'8px'
    }

    },
    tabs: {
      borderRight: `1px solid ${theme.palette.primary.main}`,
      background:`1px solid ${theme.palette.primary.main}`
    },
    wordBorder:{
     display:'flex',
     justifyContent:'center',
     margin:'20px 0',

     '&:hover':{
      BackgroundColor: 'red',
     },
    //  border:'1px solid #00AEEF',
    },
   tab: { 
        '& .MuiBox-root': {
            padding:0
          },
      },
      tabPanelWrapper:{
       margin:'0 auto',
       '& .MuiBox-root-67':{
        padding:0
       }
      },
     
      mainImage:{
        margin:'0 auto',
        textAlign:'center'
      },
      iconDownload:{
        // textAlign:'right',
        // float:'right'
      },
      worddata:{
      border:'1px solid #00AEEF',
      },
      
      pdfdata:{
        border:'1px solid #FF0000',
        },

        pptdata:{
          border:'1px solid #FF5400',
          },

          dflex:{
          display:'flex',
          justifyContent:'space-between',
          alignItems:'center'
          },
          containerFuild:{
            justifyContent:'center'
          },
          customwidth:{
        minWidth:'220px',
         padding:'5%',
         height:'100%',
      textAlign:'center',
      borderRadius:'8px',
       [theme.breakpoints.down(600)]: {
       minWidth:'175px'
      },
        },

        videoContainer:{
        '& .MuiBox-root-142':{
         padding:0
        }
        },
        sameBoxSize:{
        width:'120px',
        lineBreak:'anywhere'
        },
        videosize:{
        objectFit:'cover'
        } 
  })
);

export default useStyles;