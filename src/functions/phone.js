/* eslint indent: [2, 4] */

export function applyPhoneMask (phone) {
    // PHONE NOT STRING
    if (typeof (phone) !== 'string') {
        return null
    }

    // PHONE HAVE 10 OR 11 DIGITS
    if (phone.length !== 10 && phone.length !== 11) {
        return null
    }

    // IS PHONE
    if (phone.length === 10) {
        return `(${phone.substring(0, 2)}) ${phone.substring(2, 6)}-${phone.substring(6, 10)}`
    }
    return `(${phone.substring(0, 2)}) ${phone.substring(2, 7)}-${phone.substring(7, 11)}`
}

export function removePhoneMask (phone) {
    // PHONE NOT STRING
    if (typeof (phone) !== 'string') {
        return null
    }

    // PHONE HAVE 14 OR 15 DIGITS
    if (phone.length !== 14 && phone.length !== 15) {
        return null
    }

    // IS PHONE
    if (phone.length === 14) {
        return `${phone.substring(1, 3)}${phone.substring(5, 9)}${phone.substring(10, 14)}`
    }
    return `${phone.substring(1, 3)}${phone.substring(5, 10)}${phone.substring(11, 15)}`
}
