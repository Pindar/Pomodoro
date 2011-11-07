(function () {
    
    var dayCount,
        time = new Date(2011,5,24,0,0,0),
        ONE_DAY = 1 * 1000 * 60 * 60 * 24,
        dataServiceStub;
    
    function setUp() {
        var dataService = po.dataService(),
            dataServiceStub = sinon.stub(dataService, 'restoreListOfTasks').returns({});
        dayCount = po.dayCount(dataService);
        this.clock = sinon.useFakeTimers(time.getTime());
    }
    
    function tearDown() {
        this.clock.restore();
        dataServiceStub.restoreListOfTasks.restore();
    }
    
    
    TestCase("initializing day count", sinon.testCase({
        setUp: setUp,
        
        "test initialize the object":
        function () {
            assertObject("day count is not an object.", dayCount);
        },
        
        "test checks getTask function":
        function () {
            assertFunction(dayCount.getTask);
        },
        
        "test checks existance of day task":
        function () {
            assertObject(dayCount.getTask());
        },
        
        "test checks day task is a instance of task":
        function () {
            assertEquals("task", dayCount.getTask().getType());
        },
        
        "test should get always the same task object at the same day":
        function () {
            var task = dayCount.getTask();
            
            this.clock.tick(ONE_DAY - 1); // one millisec before midnight
            assertSame(task, dayCount.getTask());
        },
        
        "test should get diffrent task object on diffrent days":
        function () {
            var task = dayCount.getTask();
            
            this.clock.tick(ONE_DAY);
            assertNotSame(task, dayCount.getTask());
        },
        
        "test start task is a function":
        function () {
            assertFunction(dayCount.startTask);
        },
        
        "test start task and get time":
        function () {
            dayCount.startTask();
            this.clock.tick(100);
            
            assertEquals(100, dayCount.getDaysEffort());
        },
        
        "test whether stop is a function":
        function () {
            assertFunction(dayCount.stopTask);
        },
        
        "test starts and stops day time":
        function () {
            dayCount.startTask();
            this.clock.tick(400);
            dayCount.stopTask();
            
            assertEquals(400, dayCount.getDaysEffort());
        },
        
        "test starts and stops day time two times":
        function () {
            dayCount.startTask();
            this.clock.tick(100);
            dayCount.stopTask();
            dayCount.startTask();
            this.clock.tick(230);
            dayCount.stopTask();
            
            assertEquals(330, dayCount.getDaysEffort());
        }
        
    }));
    
    TestCase("integrated with data service", sinon.testCase({
        
        "test checks whether restoreListOfTasks is called":
        function () {
            // given
            var dataService = po.dataService(), 
                dataServiceMock = sinon.mock(dataService);
                
            // dataServiceMock.expects("restoreListOfTasks")
            dataServiceMock.expects("restoreListOfTasks").once().returns({});
            
            // when
            assertObject(po.dayCount(dataService));
            
            // then
            dataServiceMock.verify();

            // clean up
            dataServiceMock.restore();
        }
    }));
    
    
})();