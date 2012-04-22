define(['order!underscore', 'order!jquery', 'order!backbone', 'libs/backbone-localstorage'], function(_, $, Backbone) {

  var Task = Backbone.Model.extend({
  
    // Default attributes 
    defaults: {
    },
  
    initialize: function() {
    },
  
    clear: function() {
    }
  
  });

  return Task;
});