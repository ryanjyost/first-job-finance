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

     updatePayFrequency(payFrequency){
      this.get('repo').persist('payFrequency', payFrequency);
    },
  },
});
