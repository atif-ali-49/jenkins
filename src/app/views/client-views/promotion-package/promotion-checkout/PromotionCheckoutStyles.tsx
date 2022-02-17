import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
      createStyles({
        cardWrapper:{
          background: "#EF9318",
          backgroundImage: "url(" + "https://s3.us-east-2.amazonaws.com/b.peacecoin.io/frontend/images/card.png" + ")",
          backgroundSize:'cover',
          borderRadius: 10,
          width:'100%',
          maxWidth:'400px'
        ,
          "& .label":{
            fontSize: theme.typography.pxToRem(16),
            color: theme.palette.grey[800],
          },
          "& .value":{
            fontSize: theme.typography.pxToRem(18),
            color: theme.palette.primary.contrastText,
            minHeight: 25,
          },
          "& .cardHolderName":{
            fontSize: theme.typography.pxToRem(20),
            color: theme.palette.primary.contrastText,
            textTransform: "capitalize",
          },
          "& .chip":{
            fontSize: theme.typography.pxToRem(20),
            color: theme.palette.primary.contrastText,
          },
        },
        cardposition:{
        justifyContent:'flex-end',
          [theme.breakpoints.down(1291)]: {
            justifyContent:'center',
          },
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
        },
      },
      hidebutton:{
        display:'none'
      },
      imageWidth:{
        width:'70%',
        [theme.breakpoints.down(767)]: {
            width:'90%', 
        },
      },
      dialogButton:{
        color:"#000",
      },
      checkoutCard:{
        // boxShadow: '0px 0px 5.94px 0.06px rgba(0, 0, 0, 0.49)',
        maxWidth:"400px",
        margin:'0 auto',
       "& span":{
        fontWeight:"500",        
       }
      }
  })
);

export default useStyles;