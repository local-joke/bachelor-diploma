import React from 'react';
import {
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock
} from 'react-bootstrap'

export const formInput = (props) => {
    const {
        meta: { touched, error, warning, invalid },
        input,
        label,
        type,
        bsSize,
        className,
        placeholder,
        disabled,
    } = props;

    return (
        <FormGroup className={className} bsSize={bsSize ? bsSize : 'large'} validationState={invalid?'error':(input.value.length?'success':null)}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl
                {...input}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
            />
            <HelpBlock>
                {touched && ((error && error) || (warning && warning))}
            </HelpBlock>
        </FormGroup>
    )
};

export const formTextArea = (props) => {
    const {
        meta: { touched, error, warning, invalid },
        input,
        label,
        placeholder,
        disabled,
    } = props;

    return (
        <FormGroup bsSize='large' validationState={invalid?'error':(input.value.length?'success':null)}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl
                {...input}
                placeholder={placeholder}
                componentClass="textarea"
                disabled={disabled}
            />
            <HelpBlock>
                {touched && ((error && error) || (warning && warning))}
            </HelpBlock>
        </FormGroup>
    )
};