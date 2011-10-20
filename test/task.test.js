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
       
       TestCase("time tracking", sinon.testCase({
           setUp: function () {
               testTask = po.task("example");
               this.clock = sinon.useFakeTimers(time, Date);
           },
           
           tearDown: function () {
               this.clock.restore();
           },

           startAndStop: function (timeTick) {
               testTask.start();
                  this.clock.tick(timeTick);
                  testTask.stop();
           },

           "test start stop task":
           function () {
               this.startAndStop(1500);
               
               assertEquals(1500, testTask.sumOfEffortTime());
           },
           
           "test start stop sequence":
           function () {
               var time1 = 1500,
                   time2 = 200;

               this.startAndStop(time1);
               this.startAndStop(time2);
               
               assertEquals(time1 + time2, testTask.sumOfEffortTime());
           },
           
           "test starts and stops two times and gives only effort of current call":
           function () {
               var time1 = 1500,
                   time2 = 200;
                   
               this.startAndStop(time1);
               this.startAndStop(time2);
               
               assertEquals(time2, testTask.sumCurrentEffortTime());
           },
           
           "test gets current effort without stop":
           function () {
               testTask.start();
               this.clock.tick(1001);
               
               assertEquals(1001, testTask.sumCurrentEffortTime());
           },
           
           "test calls sumCurrentEffortTime without start":
           function () {
               assertException(function () {
                   testTask.sumCurrentEffortTime();
               }, "Error");
           },
           
           "test calls start two times":
           function () {
               testTask.start();
               assertException(function(){
                    testTask.start();
                }, "Error");
           },
           
           "test calls stop two times":
           function () {
               testTask.start();
               testTask.stop();
               
               assertException(function () {
                   testTask.stop();
               }, "Error");
           }
           
       }));
}());