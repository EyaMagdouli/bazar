<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<h1> {{$marketplace['name']}} </h1>
<h4> A new registred {{ $marketplace->user['kind']}} {{$marketplace->user['name']}} has requested to create a marketplace {{$marketplace['name']}}  </h4>
{{-- <p> {{$marketplace['description']}} </p> --}}
{{-- <img src="{{$marketplace['image']}}" /> --}}
<h5> Check your dashboard to accept the request <a href="http://localhost:8000/admin/dashboard"> Dashboard </a> </h5>
</body>
</html>
