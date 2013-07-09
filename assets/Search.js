var Search = {
    query: function(query, onDoneFunction, onFailFunction, render, fat) {

        var parameters = { q: query };
        if(render) {
            parameters.render = 1;
        } else if(fat) {
            parameters.fat = 1;
        }
        $.getJSON('/search.json', parameters).done(onDoneFunction).fail(onFailFunction);
    }
};