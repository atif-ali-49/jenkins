import { Typography } from "@material-ui/core";
import { MBox } from "src/app/components/mui";
import useStyles from './FooterStyles'
export default function Footer(){
  const classes = useStyles();
  return (
    <>
 {/* <MBox className={classes.footer} alignItems="center" display="flex" justifyContent="center">
   <MBox mr={2}><Typography >Copyright © 2021 Peacecoin Inc. All rights reserved. Terms & Conditions/Refund Policy</Typography></MBox>
   <div id="google_translate_element"></div>
 </MBox> */}
   
   </>
   );
};