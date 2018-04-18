import notif from 'notie'
import swal from 'sweetalert'

export function formatMongoDate(date) {
  let newDate = new Date(date)
  let month = newDate.getMonth() + 1
  let day = newDate.getDate()
  let year = newDate.getFullYear().toString().substr(2,2)
  return `${month}/${day}/${year}`
}

export function notie(type, msg, delay) {
  let typeMap = { success: 1, warning: 2, danger: 3, info: 4 }
  let mType = typeMap[type]
  console.log('delay: ', delay)
  notif.alert(mType, msg, delay)
}

export function sweetAlert(message) {
    swal(message)
}