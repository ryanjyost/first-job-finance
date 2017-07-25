import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['slider-range'],

  currentValue: null,



  init(){
    this._super(...arguments);

    let currentValue = this.get('value');
    this.set('currentValue', currentValue)

    this.get('update')(currentValue);


  },

  didInsertElement(){
    let currentValue = this.get('value');
    this.set('currentValue', currentValue)

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


  actions:{

  }
});
