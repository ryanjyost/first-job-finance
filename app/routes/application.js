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
    },

    updateTakeHomePay(amount){
      this.get('repo').persist('monthlyTakeHomePay', amount);
    },

    createExpense(type){
       const updatedExpenses = new Promise((resolve, reject) => {

        if(!type){
          reject('no type specified')
        } else {
          const newExpense = Ember.Object.create(
            { expenseType: type,
              name: '',
              amount: 0,
              infoLink: ''}
          )

          this.get('repo').addExpense(newExpense);
          resolve(this.get('repo').findAll('expenses'));
        }
      })

      return updatedExpenses
    },

    editExpense(expense){
      this.get('repo').persist('expenses')
    },

    deleteExpense(expense){
      this.get('repo').deleteExpense(expense);
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
      monthlyTakeHomePay: this.get('repo').find('monthlyTakeHomePay'),
    })
  }
});
