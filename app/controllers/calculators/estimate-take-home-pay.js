import Ember from 'ember';

let { computed, Controller, inject, } = Ember;

export default Controller.extend({
  finance: inject.service(),
  repo: inject.service(),

  listOfStates: computed(function(){
    return this.get('finance').listOfStates;
  }),

  //=======================================================
  //controller variables
  timeframe: 'year',
  timeframeDivisor: 1, //from annual figure, divide by...

  //=======================================================
  //constants
  payFrequencyButtons: [{label: 'monthly', value: 'monthly'},{label: 'semi-monthly', value: 'semi-monthly'},{label: 'bi-weekly', value: 'bi-weekly'},{label: 'weekly', value: 'weekly'}],
  incomeTypeButtons: [{label: 'hourly', value: 'hourly'},{label: 'salary', value: 'salary'}],
  selectTimeframeButtons: [{label: 'Year', value: 'year'},{label: 'month', value: 'month'},{label: 'paycheck', value: 'paycheck'}],


  //=======================================================
  //computed properties
  incomePerYear: computed(
    'model.annualIncome',
    'model.incomeType',
    'model.hourlyWage',
    'model.workingHoursPerWeek',
    'model.workingWeeksPerYear',

    function(){
      const incomeType = this.get('model.incomeType'),
            hourlyWage = this.get('model.hourlyWage'),
            workingHoursPerWeek = this.get('model.workingHoursPerWeek'),
            workingWeeksPerYear = this.get('model.workingWeeksPerYear');

        let annualIncome = this.get('model.annualIncome');

        if(incomeType === "hourly"){
          annualIncome = hourlyWage*workingHoursPerWeek*workingWeeksPerYear;
        }

        return annualIncome;
  }),

  fedTaxWhPerYear: computed(
    'model.employerPlanDeferralRate',
    'model.payPeriod',
    'incomePerYear',

    function(){
      const annualIncome = this.get('incomePerYear'),
            employerPlanDeferralRate = this.get('model.employerPlanDeferralRate'),
            payPeriod = this.get('model.payPeriod')

      const fedWhPerPaycheck = this.get('finance').fedTaxWithholdingPerPaycheck(annualIncome, employerPlanDeferralRate, 2, payPeriod)

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
          fedTaxWhPerYear = fedWhPerPaycheck*12;
          break;
      }

      return fedTaxWhPerYear;
  }),

  currentStateName: computed('model.stateName', function(){
    return this.get('model.stateName')
  }),

  stateIncomeTaxPerYear: computed(
    'incomePerYear',
    'model.employerPlanDeferralRate',
    'currentStateName',

    function(){
      const stateIncomeTaxPerYear = this.get('finance')
        .estimatedStateIncomeTaxPerYear(
          this.get('incomePerYear'),
          this.get('currentStateName'),
          this.get('model.employerPlanDeferralRate')
        );

      return stateIncomeTaxPerYear;
  }),

  ficaTaxPerYear: computed('incomePerYear', function(){
      const annualIncome = this.get('incomePerYear');

      const ficaTaxPerYear = this.get('finance').ficaTaxPerYear(annualIncome);
      return ficaTaxPerYear;
  }),

  maxPreTaxSavingsRate: computed(
    'model.employerPlanDeferralRate',
    'model.annualIncome',
    'model.incomeType',
    'model.hourlyWage',
    'model.workingHoursPerWeek',
    'model.workingWeeksPerYear',

    function(){
      const rate = this.get('model.employerPlanDeferralRate'),
            incomeType = this.get('model.incomeType'),
            hourlyWage = this.get('model.hourlyWage'),
            workingHoursPerWeek = this.get('model.workingHoursPerWeek'),
            workingWeeksPerYear = this.get('model.workingWeeksPerYear');

      let annualIncome = this.get('model.annualIncome');

        if(incomeType === "hourly"){
          annualIncome = hourlyWage*workingHoursPerWeek*workingWeeksPerYear;

          if(annualIncome - 18000 < 0) //if annual income is less than or equal to 18000 (max deferral rate) then max 100% can be contributed
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

  employerPlanDeferralPerYear: computed(
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

  takeHomePayPerYear: computed(
    'incomePerYear',
    'fedTaxWhPerYear',
    'stateIncomeTaxPerYear',
    'ficaTaxPerYear',

    function(){
      const takeHomePayPerYear = this.get('incomePerYear') - this.get('employerPlanDeferralPerYear') - this.get('fedTaxWhPerYear') - this.get('stateIncomeTaxPerYear') - this.get('ficaTaxPerYear');
      const monthlyTakeHomePay = takeHomePayPerYear / 12;

      this.get('repo').persist('monthlyTakeHomePay', monthlyTakeHomePay); //save take-home-pay in repo to use for budget tool

      return takeHomePayPerYear
  }),

  timeframeDivisor: computed('model.payPeriod', 'timeframe', function(){
    const payPeriod = this.get('model.payPeriod'),
        timeframe = this.get('timeframe');

    let newTimeframeDivisor = 1;

      if(timeframe == 'month')
        newTimeframeDivisor = 12

      if(timeframe=='paycheck'){
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

      return newTimeframeDivisor
  }),

  //=======================================================
  //actions

  actions: {
    updateTimeframe(timeframe){
      this.set('timeframe', timeframe);
    },

    updateCurrentStateName(newStateName){
      this.set('currentStateName', newStateName);
    }
  }


});
