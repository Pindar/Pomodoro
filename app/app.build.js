({
    appDir: './app',
    baseUrl: '../',
    dir: '../release',
    paths: {
        'order': 'libs/order',
        'backbone':         'libs/backbone.amd',
        'underscore':       'libs/underscore.amd',
        'jquery':           'libs/jquery',
        'json2':            'libs/json2',
        'sinon':            'libs/sinon.js'
    },
    optimize: "uglify",
    modules: [
        {
            name: "src/model/task"
        }
    ]

})