import Ember from 'ember';

export default Ember.Controller.extend({
  repo: Ember.inject.service(),

  filterButtons: [{label: 'Everything', value: null},{label: 'Calculators', value: 'calculator'},{label: 'Guides', value: 'guide'},{label: 'Tools', value: 'tool'},],

  cards: [
          {
            title: 'Estimate Your Take-Home Pay',
            description: 'You landed a job and know how much money you\'ll make. But how much will actually hit your bank account after taxes and retirement savings?',
            comingSoon: false,
            link: 'calculators.estimate-take-home-pay',
            type: 'calculator'
          },
          {
            title: 'Guide',
            description: 'You landed your first job',
            comingSoon: true,
            link: 'calculators.estimate-take-home-pay',
            type: 'guide'
          },
          {
            title: 'Budget',
            description: 'You landed your first job',
            comingSoon: true,
            link: 'calculators.estimate-take-home-pay',
            type: 'tool'
          },
  ],

});
