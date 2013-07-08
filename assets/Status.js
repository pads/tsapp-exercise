var Status = {
    get: function(onDoneFunction, onFailFunction) {
        $.getJSON('/status').done(onDoneFunction).fail(onFailFunction);
    }
};