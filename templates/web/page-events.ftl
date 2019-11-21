<#include "/templates/system/common/cstudio-support.ftl" />

<!DOCTYPE html>
<html class="no-js">

    <link rel="stylesheet" href="/static-assets/app/css/base.css">
  <link rel="stylesheet" href="/static-assets/app/css/vendor.css">
  <link rel="stylesheet" href="/static-assets/app/css/main.css">


  <script src="/static-assets/app/js/modernizr.js"></script>
  <script src="/static-assets/app/js/pace.min.js"></script>

  
  <link rel="shortcut icon" href="/static-assets/app/favicon.ico" type="image/x-icon">
  <link rel="icon" href="/static-assets/app/favicon.ico" type="image/x-icon">

  <#if RequestParameters["c1v1"]??>
    <#assign bgColorLite = "#003F87" />
    <#assign bgColorDark = "#3B6AA0" />
  <#else>
    <#assign bgColorLite = "grey" />
    <#assign bgColorDark = "black" />
  </#if>



    <head>
        <title>TIAA -- Schedule Time with an Advisor</title>
        <#include "/templates/web/common/head.ftl" />
        <link rel="stylesheet" href="/static-assets/app/calendar/css/calendar.css" />
    </head>
    
<header id="header" class="row">   

  <div class="header-logo">
      <a href="/"> <image src="/static-assets/app/images/logo.png"</a>
  </div>
  
  <#include "/templates/web/navigation/navigation.ftl">
  
  <nav id="header-nav-wrap">
      <ul class="header-main-nav">
        <li><a href="/en">Home</a></li>
        <@renderNavigation "/site/website/${ Request.pageUrl?substring(14,16) }", 1 />
        <li><a href="/en/search" class="glyphicon glyphicon-search"></a></li>
      </ul>
  </nav>
  <#if alerts??>
    <#include "/templates/web/common/alerts.ftl" />
  </#if>
  <a class="header-menu-toggle" href="#"><span>Menu</span></a>    	
  <script src="/static-assets/js/alert.js"></script>
</header> <!-- /header -->



    <body ng-app="mac.calendar">
    
        <section class="main">
            <div ui-view />
        </section>

        <#include "/templates/web/common/footer.ftl" />  


        <!-- build:js(.) scripts/oldieshim.js -->
        <!--[if lt IE 9]>
        <script src="/static-assets/app/calendar/libs/es5-shim/es5-shim.js"></script>
        <script src="/static-assets/app/calendar//libs/json3/lib/json3.js"></script>
        <![endif]-->

        <!-- bower:js -->
        <script src="/static-assets/app/calendar/libs/jquery/jquery.js"></script>
        <script src="/static-assets/app/calendar/libs/angular/angular.js"></script>
        <script src="/static-assets/app/calendar/libs/angular-resource/angular-resource.js"></script>
        <script src="/static-assets/app/calendar/libs/angular-cookies/angular-cookies.js"></script>
        <script src="/static-assets/app/calendar/libs/angular-sanitize/angular-sanitize.js"></script>
        <script src="/static-assets/app/calendar/libs/angular-animate/angular-animate.js"></script>
        <script src="/static-assets/app/calendar/libs/angular-touch/angular-touch.js"></script>
        <script src="/static-assets/app/calendar/libs/angular-route/angular-route.js"></script>
        <script src="/static-assets/app/calendar/libs/angular-sanitize/angular-sanitize.js"></script>
        <script src="/static-assets/app/calendar/libs/angular-ui-router/release/angular-ui-router.js"></script>
        <script src="/static-assets/app/calendar/libs/angular-bootstrap/ui-bootstrap-tpls.js"></script>
        <script src="/static-assets/app/calendar/libs/jquery-ui/ui/jquery-ui.js"></script>
        <script src="/static-assets/app/calendar/libs/fullcalendar/fullcalendar.js"></script>
        <script src="/static-assets/app/calendar/libs/angular-ui-calendar/src/calendar.js"></script>
        <script src="/static-assets/app/calendar/libs/moment/moment.js"></script>

        <script src="/static-assets/app/js/plugins.js"></script>
        <script src="/static-assets/app/js/jquery.easy-autocomplete.js"></script>
        <script src="/static-assets/app/js/main.js"></script>
        <!-- endbower -->
        <!-- endbuild -->

        <!-- build:js({.tmp,app}) static-assets/script/main.js -->
        <script src="/static-assets/app/calendar/scripts/controllers.js"></script>
        <script src="/static-assets/app/calendar/scripts/services.js"></script>
        <script src="/static-assets/app/calendar/scripts/calendar.js"></script>
        <!-- endbuild -->

        <@cstudioOverlaySupport/>
    </body>
</html>




