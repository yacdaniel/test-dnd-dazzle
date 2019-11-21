<#import "/templates/system/common/cstudio-support.ftl" as studio />
<!DOCTYPE html>
<!--[if lt IE 9 ]><html class="no-js oldie" lang="en"> <![endif]-->
<!--[if IE 9 ]><html class="no-js oldie ie9" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!-->
<html class="no-js" lang="en">
<!--<![endif]-->

<head>
    <title>TIAA Search</title>
	<#include "/templates/web/common/head.ftl" />

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
  
</header>
<script src="/static-assets/js/search.js"></script>


<body id="top">
   <section id="about" style="background-color:#F2F2F2 !important;">

        <div class="row about-intro">
            <div class="col-eight">
                <div id="searchbox">
                    <form id="searchForm"> 
                        <input class="searchinput" type="input" name="keyword" id="keyword" value="${keyword}" placeholder="Search..."> 
                        <button class="glyphicon glyphicon-search button-search "></button>
                    </form>
                </div>               
            </div>                       
        </div>

    </section> <!-- end about -->
    <section class="results">
        <h3>search results</h3>
        <ul class="search-result">
            <#if err??>
                    <#--  Keyword is required  -->
            <#else>
                <#if matches??>
                    <#list matches as match>
                    <li>
                        <a href="${urlTransformationService.transform('storeUrlToRenderUrl', match.localId)}">${match.title}</a>
                    </li>
                    </#list>
                 <#else>
                    <h1>No Results Found</h1>
            </#if>
            </#if>
        </ul> 
    </section>
</div>

	<#include "/templates/web/common/footer.ftl" />
	<#include "/templates/web/common/common-scripts.ftl" />
	<@studio.toolSupport />
    
</body>

</html>