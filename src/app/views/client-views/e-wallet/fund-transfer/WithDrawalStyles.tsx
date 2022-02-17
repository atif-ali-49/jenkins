import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
	     '& .MuiTypography-body1':{
				fontSize:'13px',
				lineHeight:'1.3',
				 [theme.breakpoints.down(767)]: {
   		  		fontSize:'12px', 
      			},
			},
			'& .MuiCheckbox-root':{
              color:'black'
			}
        },
		checkboxContainer:{
          background:'#c2ffc2'
		},
		textFontWeight:{
        fontWeight:600,
		 [theme.breakpoints.down(767)]: {
   		  fontSize:'12px', 
      	},
		},
		floatTextInfoTop:{
			position:'absolute',
			top:'-20px',
			right:0,
			fontSize:'12px',
			fontWeight:600,
			color:'#000'
		},
		floatTextInfoBottom:{
           position:'absolute',
		   bottom:'-20px',
		   right:0,
		   fontSize:'12px',
		   fontWeight:600,
		   color:'#000'
		},
		lighcolor:{
			color:'#aaa !important',
			fontWeight:400,
			display:'inline'
		},
		 formControl: {
   			width: '100%',
			'& .MuiInputBase-formControl':{
				height:'42px',
				color:'#444'
			}

  },
	  
    })
);	  
  export default useStyles;