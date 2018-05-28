const maxLength = max => value =>
    value && value.length > max ? `Довжина рядку в цьому полі не має перевищувати ${max} символів` : undefined

export const maxLength45 = maxLength(45)

export const maxLength4 = maxLength(4)

export const maxLength100 = maxLength(100)

export const maxLength150 = maxLength(150)

export const maxLength1000 = maxLength(1000)

export const required = value => (value ? undefined : "Поле є обов'язковим")

