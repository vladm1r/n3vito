/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
*/
const DEFAULT_OPTIONS = {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
}

export const currencyFormatter = (value:number, options?:object):string => {
  return new Intl.NumberFormat('ru-RU', { ...DEFAULT_OPTIONS, ...options }).format(value)
}
