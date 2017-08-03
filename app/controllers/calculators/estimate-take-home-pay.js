import Ember from 'ember';

export default Ember.Controller.extend({

  finance: Ember.inject.service(),

  //=======================================================
  //controller variables
  timeframe: 'year',
  timeframeDivisor: 1, //from annual figure, divide by...

  //=======================================================
  //constants
  payFrequencyButtons: [{label: 'monthly', value: 'monthly'},{label: 'semi-monthly', value: 'semi-monthly'},{label: 'bi-weekly', value: 'bi-weekly'},{label: 'weekly', value: 'weekly'}],
  incomeTypeButtons: [{label: 'hourly', value: 'hourly'},{label: 'salary', value: 'salary'}],
  selectTimeframeButtons: [{label: 'Year', value: 'year'},{label: 'month', value: 'month'},{label: 'paycheck', value: 'paycheck'}],
  listOfStates: ["Alaska",
                  "Arkansas",
                  "Arizona",
                  "California",
                  "Colorado",
                  "Connecticut",
                  "Delaware",
                  "District of Columbia",
                  "Florida",
                  "Georgia",
                  "Hawaii",
                  "Idaho",
                  "Illinois",
                  "Indiana",
                  "Iowa",
                  "Kansas",
                  "Kentucky",
                  "Louisiana",
                  "Massachusetts",
                  "Maryland",
                  "Maine",
                  "Michigan",
                  "Minnesota",
                  "Missouri",
                  "Mississippi",
                  "Montana",
                  "North Carolina",
                  "North Dakota",
                  "Nebraska",
                  "New Hampshire",
                  "New Jersey",
                  "New Mexico",
                  "Nevada",
                  "New York",
                  "Ohio",
                  "Oklahoma",
                  "Oregon",
                  "Pennsylvania",
                  "Puerto Rico",
                  "Rhode Island",
                  "South Carolina",
                  "South Dakota",
                  "Tennessee",
                  "Texas",
                  "Utah",
                  "Virginia",
                  "Vermont",
                  "Washington",
                  "Wisconsin",
                  "West Virginia",
                  "Wyoming"],

  //=======================================================
  //computed properties
  incomePerYear: Ember.computed(
    'model.annualIncome',
    'model.incomeType',
    'model.hourlyWage',
    'model.workingHoursPerWeek',
    'model.workingWeeksPerYear',

    function(){
      let annualIncome = this.get('model.annualIncome'),
          incomeType = this.get('model.incomeType'),
          hourlyWage = this.get('model.hourlyWage'),
          workingHoursPerWeek = this.get('model.workingHoursPerWeek'),
          workingWeeksPerYear = this.get('model.workingWeeksPerYear');

        if(incomeType === "hourly"){
          annualIncome = hourlyWage*workingHoursPerWeek*workingWeeksPerYear;
        }

        return annualIncome;
  }),

  incomePerMonth: Ember.computed('incomePerYear', function(){
    return this.get('incomePerYear')/12;
  }),

  fedTaxWhPerYear: Ember.computed(
    'model.employerPlanDeferralRate',
    'model.payPeriod',
    'incomePerYear',

    function(){
      let annualIncome = this.get('incomePerYear'),
          employerPlanDeferralRate = this.get('model.employerPlanDeferralRate'),
          payPeriod = this.get('model.payPeriod')

      let fedWhPerPaycheck = this.get('finance').fedTaxWithholdingPerPaycheck(annualIncome, employerPlanDeferralRate, 2, payPeriod)

      let fedTaxWhPerYear = 0;

      switch(payPeriod){
        case "weekly":
          fedTaxWhPerYear = fedWhPerPaycheck*52;
          break;
        case "bi-weekly":
          fedTaxWhPerYear = fedWhPerPaycheck*26;
          break;
        case "semi-monthly":
          fedTaxWhPerYear = fedWhPerPaycheck*24;
          break;
        case "monthly":
          fedTaxWhPerMonth = fedWhPerPaycheck*12;
          break;
      }

      return fedTaxWhPerYear;
  }),

  currentStateName: Ember.computed('model.stateIndex', function(){
    let listOfStates = this.get('listOfStates'),
        stateIndex = this.get('model.stateIndex')

    return listOfStates[stateIndex];
  }),

  maxPreTaxSavingsRate: Ember.computed(
    'model.employerPlanDeferralRate',
    'model.annualIncome',
    'model.incomeType',
    'model.hourlyWage',
    'model.workingHoursPerWeek',
    'model.workingWeeksPerYear',

    function(){
      let rate = this.get('model.employerPlanDeferralRate'),
          annualIncome = this.get('model.annualIncome'),
          incomeType = this.get('model.incomeType'),
          hourlyWage = this.get('model.hourlyWage'),
          workingHoursPerWeek = this.get('model.workingHoursPerWeek'),
          workingWeeksPerYear = this.get('model.workingWeeksPerYear');

        if(incomeType === "hourly"){
          let annualIncome = hourlyWage*workingHoursPerWeek*workingWeeksPerYear;

          if(annualIncome - 18000 < 0)
            return 1

          return 18000/annualIncome;
        }

        //max of gross annual income or $18,000
        if(annualIncome - 18000 < 0){
          return 1
        }

        //percentage of income that can be contributed to pre-tax employer plan
        return 18000/annualIncome;
  }),

  employerPlanDeferralPerYear: Ember.computed(
    'model.employerPlanDeferralRate',
    'model.annualIncome',
    'model.incomeType',
    'model.hourlyWage',
    'model.workingHoursPerWeek',
    'model.workingWeeksPerYear',

    function(){
      let rate = this.get('model.employerPlanDeferralRate'),
          annualIncome = this.get('model.annualIncome'),
          incomeType = this.get('model.incomeType'),
          hourlyWage = this.get('model.hourlyWage'),
          workingHoursPerWeek = this.get('model.workingHoursPerWeek'),
          workingWeeksPerYear = this.get('model.workingWeeksPerYear');

       if(incomeType === "hourly"){
        return (hourlyWage*workingHoursPerWeek*workingWeeksPerYear)*rate || 0;
       } else{
        return (annualIncome*rate) || 0;
       }
  }),

  //=======================================================
  //actions

  actions: {
    updateTimeframe(timeframe){
      this.set('timeframe', timeframe);

      let newTimeframeDivisor = 1;

      if(timeframe == 'month')
        newTimeframeDivisor = 12

      if(timeframe=='paycheck'){
        let payPeriod = this.get('model.payPeriod');

        switch(payPeriod){
          case "weekly":
            newTimeframeDivisor = 52;
            break;
          case "bi-weekly":
            newTimeframeDivisor = 26;
            break;
          case "semi-monthly":
            newTimeframeDivisor = 24;
            break;
          case "monthly":
            newTimeframeDivisor = 12;
            break;
        }
      }

      this.set('timeframeDivisor', newTimeframeDivisor)

      console.log(newTimeframeDivisor)
    }
  }


});
