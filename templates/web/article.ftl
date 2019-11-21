<#import "/templates/system/common/cstudio-support.ftl" as studio />
<#import "/templates/web/common/utils.ftl" as utils />
<link href="/media_library/tiaabank/com/css/main-57b968c61066e497cee0.css" rel="stylesheet">

<!DOCTYPE html>
<!--[if lt IE 9 ]><html class="no-js oldie" lang="en"> <![endif]-->
<!--[if IE 9 ]><html class="no-js oldie ie9" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!-->
<html class="no-js" lang="en">
<!--<![endif]-->

<head>
    <title>TIAA Products and Services</title>
   
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
      <a href="/"> <image src="/static-assets/images/homepage-scenarios/dazzle_logo.png"</a>
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


<body id="top">


   <section id="about" style="background-color:white;">
        <div class="row about-intro">

            <div class="col-eight">
                <h1 class="intro-header">${contentModel.title}</h1>               
                ${contentModel.bodyContent}
            </div>
            <div class="col-four">
                <div class="testimonial-author">
                    <img class="img-circle" src="${contentModel.authorImage}" alt="Author image">
                    <div class="author">
                        ${contentModel.authorName}
                        <span class="position">${contentModel.authorPosition!""}</span>
                    </div>
                </div>
                <div style="min-height:0px !important; class="row about-intro clearfix" <@studio.componentContainerAttr target="col1" objectId=contentModel.objectId /> >
                    <#if contentModel.col1?? && contentModel.col1.item??>
                    <#list contentModel.col1.item as module>
                    <@renderComponent component=module />
                    </#list>
                    </#if>
               </div>
            </div>                            
        </div>
    
    
    </section>

    <!-- end about -->
    <#include "/templates/web/common/footer.ftl" />  

    <#include "/templates/web/common/common-scripts.ftl" />
	<@studio.toolSupport />
</body>

</html>