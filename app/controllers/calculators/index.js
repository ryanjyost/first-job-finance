import Ember from 'ember';

let { computed, Controller, inject, } = Ember;

export default Controller.extend({
  cards: [
    {
      id:1,
      title: "Estimate your take-home pay",
      description: "So you're starting a new job soon, and know how much you'll earn. But how much money will actually hit your bank account after retirements savings and taxes?",
      comingSoon: false,
      link: 'calculators.estimate-take-home-pay',
    },
    {
      id:2,
      title: "Save up for a rainy day",
      description: "What happens if you lose your job? Or have to pay for a major car repair? How about you lose all your savings in Vegas? Rainy day fund to the rescue!",
      comingSoon: true,
      link: 'calculators',
    },
  ],

});