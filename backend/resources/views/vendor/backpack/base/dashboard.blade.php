@extends(backpack_view('blank'))


@section('content')
    <div class="row">
        <div class="col-sm-4">
            <canvas id="myChart" width="600" height="400"></canvas>
        </div>
        <div class="col-sm-4">
            <canvas id="myChart3" width="600" height="400"></canvas>
        </div>
        <div class="col-sm-4">
            <canvas id="myChart2" width=6400" height="400"></canvas>
        </div>

    </div>
    <div class="row">

        {{-- <div class="col-sm-6">
            <canvas id="myChart2" width=6400" height="400"></canvas>
        </div> --}}
    </div>
@endsection

@push('after_scripts')


    {{-- number of product by marketplace chart  --}}
    @php
    $data = getMarketPlacesWithProduct();
    $data2 = getCatgeoriesWithProduct();
    $data3 = getLivreurs();
    $marketplaces = $data['marketplaces'];
    $categories = $data2['categories'];
    $products = $data['products'];

    @endphp


    <script>
        @php
            $colors = [];
        @endphp
        @foreach ($marketplaces as $marketplace)
            @php
                array_push($colors, 'rgba(' . implode(', ', getColor(rand(1, 20))) . ', 0.2)');
            @endphp
        @endforeach
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: @json($marketplaces),
                datasets: [{
                    label: '# of Votes',
                    data: [{{ implode(',', $products) }}],
                    backgroundColor: @json($colors),
                    borderColor: @json($colors),
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Products by marketplace'
                    }
                }
            }
        });




        // number of products by category

        @php
            $colors = [];
        @endphp
        @foreach ($categories as $category)
            @php
                array_push($colors, 'rgba(' . implode(', ', getColor(rand(5, 15))) . ', 0.2)');
            @endphp
        @endforeach
        const ctx2 = document.getElementById('myChart2').getContext('2d');
        const myChart2 = new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: @json($categories),
                datasets: [{
                    label: '# of Votes',
                    data: [{{ implode(',', $products) }}],
                    backgroundColor: @json($colors),
                    borderColor: @json($colors),
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Products by category'
                    }
                }
            }
        });



        //
        const ctx3 = document.getElementById('myChart3').getContext('2d');
        const myChart3 = new Chart(ctx3, {
            type: 'line',
            data: {
                labels: @json($data3['months']) ,
                datasets: [{
                    label: 'Livreurs',
                    data:  @json($data3['total']) ,
                    backgroundColor: @json($colors),
                    borderColor: @json($colors),
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Users by day'
                    }
                }
            }
        });



        // get livreurs by month
    </script>
@endpush
