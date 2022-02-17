

import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

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
    }),
);

export default useStyles;