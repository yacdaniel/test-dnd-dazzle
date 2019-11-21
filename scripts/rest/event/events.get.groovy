def retEvents = null
def startDateParam = params.start
def endDateParam = params.end

def eventService = applicationContext.get("eventService")

//if(startDateParam == null || endDateParam == null) {
//    response.setStatus(404)
//}
//else {
    retEvents = eventService.getEvents(startDateParam, endDateParam)

    if(retEvents == null) {
        response.setStatus(404)
    }
//}

return retEvents