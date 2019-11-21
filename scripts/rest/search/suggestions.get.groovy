def keyword = params.keyword

if(!keyword) {
    response.setStatus(500)
    return "Keyword is Reuqired"
}
else {
    def articleService = applicationContext.get("articleService")
    def suggestions = articleService.getSuggestedTerms(keyword)

    return suggestions
}



