import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, Theme} from '@material-ui/core/styles';

export function MTooltip(props:any){
  return(
      <Tooltip {...props} />
  );
}

export const MLightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    minWidth: 300,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: theme.typography.pxToRem(13),
    padding: theme.spacing(2),
  },
}))(Tooltip);