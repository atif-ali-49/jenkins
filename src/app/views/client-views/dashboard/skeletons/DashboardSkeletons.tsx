import {
    MBox,
    MGrid,
    MSkeleton
} from 'src/app/components/mui';

export function RankSectionSkeleton(){
    return(
        <>
            <MBox mb={4}>
                <MSkeleton animation="wave" variant="rect" width={'100%'} height={30} />
            </MBox>
            <MGrid container spacing={2} alignItems="center">
                <MGrid item md={12} lg={6} >
                    <MBox>
                        <MBox display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                            <MSkeleton animation="wave" variant="rect" width={'100%'} height={30} />
                        </MBox>
                        <MBox display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                            <MSkeleton animation="wave" variant="rect" width={'100%'} height={30} />
                        </MBox>
                        <MBox display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                            <MSkeleton animation="wave" variant="rect" width={'100%'} height={30} />
                        </MBox>
                    </MBox>
                </MGrid>
                <MGrid item md={12} lg={5}>
                    <MSkeleton animation="wave" variant="circle" width={250} height={250} />
                </MGrid>
            </MGrid>
        </>
    );
};

export function SupportTicketSkeleton(){
    return(
        <>
            <MBox mb={3} width={"100%"}>
                <MSkeleton animation="wave" variant="rect" width={'100%'} height={35} />
            </MBox>
            <MBox mb={3}>
                <MSkeleton animation="wave" variant="rect" width={'100%'} height={35} />
            </MBox>
            <MBox mb={3}>
                <MSkeleton animation="wave" variant="rect" width={'100%'} height={35} />
            </MBox>
            <MBox mb={3}>
                <MSkeleton animation="wave" variant="rect" width={'100%'} height={35} />
            </MBox>
            <MBox mb={3}>
                <MSkeleton animation="wave" variant="rect" width={'100%'} height={35} />
            </MBox>
        </>
    );
};

export function StatsCardSkeleton(){
    return(
        <MGrid container spacing={2}>
            <MGrid item md={4} lg={3} sm={6} xs={12}>
                <MBox>
                    <MSkeleton animation="wave" variant="rect" width={"100%"} height={100} />
                </MBox>
            </MGrid>
            <MGrid item md={4} lg={3} sm={6} xs={12}>
                <MBox>
                    <MSkeleton animation="wave" variant="rect" width={"100%"} height={100} />
                </MBox>
            </MGrid>
            <MGrid item md={4} lg={3} sm={6} xs={12}>
                <MBox>
                    <MSkeleton animation="wave" variant="rect" width={"100%"} height={100} />
                </MBox>
            </MGrid>
            <MGrid item md={4} lg={3} sm={6} xs={12}>
                <MBox>
                    <MSkeleton animation="wave" variant="rect" width={"100%"} height={100} />
                </MBox>
            </MGrid>
        </MGrid>
    );
};