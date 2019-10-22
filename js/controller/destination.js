(function () {
    'use strict';
    angular
        .module('app')
        .controller('Destination', Destination);
    Destination.$inject = ['$scope', '$timeout'];

    function Destination($scope, $timeout) {
        let dt = this;

        // stored  destinations placed
        dt.destination = [];

        // filter
        dt.filter = '';

        // stored destination searched places
        dt.destination_search = [
            {
                abbreviation: 'CUB',
                title: 'Cuba',
                subtitle: 'beautiful place',
                img: 'images/paris.jpeg',
                id: 1,
                checked: false
            },
            {
                abbreviation: 'NY',
                title: 'New York',
                subtitle: 'amazing',
                img: 'images/paris.jpeg',
                id: 2,
                checked: false
            },
            {
                abbreviation: 'PAN',
                title: 'Panama',
                subtitle: 'wow',
                img: 'images/paris.jpeg',
                id: 3,
                checked: false
            }
        ];

        // modify dt.destination
        dt.Modify = (place) => {
            let index = -1;

            dt.destination.find((item, i) => {
                if (place.id === item.id) {
                    index = i;
                    return item;
                }
            });

            if (index === -1)
                $('#chip-destination-dropdown').chips('addChip', {tag: place.abbreviation, id: place.id});
            else
                $('#chip-destination-dropdown').chips('deleteChip', index);

        };

        // jQuery functions
        $(document).ready(() => {

            // chips selector
            $('#chip-destination-dropdown').chips({
                onChipDelete: function (res) {
                    OnDeleteChip(res, 'd')
                },
                onChipAdd: (res) => {
                    //holding data
                    let chipsData = res[0].M_Chips.chipsData;
                    let id = chipsData[chipsData.length - 1].id || Math.random() * 999999;
                    let chipTag = chipsData[chipsData.length - 1].tag;

                    // adding chips to input
                    $('#chips-destination').chips('addChip', {tag: chipTag, id: id});

                    // adding chips to dt.destination
                    dt.destination.push({abbreviation: chipTag, id: id});
                }
            });

            // chips selector
            $('#chips-destination').chips({
                onChipDelete: (res) => {
                    OnDeleteChip(res, 'o')
                }
            });

            //trigger dropdown to select destination
            $('#destination-container').dropdown({
                closeOnClick: false,
                onCloseStart: () => {
                    $timeout(() => {
                        $scope.$apply(() => {
                            dt.filter = '';
                        });
                    }, 0);
                }
            });
            let OnDeleteChip = (res, who_i_am) => {

                let array_to_delete = dt.destination.map((chip) => {
                    return chip.id;
                });

                let current_chips = res[0].M_Chips.chipsData.map((chip) => {
                    return chip.id;
                });

                //chip id to delete
                let id_chip = array_to_delete.filter(el => !current_chips.includes(el))[0];

                //position of the hip into destination list
                let index = undefined;

                // finding position from destination
                dt.destination.find((item, i) => {
                    if (id_chip === item.id) {
                        index = i;
                        return item;
                    }
                });

                if (index === undefined)
                    return;
                //deleting from destination
                dt.destination.splice(index, 1);

                //position of the hip into destination_search list
                let index_OS = 0;

                // finding position from destination_search
                dt.destination_search.find(function (item, i) {
                    if (id_chip === item.id) {
                        index_OS = i;
                        return item;
                    }
                });

                //pushing false checked option
                $timeout(() => {
                    $scope.$apply(() => {
                        dt.destination_search[index_OS].checked = false;
                    });
                }, 0);
                //deleting from other chip
                switch (who_i_am) {
                    case 'o':
                        $('#chip-destination-dropdown').chips('deleteChip', index);
                        break;
                    case 'd':
                        $('#chips-destination').chips('deleteChip', index);
                        break;
                }


            }
        })


    }

})();

