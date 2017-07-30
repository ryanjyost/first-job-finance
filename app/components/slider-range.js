import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['slider-range'],
  currentValue: null,

  init(){
    this._super(...arguments);

    let currentValue = this.get('value');
    this.set('currentValue', currentValue)

  },

  didInsertElement(){
    let currentValue = this.get('value');
    this.set('currentValue', currentValue);

    //set starting position of range thumb to equal repo value
    let sliderRange = this.$('.slider-range_input');
    sliderRange.val(currentValue);

  },

  didReceiveAttrs(){
    this._super(...arguments);

    let currentValue = this.get('value');
    this.set('currentValue', currentValue)
  },

  change(){
    let currentValue = this.get('value');
    this.set('currentValue', currentValue);

    this.get('update')(currentValue);
  },

});
