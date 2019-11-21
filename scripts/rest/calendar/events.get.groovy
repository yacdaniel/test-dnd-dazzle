//import scripts.libs.CalendarDAO

//def dao 	= new CalendarDAO(siteItemService)
def results = []
// def contentId = params.contentId

// try { 
// 	dao.init()
// 	if(contentId != null) {

// 		if(contentId.contains(",") == false) {
// 			results = dao.getEventsForContent( contentId )
// 		}
// 		else {
// 			def ids = contentId.split(",")
// 			for(int i=0; i<ids.length; i++){
// 				def curId = ids[i]
// 				def curResults = dao.getEventsForContent( curId )
// 				result = results.addAll(curResults)
// 			}
// 		}
// 	}
// 	else {
// 		results = dao.getEvents( )	
// 	}
// } finally {
// 	dao.close()
// }

return results