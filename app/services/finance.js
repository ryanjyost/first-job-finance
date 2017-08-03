import Ember from 'ember';

export default Ember.Service.extend({

  taxBrackets: [0.1, 0.15, 0.25, 0.28, 0.33, 0.35, 0.396],

  fedWithholdingTables: {
    "weekly": [
        //single, zero allowances
        { fedWhDollarLimits: [224, 774, 1812, 3730, 8058, 8090], // no limit for top bracket (6 index)
          fedWhSubtractionAmount: [44, 104, 372, 526.29, 1011.7, 1414.34, 2189.8]
        },

        //single, one allowance
        { fedWhDollarLimits: [301.88, 851.88, 1889.88, 3807.88, 8135.88, 8167.88], // no limit for top bracket (6 index)
          fedWhSubtractionAmount: [121.88, 181.88, 449.88, 604.17, 1089.58, 1492.22, 2267.68]
        },

        //single, two allowances
        { fedWhDollarLimits: [379.76, 929.76, 1967.76, 3885.76, 8213.76, 8245.76], // no limit for top bracket (6 index)
          fedWhSubtractionAmount: [199.76, 259.76, 527.76, 682.05, 1167.46, 1570.1, 2345.56]
        }],
    "bi-weekly": [
        //single, zero allowances
        { fedWhDollarLimits: [447, 1548, 3623, 7460, 16115, 16181], // no limit for top bracket (6 index)
          fedWhSubtractionAmount: [88, 207.67, 743.8, 1052.29, 2023.15, 2828.4, 4379.46]
        },

        //single, one allowance
        { fedWhDollarLimits: [602.77, 1703.77, 3778.77, 7615.77, 16270.77, 16336.77], // no limit for top bracket (6 index)
          fedWhSubtractionAmount: [243.77, 363.44, 899.57, 1208.06, 2178.92, 2984.17, 4535.23]
        },

        //single, two allowances
        { fedWhDollarLimits: [758.54, 1859.54, 3934.54, 7771.54, 16426.54, 16492.54], // no limit for top bracket (6 index)
          fedWhSubtractionAmount: [399.54, 519.21, 1055.34, 1363.83, 2334.69, 3139.94, 4691]
        }],
    "semi-monthly": [
        //single, zero allowances
        { fedWhDollarLimits: [484, 1677, 3925, 8081, 17458, 17529], // no limit for top bracket (6 index)
          fedWhSubtractionAmount: [96, 225.33, 806, 1140.18, 2191.82, 3064.17, 4744.43]
        },

        //single, one allowance
        { fedWhDollarLimits: [652.75, 1845.75, 4093.75, 8249.75, 17626.75, 17697.75], // no limit for top bracket (6 index)
          fedWhSubtractionAmount: [264.75, 394.08, 974.75, 1308.93, 2360.57, 3232.92, 4913.18]
        },

        //single, two allowances
        { fedWhDollarLimits: [821.5, 2014.5, 4262.5, 8418.5, 17795.5, 17866.5], // no limit for top bracket (6 index)
          fedWhSubtractionAmount: [433.5, 562.83, 1143.5, 1477.68, 2529.32, 3401.67, 5081.92]
        }],
    "monthly": [
        //single, zero allowances
        { fedWhDollarLimits: [969, 3354, 7850, 16163, 34917, 35058], // no limit for top bracket (6 index)
          fedWhSubtractionAmount: [192, 451, 1612.2, 2280.54, 4383.94, 6128.69, 9489.16]
        },

        //single, one allowance
        { fedWhDollarLimits: [1306.5, 3691.5, 8187.5, 16500.5, 35254.5, 35395.5], // no limit for top bracket (6 index)
          fedWhSubtractionAmount: [529.5, 788.5, 1949.7, 2618.04, 4721.44, 6466.19, 9826.66]
        },

        //single, two allowances
        { fedWhDollarLimits: [1644, 4029, 8525, 16838, 35592, 35733], // no limit for top bracket (6 index)
          fedWhSubtractionAmount: [867, 1126, 2287.2, 2955.54, 5058.94, 6803.69, 10164.16]
        }],
  },

  stateTaxWhTables: {
    //all single filers, 2016 rates
    //there should be 'n' rates and n-1 upper limits

    "Alaska": null,
    "Alabama": {
      marginalRates: [0.02, 0.04, 0.05],
      upperLimitsForBrackets: [500, 3000]
    },
    "Arkansas": {
      marginalRates: [0.009, .025, .035, .045, .06, .069],
      upperLimitsForBrackets: [4299, 8399, 12599, 20999, 35099]
    },
    "Arizona": {
      marginalRates: [2.59, 2.88, 3.36, 4.24, 4.54],
      upperLimitsForBrackets: [10000, 25000, 50000, 150000]
    },
    "California": {
      marginalRates: [0.01, 0.02, 0.04, 0.06, 0.08, 0.093, 0.103, 0.113, 0.123, 0.133],
      upperLimitsForBrackets: [7850, 18610, 29372, 40773, 51530, 263222, 315866, 526443, 1000000]
    },
    "Colorado": {
      marginalRates: [0.0463],
      upperLimitsForBrackets: [0]
    },
    "Connecticut":{
      marginalRates: [0.03, 0.05, 0.055, 0.06, 0.065, 0.069, 0.0699],
      upperLimitsForBrackets: [10000, 50000, 100000, 200000, 250000, 500000]
    },
    "Delaware":{
      marginalRates: [0, 0.022, 0.039, 0.048, 0.052, 0.0555, 0.066],
      upperLimitsForBrackets: [2000, 5000, 10000, 20000, 25000, 60000]
    },
    "District of Columbia":{
      marginalRates: [0.04, 0.06, 0.065, 0.085, 0.0875, 0.0895],
      upperLimitsForBrackets: [10000, 40000, 60000, 350000, 1000000]
    },
    "Florida": null,
    "Georgia":{
      marginalRates: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06],
      upperLimitsForBrackets: [750, 2250, 3750, 5250, 7000]
    },
    "Hawaii":{
      marginalRates: [0.014, 0.032, 0.055, 0.064, 0.068, 0.072, 0.076, 0.079, 0.0825],
      upperLimitsForBrackets: [2400, 4800, 9600, 14400, 19200, 24000, 36000, 48000]
    },
    "Idaho":{
      marginalRates: [0.016, 0.036, 0.041, 0.051, 0.061, 0.071, 0.074],
      upperLimitsForBrackets: [1452, 2940, 4356, 5808, 7260, 10890]
    },
    "Illinois":{
      marginalRates:[0.0495], // updated for 2017
      upperLimitsForBrackets: [0]
    },
    "Indiana":{
      marginalRates:[0.033],
      upperLimitsForBrackets: [0]
    },
    "Iowa": {
      marginalRates: [0.0036, 0.0072, 0.0243, 0.045, 0.0612, 0.0648, 0.068, 0.0792, 0.0898],
      upperLimitsForBrackets: [1554, 3108, 6216, 13896, 23310, 31080, 46620, 69930]
    },
    "Kansas":{
      marginalRates: [0.027, 0.046],
      upperLimitsForBrackets: [15000]
    },
    "Kentucky":{
      marginalRates: [0.02, 0.03, 0.04, 0.05, 0.058, 0.06],
      upperLimitsForBrackets: [3000, 4000, 5000, 8000, 75000]
    },
    "Louisiana": {
      marginalRates: [0.02, 0.04, 0.06],
      upperLimitsForBrackets: [12500, 50000]
    }
        // "Massachusetts",
        // "Maryland",
        // "Maine",
        // "Michigan",
        // "Minnesota",
        // "Missouri",
        // "Mississippi",
        // "Montana",
        // "North Carolina",
        // "North Dakota",
        // "Nebraska",
        // "New Hampshire",
        // "New Jersey",
        // "New Mexico",
        // "Nevada",
        // "New York",
        // "Ohio",
        // "Oklahoma",
        // "Oregon",
        // "Pennsylvania",
        // "Puerto Rico",
        // "Rhode Island",
        // "South Carolina",
        // "South Dakota",
        // "Tennessee",
        // "Texas",
        // "Utah",
        // "Virginia",
        // "Vermont",
        // "Washington",
        // "Wisconsin",
        // "West Virginia",
        // "Wyoming"
      },






  fedTaxWithholdingPerPaycheck(annualIncome, preTaxSavingsRate, allowances, payPeriod){
    //assumes the user is single (not married)

    const taxTable = this.get('fedWithholdingTables')[payPeriod][allowances],
          taxBrackets = this.get('taxBrackets');

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

      //remove retirement savings not subject to fed/state tax withholding
      const paycheckSubjectToTaxWh = grossIncomePerPaycheck * (1-preTaxSavingsRate);


    //===============================
    //calculate amount of withholding

      let index = 0;

      //determine tax bracket (index) for given income (step B in pub 15-A 2017)
      while(index < taxBrackets.length-1){
        //if pay is less than next limit, then currently in the correct bracket (index)
        if(paycheckSubjectToTaxWh < taxTable.fedWhDollarLimits[index]){
          break;
        }

        index++;
      }

      //subtract the proper amount based on brackets in fed withholding tax tables (step C in pub 15-A 2017)
      let incomeAtMarginalRate = paycheckSubjectToTaxWh - taxTable.fedWhSubtractionAmount[index];

      //return zero if the income reduced to less than zero by subtraction amount
      if(incomeAtMarginalRate < 0)
        return 0;

      //multiply result by margin tax bracket (step D in pub 15-A 2017)
      let fedWhAmountPerPaycheck = incomeAtMarginalRate * taxBrackets[index];

    //end of calculation
    //=================================

    return fedWhAmountPerPaycheck;

  },

});
