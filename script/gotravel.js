$(function(){
    ///////// Photo Ajax //////////
    $.ajax({
        url: 'https://api.unsplash.com/photos/search?category=4&query=travel&client_id=b21a9e8e8640c016bfff18622954eaa29cb31d67178c80f5e36efeaa02e9cb70',
        type: "GET",
        dataType: 'json',
    }).done(function(data){
        var bgPhotos = [];
        for (var i = 0; i < data.length; i++) {
            bgPhotos.push(data[i].urls.raw);
        }
        var randomBG = bgPhotos[Math.floor(Math.random() * bgPhotos.length)]
        $('body').css({'background-image': 'url(' + randomBG + ')'});
    });

    var selectedCity = $('#citySelect').val();
    var selectedMonth = $('#monthSelect').val();
    var selectedAdvice = $('#adviceSelect').val();

    var stateCountry = {name: 'New York', value: 'NY'};
    var city = {name: 'New York City', value: 'New_York_City'};

    var monthUrls = {
        January: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_01010131/q/'
        + stateCountry.value + '/' + city.value + '.json',
        February: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_02010228/q/'
        + stateCountry.value + '/' + city.value + '.json',
        March: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_03010331/q/'
        + stateCountry.value + '/' + city.value + '.json',
        April: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_04010430/q/'
        + stateCountry.value + '/' + city.value + '.json',
        May: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_05010531/q/'
        + stateCountry.value + '/' + city.value + '.json',
        June: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_06010630/q/'
        + stateCountry.value + '/' + city.value + '.json',
        July: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_07010731/q/'
        + stateCountry.value + '/' + city.value + '.json',
        August: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_08010831/q/'
        + stateCountry.value + '/' + city.value + '.json',
        September: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_09010930/q/'
        + stateCountry.value + '/' + city.value + '.json',
        October: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_10011031/q/'
        + stateCountry.value + '/' + city.value + '.json',
        November: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_11011130/q/'
        + stateCountry.value + '/' + city.value + '.json',
        December: 'http://api.wunderground.com/api/9ac21c72ca6041ef/planner_12011231/q/'
        + stateCountry.value + '/' + city.value + '.json'
    }

    function getMonthWeather(month) {
            $.ajax({
            url: month,
            type: "GET",
            dataType: 'json',
        }).done(function(data){
            var highF = 'High: ' + data.trip.temp_high.avg ['F'];
            var lowF = 'Low: ' + data.trip.temp_low.avg ['F'];
            var highC = 'High: ' + data.trip.temp_high.avg ['C'];
            var lowC = 'Low: ' + data.trip.temp_low.avg ['C'];
            $('#highF').text(highF);
            $('#lowF').text(lowF);
            $('#highC').text(highC);
            $('#lowC').text(lowC);
        });
    }



    $('button#getAdvice').click(function(){

        var selectedCity = $('#citySelect').val();
        var selectedMonth = $('#monthSelect').val();
        var selectedAdvice = $('#adviceSelect').val();


        city.value = $( "#citySelect option:selected" ).text().split(", ")[0];
        stateCountry.value = $( "#citySelect option:selected" ).text().split(", ")[1];


        console.log('city ' + city.value);
        console.log('state ' + stateCountry.value);

        $('#city').text(selectedCity);
        $('#monthTxt').text(selectedMonth);
        $('#initialForm').hide();
        $('#getAdviceForm').show();
        $('#weatherBox').show();
        $('#loginForm').hide();
        $('#signupForm').hide();
        getMonthWeather(monthUrls[selectedMonth]);
    });

    $('button#loginBtn').click(function(){
        $('#initialForm').hide();
        $('#getAdviceForm').hide();
        $('#loginForm').show();
        $('#signupForm').hide();
    });

    $('button#signupBtn').click(function(){
        $('#initialForm').hide();
        $('#getAdviceForm').hide();
        $('#loginForm').hide();
        $('#signupForm').show();
    });

    $("form").submit(function(event) {
        event.preventDefault();
    });


    $('button#moreAdvice').on('click', function(){
        var selectedCity = $('#citySelect').val();
        var selectedMonth = $('#monthSelect').val();
        var selectedAdvice = $('#adviceSelect').val();

        $('#city').text(selectedCity);
        $('#monthTxt').text(selectedMonth);


        if($('select:visible option:selected').text() === 'Things to avoid'){
            $('p#adviceText').text("Avoid driving on I-35 anytime of the day or night. The traffic is always terrible and will give you a sad.");
            $('p#author').text("Patrick K. - resident since 1994");
        }
        else if($('select:visible option:selected').text() === 'Things to eat'){
            $('p#adviceText').text("Torchy's Tacos is mecca for awesome tacos in Austin. Check out their taco of the month. Om nom nom nom!");
            $('p#author').text("H. Kelly - resident since 2005");
        }
        else if($('select:visible option:selected').text() === 'Things to do'){
            $('p#adviceText').text("Make it a point to visit Hamilton Pool at some point. It's a perfect way to cool off during the summer.");
            $('p#author').text("Moxxi - resident since 2015");
        }
    });
});
