import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    borderStyle:{
      border:'1px solid',
    },
    table: {
      minWidth: 650,
    },
    btnstatus:{
     borderColor: theme.palette.primary.main,
     border:'1px solid',
     borderRadius:'5px'
    },
    paginate:{
      backgroundColor:"#FFFFFF",
    },
    root: {
        flexGrow: 1,
        "& .MuiTabs-root":{
          boxShadow: "0px 0px 32px 0px rgb(214 215 226 / 30%)",
          border:'1px solid #e4e4e4'
        },
        '& .MuiBadge-anchorOriginTopRightRectangle':{
          top:'13px',
          right:'-15px',
        },
      //    '& .MuiBox-root':{
      //  padding:'10px 5px'
      // }
           '& .MuiBox-root-227':{
          padding:0
      },
      },
      avatar:{
        width: theme.spacing(5),
        height: theme.spacing(5),
        textTransform: 'uppercase',
        color: "white",
        backgroundColor: "#9e9e9e",
        marginRight:"5px",
      },
      label:{
        color: theme.palette.text.hint,
        fontSize: theme.typography.pxToRem(13),
      },
      listWrapper:{
        width: "100%",
        display: "block",
        boxShadow: "0px 0px 32px 0px rgb(214 215 226 / 30%)",
        borderRadius: 4,
    },
    tabbacki:{
      // backgroundColor:'e2e2e3',
      '& .MuiTabs-flexContainer':{
         flexWrap:'wrap',
         justifyContent:'center'
      },
      '& .MuiTab-root':{
        minWidth:'150px',
      },
    },
    badgeExpire:{
      backgroundColor:'red'
    },
    lineBreak:{
      lineBreak:"anywhere"
    },
    tabpanelParent:{
    '& .MuiBox-root': {
          padding: '0px',
          },
    },
      header:{
        backgroundColor:'black',
          width: "100%",
          display: "block",
          boxShadow: "0px 0px 32px 0px rgb(214 215 226 / 30%)",
          borderRadius: 4,
          color:'white',
          fontWeight:'bolder'

      },
      Resactive:{
          backgroundColor: '#4dd39b',
          color:'#fff',
          borderRadius:'5px',
          textTransform:"uppercase",
          letterSpacing:'1px',
          cursor: 'text',
          fontWeight:'bold'
      },
      Resdeactive:{
          backgroundColor: '#e37e8c',
          color:'#fff',
          borderRadius:'5px',
          textTransform:"uppercase",
          letterSpacing:'0.8px',
          cursor: 'text',
          fontWeight:'bold'
      },
  })
);

export default useStyles;