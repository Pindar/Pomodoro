(function (jQuery) {
    
    var dayCountController,
        jQueryPlay = {},
        jQueryStop = {},
        dayCountMock = {},
        jQueryTimer = {};

    function setUp() {
        /*:DOC += <input type="text" id="play" name="play" />*/
        /*:DOC += <input type="text" id="stop" name="stop" style="display: none;"/>*/

        jQueryPlay = jQuery('#play');
        jQueryStop = jQuery('#stop');

        dayCountController = po.dayCountController({"jQuery": jQuery, 
                "playTarget": jQueryPlay, 
                "stopTarget": jQueryStop,
                "dayCount": po.dayCount(),
                "dayTimerTarget": $()
            });
    }

    function tearDown() {
    }
    
    TestCase("inizialize daycount controller", sinon.testCase({
        setUp: setUp,

        tearDown: tearDown,

        "test initilize object":
        function () {
            assertObject(dayCountController);
        }
    }));
    
    TestCase("check click event binding", sinon.testCase({
        setUp: function () {
            setUp();
            sinon.spy(jQueryPlay, "bind");
            sinon.spy(jQueryStop, "bind");
        },
        tearDown: function () {
            tearDown();
            jQueryPlay.bind.restore();
            jQueryStop.bind.restore();
        },
        
        "test init is a function":
        function () {
            assertFunction(dayCountController.init);
        },
        
        "test checks dayCount start click binding":
        function () {
            dayCountController.init();
            
            assertTrue(jQueryPlay.bind.calledOnce);
            assertTrue(jQueryStop.bind.calledOnce);
        }
    }));
    
    TestCase("click on buttons", sinon.testCase({
        setUp: function () {
            var dayCount = po.dayCount();
            setUp();
            this.clock = sinon.useFakeTimers();
            dayCountMock = sinon.mock(dayCount);

            dayCountController = po.dayCountController({"jQuery": jQuery, 
                    "playTarget": jQueryPlay, 
                    "stopTarget": jQueryStop,
                    "dayCount": dayCount,
                    "dayTimerTarget": $()
                });
            dayCountController.init();

        },
        tearDown: function () {
            tearDown();
            
            dayCountMock.restore();
            this.clock.restore();
        },
        
        "test clicks play and check visibility":
        function () {
            jQueryPlay.trigger("click");
            
            assertTrue(jQueryPlay.is(":hidden"));
            assertTrue(jQueryStop.is(":visible"));
        },
        
        "test clicks stop and checks visibility":
        function () {
            jQueryPlay.trigger("click");
            jQueryStop.trigger("click");
            
            assertTrue(jQueryStop.is(":hidden"));
            assertTrue(jQueryPlay.is(":visible"));
        },
        
        "test clicks play and checks daycount call":
        function () {
            dayCountMock.expects("startTask").once();

            jQueryPlay.trigger("click");
            
            dayCountMock.verify();
        },
        
        "test clicks stop and checks stop task call":
        function () {
            dayCountMock.expects("stopTask").once();
            
            jQueryStop.trigger("click");
            
            dayCountMock.verify();
        },
        
        "test checks refresh is a function":
        function () {
            assertFunction(dayCountController.refresh);
        },
        
        "test clicks play and refresh is called":
        function () {
            var daycountControllerMock = sinon.mock(dayCountController);
            daycountControllerMock.expects("refresh").once();
            
            jQueryPlay.trigger("click");
            
            daycountControllerMock.verify();
        },
        
        "test clicks play and refresh is called every minute":
        function () {
            var daycountControllerMock = sinon.mock(dayCountController);
            daycountControllerMock.expects("refresh").exactly(6);

            jQueryPlay.trigger("click");
            this.clock.tick(1000 * 60 * 5);
            
            daycountControllerMock.verify();
        },
        
        "test clicks play and stop and checks refresh calls":
        function () {
            var daycountControllerMock = sinon.mock(dayCountController);
            daycountControllerMock.expects("refresh").thrice();
            
            jQueryPlay.trigger("click");
            this.clock.tick(1000 * 60 * 2);
            jQueryStop.trigger("click");
            this.clock.tick(1000 * 60 * 3);
            
            daycountControllerMock.verify();
        }
    }));
    
    TestCase("refresh timer", sinon.testCase({
        setUp: function () {
            /*:DOC += <div id="time"><ul><li class="pomodoro" title="actual pomodoro">18 Min</li></ul></div>*/
            var dayCount = po.dayCount();
            jQueryTimer = $("#time > ul > li:first-child");
            dayCountMock = sinon.mock(dayCount);
            sinon.spy(jQueryTimer, "text");
            setUp();
            
            dayCountController = po.dayCountController({"jQuery": jQuery, 
                    "playTarget": jQueryPlay, 
                    "stopTarget": jQueryStop,
                    "dayCount": dayCount,
                    "dayTimerTarget": jQueryTimer 
                });
        },
        
        tearDown: function () {
            tearDown();
            
            jQueryTimer.text.restore();
            dayCountMock.restore();
        },
        
        "test refresh time calls text function":
        function () {
            dayCountController.refresh();
            
            assertTrue(jQueryTimer.text.calledOnce);
        },
        
        "test refresh time calls getDaysEffort": 
        function () {
            dayCountMock.expects("getDaysEffort").once();
            
            dayCountController.refresh();
                        
            dayCountMock.verify();
        },
        
        "test formater":
        function () {
            assertEquals("0 min", dayCountController.format(5999));
            assertEquals("1 min", dayCountController.format(1 * 1000 * 60));
            assertEquals("1 h 0 min", dayCountController.format(60000 * 60));
            assertEquals("1 h 5 min", dayCountController.format(60001 * 65));
        }
    }));
    
})(jQuery);