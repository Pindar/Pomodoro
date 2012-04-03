require(['src/model/task'], function(Task) {
    TestCase('foo', {
        testB:function(){
            assertFunction(Task);
        },
        testF: function () {
            var task = new Task({});

            assertEquals("hello world", task.get('content'));
        }
      });
});

require(['backbone'], function(Backbone) {
    TestCase('foo1', {
        testB:function(){
            assertFunction(Backbone.Model);
        },
        testF: function () {
            var foo = new Backbone.Model.extend({});
            assertFunction(foo);
        }
      });
});
