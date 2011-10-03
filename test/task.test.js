(function () {
    var testTask,
        time = Date.now();
    
    function setUp() {
        testTask = po.task();
    }
    
    
    TestCase("initializing", sinon.testCase({
        setUp: setUp,

        "test initialize task":
        function () {
            assertObject(testTask);
        }
    }));
    
    TestCase("setTaskDescription", sinon.testCase({
           setUp: setUp,

           "test set task description":
           function () {
               var description = "TestTask";
               
               testTask.getSetDescription(description);
               
               assertEquals("compare description", description, 
                    testTask.getSetDescription());
           },
           
           "test set null description":
           function () {
               assertException("description is null", function(){
                    testTask.getSetDescription(null);
                }, "TypeError");
           },
           
           "test set empty description":
           function () {
               assertEquals("", testTask.getSetDescription(""));
           },
           
           "test set undefined":
           function () {
               assertEquals("", testTask.getSetDescription());
           },
           
           "test initialize task with description":
           function () {
               var task = po.task("example");
               assertEquals("example", task.getSetDescription());
           }
       }));
       
       TestCase("initializing", sinon.testCase({
           setUp: function () {
               testTask = po.task("example");
               this.clock = sinon.useFakeTimers(time, Date);
           },
           
           tearDown: function () {
               this.clock.restore();
           },

           "test start stop task":
           function () {
               testTask.start();
               this.clock.tick(1500);
               testTask.stop();
               
               assertEquals(time + 1500, testTask.sumOfEffortTime());
           }
       }));
}());