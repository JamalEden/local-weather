/*global $, alert,console*/
$(document).ready(function () {
    'use strict';
    var lat,
        long,
        Ftemp,
        CTemp,
        Ktemp,
        tempSwap = true;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat  = position.coords.latitude;
            long = position.coords.longitude;
            
            $("#FTemp").css('cursor', 'pointer');
    
            var api = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=5566f4986fa603b8fae5a41b1a9560b4';
            $.getJSON(api, function (data) {
                var weatherType = data.weather[0].description,
                    Ktemp       = data.main.temp,
                    windSpeed   = data.wind.speed,
                    city        = data.name;
        
                Ftemp       = ((Ktemp) * (9 / 5) - 459.67).toFixed(0);
                CTemp       = (Ktemp - 273).toFixed(0);
                windSpeed   = (windSpeed * 2.237).toFixed(0);
                $("#city").html(city);
                $("#weatherType").html(weatherType);
                $("#FTemp").html(Ftemp + " &#8457");
                $("#windSpeed").html(windSpeed + " mph");
                $("#FTemp").click(function () {
                    if (tempSwap === true) {
                        $("#FTemp").html(CTemp + " &#8451");
                        tempSwap = false;
                    } else {
                        $("#FTemp").html(Ftemp + " &#8457");
                        tempSwap = true;
                    }
                });
                if (Ftemp < 40) {
                    $("#snow").show();
                    $("#rainy").hide();
                    $("#sunny").hide();
                    $("#clodly").hide();
                } else if (Ftemp < 60 && Ftemp > 40) {
                    $("#snow").hide();
                    $("#rainy").show();
                    $("#sunny").hide();
                    $("#clodly").hide();
                } else if (Ftemp < 80 && Ftemp > 60) {
                    $("#snow").hide();
                    $("#rainy").hide();
                    $("#sunny").hide();
                    $("#clodly").show();
                } else if (Ftemp > 80) {
                    $("#snow").hide();
                    $("#rainy").hide();
                    $("#sunny").show();
                    $("#cloudly").hide();
                }
            });
        });
    }
    $("#reset").click(function () {
    document.location.reload(true);
});
    
});