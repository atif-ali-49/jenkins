/* eslint-disable no-nested-ternary */
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Link, { LinkProps } from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { Omit } from '@material-ui/types';
import useStyles from './BreadcrumbStyles';
import HomeIcon from '@material-ui/icons/Home';

interface ListItemLinkProps extends LinkProps {
  to: string;
  open?: boolean;
}

const breadcrumbNameMap: { [key: string]: string } = {
  '/inbox': 'Inbox',
  '/inbox/important': 'Important',
  '/trash': 'Trash',
  '/spam': 'Spam',
  '/drafts': 'Drafts',
};

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => <Link {...props} component={RouterLink as any} />;

export function RouterBreadcrumbs() {
  const classes = useStyles();

  return (
    <></>
    // <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
    //   <div className={classes.root}>
    //     <Route>
    //       {({ location }) => {
    //         const pathnames = location.pathname.split('/').filter((x) => x);

    //         return (
    //           <Breadcrumbs aria-label="breadcrumb">
    //             <LinkRouter color="inherit" to="/client/dashboard">
    //               <HomeIcon />
    //             </LinkRouter>
    //               {pathnames.map((value, index) => {
    //                 const last = index === pathnames.length - 1;
    //                 const to = `/${pathnames.slice(0, index + 1).join('/')}`;

    //                 return last ? (
    //                   <Typography color="textPrimary" key={to}>
    //                     {breadcrumbNameMap[to]}
    //                   </Typography>
    //                 ) : (
    //                   <LinkRouter color="inherit" to={to} key={to}>
    //                     {breadcrumbNameMap[to]}
    //                   </LinkRouter>
    //                 );
    //               })}
    //           </Breadcrumbs>
    //         );
    //       }}
    //     </Route>
    
    //   </div>
    // </MemoryRouter>
  );
}
