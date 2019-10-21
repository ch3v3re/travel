(function () {
    'use strict';
    angular
        .module('app')
        .controller('Home', Home);
    Home.$inject = [];

    function Home() {
        let hm = this;

        hm.switchOrigin = false;
        hm.count_passenger_str = '1 Adulto';

        hm.switch_origin = () => {
            hm.switchOrigin = !hm.switchOrigin;
        };

        hm.passenger_has_error = false;
        hm.passengers = [
            {
                label: 'Adultos',
                reference: '',
                count: 1,
                up: true,
                down: false
            },
            {
                label: 'Jóvenes',
                reference: '12 a 17',
                count: 0,
                up: true,
                down: false
            }, {
                label: 'Niños',
                reference: '2 a 11',
                count: 0,
                up: true,
                down: false
            }, {
                label: 'Bebés/asiento',
                reference: '< 2',
                count: 0,
                up: true,
                down: false
            }, {
                label: 'Bebés/regazo',
                reference: '< 2',
                count: 0,
                up: false,
                down: false
            },
        ];
        hm.count_passenger_number = 1;

        hm.modify = (index, up_down) => {
            hm.passenger_has_error = false;

            switch (up_down) {

                case 'u':
                    if (index === 4 && hm.passengers[0].count === hm.passengers[4].count) {
                        hm.error_message = 'La búsqueda no puede incluir más bebés en regazo que adultos';
                        hm.passenger_has_error = true;
                        break;
                    }

                    hm.count_passenger_number++;
                    hm.passengers[index].count++;
                    break;

                case 'd':
                    // validating negative numbers
                    if (hm.passengers[index].count === 0) {
                        break;
                        hm.passenger_has_error = true;
                    }
                    // validating lap babies
                    if (index === 0 && hm.passengers[0].count === hm.passengers[4].count) {
                        hm.error_message = 'La búsqueda no puede incluir más bebés en regazo que adultos';
                        hm.passenger_has_error = true;
                        break;
                    }
                    if (hm.passengers[0].count === 1 && index === 0) {
                        hm.error_message = 'La búsqueda debe incluir al menos 1 Adulto';
                        hm.passenger_has_error = true;
                        break;
                    }
                    hm.passengers[index].count--;
                    hm.count_passenger_number--;
                    break;
            }

            let passenger = hm.count_passenger_number > 1 ? " Pasajeros" : " Pasajero";
            hm.count_passenger_str = hm.count_passenger_number + passenger;
            document.getElementById('count_passenger-input').value = hm.count_passenger_str;

        };

        $(document).ready(() => {
            $('.select-passenger').dropdown({closeOnClick: false});
            $('select').formSelect();
        });
    }
})
();

