const isEmpty = (value: any) =>
//controllo se il valore è undefined o null
    value === undefined ||
  value === null ||
  //controllo se il parametro è un oggetto e sia vuoto
  //oppure controllo se il paramtro e un stringa e se  vuota
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

export default isEmpty;
