if(request.requestURI.equals("/"))
	response.sendRedirect("/en")

def targetedContentService = applicationContext.get("targetedContentService")
def homepageScenarioItem = targetedContentService.getHomepageScenario(profile)

templateModel.homepageScenario = homepageScenarioItem
/*
def mySum = 10 + 100 + 50
templateModel.mySum = mySum + 5

def queryStatement = "content-type:\"/component/alerts\" sort=startDate DESC"
def searchService = targetedContentService.getSearchService()
def query = searchService.createQuery()
query.setQuery(queryStatement)

def executedQuery = searchService.search(query)

def matches = [:]
matches.found = executedQuery.response.numFound
matches.alerts = executedQuery.response.documents
matches.query = queryStatement

def alerts = matches.alerts
def alertTitle = ""
if(alerts.size() > 0){
	println "Returning ${alerts.size()} alerts"
	alertTitle = alerts[0].title
}


templateModel.alerts = alertTitle*/