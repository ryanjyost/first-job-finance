import Ember from 'ember';

export default Ember.Component.extend({
  filter: null,

  updateCardFilter(filter){
    this.set('filter', filter);
    this.get('updateCardList')(filter);
  }


});
