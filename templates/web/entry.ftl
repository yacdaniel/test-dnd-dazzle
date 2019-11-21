<#import "/templates/system/common/cstudio-support.ftl" as studio />
<!--hi-->	
	
<!DOCTYPE html>
<!--[if lt IE 9 ]><html class="no-js oldie" lang="en"> <![endif]-->
<!--[if IE 9 ]><html class="no-js oldie ie9" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!-->
<html class="no-js" lang="en">
<!--<![endif]-->

<head>
    <title>Dazzle Finance</title>
	<#include "/templates/web/common/head.ftl" />
        <style>
    body.studio-dnd-enabled [data-studio-components-target] {
	    margin: 10px !important;
    	margin-left: 52px !important;
    }
    
	.removeComp {
    	color: #f00 !important;
	}
	</style>

</head>

<body id="top">

	<#include "/templates/web/common/header.ftl" />
    
   <!-- home
   ================================================== -->
   <section id="home" 
            data-parallax="scroll" 
            data-image-src="${homepageScenario.bckgroundImage}"
            data-natural-width=3000 
            data-natural-height=2000>

        <div class="overlay"></div>
        <div class="home-content">        

            <div class="row contents">                     
                <div class="home-content-left"<@studio.componentAttr path=homepageScenario.storeUrl ice=true />>

                    <h3 data-aos="fade-up" <@studio.iceAttr iceGroup="headlines"/> >
                    ${contentModel.headline}
                    
                    <h1 data-aos="fade-up">
                    ${contentModel.subHeadline} 
                     </h1>
                     
                    <div class="buttons" <@studio.componentAttr path=homepageScenario.storeUrl ice=true />>
                       <#if homepageScenario.ctas?? &&  homepageScenario.ctas.item??>
                         <#list homepageScenario.ctas.item as cta>
                            <a href="${cta.link}" class="smoothscroll button stroke">
                                <span class="icon-circle-down" aria-hidden="true"></span>
                                ${cta.label}
                            </a>
                          </#list>
                          <BR/><BR/><BR/>
                      </#if>
                    </div>                                         

                </div>
                
                <div class="home-image-right">
                    <img src="${homepageScenario.hoverImageSmall}"
                        srcset="${homepageScenario.hoverImageSmall} 1x, ${homepageScenario.hoverImageLarge} 2x" <@studio.componentAttr path=homepageScenario.storeUrl ice=true />>
                </div>
            </div>

        </div> <!-- end home-content -->

        
        <ul class="home-social-list">
            <li>
                <a href="#"><i class="fa fa-facebook-square"></i></a>
            </li>
            <li>
                <a href="#"><i class="fa fa-twitter"></i></a>
            </li>
            <li>
                <a href="#"><i class="fa fa-instagram"></i></a>
            </li>
            <li>
                <a href="#"><i class="fa fa-youtube-play"></i></a>
            </li>
        </ul>


			<div class="home-scrolldown">
            <a href="#about" class="scroll-icon smoothscroll">
                <span>Scroll Down</span>
                <i class="icon-arrow-right" aria-hidden="true"></i>
            </a>
        </div>
      </section>
      
          <section id="about" style="min-height:0px !important; padding: 5px;"  >

          <div style="min-height:0px !important; class="row about-intro clearfix" <@studio.componentContainerAttr target="col1" component=contentModel /> >
              <#if contentModel.col1?? && contentModel.col1.item??>
                  <#list contentModel.col1.item as module>
                      <@renderComponent component=module />
                  </#list>
              </#if>
          </div>
		</section>  
    
    <#include "/templates/web/common/footer.ftl" />
    <#include "/templates/web/common/common-scripts.ftl" />
    
	<@studio.toolSupport />
    
</body>

</html>
