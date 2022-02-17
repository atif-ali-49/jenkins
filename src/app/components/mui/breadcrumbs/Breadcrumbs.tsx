import React from 'react'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import withBreadcrumbs from "react-router-breadcrumbs-hoc";

function  matchUrlWithBreadcrumb(breadcrumb:any){
    let uri = window.location.toString();
    const hostname = window.location.host.toString();
    uri = uri.replace(hostname,'');
    
    if(breadcrumb==='/'){
        //dont add href in false case
        return true
    }
    if (uri.indexOf(breadcrumb) > 0 ){
        //dont add href in false case
        return false;
    }else{
        return true;
    }    
}

function removeHyphenFromWString(value:any){
    value = value.replace('-', ` `);
    return value;
}

let href = (value:any)=>{
    return {href: value}
}

// import useStyles from './BreadcrumbStyles'
// const classes = useStyles();

const BreadcrumbsNavigation: any = withBreadcrumbs()(({breadcrumbs}) => (
    
    <React.Fragment>
        <Breadcrumbs aria-label="breadcrumb">
            {/* {breadcrumbs.map(({ breadcrumb }) => breadcrumb)} */}

            {breadcrumbs.map((item: any, index) =>
                // <a href={item.breadcrumb.key} key={index}>{item.breadcrumb.props.children}</a>
                breadcrumbs.length > index + 1 ?
                    <Link color="inherit"
                          {...(matchUrlWithBreadcrumb(item.breadcrumb.key) && href(item.breadcrumb.key))}
                          
                        href={matchUrlWithBreadcrumb(item.breadcrumb.key) ? 'javascript:void(0);' : item.breadcrumb.key}
                        key={index}>
                        {removeHyphenFromWString(item.breadcrumb.props.children)}</Link>
                    :
                    <Link color="inherit"
                          key={index}>
                        {removeHyphenFromWString(item.breadcrumb.props.children)}</Link>
            )}
        </Breadcrumbs>
    </React.Fragment>
));

export default withBreadcrumbs()(BreadcrumbsNavigation);



