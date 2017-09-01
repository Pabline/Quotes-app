var Ajax = (function () {
    function Ajax() {
    }
    Ajax.call = function (options) {
        if (!options.url)
            return;
        var url = options.url;
        var type = options.type || "GET";
        var params = options.params || null;
        var callbackSuccess = options.success;
        var callbackError = options.error;
        var xmlhttp = new XMLHttpRequest();
        var requestSucces = 200;
        var requestError = 400;
        var msgError = msgError || 'Error in ajax call: ' + url;
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == XMLHttpRequest.DONE)
                if (xmlhttp.status == requestSucces) {
                    if (callbackSuccess)
                        callbackSuccess(xmlhttp.responseText);
                }
                else {
                    if (callbackError)
                        callbackError();
                }
        };
        xmlhttp.open(type.toUpperCase(), url, true);
        if (type == "POST") {
            console.log("Es POST");
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }
        if (options.timeout && options.timeout > 0)
            xmlhttp.timeout = options.timeout;
        params == null ? xmlhttp.send() : xmlhttp.send(params);
    };
    return Ajax;
}());
