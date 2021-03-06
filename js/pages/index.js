﻿/**
 * @return {string}
 */

$(function () {
    setTimeout(function () { $('.page-loader-wrapper').fadeOut(); }, 50);
    //Widgets count rtl and persian number
    $('.count-to').countTo({
        formatter: function (value, options) {
            return Persian_Number(value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, ' ').replace('.', ','));
        }
    });

    //Sales count to
    $('.sales-count-to').countTo({
        formatter: function (value, options) {
            return '$' + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, ' ').replace('.', ',');
        }
    });

    // initRealTimeChart();
    // initDonutChart();
    initSparkline();
});

var realtime = 'on';
function initRealTimeChart() {
    //Real time ==========================================================================================
    var plot = $.plot('#real_time_chart', [getRandomData()], {
        series: {
            shadowSize: 0,
            color: 'rgb(0, 188, 212)'
        },
        grid: {
            borderColor: '#f3f3f3',
            borderWidth: 1,
            tickColor: '#f3f3f3'
        },
        lines: {
            fill: true
        },
        yaxis: {
            min: 0,
            max: 100
        },
        xaxis: {
            min: 0,
            max: 100
        }
    });

    function updateRealTime() {
        plot.setData([getRandomData()]);
        plot.draw();

        var timeout;
        if (realtime === 'on') {
            timeout = setTimeout(updateRealTime, 320);
        } else {
            clearTimeout(timeout);
        }
    }

    updateRealTime();

    $('#realtime').on('change', function () {
        realtime = this.checked ? 'on' : 'off';
        updateRealTime();
    });
    //====================================================================================================
}

function initSparkline() {
    $(".sparkline").each(function () {
        var $this = $(this);
        $this.sparkline('html', $this.data());
    });
}

function initDonutChart() {
    Morris.Donut({
        element: 'donut_chart',
        data: [{
            label: 'کروم',
            value: 37
        }, {
            label: 'فایرفاکس',
            value: 30
        }, {
            label: 'سافاری',
            value: 18
        }, {
            label: 'اوپرا',
            value: 12
        },
        {
            label: 'دیگر',
            value: 3
        }],
        colors: ['rgb(233, 30, 99)', 'rgb(0, 188, 212)', 'rgb(255, 152, 0)', 'rgb(0, 150, 136)', 'rgb(96, 125, 139)'],
        formatter: function (y) {
            return Persian_Number(y + '%')
        }
    });
}

var data = [], totalPoints = 110;
function getRandomData() {
    if (data.length > 0) data = data.slice(1);

    while (data.length < totalPoints) {
        var prev = data.length > 0 ? data[data.length - 1] : 50, y = prev + Math.random() * 10 - 5;
        if (y < 0) { y = 0; } else if (y > 100) { y = 100; }

        data.push(y);
    }

    var res = [];
    for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]]);
    }

    return res;
}

function Persian_Number(text){
    var en_numbers = ["0","1","2","3","4","5","6","7","8","9"];
    var fa_numbrs =["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
    var last_text="";
    var find=-1;
    for(var i =0 ;i<text.length;i++)
    {
        find=en_numbers.indexOf(text.charAt(i));
        if(find==-1)
            last_text+=text.charAt(i);
        else
            last_text+=fa_numbrs[find];
        find=-1;
    }
    return last_text;
}