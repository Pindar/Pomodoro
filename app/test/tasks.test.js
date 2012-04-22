require(['src/model/tasks', 'src/model/task', 'backbone'], function (Tasks, Task, Backbone) {
    var tasks,
        model;
    
    TestCase("initTasks", sinon.testCase({
        setUp: function() {            
            tasks = new Tasks();
            tasks.add({
                id: 5,
                name: "Foo"
            });
        },
        
        "test should add a model":
        function () {
            assertEquals(1, tasks.length);
        },
        
        "test should find a model by id":
        function () {
            assertEquals(5, tasks.get(5).get('id'));
        }
    }));
});