var request = require('request');
var YAML = require('yamljs');
var fs = require('fs');

var options = {
    headers: {
        'User-Agent': 'request'
    },
    json: true
};
var nativeObject = YAML.load('_config.yml');
request.get('https://api.github.com/users/jaronoff97/repos', options, function(err, res, body) {
    //console.log(body)
    var projects = []
    for (var i = 0; i < body.length; i++) {
        console.log(body[i])
        projects.push({ name: body[i].name, url: body[i].url, updated: body[i].updated_at, description: body[i].description })
    }
    nativeObject['projects'] = projects.sort(function(a, b) {
        return Date.parse(b.updated) - Date.parse(a.updated)
    });
    console.log(nativeObject['projects'])

    fs.writeFile("_config.yml", YAML.stringify(nativeObject), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });

});
