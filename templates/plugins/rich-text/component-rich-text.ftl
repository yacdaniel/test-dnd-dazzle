<#import "/templates/system/common/cstudio-support.ftl" as studio />
<style>
 .rte { margin: 10px;   color: white !important; } 
 .rte > h1 { color: #39b54a !important; } 
 .rte >  h2, h3, h4 { color: white !important; }" 
</style>

<div class="rte" <@studio.componentAttr path=model.storeUrl ice=true iceGroup="content" /> >  ${contentModel.content_html!''}</div>
