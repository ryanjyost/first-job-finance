import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['slider-range'],
  currentValue: null,

  init(){
    this._super(...arguments);

    const currentValue = this.get('value');
    this.set('currentValue', currentValue)

  },

  didInsertElement(){
    const currentValue = this.get('value');
    this.set('currentValue', currentValue);

    //set starting position of range thumb to equal repo value
    const sliderRange = this.$('.slider-range_input');
    sliderRange.val(currentValue);

  },

  didReceiveAttrs(){
    this._super(...arguments);

    const currentValue = this.get('value');
    this.set('currentValue', currentValue)
  },

  change(){
    const currentValue = this.get('value');
    this.set('currentValue', currentValue);

    this.get('update')(currentValue);
  },

});
