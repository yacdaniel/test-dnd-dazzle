def cart = [:]
cart.name = (params.name) ? params.name : "default"

cart.itemCount = 100 + 50
cart.goods =  [ "Starfruit", "Oranges", "Grapes", "Peaches", "Plums", "Apples", "Nuts", "Figs" ]

cart.myContent = [:]
cart.myContent.headline = siteItemService.getSiteItem("/site/website/en/index.xml").queryValue("headline")
cart.myContent.subheadline = siteItemService.getSiteItem("/site/website/en/index.xml").queryValue("subHeadline")
cart.myContent.dateline = siteItemService.getSiteItem("/site/website/en/services/index.xml").queryValue("dateline")

def targetedContentService = applicationContext.get("targetedContentService")
def homepageScenarioItem = targetedContentService.getHomepageScenario(profile)

cart.homepageScenario = homepageScenarioItem

return cart
