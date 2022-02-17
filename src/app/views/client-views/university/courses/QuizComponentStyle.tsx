import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        iFrame:{
            position:"absolute",
            top:'0',
            left:'0',
            right:'0',
            bottom:'0',
            height:'100%',
            width:'100%',


        },
        pdf:{
            position: 'relative',
            overflowX: 'hidden',
            width: '100%',
            paddingTop:'56.25%',
            // pointerEvents:'none'
        },
        btn: {
            color: "#000",
            "& .MuiButton-label": {
                justifyContent: "start !important",
            },
            backgroundColor:"#ef9318",
            marginBottom:'15px'
        },
    })
);

export default useStyles;