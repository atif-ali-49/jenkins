import React, { useState, useEffect } from 'react';
import {
    MBox,
    MGrid,
    MTypography,
    MTextField,
    MForm,
    MFormik,
    MButton,
    MPaper,
    MAlert,
} from 'src/app/components/mui';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkout from './Checkout';
import ExpressCardComponent from './ExpressCard';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';

function Index(props) {
    const [expressCard, setExpressCard] = useState(1);
    const ExpressCard = (type)=>{
        setExpressCard(type.target.value)


    }
    return (
        <div>
            <MGrid container spacing={3} justify="center" alignItems="center">
                <MGrid item md={3}>
                    <MBox mb={1}>
                        <FormControl component="fieldset">
                            <FormGroup aria-label="position" row>


                                <RadioGroup row  aria-label="quiz" name="quiz"  onChange={(e) => ExpressCard(e)} defaultValue='1'>
                                    <FormControlLabel value="1" control={<Radio />} label="Others"  />
                                    <FormControlLabel value="2" control={<Radio />} label="American Express Card" />
                                </RadioGroup>

                            </FormGroup>
                        </FormControl>
                    </MBox>
                </MGrid>

            </MGrid>
            {
                expressCard == 1 ?
                <Checkout></Checkout>
                    :
                    <ExpressCardComponent />

            }

        </div>
    );
}

export default Index;