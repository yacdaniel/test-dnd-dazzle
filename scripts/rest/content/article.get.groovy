def retArticles = null
def articleId = params.id
def articleService = applicationContext.get("articleService")

if(articleId ==null) {
	response.setStatus(404)
}
else {
	retArticles = articleService.getArticleForId(articleId)

	if(retArticles == null) {
		response.setStatus(404)
	}
}

return retArticles