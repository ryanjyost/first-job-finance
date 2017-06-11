import Ember from 'ember';

export default Ember.Route.extend({
  repo: Ember.inject.service(),

  model(){
    let expenses = JSON.stringify(this.get('repo').findAll('expenses')),
        annualIncome = this.get('repo').find('annualIncome'),
        incomeType = this.get('repo').find('incomeType'),
        hourlyWage = this.get('repo').find('hourlyWage'),
        workingHoursPerWeek = this.get('repo').find('workingHoursPerWeek'),
        workingWeeksPerYear = this.get('repo').find('workingWeeksPerYear'),
        payPeriod = this.get('repo').find('payPeriod');


    return Ember.RSVP.hash({
      expenses,
      annualIncome,
      incomeType,
      hourlyWage,
      workingHoursPerWeek,
      workingWeeksPerYear,
      payPeriod



    })
  }

});
