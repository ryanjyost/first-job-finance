import Ember from 'ember';

export function formatNumber([value, numberType, showDecimals]) {

  //Format currency
  if(numberType === "currency") {
      let dollars = Math.round(value).toLocaleString("en"),
      cents = value % 1,
      sign = '$';

    if(showDecimals === true){

      value = Number(dollars) + Number(cents);
      let total = value.toFixed(2)

      return `${sign}${total}`

    } else{
      return `${sign}${dollars}`;
    }
  }

  else if(numberType === "percent"){
    let percentage = Math.round(value*100);
    return `${percentage}%`
  }

  else if(numberType === "plain"){
    return value
  }

  else{
    return value
  }




}

export default Ember.Helper.helper(formatNumber);
