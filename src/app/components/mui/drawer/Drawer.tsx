import React from 'react'
import Drawer from '@material-ui/core/Drawer';

export function MDrawer(props:any){
    return(
        <Drawer transitionDuration={500}  {...props} />
    )
}