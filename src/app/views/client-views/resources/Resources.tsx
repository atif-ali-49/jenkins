import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { NoData } from 'src/app/components';
import { MBox, MCircularProgress, MPaper, MTypography } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import ResourseCard from './ResourceCard';
import useStyles from './ResourcesStyles';
import VideoCard from './VideoCard';



interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
    // className:string;
    classes:any;
  }
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, classes, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <MBox p={3}>
            <MTypography>{children}</MTypography>
          </MBox>
        )}
      </div>
    );
  }
  
  function a11yProps(index: any) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  

function Resources() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [resources, setResources] = React.useState([]);
	const dispatch = useDispatch();
  
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };

	const getResources = () => {
		setLoading(true);
		const baseUrl = process.env.REACT_APP_API_END_POINT;
		axios.get(baseUrl+'/resources')
	
		.then(function (res) {
			setResources(res.data.resources);
			setLoading(false);
		})
		.catch(function (error) {
			setLoading(false);

		})
	}

	useEffect(()=>{
		getResources();
	},[])

    return (
    <div>
            <MBox className="pageHeader">
                <MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Resources</MTypography>
				<RouterBreadcrumbs />
            </MBox>

			<MBox className="contentBox" component={MPaper}>
				{
				loading ?

				<MBox position="relative" py={2} textAlign="center" minHeight="40px" mb={2}>
					<MCircularProgress />
				</MBox>

				:
					resources && resources.length !== 0 ?
					
					<Grid container className={classes.containerFuild}>
						<div className={classes.Tabsroot}>
							<Grid item xs={4} sm={3}>
									<Tabs
										orientation="vertical"
										variant="fullWidth"
										value={value}
										onChange={handleChange}
										aria-label="Vertical tabs example"
										className={classes.tabs}
									>
										<Tab icon={<DescriptionOutlinedIcon/>} label="WhitePaper"  {...a11yProps(0)} />
										<Tab icon={< PictureAsPdfOutlinedIcon  />}   label="PDF" {...a11yProps(1)} />
										<Tab icon={<FileCopyOutlinedIcon />} label="PowerPoint" {...a11yProps(2)} />
										<Tab icon={<VideoLibraryOutlinedIcon/>} label="Video" {...a11yProps(3)} />
										<Tab icon={<PlayCircleOutlineOutlinedIcon/>} label="Testimonial Videos" {...a11yProps(4)} />
										<Tab  icon={<VideoLibraryOutlinedIcon/>} label="Training Videos" {...a11yProps(5)} />
									</Tabs>
							</Grid>
							<Grid  item xs={8} sm={9}>
									<MBox className={classes.tabPanelWrapper}>    
										
											<TabPanel classes={{ root: 'test' }} value={value} index={0} >            
												<Grid container justify="center"  spacing={2}>
													{
														resources.map((item)=>(
															(item['type'] == 'whitepaper') &&
															<ResourseCard 
																key={item['id']}
																title={item['lang']}
																img={'/img/client-dashboard/word.png'}
																flag={item['flag_image']}
																downloadPath={item['path']}
																boxWrap={classes.worddata}
															/>
														))
													}
												</Grid>                   
											</TabPanel>

											<TabPanel classes={{ root: classes.tab }}  value={value} index={1}>
												<Grid container justify="center"  spacing={2}>
												
													{/* PdfData.map((data)=>{ return (<ResourseCard title={data.name} img={data.img} flag={data.flag} boxWrap={classes.pdfdata}/>)}) */}

													{
														resources.map((item)=>(
															(item['type'] == 'PDF') &&
															<ResourseCard 
																key={item['id']}
																title={item['lang']}
																img={'/img/client-dashboard/icons-pdf.png'}
																flag={item['flag_image']}
																downloadPath={item['path']}
																boxWrap={classes.pdfdata}
															/>
														))
													}
													
												</Grid>
											</TabPanel>

											<TabPanel classes={{ root: classes.tab }} value={value} index={2}>
												<Grid container justify="center"  spacing={2}>
													{/* {
													PptData.map((data)=>{ return (<ResourseCard title={data.name} img={data.img} flag={data.flag} boxWrap={classes.pptdata}/>)})               
													} */}

														{
															resources.map((item)=>(
																(item['type'] == 'PPT') &&
																<ResourseCard 
																	key={item['id']}
																	title={item['lang']}
																	img={'/img/client-dashboard/icons-ppt.png'}
																	flag={item['flag_image']}
																	downloadPath={item['path']}
																	boxWrap={classes.pptdata}
																/>
															))
														}
												</Grid>
											</TabPanel>

											<TabPanel classes={{ root: classes.tab }} value={value} index={3}>
												<Grid container  spacing={2}>
													{														
														resources.map((item)=>(
															(item['type'] == 'video') &&
															<VideoCard title={item['title']} link={item['path']} poster={item['flag_image']}/>
														))
													}
												</Grid>
											</TabPanel>

											<TabPanel classes={{ root : classes.videoContainer}} value={value} index={4}>
												<Grid container  spacing={2}>
													{												
														resources.map((item)=>(
															(item['type'] == 'testimonial') &&
															<VideoCard title={item['title']} link={item['path']} poster="https://media.peacecoin.io/peaceposter.jpg"/>
														))
													}
												</Grid>
											</TabPanel>

											<TabPanel classes={{ root: classes.tab }} value={value} index={5}>
												<Grid container  spacing={2}>
													{												
														resources.map((item)=>(
															(item['type'] == 'training') &&
															<VideoCard title={item['title']} link={item['path']} poster="https://media.peacecoin.io/peaceposter.jpg"/>
														))
													}
												</Grid>
											</TabPanel>
									</MBox>
								</Grid>
						</div>
					</Grid>
					:

						<MBox mb={1}>
							<NoData />
						</MBox>
					
					
				}

			</MBox>
	</div>
    )
}

export default Resources
