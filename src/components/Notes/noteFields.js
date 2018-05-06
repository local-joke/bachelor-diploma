import React from 'react';
import {
    ControlLabel,
} from 'react-bootstrap'
import {Field} from 'redux-form'
import {formInput, formTextArea} from "../common/FormFields"

export function noteFields() {
    return <div>
        <Field
            name="HeaderText"
            component={formInput}
            placeholder="Введите заголовок"
            type="text"
            label="Заголовок"
        />
        <Field
            name="NoteText"
            component={formTextArea}
            placeholder="Введите текст"
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