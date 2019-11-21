<#import "/templates/system/common/cstudio-support.ftl" as studio />
<#include "/templates/web/navigation/navigation.ftl">

<header id="header" class="full-header" <@studio.componentAttr path=contentModel.storeUrl ice=true />>

    <div id="header-wrap">

        <div class="container clearfix">

            <div id="primary-menu-trigger"><i class="icon-reorder"></i></div>

            <!-- Logo
            ============================================= -->
            <div id="logo">
                <a href="${contentModel.logoURL}" class="standard-logo" data-dark-logo="${contentModel.standardLogoImage}"><img src="${contentModel.standardLogoImage}" alt="${contentModel.logoAltText}"></a>

                <#if contentModel.retnaLogoImage?? && contentModel.retnaLogoImage != "">
                    <a href="${contentModel.logoURL}" class="retina-logo" data-dark-logo="${contentModel.retnaLogoImage}"><img src="${contentModel.retnaLogoImage}" alt="${contentModel.logoAltText}"></a>
                <#else>
                    <a href="${contentModel.logoURL}" class="retina-logo" data-dark-logo="${contentModel.standardLogoImage}"><img src="${contentModel.standardLogoImage}" alt="${contentModel.logoAltText}"></a>
                </#if>
            </div><!-- #logo end -->

            <!-- Primary Navigation
            ============================================= -->
            <nav id="primary-menu">

                <ul>
                    <@renderNavigation "/site/website", contentModel.levelCount_i!1 />
                </ul>

                <#if contentModel.searchBoxEnabled_b>
                    <!-- Top Search
                    ============================================= -->
                    <div id="top-search">
                        <a href="#" id="top-search-trigger"><i class="icon-search3"></i><i class="icon-line-cross"></i></a>
                        <form action="${contentModel.searchPageUrl!""}" method="get">
                            <input type="text" name="q" class="form-control" value="" placeholder="Type &amp; Hit Enter..">
                        </form>
                    </div><!-- #top-search end -->
                </#if>

            </nav><!-- #primary-menu end -->

        </div>

    </div>

</header><!-- #header end -->
