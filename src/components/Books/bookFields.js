import React from 'react';
import {
    ControlLabel,
} from 'react-bootstrap'
import {Field} from 'redux-form'
import {formInput, formTextArea} from "../common/FormFields"
import {maxLength45, maxLength4, maxLength100, required} from '../../validations'

export function bookFields() {
    return <div>
        <Field
            name="Title"
            component={formInput}
            placeholder="Введите название"
            type="text"
            validate={[maxLength100, required]}
            label="Название"
        />
        <Field
            name="Author"
            component={formInput}
            placeholder="Введите имя автора"
            type="text"
            validate={maxLength45}
            label="Автор"
        />
        <Field
            name="Publisher"
            component={formInput}
            placeholder="Введите название издательства"
            type="text"
            validate={maxLength45}
            label="Издательство"
        />
        <Field
            name="Year"
            component={formInput}
            placeholder="Введите год написания"
            type="text"
            validate={maxLength4}
            normalize={value => !/[^0-9]/.test(value) ? value : ''}
            label="Год"
        />
    </div>
}