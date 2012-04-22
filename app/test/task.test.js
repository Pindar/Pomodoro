require(['src/model/task'], function(Task) {
    var task = new Task({
        name: "Clean the mess"
    });
    
    TestCase('initialization', sinon.testCase({
        "test should initialize the local storage":
        function () {
            assertObject(task.localStorage);
            assertFunction(task.localStorage.update);
        },
        
        "test add name to task": 
        function () {
            assertEquals("Clean the mess", task.get('name'));
        }
      }));

      TestCase('url', sinon.testCase({
          setUp: function () {
              var collection = {
                  url: "/collection"
              };
              
              task.collection = collection;
          },

          "test should set the URL to the collection URL": 
          function () {
              assertEquals("/collection", task.url());
          },
          
          "test should return the collection URL and id":
          function () {
              task.id = 1;
              assertEquals("/collection/1", task.url());
          }
        }));
        
        TestCase('validate', sinon.testCase({
            "test should not save when name is empty":
            function () {
                var eventSpy = sinon.spy();
                task.bind("error", eventSpy);
                
                task.save({"name": ""});
                
                assertTrue(eventSpy.calledOnce);
                assertTrue(eventSpy.calledWith(
                    task, 
                    "cannot have an empty name."
                  ));
            }
        }));

});
