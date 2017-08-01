import Ember from 'ember';

export function formatNumber([value, numberType, showDecimals]) {

  //Format currency
  if(numberType === "currency") {
      let dollars = Math.floor(value).toLocaleString("en"),
      cents = value % 1,
      sign = '$';

    if(showDecimals){

      value = Number(dollars) + Number(cents);
      let total = value.toFixed(showDecimals).toLocaleString("en")

      return `${sign}${total}`

    } else{
      return `${sign}${dollars}`;
    }
  }

  else if(numberType === "percent"){
    let percentage = (value*100).toFixed(showDecimals);
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
