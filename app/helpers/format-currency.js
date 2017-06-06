import Ember from 'ember';

export function formatCurrency(params) {
   let value = params[0],
      dollars = Math.round(value).toLocaleString("en"),
      cents = value % 100,
      sign = '$';

  if (cents.toString().length === 1) { cents = '0' + cents; }
  return `${sign} ${dollars}`;

  return params;
}

export default Ember.Helper.helper(formatCurrency);
