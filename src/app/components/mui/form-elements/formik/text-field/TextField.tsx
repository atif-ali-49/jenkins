import { TextField } from 'formik-material-ui';
import { Field } from 'formik';

export function MTextField(props:any){
    return(
        <Field
            {...props}
            component={TextField}
        />
    )
}