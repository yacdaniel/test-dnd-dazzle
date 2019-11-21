<#import "/templates/system/common/cstudio-support.ftl" as studio />
<#import "/templates/web/common/utils.ftl" as utils />

<!DOCTYPE html>
<!--[if lt IE 9 ]><html class="no-js oldie" lang="en"> <![endif]-->
<!--[if IE 9 ]><html class="no-js oldie ie9" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!-->
<html class="no-js" lang="en">
<!--<![endif]-->

<head>
    <title>Dazzle</title>

	<@utils.mapSupport />
</head>


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

<header id="header" class="row">   

  <div class="header-logo">
      <a href="/"></a>
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





<body id="top">

       <section id="about">

        <div class="row about-how">
          
            <h1 class="intro-header">Our Locations</h1>           

            <div class="about-how-content">
                <div class="about-how-steps block-1-2 block-tab-full group">

					<#list contentModel.locations.item as location>

                    <div class="bgrid step" data-item="${location_index+1}">
                        <h3>${location.title}</h3>
                        <p>${location.address}<p>
                        <p>${location.phoneNumber}<p>
                        
                        <@utils.map "map${location_index}" location.address />
                        
                    </div>
                    </#list>


                </div>           
           </div> <!-- end about-how-content -->
        </div>
                <div class="row about-how">
          
            <h1 class="intro-header">Get In Touch</h1>           

            <div class="about-how-content">


            <div class="subscribe-form col-two">            
                <!-- form -->
            <form name="contactForm" id="contactForm" method="post" action=""  >
                <fieldset>

                  <div class="group">
                           <input name="contactName" type="text" id="contactName" placeholder="Name" value="" minLength="2" required />
                  </div>
                  <div>
                       <input name="contactEmail" type="email" id="contactEmail" placeholder="Email" value="" required />
                   </div>
                  <div>
                           <input name="contactSubject" type="text" id="contactSubject" placeholder="Subject"  value="" />
                   </div>                       
                  <div>
                        <textarea name="contactMessage"  id="contactMessage" placeholder="message" rows="10" cols="50" required ></textarea>
                   </div>                      
                  <div>
                     <button class="submitform">Submit</button>
                </fieldset>
            </form> <!-- Form End -->

        </div> <!-- end about-how -->

       <div style="min-height:0px !important; class="row about-intro clearfix" <@studio.componentContainerAttr target="col1" objectId=contentModel.objectId /> >
              <#if contentModel.col1?? && contentModel.col1.item??>
                  <#list contentModel.col1.item as module>
                      <@renderComponent component=module />
                  </#list>
              </#if>
          </div>
        
    </section> <!-- end about --> 



    <#include "/templates/web/common/footer.ftl" />
    <#include "/templates/web/common/common-scripts.ftl" />
	<@studio.toolSupport />
</body>

</html>