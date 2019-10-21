(function () {
    'use strict';
    angular
        .module('app')
        .controller('Datepicker', Datepicker);
    Datepicker.$inject = [];

    function Datepicker() {
        var dp = this;
        dp.startDate;
        dp.endDate;

        // current year
        dp.currYear = (new Date()).getFullYear();

        $(document).ready(function () {
            let start_date_instance = undefined;
            let end_date_instance = undefined;
            dp.startDate;
            start_date_instance = $('#startDate').datepicker({
                minDate: new Date(),
                format: "dd/mm/yyyy",
                maxDate: dp.endDate,
                onSelect: (res) => {
                    dp.startDate = res;
                    if (end_date_instance)
                        end_date_instance[0].M_Datepicker.options.minDate = res;
                }
            });
            // instance[0].M_Datepicker.options.maxDate
            end_date_instance = $('#endDate').datepicker({
                    minDate: new Date(),
                    format: "dd/mm/yyyy",
                    onSelect: (res) => {
                        dp.endDate = res;
                        if (start_date_instance)
                            start_date_instance[0].M_Datepicker.options.maxDate = res;
                    }
                }
            );
        });
    }

})();

