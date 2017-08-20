import Ember from 'ember';

const { inject } = Ember;

export default Ember.Component.extend({
  portal: null,

  repo: inject.service(),

  init(){
    this._super(...arguments)

    this.set('portal', this.get('portal'))
  },

  actions: {
    updateTimeLastVisited(){
      this.$('.card__link')[0].click();

      const id = this.get('portal.id');
      this.get('repo').updateTimeLastVisited(id);
    },

    deletePortal(){
      const id = this.get('portal.id');
      this.get('repo').deletePortal(id);
    }
  }




});
