 <header class="{{ config('backpack.base.header_class') }}">
    <style>



.logo{
    font-size: 2.5rem;
    font-weight: bolder;
    color:var(--black);
    float: left !important;
    text-decoration: none;
}

.header .logo i{
    color:var(--green) !important;
}


    </style>
  <button class="navbar-toggler sidebar-toggler d-lg-none mr-auto ml-3" type="button" data-toggle="sidebar-show" aria-label="{{ trans('backpack::base.toggle_navigation')}}">
    <span class="navbar-toggler-icon"></span>
   </button>
  <a style="margin: 10px 10px 20px;" href="{{ url(config('backpack.base.home_link')) }}" title="{{ config('backpack.base.project_name') }}">
    <div
        class="header navbar navbar-expand-md "
       >
        <div class="container">
          <a class="logo" to="/">
            <i class="fas fa-shopping-basket"></i> Bazar
          </a>
        </div>
    </div>
  </a>

 <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" data-toggle="sidebar-lg-show" aria-label="{{ trans('backpack::base.toggle_navigation')}}">
    <span class="navbar-toggler-icon"></span>
  </button>

  @include(backpack_view('inc.menu'))
</header>



