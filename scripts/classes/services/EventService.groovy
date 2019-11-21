package services
import java.text.SimpleDateFormat

/**
 * Event service
 */
public class EventService {

    private searchService
    public getSearchService() { return searchService }
    public setSearchService(service) { searchService = service }

    /**
     * Get Events for date range
     * @return returns Events
     */
    public getEvents(startDateStr, endDateStr) {

        def results = null
        //SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
        //def startDate = formatDateAsIso(formatter.parse(startDateStr))

        def queryStatement = "content-type:\"/component/event-component\""
        //def queryStatement = "content-type:\"/page/events\" AND startDate:[${startDateStr} TO *] AND endDate:[${endDateStr} TO *]"
        println queryStatement

        def query = searchService.createQuery()
        query.setQuery(queryStatement)

        def executedQuery = searchService.search(query)

        results = executedQuery.response.documents
        def modifiedResults = []
        SimpleDateFormat crafterDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.S'Z'");

        //Format in which calender.js expects startDate and endDate
        SimpleDateFormat calendarDateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm");

        for (result in results){
            if(result.startDate != null){
                result.start = crafterDateFormat.parse(result.startDate).getTime();
                result.startDate = calendarDateFormat.format(crafterDateFormat.parse(result.startDate))
            }
            if(result.endDate != null) {
                result.end = crafterDateFormat.parse(result.endDate).getTime();
                result.endDate = calendarDateFormat.format(crafterDateFormat.parse(result.endDate))
            }

            result.allDay = Boolean.getBoolean(result.allDay)

            result.dirty = Boolean.valueOf(true).booleanValue()
            result.contentId = "/site/components/titles/1af8bb45-c511-87ac-b362-5f356b5af8a5.xml"
            modifiedResults.add(result)
        }

        return modifiedResults
    }

}