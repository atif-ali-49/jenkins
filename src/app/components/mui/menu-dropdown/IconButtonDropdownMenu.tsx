import React from 'react';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Fade from '@material-ui/core/Fade';

import useStyles from './IconButtonDropdownMenuStyles'

export default function DropdownMenu(){

  const classes = useStyles({});
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

    return(
        <div className="dropdownMenu">
            <IconButton aria-label="show 17 new notifications" color="inherit" onClick={handleClick}
              aria-controls="notificationMenu"
              aria-haspopup="true"
              >
                <Badge badgeContent={1} color="secondary" >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
                <Menu
                  id="notificationMenu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                  
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <MenuItem onClick={handleClose}>Home</MenuItem>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
        </div>
    )
}