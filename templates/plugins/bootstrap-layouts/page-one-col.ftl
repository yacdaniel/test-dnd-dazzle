<#import "/templates/system/common/cstudio-support.ftl" as studio />
<#import "/templates/system/common/crafter-support.ftl" as crafter />

<@crafter.pluginSupport />

<@crafter.renderPluginFtlImports />

<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>

	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="author" content="SemiColonWeb" />

	<link rel="stylesheet" href="/static-assets/plugins/bootstrap-layouts/css/bootstrap.min.css">
    <link rel="stylesheet" href="/static-assets/plugins/theme-canvas/css/style.css">
    <link rel="stylesheet" href="/static-assets/plugins/theme-canvas/css/swiper.css">
    <link rel="stylesheet" href="/static-assets/plugins/theme-canvas/css/dark.css">
    <link rel="stylesheet" href="/static-assets/plugins/theme-canvas/css/font-icons.css">
    <link rel="stylesheet" href="/static-assets/plugins/theme-canvas/css/animate.css">
    <link rel="stylesheet" href="/static-assets/plugins/theme-canvas/css/magnific-popup.css">
    <link rel="stylesheet" href="/static-assets/plugins/theme-canvas/css/responsive.css">
    <!-- link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Lato:300,400,400italic,600,700|Raleway:300,400,500,600,700|Crete+Round:400italic"-->    
        
    <script type="text/javascript" src="/static-assets/plugins/bootstrap-layouts/scripts/jquery.core.js"></script>
    <script type="text/javascript" src="/static-assets/plugins/bootstrap-layouts/scripts/bootstrap.min.js"></script>

<style>
p {
    margin: 40px;
    text-align: center;
}
h3 {
    color: #cb1200;
    font-size: 24px;
    text-transform: uppercase;
}

h2 {
    font-size: 40px;
    margin-bottom: 20px;
    font-weight: 800;
    text-transform: uppercase;
	font-family:"Gotham SSm A", "Gotham SSm B", "Helvetica Neue", Helvetica, Arial, sans-serif;
	height:44px;
	line-height:44px;
    margin-bottom:20px;

}
</style>

<body>

	<@crafter.renderPluginStyleSheets />

    <@crafter.renderPluginTopScripts />

	<@crafter.renderPluginFtlScriptCode />

	<title>${contentModel.navLabel!""}</title>
</head>

<body class="stretched">

<!--		<section id="content">

			<div class="content-wrap">

				<div class="container clearfix">
					<div class="row clearfix">
-->
	
	<div id="wrapper1" class="clearfix" >
		<@renderComponent componentPath="/site/components/page/9e3351f0-406e-8302-b8aa-518688474a9c.xml" />
	</div>
 
    <div id="wrapper" class="clearfix" <@studio.componentContainerAttr target="col1" objectId=contentModel.objectId />>
	    <#if contentModel.col1?? && contentModel.col1.item??>
	        <#list contentModel.col1.item as module>
				<@renderComponent component=module />
			</#list>
		</#if>
	</div>

<!--
</div></div></div>

</section>
-->
	<div id="gotoTop" class="icon-angle-up"></div>

    <@crafter.renderPluginBottomScripts />
        <script type="text/javascript" src="/static-assets/plugins/theme-canvas/scripts/plugins.js"></script>
        <script type="text/javascript" src="/static-assets/plugins/theme-canvas/scripts/functions.js"></script>

	<@studio.toolSupport />

</body>
</html>