if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['order!underscore', 'order!jquery', 'order!backbone'], function(_, $, Backbone) {


  var TaskModel = Backbone.Model.extend({
  
    // Default attributes 
    defaults: {
      content: "hello world"
    },
  
    // A dummy initialization method
    initialize: function() {
    },
  
    clear: function() {
    }
  
  });
  return TaskModel;
  
  // return {foo: "foo"}

});