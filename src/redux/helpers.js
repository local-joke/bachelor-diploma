import moment from 'moment'

//REDUCERS

export function removeItem(array, action) {
    return array.filter((item) => item.id !== Number(action.response.id));
}

export function addItem(array, action) {
    return [
        ...array,
        action.response[0]
    ]
}

export function insertItem(array, action) {
    array.map((item) => {
        if (item.id === action.response[0].id) {
            return action.response[0]
        }
        else return item
    })
}

//OTHER

export function getCurrentDate() {

    function getCorrectMonth(month) {
        if(month < 9) {
            return '0' + month
        }
        else return month
    }

    let date = new Date()
    let year = date.getFullYear ()
    let month = getCorrectMonth(date.getMonth() + 1)
    let day = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    let result = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    console.log('DATE RESULT', result)
    return result

}