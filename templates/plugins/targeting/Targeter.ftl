<#import "/templates/system/common/cstudio-support.ftl" as studio />

    <div class="container clearfix row" <@studio.componentAttr path=contentModel.storeUrl ice=true />>

      <div style="min-height:200px;" class="col-ten" <@studio.componentContainerAttr target="zone1" objectId=contentModel.objectId />>
        <#if contentModel.zone1?? &&  contentModel.zone1.item?? >
            <#list contentModel.zone1.item as module>
                    <@renderComponent component=module />
              </#list>
          </#if>
      </div>



    </div>
 
