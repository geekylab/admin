angular.module('clientApp').directive('datatable', function ($compile) {
    var ajaxParams = {}; // set filter mode
    var tableWrapper; // actual table wrapper jquery object
    var tableInitialized = false;

    return {
        templateUrl: '../../views/templates/order_datatable.html',
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            if (!$().dataTable) {
                return;
            }

            var table = $('table', element);
            var tableOptions = {
                "dom": "<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'<'table-group-actions pull-right'>>r><'table-scrollable't><'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'>>", // datatable layout
                "pageLength": 10, // default records per page
                "language": { // language settings
                    // data tables spesific
                    "lengthMenu": "<span class='seperator'>|</span>View _MENU_ records",
                    "info": "<span class='seperator'>|</span>Found total _TOTAL_ records",
                    "infoEmpty": "No records found to show",
                    "emptyTable": "No data available in table",
                    "zeroRecords": "No matching records found",
                    "paginate": {
                        "previous": "Prev",
                        "next": "Next",
                        "last": "Last",
                        "first": "First",
                        "page": "Page",
                        "pageOf": "of"
                    }
                },
                "orderCellsTop": true,
                "columnDefs": [{ // define columns sorting options(by default all columns are sortable extept the first checkbox column)
                    'orderable': false,
                    'targets': [0]
                }],

                "pagingType": "bootstrap_extended", // pagination type(bootstrap, bootstrap_full_number or bootstrap_extended)
                "autoWidth": false, // disable fixed width and enable fluid table
                "processing": false, // enable/disable display message box on record load
                "serverSide": true, // enable/disable server side ajax loading
                "ajax": { // define ajax settings
                    "url": "http://menu-api.geekylab.net:8080/api/order/orders", // ajax URL
                    "type": "POST", // request type
                    "timeout": 20000,
                    "data": function (data) { // add request parameters before submit
                        $.each(ajaxParams, function (key, value) {
                            data[key] = value;
                        });
                        //Metronic.blockUI({
                        //    message: tableOptions.loadingMessage,
                        //    target: tableContainer,
                        //    overlayColor: 'none',
                        //    cenrerY: true,
                        //    boxed: true
                        //});
                    },
                    "dataSrc": function (res) { // Manipulate the data returned from the server
                        if (res.customActionMessage) {
                            //Metronic.alert({
                            //    type: (res.customActionStatus == 'OK' ? 'success' : 'danger'),
                            //    icon: (res.customActionStatus == 'OK' ? 'check' : 'warning'),
                            //    message: res.customActionMessage,
                            //    container: tableWrapper,
                            //    place: 'prepend'
                            //});
                        }

                        if (res.customActionStatus) {
                            if (tableOptions.resetGroupActionInputOnSuccess) {
                                $('.table-group-action-input', tableWrapper).val("");
                            }
                        }

                        if ($('.group-checkable', table).size() === 1) {
                            $('.group-checkable', table).attr("checked", false);
                            $.uniform.update($('.group-checkable', table));
                        }

                        if (tableOptions.onSuccess) {
                            tableOptions.onSuccess.call(undefined, the);
                        }

//                        Metronic.unblockUI(tableContainer);

                        return res.data;
                    },
                    "error": function () { // handle general connection errors
                        if (tableOptions.onError) {
                            tableOptions.onError.call(undefined, element);
                        }

                        //Metronic.alert({
                        //    type: 'danger',
                        //    icon: 'warning',
                        //    message: tableOptions.dataTable.language.metronicAjaxRequestGeneralError,
                        //    container: tableWrapper,
                        //    place: 'prepend'
                        //});
                        //
                        //Metronic.unblockUI(tableContainer);
                    }
                },
                "drawCallback": function (oSettings) { // run some code on table redraw
                    if (tableInitialized === false) { // check if table has been initialized
                        tableInitialized = true; // set table initialized
                        table.show(); // display table
                    }
                    //Metronic.initUniform($('input[type="checkbox"]', table)); // reinitialize uniform checkboxes on each table reload
                    //countSelectedRecords(); // reset selected records indicator

                    $compile(table)(scope);
                }
            };


            // apply the special class that used to restyle the default datatable
            var tmp = $.fn.dataTableExt.oStdClasses;

            $.fn.dataTableExt.oStdClasses.sWrapper = $.fn.dataTableExt.oStdClasses.sWrapper + " dataTables_extended_wrapper";
            $.fn.dataTableExt.oStdClasses.sFilterInput = "form-control input-small input-sm input-inline";
            $.fn.dataTableExt.oStdClasses.sLengthSelect = "form-control input-xsmall input-sm input-inline";

            // initialize a datatable
            var dataTable = table.DataTable(tableOptions);

            // revert back to default
            $.fn.dataTableExt.oStdClasses.sWrapper = tmp.sWrapper;
            $.fn.dataTableExt.oStdClasses.sFilterInput = tmp.sFilterInput;
            $.fn.dataTableExt.oStdClasses.sLengthSelect = tmp.sLengthSelect;

            tableWrapper = table.parents('.dataTables_wrapper');

            // build table group actions panel
            //if ($('.table-actions-wrapper', tableContainer).size() === 1) {
            //    $('.table-group-actions', tableWrapper).html($('.table-actions-wrapper', tableContainer).html()); // place the panel inside the wrapper
            //    $('.table-actions-wrapper', tableContainer).remove(); // remove the template container
            //}

            // handle filter submit button click
            table.on('click', '.filter-submit', function (e) {
                e.preventDefault();
            });

        }
    };
});