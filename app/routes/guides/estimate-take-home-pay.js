import Ember from 'ember';

export default Ember.Route.extend({
  actions: {

  },

  model(){
    return {
      guideInfo: {
        title: 'Estimate Take-Home Pay',
        modules: [
          { name: 'Start with Gross Income',
            sections: [
            {name: 'What\'s \"gross\" income?'}

          ]},

          {name: 'Payroll Periods'},
        ]
      }
    }
  }
});
