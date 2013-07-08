var Bag = function(bag, onDoneFunction, onFailFunction) {

    return {
        get: function() {
            $.getJSON('/bags/' + bag + '/tiddlers.json').done(onDoneFunction).fail(onFailFunction);
        }
    }
};