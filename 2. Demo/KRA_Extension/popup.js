chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {

    var tab = tabs[0];
    var url = new URL(tab.url);
    var domain = url.hostname;
    var x = document.getElementById("site");
    x.innerHTML = x.innerHTML + domain.replace('www.', '');;
    x.style.fontSize = '13pt';
})

new function() {
    var ws = null;

    var sendButton;

    var open = function() {
        var url = 'ws://35.190.231.139:8000';
        ws = new WebSocket(url);
        ws.onmessage = onMessage;
        ws.onerror = onError;
    }




    var onMessage = function(event) {
        var data = event.data;
        if (data.indexOf('General Site') != -1) {
            $('.loading .spinner').css('top', '220px');
            $('.txt').text('General Site')
            $('.txt').css('top', '95px');
            $('.txt').css('color', 'green');
            $('.txt').css('left', '60px');
        }
        if (data.indexOf('Illegal Site') != -1) {
            $('.loading .spinner').css('top', '220px');
            $('.txt').text('Illegal Site')
            $('.txt').css('top', '95px');
            $('.txt').css('color', 'red');
            $('.txt').css('left', '67px');
        }
        if (data.indexOf('Error') != -1) {
            $('.loading .spinner').css('top', '220px');
            $('.txt').text('Error');
            $('.txt').css('top', '95px');
            $('.txt').css('left', '50px');
            $('.txt').css('color', 'red');
        }
    };

    var onError = function(event) {
        alert('Server Down');
    }



    WebSocketClient = {
        init: function() {
            open();

            sendMessage = $('#site');

            sendButton = $('#bt');

            sendButton.click(function(e) {
                var x = document.getElementById("site");
                var msg = (x.innerHTML.replace("Current Site : ", ''));
                ws.send(msg);
                $('.button_base').css('margin-top', '-800px');
                $('.loading .spinner').css('top', '22px');

                sendButton.hide();
            });

        }
    };
}

$(function() {
    WebSocketClient.init();
});