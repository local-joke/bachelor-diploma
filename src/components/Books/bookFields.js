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
            placeholder="Введіть назву"
            type="text"
            validate={[maxLength100, required]}
            label="Назва"
        />
        <Field
            name="Author"
            component={formInput}
            placeholder="Введіть ім'я автора"
            type="text"
            validate={maxLength45}
            label="Автор"
        />
        <Field
            name="Publisher"
            component={formInput}
            placeholder="Введіть назву видавництва"
            type="text"
            validate={maxLength45}
            label="Видавництво"
        />
        <Field
            name="Year"
            component={formInput}
            placeholder="Введіть рік написання"
            type="text"
            validate={maxLength4}
            normalize={value => !/[^0-9]/.test(value) ? value : ''}
            label="Рік"
        />
    </div>
}