import Ember from 'ember';

export default Ember.Service.extend({

  taxBrackets: [0.1, 0.15, 0.25, 0.28, 0.33, 0.35, 0.396],

  fedWithholdingTables: {

    "semi-monthly": [
        //single, zero allowances
        { fedWhDollarLimits: [484, 1677, 3925, 8081, 17458, 17529], // no limit for top bracket (6 index)
          fedWhSubtractionAmount: [96, 225.33, 806, 1140.18, 2191.82, 3064.17, 4744.43]
        },

        //single, one allowance
        { fedWhDollarLimits: [652.75, 1845.75, 4093.75, 8249.75, 17626.75, 17697.75], // no limit for top bracket (6 index)
          fedWhSubtractionAmount: [264.75, 394.08, 974.75, 1308.93, 2360.57, 3232.92, 4913.18]
        },
    ]



  },


  fedTaxWithholding(annualIncome, preTaxSavingsRate, allowances, payPeriod, ){
    //assumes the user is single (not married)

    const taxTable = this.get('fedWithholdingTables')[payPeriod][allowances],
          taxBrackets = this.get('taxBrackets'),
          incomeSubjectToWh = annualIncome*(1-preTaxSavingsRate);

    let grossIncomePerPaycheck = 0;

      switch(payPeriod){
        case "weekly":
          grossIncomePerPaycheck = annualIncome / 52;
          break;
        case "bi-weekly":
          grossIncomePerPaycheck = annualIncome / 26;
          break;
        case "semi-monthly":
          grossIncomePerPaycheck = annualIncome / 24;
          break;
        case "monthly":
          grossIncomePerPaycheck = annualIncome / 12;
          break;
      }





    return grossIncomePerPaycheck;

  },

});
