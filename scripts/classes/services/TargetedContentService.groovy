package services

import org.elasticsearch.action.search.SearchRequest
import org.elasticsearch.index.query.QueryBuilders
import org.elasticsearch.search.builder.SearchSourceBuilder
import org.elasticsearch.search.sort.FieldSortBuilder
import org.elasticsearch.search.sort.SortOrder

/**
 * Service contains simple targeting rules
 */
public class TargetedContentService {

    private elasticsearch
    public getElasticsearch() { return elasticsearch }
    public setElasticsearch(service) { elasticsearch = service }

    private siteItemService
    public getSiteItemService() { return siteItemService }
    public setSiteItemService(service) { siteItemService = service }

    private targetingHelper
    public getTargetingHelper() { return targetingHelper }
    public setTargetingHelper(helper) { targetingHelper = helper }
    /**
     * get the homepage scenario with the best fit for the given profile
     * @param Profile of the current user
     */
    public getHomepageScenario(profile) {
        /* determine season for profile's locale */
        def season = targetingHelper.determineSeason(profile)
        def defaultScenarioId = "/site/components/homepage-scenarios/9df1c3bc-c7f8-71e2-8b28-aa5c55872dc5.xml"
        def org = (profile) ? profile.attributes.region : "Anonymous"
        
        def queryStatement = 'content-type:\"/component/home-page-scenario\" AND ((season.item.key:\"'+ season + '\"^100 AND region:\"'+org+'\") OR localId:\"' + defaultScenarioId + '\") '
        def builder = new SearchSourceBuilder().query(QueryBuilders.queryStringQuery(queryStatement))
            builder.from(0)
            builder.size(1)

        // execute query
        def executedQuery = elasticsearch.search(new SearchRequest().source(builder))

        // get the result
        def resultId = defaultScenarioId
        if(!executedQuery && !executedQuery.hits && !executedQuery.hits.hits) {
            System.out.println("NO RESULTS : "+queryStatement)
        }
        else {
            System.out.println("RESULTS : "+queryStatement)
            resultId = executedQuery.hits.hits*.getSourceAsMap()[0].localId
        }

        def homepageScenarioItem = siteItemService.getSiteItem(resultId)

        return homepageScenarioItem
    }
}