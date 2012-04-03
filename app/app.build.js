({
    appDir: '../app',
    baseUrl: '../',
    dir: '../release',
    paths: {
        'order': 'libs/order',
        'backbone':         'libs/backbone',
        'underscore':       'libs/underscore',
        'jquery':           'libs/jquery',
        'json2':            'libs/json2'
    },
    optimize: "uglify",
    modules: [
        {
            name: "src/model/task"
        }
    ]

})