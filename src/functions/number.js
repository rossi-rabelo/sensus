/* eslint indent: [2, 4] */

export function applyMoneyMask (number, simple) {
    // VERIFY NUMBER
    if (!number || typeof (number) !== 'number') {
        if (simple) {
            return '0,00'
        }
        return 'R$ 0,00'
    }

    const value = number.toString()
    const aux = value.split('.')

    // CENTS FORMAT
    let cents = '00'
    if (aux.length === 2) {
        cents = aux[1]

        if (aux[1].length === 1) {
            cents = `${aux[1]}0`
        } else if (aux[1].length === 2) {
            cents = aux[1]
        }
    }

    // MONEY FORMAT
    const money = aux[0]
    if (simple) {
        return `${money},${cents}`
    }

    const length = money.length
    let bills = ''
    for (let i = 0; i < length; i++) {
        bills = `${money[length - (i + 1)]}${bills}`
        if ((i + 1) % 3 === 0 && (i + 1) !== money.length) {
            bills = `.${bills}`
        }
    }

    return `R$ ${bills},${cents}`
}

export function applySQLFormat (number) {
    if (!number) {
        return 0.0
    }

    return parseFloat(number.replace(',', '.'))
}
