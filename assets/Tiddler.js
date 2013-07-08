var Tiddler = function(bag, title, onDoneFunction, onFailFunction, render) {

    var options = '';
    if(render) {
        options = '?render=1';
    }

    return {
        get: function() {
            $.getJSON('/bags/' + bag + '/tiddlers/' + title + '.json' + options).done(onDoneFunction).fail(onFailFunction);
        },
        put: function(data) {
            $.ajax({
                url: '/bags/' + bag + '/tiddlers/' + title,
                type: 'PUT',
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: 'application/json'
            }).done(onDoneFunction).fail(onFailFunction);
        },
        delete: function() {
            $.ajax({
                url: '/bags/' + bag + '/tiddlers/' + title,
                type: 'DELETE',
                contentType: 'application/json'
            }).done(onDoneFunction).fail(onFailFunction);
        }
    }
};