import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';

export function MSkeleton(props:any){
    return(
        <Skeleton {...props} style={{...props.style, transform:'scale(1)'}} />
    )
}