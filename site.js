if (!('performance' in window) || !('timing' in window.performance) || !('navigation' in window.performance)) {
    alert("Navigation Timing API unsupported");
} else {

    var targetUrl = 'http://40.121.3.154/telegraf/write?precision=ms';

    window.addEventListener('load', function() {
        setTimeout(function() {
            var perfData = window.performance.timing;
            var pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            var renderTime = perfData.domComplete - perfData.domLoading;
            var latency = perfData.responseStart - perfData.fetchStart;

            var timeStamp = Date.now();
            var pageName = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);

            var pageLoadMetric = `page_load,page=${pageName} value=${pageLoadTime} ${timeStamp}`;
            var renderTimeMetric = `render_time,page=${pageName} value=${renderTime} ${timeStamp}`;
            var latencyMetric = `latency,page=${pageName} value=${latency} ${timeStamp}`;

            document.getElementById('pageLoadMetric').innerHTML = pageLoadMetric;
            document.getElementById('renderTimeMetric').innerHTML = renderTimeMetric;
            document.getElementById('latencyMetric').innerHTML = latencyMetric;

            fetch(targetUrl, {
                method: 'post',
                body: pageLoadMetric,
                mode: 'no-cors'
            });

            fetch(targetUrl, {
                method: 'post',
                body: renderTimeMetric,
                mode: 'no-cors'
            });

            fetch(targetUrl, {
                method: 'post',
                body: latencyMetric,
                mode: 'no-cors'
            });
        }, 0);
    });
}