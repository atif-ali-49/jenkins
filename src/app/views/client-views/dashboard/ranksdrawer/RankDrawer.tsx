import {
    MBox,
    MDrawer,
    MAppBar,
    MIconButton,
    MToolbar,
    MGrid
} from 'src/app/components/mui';
import useStyles from './RankDrawerStyle'

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
function RankDrawer(props:any) {
    const classes = useStyles();
    return (
        <>
            {
            props.currentRank ?
            <MDrawer className={classes.announcementDrawer} open={props.isDrawerOpen} onClose={()=>props.setIsDrawerOpen(false)}
                     variant="temporary"
                     anchor={'right'}
            >
                <MAppBar color="secondary" className="drawerAppBar">
                    <MToolbar>
                        <MBox display="flex" alignItems="center"
                              flexWrap="wrap">
                            <MBox display="inline-block" mr={1}>
                                <MIconButton  className={classes.arrowbackward} onClick={() => props.setIsDrawerOpen(false)}>
                                    <ArrowForwardIcon/>
                                </MIconButton>
                            </MBox>
                            <MBox minHeight={30} fontSize={18}>Current Rank - {props.currentRank.ranks ? props.currentRank.ranks :''}</MBox>
                        </MBox>
                    </MToolbar>
                </MAppBar>
                <MBox p={2} display="flex" className={classes.rankDrawerWidth} >

                        <MGrid
                            container
                            justify="center"
                            alignItems="center"
                            spacing={3}
                        >
                            
                            {/* Total Achieved*/}
                            <MGrid item xs={12}>


                                <MBox mt={5}>
                                    <h1 className={classes.achicedheading}> <b>{parseInt(props.total_volume).toFixed(2)}</b> <div className={classes.totalrequiredvoluemheading}> Total Achieved </div> </h1>
                                    <hr />
                                </MBox>

                            </MGrid>

                            {/* Legs Required Volume */}
                            <MGrid item xs={4}>
                                <MBox mt={2}>
                                    <h1 className={classes.totalrequiredvoluem}> <b>{props.currentRank.left_qualification} </b>  <br /> <div className={classes.totalrequiredvoluemheading}>  Left Member(s) Required  </div> </h1>
                                </MBox>
                                <hr />
                            </MGrid>

                            <MGrid item xs={4}>
                                <MBox mt={2}>
                                    <h1 className={classes.totalrequiredvoluem}> <b>{props.currentRank.center_qualification}</b>  <br /> <div className={classes.totalrequiredvoluemheading}>  Center   Member(s) Required  </div> </h1>
                                </MBox>
                                <hr />
                            </MGrid>

                            <MGrid item xs={4}>
                                <MBox mt={2}>
                                    <h1 className={classes.totalrequiredvoluem}> <b>{props.currentRank.right_qualification}</b>  <br /> <div className={classes.totalrequiredvoluemheading}> Right Member(s) Required  </div> </h1>
                                </MBox>
                                <hr />
                            </MGrid>
                        {/*    Total Members at Each Legs */}

                            <MGrid item xs={4}>

                                <MBox mt={5}>
                                    <h1 className={classes.achicedheading}> <b>{parseInt(props.leftCount)} </b> <br /> <div className={classes.totalrequiredvoluemheading}> Left Member (s) Achieved </div> </h1>
                                    <hr />
                                </MBox>
                            </MGrid>

                            <MGrid item xs={4}>

                                <MBox mt={5}>
                                    <h1 className={classes.achicedheading}> <b>{parseInt(props.centerCount)} </b> <br /> <div className={classes.totalrequiredvoluemheading}> Center Member (s) Achieved </div> </h1>
                                    <hr />
                                </MBox>
                            </MGrid>

                            <MGrid item xs={4}>
                                <MBox mt={5}>
                                    <h1 className={classes.achicedheading}> <b>{parseInt(props.rightCount)}</b> <br /> <div className={classes.totalrequiredvoluemheading}> Right  Member (s) Achieved </div> </h1>
                                    <hr />
                                </MBox>
                            </MGrid>


                            {/*    Volume at Each Legs */}

                            <MGrid item xs={4}>

                                <MBox mt={5}>
                                    <h1 className={classes.achicedheading}> <b>{parseInt(props.left_leg_volume).toFixed(2)}</b> <br /> <div className={classes.totalrequiredvoluemheading}> Left Leg Volume (s) Achieved </div> </h1>
                                    <hr />
                                </MBox>
                            </MGrid>

                            <MGrid item xs={4}>

                                <MBox mt={5}>
                                    <h1 className={classes.achicedheading}> <b>{parseInt(props.center_leg_volume).toFixed(2)}</b> <br /> <div className={classes.totalrequiredvoluemheading}> Center Leg Volume (s) Achieved </div> </h1>
                                    <hr />
                                </MBox>
                            </MGrid>

                            <MGrid item xs={4}>
                                <MBox mt={5}>
                                    <h1 className={classes.achicedheading}> <b>{parseInt(props.right_leg_volume).toFixed(2)}</b> <br /> <div className={classes.totalrequiredvoluemheading}> Right  Leg Volume(s) Achieved </div> </h1>
                                    <hr />
                                </MBox>
                            </MGrid>
                        </MGrid>
                </MBox>
            </MDrawer>:
    //  for next rank
<MDrawer className={classes.announcementDrawer} open={props.isDrawerOpen} onClose={()=>props.setIsDrawerOpen(false)}
variant="temporary"
anchor={'right'}
>
<MAppBar color="secondary" className="drawerAppBar">
<MToolbar>
   <MBox display="flex" alignItems="center"
         flexWrap="wrap">
       <MBox display="inline-block" mr={1}>
           <MIconButton color="primary" onClick={() => props.setIsDrawerOpen(false)}>
               <ArrowForwardIcon/>
           </MIconButton>
       </MBox>
       <MBox minHeight={30} fontSize={18}>Current Rank - {props.nextRank.ranks}</MBox>
   </MBox>
</MToolbar>
</MAppBar>
<MBox p={2} display="flex" className={classes.rankDrawerWidth} >

   <MGrid
       container
       justify="center"
       alignItems="center"
       spacing={3}
   >
       <MGrid item xs={12}>
       <MBox mt={2}>
           <h1 className={classes.totalrequiredvoluem}> <b>300 </b> <small className={classes.totalrequiredvoluemheading}> Total Required Volume </small> </h1>
           <hr />
       </MBox>
       </MGrid>
       {/* Total Achieved*/}
       <MGrid item xs={12}>


           <MBox mt={5}>
               <h1 className={classes.achicedheading}> <b>78895.020 </b> <small className={classes.totalrequiredvoluemheading}> Total Achieved </small> </h1>
               <hr />
           </MBox>

       </MGrid>

       {/* Legs Required Volume */}

       <MGrid item xs={4}>
           <MBox mt={2}>
               <h1 className={classes.totalrequiredvoluem}> <b>100 </b>  <br /> <small className={classes.totalrequiredvoluemheading}> Total Left Leg Volume </small> </h1>
           </MBox>
           <hr />
       </MGrid>

       <MGrid item xs={4}>
           <MBox mt={2}>
               <h1 className={classes.totalrequiredvoluem}> <b>100 </b>  <br /> <small className={classes.totalrequiredvoluemheading}> Total Center Leg Volume </small> </h1>
           </MBox>
           <hr />
       </MGrid>

       <MGrid item xs={4}>
           <MBox mt={2}>
               <h1 className={classes.totalrequiredvoluem}> <b>100 </b>  <br /> <small className={classes.totalrequiredvoluemheading}> Total Left Leg Volume </small> </h1>
           </MBox>
           <hr />
       </MGrid>

       {/* next for showing Legs Volumes*/}
       <MGrid item xs={4}>
           <MBox mt={2}>
               <h1 className={classes.totalrequiredvoluem}> <b>1 </b>  <br /> <small className={classes.totalrequiredvoluemheading}>  Left Member(s) Required  </small> </h1>
           </MBox>
           <hr />
       </MGrid>

       <MGrid item xs={4}>
           <MBox mt={2}>
               <h1 className={classes.totalrequiredvoluem}> <b>1 </b>  <br /> <small className={classes.totalrequiredvoluemheading}>  Center   Member(s) Required  </small> </h1>
           </MBox>
           <hr />
       </MGrid>

       <MGrid item xs={4}>
           <MBox mt={2}>
               <h1 className={classes.totalrequiredvoluem}> <b>1 </b>  <br /> <small className={classes.totalrequiredvoluemheading}> Right Member(s) Required  </small> </h1>
           </MBox>
           <hr />
       </MGrid>
   {/*    Total Members at Each Legs */}

       <MGrid item xs={4}>

           <MBox mt={5}>
               <h1 className={classes.achicedheading}> <b>35 </b> <br /> <small className={classes.totalrequiredvoluemheading}> Left Member (s) Achieved </small> </h1>
               <hr />
           </MBox>
       </MGrid>

       <MGrid item xs={4}>

           <MBox mt={5}>
               <h1 className={classes.achicedheading}> <b>0.00 </b> <br /> <small className={classes.totalrequiredvoluemheading}> Center Member (s) Achieved </small> </h1>
               <hr />
           </MBox>
       </MGrid>

       <MGrid item xs={4}>
           <MBox mt={5}>
               <h1 className={classes.achicedheading}> <b>8</b> <br /> <small className={classes.totalrequiredvoluemheading}> Right  Member (s) Achieved </small> </h1>
               <hr />
           </MBox>
       </MGrid>


       {/*    Volume at Each Legs */}

       <MGrid item xs={4}>

           <MBox mt={5}>
               <h1 className={classes.achicedheading}> <b>62.054 </b> <br /> <small className={classes.totalrequiredvoluemheading}> Left Leg Volume (s) Achieved </small> </h1>
               <hr />
           </MBox>
       </MGrid>

       <MGrid item xs={4}>

           <MBox mt={5}>
               <h1 className={classes.achicedheading}> <b>0.00 </b> <br /> <small className={classes.totalrequiredvoluemheading}> Center Leg Volume (s) Achieved </small> </h1>
               <hr />
           </MBox>
       </MGrid>

       <MGrid item xs={4}>
           <MBox mt={5}>
               <h1 className={classes.achicedheading}> <b>748.00</b> <br /> <small className={classes.totalrequiredvoluemheading}> Right  Leg Volume(s) Achieved </small> </h1>
               <hr />
           </MBox>
       </MGrid>
   </MGrid>
</MBox>
</MDrawer>
}
        </>
    );
}

export default RankDrawer;