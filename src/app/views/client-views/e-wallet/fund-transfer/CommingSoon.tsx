
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import { MBox, MGrid,MPaper,MPagination,MCircularProgress } from 'src/app/components/mui';

function CommingSoon(props) {
    return (
        <MGrid
            container
            spacing={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <MGrid item xs={12} sm={12} md={12}>
                <MBox textAlign="center"><img  src='/img/client-dashboard/withdraw.jpg'></img> </MBox>
            </MGrid>



        </MGrid>
    );
}

export default CommingSoon;