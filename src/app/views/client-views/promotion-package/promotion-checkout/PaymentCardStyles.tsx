import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    parentCard:{
        position:'relative',
        margin:'40px auto',
        maxWidth:'350px',

    },
   smartcard:{
       background:theme.palette.background.paper,
       textAlign:'center',
       margin:'0 auto',
       padding:'40px 0',
       borderRadius:'20px',
       zIndex:2,
       position:'relative',
       boxShadow: '1px 0px 5px 2px rgba(0,0,0,0.55)'
   },
   ListParent:{
       display:'table',
       margin:'0 auto',
   },
   svg:{
    color:'#16c116',
    marginRight:'10px'
   },
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
silverbackground:{
    backgroundColor:theme.palette.text.hint,
    color:'#fff',
    '&:hover':{
        backgroundColor:theme.palette.text.hint,
    }

},
goldbackground:{
    backgroundColor:'#ef9318',
    color:'#fff',
    '&:hover':{
        backgroundColor:'#ef9318'
    }
},
platinumbackground:{
    backgroundColor:'#5C2A85',
    color:'#fff',
    '&:hover':{
        backgroundColor:'#5C2A85',
    }
},

  })
);

export default useStyles;