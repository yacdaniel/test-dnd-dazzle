
def retArticles = null
def topic = params.topic
def articleService = applicationContext.get("articleService")

if(topic == null) {
	response.setStatus(404)
}
else {
	retArticles = articleService.getArticlesForTopic(topic)

	if(retArticles == null) {
		response.setStatus(404)
	}
}

return retArticles