import { MBox, MTypography } from 'src/app/components/mui';

export function NoData() {
    return (
        <MBox p={3} textAlign="center" >
            <MBox pb={1} maxWidth={400} mx={'auto'}><img src="/img/no-data.png" alt="image" width="100%" /></MBox>
            <MTypography>Data Not Found</MTypography>
        </MBox>
    );
};
