import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chatBox:{
    //  backgroundColor:'#ececec',
     minWidth:'300px',
     maxWidth:'800px',
     margin:'0 auto',
     boxShadow: "0 0 32px 0 rgb(214 215 226 / 30%)",
    borderRadius: 4,
    border:'1px solid #dcdcdc',
    position:'relative'
    },
    chatHeader:{
     backgroundColor:theme.palette.background.paper,
     border:'1px solid #dcdcdc',
    },
    chatBody:{

        
    },
    chatFooter:{
        position:'absolute',
        bottom:0,
        width:'100%',
        '& .MuiInputBase-input  ': {
            color: '#888888',
          }
    },
    onlineIcon:{
        fontSize:'14px',
        color:'#31961e'
    },
    chatTime:{
        color:'#888888',
        fontSize:'12px'
    },
    chatMsg:{
        backgroundColor: theme.palette.primary.light,
        padding:'8px',
        borderRadius:'8px',
        minWidth: '60px',
        display:"flex",
        width:"100%",
        flexWrap:"wrap",
        lineBreak: 'anywhere',
        color:'#121212'
    },
    chatMsgOther:{
        backgroundColor:'#f5f5f5',
        padding:'8px',
        borderRadius:'8px',
        minWidth: '60px',
         display:"flex",
        width:"100%",
        flexWrap:"wrap",
        lineBreak: 'anywhere',
        color:"#000",
    },
    textField:{
        color:'#aaa'
    }
  })
);

export default useStyles;