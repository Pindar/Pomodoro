(function ($) {
    
    var dataService;
    
    function setUp() {
        dataService = po.dataService();
    }
    
    TestCase("initialize data service", sinon.testCase({
        setUp: setUp,
        
        "test dataService is an object":
        function () {
            assertObject(dataService);
        }
    }));
    
    TestCase("save list of tasks", sinon.testCase({
        setUp: setUp,
        
        "test save list of tasks for days is a function":
        function () {
            assertFunction(dataService.saveListOfTasksForDays);
        },
        
        "test save listOfTasksForDays stringify object":
        function () {
            // given
            sinon.spy(JSON, "stringify");
            
            // when
            dataService.saveListOfTasksForDays([{}]);

            //then
            assertTrue(JSON.stringify.calledOnce);
            
            JSON.stringify.restore();
        },

        "test stringify":
        function () {
            var string = JSON.stringify({"blub": {"bla": "blu"}});

            assertEquals('{"blub":{"bla":"blu"}}', string);
        },
        
        "test stringify array":
        function () {
            var string = JSON.stringify([{"test": "foo"}, {}]);
            
            assertEquals('[{"test":"foo"},{}]', string);
        }
    }));
    
    TestCase("restore list of tasks", sinon.testCase({
        setUp: setUp,
        
        "test restoreListOfTasks is a function":
        function () {
            assertFunction(dataService.restoreListOfTasks);
        }
    }));
    
})(jQuery);