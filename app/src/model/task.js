define(['order!backbone', 'order!libs/backbone-localstorage'], function(Backbone, Store) {

  var Task = Backbone.Model.extend({

    localStorage: new Store('task'),
    initialize: function() {
    },
    validate: function(attr) {
        if(!attr.name) {
            return "cannot have an empty name.";
        }
    }
  
  });

  return Task;
});