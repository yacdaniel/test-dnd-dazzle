def targetedContentService = applicationContext.get("targetedContentService")
def homepageScenarioItem = targetedContentService.getHomepageScenario(profile)

templateModel.homepageScenario = homepageScenarioItem


def siteContentService = applicationContext.get("siteContentService")
def processedModel = siteContentService.processMacrosForItem(contentModel)

templateModel.contentModel = processedModel

def sum = 46 + 2

templateModel.mysum = sum

templateModel.content = "HELLO WORLD"

