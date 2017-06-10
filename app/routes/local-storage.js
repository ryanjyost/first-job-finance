import Ember from 'ember';

export default Ember.Route.extend({
  repo: Ember.inject.service(),

  model(){
    let expenses = JSON.stringify(this.get('repo').findAll('expenses')),
        annualIncome = this.get('repo').find('annualIncome'),
        payPeriod = this.get('repo').find('payPeriod'),
        hourlyWage = this.get('repo').find('hourlyWage');

    console.log('skooosh', payPeriod)

    return Ember.RSVP.hash({
      expenses,
      annualIncome,
      hourlyWage,
      payPeriod

    })
  }

});
