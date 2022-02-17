import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        parentCard: {
            position: 'relative',
            margin: '40px auto',
            maxWidth: '350px',
        },
        smartcard: {
            background: theme.palette.background.paper,
            textAlign: 'center',
            margin: '0 auto',
            padding: '40px 0',
            borderRadius: '20px',
            zIndex: 2,
            position: 'relative',
            boxShadow: '1px 0px 5px 2px rgba(0,0,0,0.55)',
            border: '1px solid #e2e2e2',
            '& .MuiListItemText-primary': {
                userSelect: 'none'
            }
        },
        ListParent: {
            display: 'table',
            margin: '0 auto',
        },
        svg: {
            color: '#16c116',
            marginRight: '10px'
        },
        topstyle: {
            position: 'absolute',
            top: '-25px',
            content: '',
            width: '90%',
            left: 0,
            right: 0,
            height: '50px',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: '15px',
            zIndex: 1
        },
        bottomstyle: {
            position: 'absolute',
            bottom: '-25px',
            content: '',
            width: '90%',
            left: 0,
            right: 0,
            height: '50px',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: '15px',
            zIndex: 1
        },
        silverbackground: {
            backgroundColor: theme.palette.text.hint,
            color: '#fff',
            '&:hover': {
                backgroundColor: theme.palette.text.hint,
            }

        },
        goldbackground: {
            backgroundColor: '#ef9318',
            color: '#fff',
            '&:hover': {
                backgroundColor: '#ef9318'
            }
        },
        platinumbackground: {
            backgroundColor: '#5C2A85',
            color: '#fff',
            '&:hover': {
                backgroundColor: '#5C2A85',
            }
        },
        circular: {
            position: "relative",
            padding: theme.spacing(7),
        },
        selectedpkgbackgroundcolor: {
            border: '2px solid #fff',
            backgroundColor:"transparent",
            textAlign: 'center',
            margin: '0 auto',
            padding: '40px 0',
            borderRadius: '20px',
            zIndex: 2,
            position: 'relative',
            boxShadow: '5px 15px 40px 15px #a0a5b9',
        },

        selectedpkgbackgroundcolorsilver: {
            border: '2px solid #fff',
            background: theme.palette.background.paper,
            textAlign: 'center',
            margin: '0 auto',
            padding: '40px 0',
            borderRadius: '20px',
            zIndex: 2,
            position: 'relative',
            boxShadow: '5px 15px 40px 15px #a0a5b9',
        },
        selectedpkgbackgroundcolorgold: {
            border: '2px solid #fff',
            background: theme.palette.background.paper,
            textAlign: 'center',
            margin: '0 auto',
            padding: '40px 0',
            borderRadius: '20px',
            zIndex: 2,
            position: 'relative',
            boxShadow: '5px 15px 40px 15px  #ef9318',
        },
        selectedpkgbackgroundcolorplatinum: {
            border: '2px solid #fff',
            background: theme.palette.background.paper,
            textAlign: 'center',
            margin: '0 auto',
            padding: '40px 0',
            borderRadius: '20px',
            zIndex: 2,
            position: 'relative',
            boxShadow: '5px 15px 40px 15px #5C2A85',
        },

        selctedpkgbtn: {
            backgroundColor: '#5C2A85',
            color: 'white',
            '&:hover': {
                backgroundColor: 'none !important',
            }
        },
        purchasedAuto: {

            color: 'red'
        },
        btnSuccess: {
            backgroundColor: 'green',
            color: 'white'
        },
    })
);

export default useStyles;