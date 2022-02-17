import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
   s1Cover:{
	position:'relative',
	boxShadow: '0px 0px 5.94px 0.06px rgba(0, 0, 0, 0.49)',
	// width:'100%',
	// height:"100%",
	"& img":{
       width:'100%'
	},
	"& .MuiTypography-h5":{
     lineHeight:'1.1',
	 color:'#EF9318',
	 fontWeight:'500',
	 textTransform:'uppercase'
	},
	"& ul":{
     padding:0,
	 margin:0,
	 listStyle:'none',
	 '& li':{
    	margin:'10px 0',
		fontSize:'14px',
		position:'relative',
	 }
	}
   },
   imageTop:{
     position:'absolute',
	 top:0,
	 left:0,
   },
    imageBottom:{
     position:'absolute',
	 bottom:'-6px',
	 left:0,
   },
   flowerImage:{
    // position:"absolute", left:"15%", top:"50%", transform:"translateY(-50%)", color:"#fff", width:"100px !important"	// position:"absolute", left:"-35px", top:'-7px', width:"95px !important"
	width:'100px !important',
	marginTop:'-30px'    
   },
   BoxContainer:{
    backgroundColor:'#ef9318',
	borderRadius:'4px',
   },
   TextOpportunity:{
   position:'absolute',
   margin:'0 auto',
   top:'10px',
   left:0,
   right:0,
   color: theme.palette.common.white,
   fontSize:'14px',
   fontWeight:700

   },
   textContainer:{
	lineHeight: 1.2,
    fontSize: "15px",
	textAlign:'center',
	color:'#000'
   },
   topBottomImage:{
   display:'block'
   }
   
  })
);

export default useStyles;