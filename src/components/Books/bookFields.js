import React from 'react';
import {
    ControlLabel,
} from 'react-bootstrap'
import {Field} from 'redux-form'
import {formInput, formTextArea} from "../common/FormFields"

export function bookFields() {
    return <div>
        <Field
            name="Title"
            component={formInput}
            placeholder="Введите название"
            type="text"
            label="Название"
        />
        <Field
            name="Author"
            component={formInput}
            placeholder="Введите имя автора"
            type="text"
            label="Автор"
        />
        <Field
            name="Publisher"
            component={formInput}
            placeholder="Введите название издательства"
            type="text"
            label="Издательство"
        />
        <Field
            name="Year"
            component={formInput}
            placeholder="Введите год написания"
            type="text"
            label="Год"
        />
    </div>
}