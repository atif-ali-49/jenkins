import React, {useState,useEffect} from 'react'
import { MBox, MTypography, MPaper,MPagination } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import useStyles from './CoinStyles'
import axios from 'axios';
import CoinList from './CoinList'

function CoinDropDown() {
        const classes = useStyles();
        const[coinsDropDown, setCoinsDropDown]=useState([]);
        const[loading, setLoading] = useState(false);

    const baseurl = process.env.REACT_APP_API_END_POINT;
    const getDropdownItems = async  () => {
        setLoading(true);
        await axios.get(baseurl+'/coin_nav')
        .then(function (response) {
            // handle success
            if(response.status === 200){
                setCoinsDropDown(response.data.coins)
            }
            setLoading(false);
        })
        .catch(function (error) {
            setLoading(false);
            console.log(error);
        })
    }

    useEffect(() => {
        getDropdownItems();
    },[]);
    return (
        <div>
            {/* <MBox className="pageHeader">
				<MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Coin Transfer</MTypography>
				<RouterBreadcrumbs />
            </MBox>
            <MBox className="contentBox" component={MPaper}>
            <CoinList data={coins} loading={loading} />
               {coins.length!==0 && 
                    <MBox mt={4} display="flex" justifyContent="flex-end">
                        <MPagination count={10} color="primary" />
                    </MBox>
                }
            </MBox> */}
         </div>
    )
}

export default CoinDropDown
