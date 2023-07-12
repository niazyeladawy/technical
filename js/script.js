$(document).ready(function () {
    let cities = [
        {
            id: 1,
            title: "Cairo (Egy)",
        },
        {
            id: 2,
            title: "Giza (Egy)",
        },
        {
            id: 3,
            title: "Colombia (Colombia)",
        },
        {
            id: 4,
            title: "Geneva (Italy)",
        },
        {
            id: 5,
            title: "Mansoura (Egy)",
        }
    ];

    $('#dest').on('input', function () {
        let searchTerm = $(this).val().toLowerCase();
        let matchedCities = cities.filter(function (city) {
            return city.title.toLowerCase().includes(searchTerm);
        });

        let dropdownMenu = $('#cityDropdown ul.dropdown-menu');
        dropdownMenu.empty();

        if (matchedCities.length > 0) {
            matchedCities.forEach(function (city) {
                let listItem = $('<li>').addClass('dropdown-item').text(city.title);
                listItem.on('click', function () {
                    $('#dest').val(city.title);
                });
                dropdownMenu.append(listItem);
            });
        } else {
            let listItem = $('<li>').addClass('dropdown-item disabled').text('No cities found');
            dropdownMenu.append(listItem);
        }
    });

    $('#dest').on('focus', function () {
        $('#cityDropdown ul').addClass('show');
    });

    $('#dest').on('blur', function () {
        setTimeout(function () {
            $('#cityDropdown ul').removeClass('show');
        }, 200);
    });


    let currentDate = new Date();
    let nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);

    let cIn = formatDate(currentDate);
    let cOut = formatDate(nextDate);

    $('#cIn').val(cIn);
    $('#cOut').val(cOut);
    $('#nights').val('1');

    $('#cOut').on('change', function () {
        let checkInDate = new Date($('#cIn').val());
        let checkOutDate = new Date($(this).val());

        if (checkOutDate <= checkInDate) {
            alert('Check Out date should be after Check In date');
            $(this).val(formatDate(nextDate));
            return;
        }

        let nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

        let nightsSelect = $('#nights');
        let existingOptions = nightsSelect.find('option');
        let existingValues = existingOptions.map(function () {
            return parseInt($(this).val());
        }).get();

        if (nights > Math.max(...existingValues) || !existingValues.includes(nights)) {
            nightsSelect.append(`<option value="${nights}">${nights}</option>`);
        }

        nightsSelect.val(nights);
    });

    $('#nights').on('change', function () {
        let checkInDate = new Date($('#cIn').val());
        let nights = parseInt($(this).val());

        let checkOutDate = new Date(checkInDate);
        checkOutDate.setDate(checkOutDate.getDate() + nights);

        let cOut = formatDate(checkOutDate);
        $('#cOut').val(cOut);
    });

    $('#cIn').on('change', function () {
        let checkInDate = new Date($(this).val());
        if (checkInDate < currentDate) {
            alert('Check In date should not be before today');
            $(this).val(formatDate(currentDate));
        }
    });

    function formatDate(date) {
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }



    $('.counter-btn').on('click', function (event) {
        event.stopPropagation();

        let counter = $(this).siblings('.counter-value');
        let value = parseInt(counter.text());

        if ($(this).hasClass('plus')) {
            counter.text(value + 1);
        } else if ($(this).hasClass('minus') && value > 0) {
            counter.text(value - 1);
        }

        updateDropdownToggleText();
    });


    $('.dropdown-menu').on('click', function (event) {
        event.stopPropagation();
    });


    $(document).on('click', function () {
        $('.dropdown').removeClass('show');
    });

    // Update dropdown toggle button text based on counter values
    function updateDropdownToggleText() {
        let rooms = parseInt($('.dropdown-menu li:nth-child(1) .counter-value').text());
        let adults = parseInt($('.dropdown-menu li:nth-child(2) .counter-value').text());
        let children = parseInt($('.dropdown-menu li:nth-child(3) .counter-value').text());

        $('#travellersDropdown').text(`${rooms} Room${rooms > 1 ? 's' : ''}, ${adults} Adult${adults > 1 ? 's' : ''}, ${children} Child${children > 1 ? 'ren' : ''}`);
    }


    $("#nation").countrySelect({
        defaultCountry: "eg",
    });


    $('form').submit(function (event) {
        event.preventDefault();
        var destination = $('#dest').val();
        var hotelName = $('#hName').val();
        var checkIn = $('#cIn').val();
        var checkOut = $('#cOut').val();
        var nights = $('#nights').val();
        var roomCount = parseInt($('.travellers .dropdown-item.rooms .counter-value').text());
        var adultCount = parseInt($('.travellers .dropdown-item.adults .counter-value').text());
        var childCount = parseInt($('.travellers .dropdown-item.children .counter-value').text());
        var nationality = $('#nation').val();



        var searchResults = '<p>Destination: ' + destination + '</p>';
        searchResults += '<p>Hotel Name: ' + hotelName + '</p>';
        searchResults += '<p>Check In: ' + checkIn + '</p>';
        searchResults += '<p>Check Out: ' + checkOut + '</p>';
        searchResults += '<p>Nights: ' + nights + '</p>';
        searchResults += '<p>Room Count: ' + roomCount + '</p>';
        searchResults += '<p>Adult Count: ' + adultCount + '</p>';
        searchResults += '<p>Child Count: ' + childCount + '</p>';
        searchResults += '<p>Nationality: ' + nationality + '</p>';


        $('#searchResults').html(searchResults);


        $('#resultsModal').modal('show');
    });


});

