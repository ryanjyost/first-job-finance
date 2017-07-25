import Ember from 'ember';

export default Ember.Controller.extend({



  payFrequencyButtons: [{label: 'monthly', value: 'monthly'},{label: 'semi-monthly', value: 'semi-monthly'},{label: 'bi-weekly', value: 'bi-weekly'},{label: 'weekly', value: 'weekly'}],

  incomeTypeButtons: [{label: 'hourly', value: 'hourly'},{label: 'salary', value: 'salary'}],

  maxPreTaxSavingsRate: Ember.computed(
    'model.employerPlanSavingsRate',
    'model.annualIncome',
    'model.incomeType',
    'model.hourlyWage',
    'model.workingHoursPerWeek',
    'model.workingWeeksPerYear',

    function(){
      let rate = this.get('model.employerPlanSavingsRate'),
          annualIncome = this.get('model.annualIncome'),
          incomeType = this.get('model.incomeType'),
          hourlyWage = this.get('model.hourlyWage'),
          workingHoursPerWeek = this.get('model.workingHoursPerWeek'),
          workingWeeksPerYear = this.get('model.workingWeeksPerYear');

      return 0.25;
  })
});
