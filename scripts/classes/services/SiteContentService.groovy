package services

/**
 * Site speicifc content service wrapper
 */
public class SiteContentService {

    private siteItemService
    public getSiteItemService() { return siteItemService }
    public setSiteItemService(service) { siteItemService = service }

    /**
     * returns processed bodyContent field
     */
    def processMacrosForItem(contentItem) {
        def macrosItem = siteItemService.getSiteItem("/site/components/macros/store-macros.xml")
        def bodyContent = contentItem.bodyContent.text
    
        def keyValuePairs = macrosItem.get("//item")
        keyValuePairs.each { el ->
            bodyContent = bodyContent.replace("["+el.selectSingleNode("key").text+"]", el.selectSingleNode("value").text)
        }
    
        contentItem.bodyContent.setText(bodyContent)
        
        return contentItem
    }

}