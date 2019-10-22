(function () {
    'use strict';
    angular
        .module('app')
        .controller('Origin', Origin);
    Origin.$inject = ['$scope', '$timeout'];

    function Origin($scope, $timeout) {
        let or = this;

        // stored  destinations placed
        or.origin = [];

        // filter
        or.filter = '';

        // stored origin searched places
        or.origin_search = [
            {
                abbreviation: 'CUB',
                title: 'Cuba',
                subtitle: 'beautiful place',
                img: 'images/paris.jpeg',
                id: 1,
                checked: false
            },
            {
                abbreviation: 'NYK',
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

        // modify or.origin
        or.Modify = (place) => {
            let index = -1;
            or.origin.find((item, i) => {
                if (place.id === item.id) {
                    index = i;
                    return item;
                }
            });

            if (index === -1)
                $('#chip-origin-dropdown').chips('addChip', {tag: place.abbreviation, id: place.id});
            else
                $('#chip-origin-dropdown').chips('deleteChip', index);

        };

        // jQuery functions
        $(document).ready(() => {

            // chips selector
            $('#chip-origin-dropdown').chips({
                onChipDelete: function (res) {
                    OnDeleteChip(res, 'd')
                },
                onChipAdd: (res) => {
                    //holding data
                    let chipsData = res[0].M_Chips.chipsData;
                    let id = chipsData[chipsData.length - 1].id || Math.random() * 999999;
                    let chipTag = chipsData[chipsData.length - 1].tag;

                    // adding chips to input
                    $('#chips-origin').chips('addChip', {tag: chipTag, id: id});

                    // adding chips to or.origin
                    or.origin.push({abbreviation: chipTag, id: id});

                }
            });

            // chips selector
            $('#chips-origin').chips({
                onChipDelete: (res) => {
                    OnDeleteChip(res, 'o')
                },
                onChipAdd: () => {

                }
            });

            //trigger dropdown to select origin
            $('#chips-origin-dropdown-id').dropdown({
                closeOnClick: false,
                onCloseStart: () => {
                    $timeout(() => {
                        $scope.$apply(() => {
                            or.filter = '';
                        });
                    }, 0);
                }
            });
            let OnDeleteChip = (res, who_i_am) => {

                let array_to_delete = or.origin.map((chip) => {
                    return chip.id;
                });

                let current_chips = res[0].M_Chips.chipsData.map((chip) => {
                    return chip.id;
                });

                //chip id to delete
                let id_chip = array_to_delete.filter(el => !current_chips.includes(el))[0];

                //position of the hip into origin list
                let index = undefined;

                // finding position from origin
                or.origin.find((item, i) => {
                    if (id_chip === item.id) {
                        index = i;
                        return item;
                    }
                });

                if (index === undefined)
                    return;
                //deleting from origin
                or.origin.splice(index, 1);

                //position of the hip into origin_search list
                let index_OS = 0;

                // finding position from origin_search
                or.origin_search.find(function (item, i) {
                    if (id_chip === item.id) {
                        index_OS = i;
                        return item;
                    }
                });

                //pushing false checked option
                $timeout(() => {
                    $scope.$apply(() => {
                        or.origin_search[index_OS].checked = false;
                    });
                }, 0);
                //deleting from other chip
                switch (who_i_am) {
                    case 'o':
                        $('#chip-origin-dropdown').chips('deleteChip', index);
                        break;
                    case 'd':
                        $('#chips-origin').chips('deleteChip', index);
                        break;
                }


            }
        })

    }

})();

