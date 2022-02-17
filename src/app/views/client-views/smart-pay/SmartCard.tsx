import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import React from 'react';
import { MBox, MTypography } from 'src/app/components/mui';
import ListView from './ListView';
import useStyles from './SmartPayStyles';

function SmartCard(props:any) {
    const classes = useStyles();
    return (
        <Grid item lg={4}>
            <div className={classes.parentCard}>
                <MBox className={classes.smartcard}>
                        <MTypography className="mainHeading" component="h1" variant="h4">{props.name}</MTypography>
                        <MTypography className="mainHeading" gutterBottom component="h1" variant="h6">${props.price}</MTypography>
                        <List className={classes.ListParent}>
                            {
                                props.desc.split("/").map((item)=>(
                                    <ListView feature={item} />
                                ))

                            }
                        </List>
                    {
                        props.category ?
                        <Button
                        variant="contained"
                        size="large"
                        color="default"
                        className={props.btnColor}
                        component="label"
                        onClick={() => props.getProductArray(props.pro)}
                         >Purchase
                        </Button>
                            :
                        <Button
                        variant="contained"
                        size="large"
                        color="default"
                        className={props.btnColor}
                        component="label"
                        onClick={()=>props.getPkgArray(props.pkg)}
                        >Purchase
                        </Button>
                    }
                </MBox>
                <span className={`${props.topstyle} ${props.colordiv}`}></span>
                <span className={`${props.bottomstyle} ${props.colordiv}`}></span>
            </div>
        </Grid>         
        
    )
}

export default SmartCard
