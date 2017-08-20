import Ember from 'ember';

export default Ember.Service.extend({
  data: null,
  expenses: null,
  annualIncome: null,
  incomeType: null,
  hourlyWage: null,
  workingHoursPerWeek: null,
  workingWeeksPerYear: null,
  payFrequency: null,
  employerPlanDeferralRate: null,
  stateName: null,
  monthlyTakeHomePay: null,
  portals: null,

  findAll(resource){
    return this.get(resource) ||
      this.set(resource, JSON.parse(window.localStorage.getItem(resource) || '[]'));
  },

  find(data){

    //default values
    const defaults = {
      "annualIncome": 40000,
      "incomeType": '"salary"',
      "hourlyWage": 10,
      "workingHoursPerWeek": 40,
      "workingWeeksPerYear": 50,
      "payPeriod":'"semi-monthly"',
      "employerPlanDeferralRate": 0.05,
      "stateName": '"Illinois"',
      "monthlyTakeHomePay": 2500,
    }

    let defaultValue = 'null'

    if(defaults[data]){
      defaultValue = defaults[data];
    }

    //return the localStorage value or default
    return this.get(data) ||
      this.set(data, JSON.parse(window.localStorage.getItem(data) || defaultValue));
  },

  persist(property, value) {
    if(value){
      this.set(property, value)
      console.log(property)
    }

    window.localStorage.setItem(property, JSON.stringify(this.get(property)));
  },

  //=================
  //EXPENSES
  //=================

  findExpense(id){
    let expenses = this.get('expenses');
    let expense = {};

    for(let i = 0; i<expenses.length; i++){
      if(expenses[i].id === id){
        expense = expenses[i];
      }
    }

    return expense;
  },

  addExpense(attrs) {
    let expense = Object.assign({ id: `exp_${Date.now()}` }, attrs);
    this.get('expenses').pushObject(expense);
    this.persist('expenses');
    return expense;
  },

  deleteExpense(expense) {
    this.get('expenses').removeObject(expense);
    this.persist('expenses');
  },

  //=================
  //PORTALS
  //=================
  addPortal(attrs) {
    let portal = Object.assign(
      { id: `portal_${Date.now()}`,
        lastVisited: Date.now(),
      }, attrs);

    this.get('portals').pushObject(portal);
    this.persist('portals');
    return portal;
  },

  updateTimeLastVisited(portalId){
    let portal = this.get('portals').findBy('id', portalId);

    this.get('portals').removeObject(portal);

    let newPortal = Object.assign({
      id: portal.id,
      lastVisited: Date.now(),
      name: portal.name,
      link: portal.link
    })

    this.get('portals').pushObject(newPortal);
    this.get('portals').sort((a,b) => {
      return a.id.slice(7) > b.id.slice(7) ? 1 : -1;
    });

    this.persist('portals');

  },

  deletePortal(portalId){
    const portal = this.get('portals').findBy('id', portalId);
    this.get('portals').removeObject(portal);
    this.persist('portals');
  }
});