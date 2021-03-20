export function formatCurrency(value:number, option={lang:'pt-BR', currency:'BRL'}){
  return new Intl.NumberFormat(option.lang, {
    style:'currency',
    currency:option.currency
  }).format(value)
}

export function formatDate(date:string, lang='pt-BR'){
  return new Intl.DateTimeFormat(lang).format(new Date(date))
}