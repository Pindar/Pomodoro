define(['order!backbone', 'order!libs/backbone-localstorage', 'src/model/task'], function(Backbone, Store, Task) {

    return Backbone.Collection.extend({
        model: Task
    });

});