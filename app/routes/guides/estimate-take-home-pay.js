import Ember from 'ember';

export default Ember.Route.extend({
  repo: Ember.inject.service(),

  actions: {
    updateGrossAnnualIncome(annualIncome){
      this.get('repo').persist('annualIncome', annualIncome);
    },

    updateIncomeType(value){
      this.get('repo').persist('incomeType', value);
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


  },

  model(){
    let userInfo = this.modelFor('application');

    let guideInfo = {
      title: 'Estimate Take-Home Pay',
      incomeTypeButtons: [{label: 'hourly', value: 'hourly'},{label: 'salary', value: 'salary'},{label: 'irregular', value: 'irregular'}],
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
    }

    return Ember.RSVP.hash({
      user: userInfo,
      guide: guideInfo
    }) //RSVP Hash

  } //model
});
