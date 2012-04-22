require(['libs/backbone-localstorage'], function(Store) {
    TestCase("init", sinon.testCase({
        "test should get a store function":
        function () {
            var store = new Store("test");
            assertObject(store);
            assertFunction(store.update);
        }
    }));
});
