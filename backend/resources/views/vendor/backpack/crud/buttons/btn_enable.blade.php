@php($model = $crud->getModel())

<input type="checkbox" data-size="mini" data-toggle="toggle" {{ (intval($entry->accepted) === 1)?'checked':'' }}
data-on="{{ __('accepted') }}" onchange="changeStateRequest(this, '{{ $entry->getKey() }}')"
       data-off="{{ __('not accepted') }}"
       data-onstyle="outline-success" data-offstyle="outline-danger" class="chkToggle">
{{-- Button Javascript --}}
{{-- - used right away in AJAX operations (ex: List) --}}
{{-- - pushed to the end of the page, after jQuery is loaded, for non-AJAX operations (ex: Show) --}}
@push('after_scripts') @if ($crud->getRequest()->ajax()) @endpush @endif
<style>
    .swal-icon img {
        width: 25%;
    }
</style>
<script>
    $(function(){ $('.chkToggle').bootstrapToggle() });
    if (typeof changeStateRequest != 'function') {

        function changeStateRequest(elem, id, state) {
            state = (typeof state !== 'undefined')?state:(($(elem).is(':checked')) ? 1 : 0);
            console.log(state);

            // ask for confirmation before deleting an item
            var url = '{!! route(explode('/', $crud->route)[1].'.enable', [":id", ":state"]) !!}';
            url = url.replace(':id', id);
            url = url.replace(':state', state);

            if($(elem).closest('.btn-group').find('.loading-status').length) {
                $('.loading-status').show();
                $(elem).closest('.btn-group').find('button').hide();
            }

            swal({
                title              : "{!! $button->name !!}",
                text               : '{{ __('Marketplace t') }}',
                closeOnClickOutside: false,
                closeOnEsc         : false,
                icon               : "warning",
                buttons            : {
                    cancel: {
                        text      : "{!! trans('backpack::crud.cancel') !!}",
                        value     : null,
                        visible   : true,
                        className : "bg-secondary",
                        closeModal: true,
                    },
                    // submit: {
                    //     text     : "{!! trans('ok') !!}",
                    //     value    : true,
                    //     visible  : true,
                    //     className: "bg-success",
                    // }
                }
            }).then((value) => {
                if(value) {
                    $.ajax({
                        url        : url,
                        type       : "post",
                        contentType: false,
                        cache      : false,
                        processData: false,
                        success    : function (response) {

                            if (response.status) {
                                console.log(response);
                                // Show a success message
                                swal({
                                    title  : response.title,
                                    text   : response.message,
                                    icon   : "success",
                                    timer  : 4000,
                                    buttons: false,
                                });
                            }
                            else {
                                // Show a error message
                                swal({
                                    title  : response.title,
                                    text   : response.message,
                                    icon   : "error",
                                    timer  : 4000,
                                    buttons: false,
                                });
                            }

                            // Reload the table
                            $('#crudTable').DataTable().ajax.reload();

                            // Hide the modal, if any
                            $('.modal').modal('hide');

                        },
                        error      : function (result) {
                            // Show an alert with the result
                            swal({
                                title  : "{{ __('form.commun.title_error_operation_popup') }}",
                                text   : "{{ __('form.commun.text_error_operation_popup') }}",
                                icon   : "error",
                                timer  : 4000,
                                buttons: false,
                            });
                        }
                    });
                } else {
                    // Reload the table
                    $('#crudTable').DataTable().ajax.reload();
        }
        });
        }
    }

    // make it so that the function above is run after each DataTable draw event
    // crud.addFunctionToDataTablesDrawEventQueue('showImportModel');
</script>
@if (!$crud->getRequest()->ajax()) @endpush @endif

