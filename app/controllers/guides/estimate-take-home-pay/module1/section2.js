import Ember from 'ember';

export default Ember.Controller.extend({
  incomeTypeButtons: [{label: 'hourly', value: 'hourly'},{label: 'salary', value: 'salary'},{label: 'irregular', value: 'irregular'}],

  hourlyWage: Ember.computed('model.user', function(){
    return this.get('model.user').hourlyWage;
  })
});
