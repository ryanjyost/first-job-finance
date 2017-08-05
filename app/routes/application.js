import Ember from 'ember';

export default Ember.Route.extend({
  repo: Ember.inject.service(),

  actions: {

    updateGrossAnnualIncome(annualIncome){
      this.get('repo').persist('annualIncome', annualIncome);
    },

    updateIncomeType(type){
      this.get('repo').persist('incomeType', type);
    },

    updateHourlyWage(hourlyWage){
      this.get('repo').persist('hourlyWage', hourlyWage);
    },

    updateworkingHoursPerWeek(workingHoursPerWeek){
      this.get('repo').persist('workingHoursPerWeek', workingHoursPerWeek);
    },

    updateworkingWeeksPerYear(workingWeeksPerYear){
      this.get('repo').persist('workingWeeksPerYear', workingWeeksPerYear);
    },

    updatePayPeriod(payPeriod){
      this.get('repo').persist('payPeriod', payPeriod);
    },

    updateEmployerPlanDeferralRate(savingsRate){
      this.get('repo').persist('employerPlanDeferralRate', savingsRate);
    },

    updateState(stateName){
      this.get('repo').persist('stateName', stateName);
      console.log('update state in repo')
    },
  },

  model() {
    return Ember.RSVP.hash({
      expenses: this.get('repo').findAll('expenses'),
      annualIncome: this.get('repo').find('annualIncome'),
      incomeType: this.get('repo').find('incomeType'),
      hourlyWage: this.get('repo').find('hourlyWage'),
      workingHoursPerWeek: this.get('repo').find('workingHoursPerWeek'),
      workingWeeksPerYear: this.get('repo').find('workingWeeksPerYear'),
      payPeriod: this.get('repo').find('payPeriod'),
      employerPlanDeferralRate: this.get('repo').find('employerPlanDeferralRate'),
      stateName: this.get('repo').find('stateName'),
    })
  }
});
