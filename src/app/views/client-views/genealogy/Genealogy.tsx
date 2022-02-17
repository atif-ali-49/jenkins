import SettingsIcon from '@material-ui/icons/Settings';
import { useState } from 'react';
import { MBox, MButton, MPaper, MTypography } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import { SettingModal } from './settings-modal/SettingModal';
import GenealogyTree from './tree/Tree';

function Genealogy() {
	const [value, setValue] = useState('female');
	const [isModal, setIsModal] = useState(false);
	const baseurl = process.env.REACT_APP_API_END_POINT;


    return (
        <div>
            <MBox className="pageHeader" display="flex" alignItems="center" justifyContent="space-between">
				<MBox>
					<MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Genealogy</MTypography>
					<RouterBreadcrumbs />
				</MBox>
				<MBox>
				<MButton
					variant="contained"
					color="primary"
					startIcon={<SettingsIcon />}
					onClick={()=>setIsModal(true)}
				>
					Settings
				</MButton>
				</MBox>
            </MBox>   

			<MBox className="contentBox" component={MPaper}>
				<GenealogyTree />
				<SettingModal open={isModal} setIsModal={setIsModal} />
            </MBox>
        </div>
    )
}

export default Genealogy;
