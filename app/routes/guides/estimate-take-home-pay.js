import Ember from 'ember';

export default Ember.Route.extend({
  repo: Ember.inject.service(),

  actions: {
    updateAnnualIncome(annualIncome){
      this.get('repo').persist('annualIncome', annualIncome);
    },

    updateHourlyWage(hourlyWage){
      console.log(hourlyWage);
      this.get('repo').persist('hourlyWage', hourlyWage);
    }
  },

  model(){
    return Ember.RSVP.hash({
      guideInfo: {
        title: 'Estimate Take-Home Pay',
        modules: [

          //1. Gross Income
          { title: 'Start with Gross Income',
            link: 'guides.estimate-take-home-pay.gross-income.intro',
            sections: [
              { title: 'What\'s \"gross\" income?',
                link: 'guides.estimate-take-home-pay.gross-income.intro'
              },
              { title: 'Figure out your gross annual income',
                link: 'guides.estimate-take-home-pay.gross-income.enter-income'
              },
              { title: 'Different types of income periods',
                link: 'guides.estimate-take-home-pay.gross-income.income-periods'
              },
              { title: 'Payroll period - how frequently you\'re paid',
                link: 'guides.estimate-take-home-pay.gross-income.payroll-period'
              }
          ]},
        ]
      },

      annualIncome: this.get('repo').find('annualIncome'),

      hourlyWage: this.get('repo').find('hourlyWage'),


      payPeriod: this.get('repo').find('payPeriod')
    }) //RSVP Hash

  } //model
});
