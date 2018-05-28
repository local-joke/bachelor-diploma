import React from 'react';
import {
    ControlLabel,
} from 'react-bootstrap'
import {Field} from 'redux-form'
import {formInput, formTextArea} from "../common/FormFields"
import {maxLength100, maxLength1000, required} from '../../validations'


export function noteFields() {
    return <div>
        <Field
            name="HeaderText"
            component={formInput}
            placeholder="Введите заголовок"
            type="text"
            validate={maxLength100}
            label="Заголовок"
        />
        <Field
            name="NoteText"
            component={formTextArea}
            placeholder="Введите текст"
            validate={[maxLength1000, required]}
            label="Текст"
        />
        <ControlLabel style={{marginRight: '10px'}}>Важная</ControlLabel>
        <Field
            name="IsImportant"
            id="IsImportant"
            component="input"
            type="checkbox"
        />
    </div>
}