import React from 'react'
import Button from '@material-ui/core/Button';

export function MButton(props:any){
    return(
        <Button {...props} disableElevation />
    )
}