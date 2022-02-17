import React from 'react'
import useStyles from './SmartPayStyles'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

function ListView(props:any) {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const classes = useStyles();

    return (       
            <ListItem>
                <CheckCircleRoundedIcon className={classes.svg}/>   
                <ListItemText primary={props.feature} />
                {props.desc}
            </ListItem>
    )
}

export default ListView
