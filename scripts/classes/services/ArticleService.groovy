package services

import org.elasticsearch.action.search.SearchRequest
import org.elasticsearch.index.query.QueryBuilders
import org.elasticsearch.search.builder.SearchSourceBuilder
import org.elasticsearch.search.sort.FieldSortBuilder
import org.elasticsearch.search.sort.SortOrder

/**
 * artticle service simplified access to Artilce queries
 */
public class ArticleService {

    private elasticsearch
    public getElasticsearch() { return elasticsearch }
    public setElasticsearch(service) { elasticsearch = service }

    /**
     * Run Article Seach
     * @param keyword
     */
    public performArticleSearch(keyword) {

        def result = [:]
        def queryStatement = 'content-type:\"/page/article\" '

        if(keyword) {
            queryStatement += " AND bodyContent:\"$keyword\" "
        }

        def builder = new SearchSourceBuilder().query(QueryBuilders.queryStringQuery(queryStatement))

        // execute query
        def executedQuery = elasticsearch.search(new SearchRequest().source(builder))
        
        def items = executedQuery.hits.hits*.getSourceAsMap()

        result.matches = items
        result.keyword = (keyword) ? keyword : ""
        result.highlighting = []//""//executedQuery.highlighting

        return result
    }

}