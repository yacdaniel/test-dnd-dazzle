<#include "/templates/web/navigation/navigation.ftl">
	
    
<!-- header 
================================================== -->
<header id="header" class="row">   

  <div class="header-logo">
      <a href="/"><img src="${homepageScenario.logo}"></a>
  </div>
  
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