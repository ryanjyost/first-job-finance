import Ember from 'ember';

export default Ember.Controller.extend({
  repo: Ember.inject.service(),

  filterButtons: [{label: 'Everything', value: null},{label: 'Calculators', value: 'calculator'},{label: 'Guides', value: 'guide'},{label: 'Tools', value: 'tool'},],

  cards: [
          {
            title: 'Estimate Take-Home Pay Before Your First Paycheck',
            description: 'You landed your first job',
            status: 'live',
            link: 'calculators.estimate-take-home-pay',
            type: 'calculator'
          },
          {
            title: 'Guide',
            description: 'You landed your first job',
            status: 'live',
            link: 'calculators.estimate-take-home-pay',
            type: 'guide'
          },
          {
            title: 'Budget',
            description: 'You landed your first job',
            status: 'live',
            link: 'calculators.estimate-take-home-pay',
            type: 'tool'
          },
  ],

});
