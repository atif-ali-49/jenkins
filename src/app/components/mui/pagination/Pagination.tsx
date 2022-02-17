import React from 'react'
import Pagination from '@material-ui/lab/Pagination';

export function MPagination(props:any){

    const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        props.setCurrentPage(value);
    };
    return(
        <Pagination {...props} onChange={handleChangePagination} />
    )
}