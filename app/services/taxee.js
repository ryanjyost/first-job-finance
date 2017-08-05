import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  headers:
    {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjU5ODMwZGYyZmIzY2I4NTNiMzg1ZGRiYSIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTUwMTc2MTAxMH0.9ChISh0mRE8m-PubHW3H2dAUh7yiH5Kxnh0Lms-75kk'
    },
  host: 'https://taxee.io',
  namespace: '/api/v2'
});