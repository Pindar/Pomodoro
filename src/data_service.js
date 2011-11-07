po.namespace('po');

po.dataService = function () {
    
    var listOfDays = "listOfDays";
    
    function saveListOfTasksForDays(list) {
        var jsonList = JSON.stringify(list);
        
        return window.localStorage.setItem(listOfDays, jsonList);
    }
    
    function restoreListOfTasks() {
        var list = JSON.parse(window.localStorage.getItem(listOfDays));
        
        for (item in list) {
            list[item] = po.task().parse(list[item]);
        }
        
        return list || {};
    }
    
    return {
        saveListOfTasksForDays: saveListOfTasksForDays,
        restoreListOfTasks: restoreListOfTasks
    };
};