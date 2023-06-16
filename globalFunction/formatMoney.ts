export function formatMoney(inputVal:number) {
  if (inputVal === undefined) {
    return '';
  }
    const outputVal = inputVal.toString()
                              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return outputVal;
  }