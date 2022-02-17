import React, {useEffect} from 'react';
import useStyles from './TabsHorizontalStyles'
import {MAppBar, MTabs, MTab, MBox} from '../../mui';
import {NavLink} from "react-router-dom";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <MBox
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`horizontal-tabpanel-${index}`}
            aria-labelledby={`horizontal-tab-${index}`}
            {...other}
        >
            {value === index && <MBox p={3} pb={3}>{children}</MBox>}
        </MBox>
    );
}

function a11yProps(index: any) {
    return {
        id: `horizontal-tab-${index}`,
        'aria-controls': `horizontal-tabpanel-${index}`,
    };
}

export default function TabsHorizontal(props: any) {
    const classes = useStyles({});
    var tabIndex = 0;
    for (var i = 0; i < props.data.length; i++) {
        if (window.location.hash && props.data[i] && props.data[i].hash === window.location.hash.split('#')[1]) {
            tabIndex = i;
        }
    }

    const [value, setValue] = React.useState(tabIndex);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        var tabIndex = 0;

        if (props.selectedCompnent !== "" && window.location.hash === '#moreTabs') {
            for (var i = 0; i < props.data.length; i++) {
                if (props.selectedCompnent && props.data[i] && props.data[i].hash === 'moreTab') {
                    if (props.selectedCompnent === '') {
                        props.setSelectedCompnent('styleGuide');
                    }
                }
            }
        }

        if (props.selectedTabHash !== "" && window.location.hash === '#moreTab' && props.selectedCompnent==="") {
            for (var i = 0; i < props.data.length; i++) {
                if (props.selectedTabHash && props.data[i] && props.data[i].hash === props.selectedTabHash) {
                    tabIndex = i;
                }
            }
        } else if (props.selectedCompnent !== "" && window.location.hash === '#moreTabs') {
            for (var i = 0; i < props.data.length; i++) {
                if (props.selectedCompnent && props.data[i] && props.data[i].hash === 'moreTab') {
                    tabIndex = i;
                    if(props.selectedCompnent === '') {
                        props.setSelectedCompnent('styleGuide');
                    }
                }
            }
        } else {
            for (var i = 0; i < props.data.length; i++) {
                if (window.location.hash && props.data[i] && props.data[i].hash === window.location.hash.split('#')[1]) {
                    tabIndex = i;
                }
            }
        }
        setValue(tabIndex);
    }, [window.location.hash]);

    return (
        <div className={classes.tabsWrapper}>
            <MAppBar position="static" className={classes.tabsBar}>
                <MTabs
                    onChange={handleChange}
                    aria-label="Tabs Horizontal"
                    initialSelectedIndex={value}
                    value={value}>
                    {props.data.map((content: any, index: number) => (
                        <NavLink className={classes.tabNavLink} to={'#' + content.hash}
                                 onClick={() => props.tabClick(new Date())}>
                            <MTab className={classes.tab} label={content.label}
                                  disabled={content.disabled} {...a11yProps(index)} key={index}/>
                        </NavLink>
                    ))}
                </MTabs>
            </MAppBar>
            <MBox my={3} className={classes.panelWrapper} boxShadow={1} borderRadius={4}>
                {props.data.map((content: any, index: number) => (
                    <TabPanel value={value} index={index} key={index}>
                        {content.content}
                    </TabPanel>
                ))}
            </MBox>
        </div>
    );
}