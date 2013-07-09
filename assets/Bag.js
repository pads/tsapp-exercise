var Bag = function(bag, onDoneFunction, onFailFunction, render, fat) {

    var parameters = {};
    if(render) {
        parameters.render = 1;
    } else if(fat) {
        parameters.fat = 1;
    }
    return {
        get: function() {
            $.getJSON('/bags/' + bag + '/tiddlers.json', parameters).done(onDoneFunction).fail(onFailFunction);
        }
    }
};