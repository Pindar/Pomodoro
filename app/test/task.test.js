require(['src/model/task'], function(Task) {
    var task = new Task({
        name: "Clean the mess"
    });
    
    TestCase('initialization', sinon.testCase({

        "test add name to task": function () {
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

          "test should set the URL to the collection URL": function () {
              assertEquals("/collection", task.url());
          }
        }));

});
