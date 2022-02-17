import { Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Zoom from '@material-ui/core/Zoom';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
	MBox,
	MButton,
	MCircularProgress,
	MLightTooltip, MPaper,
	MTooltip
} from 'src/app/components/mui';
import { showAlert } from "src/app/store";
import { AddMemberModal } from '../add-member-modal/AddMemberModal';
import './TreeSassStyles.scss';
import useStyles from './TreeStyles';
import UserGuideModal from './UserGuide';

export default function GenealogyTree() {

	const classes = useStyles();
	const baseurl = process.env.REACT_APP_API_END_POINT;
	const [loading, setLoading] = useState(false);
	const [isModal, setIsModal] = useState(false);
	const [currentPositionId, setCurrentPositionId] = useState(0);
	const [currentReferralId, setCurrentReferralId] = useState(0);
	const [treeCurrentPosition, setTreeCurrentPosition] = useState('top');
	const [searchedValue, setSearchedValue] = useState('');
	const [treeData, setTreeData] = useState();
	const [emptyNodePosition, setEmptyNodePosition] = useState('');
	const userId = useSelector((store: any) => store.auth.currentUser.id);
	const [addNewMember, setAddNewMember] = useState(false);
	var positionedArray:any = [];
	const dispatch = useDispatch();
	const[currentuserpositionID,setCurrentUserPositionID] = useState();
	const [userGuideOpen,setUserGuideOpen] = useState(false);

	const setGuider=() =>{
		setUserGuideOpen(true);
	  }

	const CustomTooltip = withStyles((theme: Theme) => ({
		tooltip: {
			fontSize: 13,
		},
	  }))(MTooltip);

	const DefaultNodesPosition = [{"id" : null,"position" : "L"},{"id" : null,"position" : "C"},{"id" : null,"position" : "R"}]


	const openAddMemberModal = (node:any,positionArrays)=> {
		setCurrentPositionId(node.id);
        setIsModal(true);
		setEmptyNodePosition(positionArrays.position);
	}

	const getGenealogyTree =  (()=>{
		setLoading(true);
		axios.get(baseurl+'/network')
		.then(function (res) {
			setTreeData(res.data[0]);
			setCurrentReferralId(res.data[0].id);
			setCurrentUserPositionID(res.data[0].posid);
		})
		.catch(function (err) {
			console.log(err)
		})
		.then(function () {
			setLoading(false);
		});
    });
	
    const getSpecficUserTree = ((id:string)=>{
		setLoading(true);
		axios.get(baseurl+ '/member/'+id)
		.then(function (res) {
			setTreeData(res.data[0]);
			setCurrentUserPositionID(res.data[0].posid);
		})
		.catch(function (err) {
			console.log(err)
		})
		.then(function () {
			setLoading(false);
		});
	});
    // one step up
	const goToOneStepUp = ()=>{
		setLoading(true);
		axios.get(baseurl+`/member/${currentuserpositionID}`)
			.then(function (res) {
				if(res.status === 200){
					setCurrentUserPositionID(res.data[0].posid);
					setTreeData(res.data[0]);

					// console.log(res.data[0].posid,'dd d d dd d')
				}
			})
			.catch(function (err) {
				console.log(err)
			})
			.then(function () {
				setLoading(false);
			});
	}
    
	const filterTree = () => {
		if(searchedValue!==''){
			setLoading(true);
			let formData = new FormData();
			formData.append('searchby', searchedValue);
			axios({
				method: "post",
				url: baseurl+'/network-search',
				data: formData,
			})
			.then(function (res) {
				if(res.status === 200){
					setTreeData(res.data[0]);
				}
				if(res.status === 202){
					dispatch(showAlert({
						message: res.data.message,
						messageType: 'error',
						showAlertMessage: true
					}));
				}
			})
			.catch(function (err) {
				console.log(err)
			})
			.then(function () {
				setLoading(false);
			});
		}else{
			return false;
		}
	};
	
	const getTreeWithSpecificPosition = ((pos:string) => {
		setTreeCurrentPosition(pos);
		setLoading(true);
		axios.post(baseurl+`/network-${pos}/${userId}`)
		.then(function (res) {
			if(res.status === 200){
				setTreeData(res.data[0]);
				setCurrentUserPositionID(res.data[0].posid);
			}
		})
		.catch(function (err) {
			console.log(err)
		})
		.then(function () {
			setLoading(false);
		});
	});

    useEffect(()=>{
      getGenealogyTree();
    },[addNewMember]);

	async function setPositionedArray(nodes){
		positionedArray = [];
		let temp0 = 0, temp1 = 0, temp2 = 0;
		
		nodes.map((node) => {
			if(node.position === 'L'){
				positionedArray['0'] = node;
				temp0++;
			}
			if(node.position === 'C'){
				positionedArray['1'] = node;
				temp1++;
			}
			if(node.position === 'R'){
				positionedArray['2'] = node;
				temp2++;
			}
		});

		if(temp0 === 0 || temp1 === 0 || temp2 === 0 ){
			if(temp0 === 0){
				positionedArray['0'] = DefaultNodesPosition[0];
			}
			if(temp1 === 0){
				positionedArray['1'] = DefaultNodesPosition[1];
			}
			if(temp2 === 0){
				positionedArray['2'] = DefaultNodesPosition[2];;
			}
		}

		return await positionedArray;

	}
	const renderEmptyNode = (node:any,positionArrays) => (
		<li>
			<a href="javascript:void(0);" onClick={() => openAddMemberModal(node,positionArrays)}>
				<MBox className="memberBox emptyCase">
					<MBox className="imageBox">+</MBox>
				</MBox>
			</a>
		</li>
	);

	const renderTree = (nodes:any) => (
	  <li key={nodes.id} id={`${nodes.username}`} className={`position ${nodes.position === 'L' ? 'left' : ''} ${nodes.position === 'C' ? 'center': ''} ${nodes.position === 'R' ? 'right': ''}`}>
			<MLightTooltip
				title={
					<MBox className="parent-tooltip">
						<MBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
							<MBox>username</MBox>
							<MBox>{nodes.username}</MBox>
						</MBox>
						<MBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
							<MBox>Ibo Status</MBox>
							<MBox color="palette.error">{ (nodes.ibo_status === 1) ? 'active': 'inactive' }</MBox>
						</MBox>
						<MBox display="flex" color="primary" justifyContent="space-between" alignItems="center" mb={1}>
							<MBox>Monthly Status</MBox>
							<MBox>{(nodes.monthly_status === 1) ? 'active' : 'inactive'}</MBox>
						</MBox>
						<MBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
							<MBox>Position</MBox>
							<MBox>{nodes.position}</MBox>
						</MBox>
						<MBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
							<MBox>joining Date</MBox>
							<MBox>{nodes.created_at.substring(0, 10)}</MBox>
						</MBox>
						<MBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
							<MBox>Position Id</MBox>
							<MBox>{nodes.posid}</MBox>
						</MBox>
						<MBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
							<MBox>Sponsor</MBox>
							<MBox>{nodes.sponsor}</MBox>
						</MBox>
						<MBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
							<MBox>Left Leg Count</MBox>
							<MBox>{nodes.leftLeg}</MBox>
						</MBox>
						<MBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
							<MBox>Center Leg Count</MBox>
							<MBox>{nodes.centerLeg}</MBox>
						</MBox>
						<MBox display="flex" justifyContent="space-between" alignItems="center">
							<MBox>right Leg Count</MBox>
							<MBox>{nodes.rightLeg}</MBox>
						</MBox>
					</MBox>
				}  arrow placement="left">

				<a href="javascript:void(0);" onClick={()=>getSpecficUserTree(nodes.id)}>
					<MBox className="memberBox">
						<MBox className="imageBox">
							<img src={(nodes.path !=='' && nodes.path !==null) ? nodes.path: '/img/client-dashboard/geneology-memeber-avatar.svg'} alt="Member" />
						</MBox>
						<MBox className="memberDetails">
							<h3 className={'memberName'}>{nodes.username}</h3>
						</MBox>
					</MBox>
				</a>
			</MLightTooltip>
         
		{
			// empty node case
			(nodes.children.length!==0) &&

			<ul>
			
				{/* setting array */}
				{
					nodes.children.map(() => {
						setPositionedArray(nodes.children);
					})
				}

				{
					(positionedArray.length!==0) && 
					
					positionedArray.slice(0,3).map((node) => {
						
						if(node.id == null){
							return renderEmptyNode(nodes,node);
						}else{
							return renderTree(node);
						}
					})
				}
			</ul>
		}

		  {/* if no child */}
		  {

			(nodes.haschild === false) &&
			<ul>
				{
					DefaultNodesPosition.map((node) => {
						return renderEmptyNode(nodes,node);
					})
				}
			</ul>
      		}
	  </li>
	);
  
	return(
		<MBox className="genealogyTreeWrapper">
			{loading ?
				<MBox position="relative" py={2} textAlign="center" minHeight="40px" mb={2}>
					<MCircularProgress />
				</MBox>
				:
				<>
					<MBox component={MPaper} display="flex" alignItems="center"  flexWrap="wrap" className={classes.filterBar} p={1}>
						<MBox my={1} display="flex" alignItems="center" flexGrow={1}  >
							<MBox minWidth={300} mt={1}>
								<TextField
									id="genealogy-search" 
									className={classes.searchField} 
									label="Search"
									placeholder="Search with Email or Username"
									type="search"
									variant="outlined"
									size="small"
									fullWidth
									value={searchedValue}
									onChange={(event)=>setSearchedValue(event.target.value)}
									onKeyPress={(ev) => {
										if (ev.key === 'Enter') {
										//   ev.preventDefault();
										  filterTree();
										}
									  }}
									/>
							</MBox>
							<MBox ml={1} margin="10 auto"   mt={1} >
								<MButton variant="contained" color="primary" className="btnSmall" onClick={filterTree}>Search</MButton>
							</MBox>
							</MBox>
							<MBox  margin="9 auto"  mt={1} mr={1}  > 
								<MButton variant="contained" color="primary" className="btnSmall" onClick={setGuider}>User Guide</MButton>
							</MBox>
						<MBox my={1}>
							<MPaper elevation={0} className={classes.filterButtonsPaper}>
								<ToggleButtonGroup size="small" exclusive aria-label="genealogy position" value={treeCurrentPosition}>
									 <CustomTooltip title={'Go to One Step Up'} arrow>
										<ToggleButton value="top" onClick={goToOneStepUp}>
										+1 <ArrowUpwardIcon fontSize="small" />
										</ToggleButton>
									</CustomTooltip>
									<CustomTooltip title={'Go to Top'} arrow>
										<ToggleButton value="top" onClick={()=>getGenealogyTree()}>
											<ArrowUpwardIcon fontSize="small" />
										</ToggleButton>
									</CustomTooltip>
									<CustomTooltip title={'Go to Bottom left'} arrow>
										<ToggleButton value="left" onClick={()=>getTreeWithSpecificPosition('left')}>
											<SubdirectoryArrowLeftIcon fontSize="small" />
										</ToggleButton>
									</CustomTooltip>
									<CustomTooltip title={'Go to Bottom Right'} arrow>
										<ToggleButton value="right" onClick={()=>getTreeWithSpecificPosition('right')}>
											<SubdirectoryArrowRightIcon fontSize="small" />
										</ToggleButton>
									</CustomTooltip>
									<CustomTooltip title={'Go to Bottom Center'} arrow>
										<ToggleButton value="center" onClick={()=>getTreeWithSpecificPosition('center')}>
											<ArrowDownwardIcon fontSize="small" />
										</ToggleButton>
									</CustomTooltip>
								</ToggleButtonGroup>
							</MPaper>
						</MBox>
					</MBox>
					<MBox className={`genealogyTree`} textAlign="center">
						<Zoom in={true}>
							<ul>
								{/* {renderTree(serverTreeNew)} */}
								{treeData && renderTree(treeData) }
							</ul>
						</Zoom>
					</MBox>
				</>
			}
			<UserGuideModal userGuideOpen={userGuideOpen} setUserGuideOpen={setUserGuideOpen}/>
			<AddMemberModal open={isModal} setIsModal={setIsModal} currentReferralId={currentReferralId} currentPositionId={currentPositionId} emptyNodePosition={emptyNodePosition} setAddNewMember={setAddNewMember} />
		</MBox>
	);
  }