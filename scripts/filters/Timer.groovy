
def start = System.currentTimeMillis()

filterChain.doFilter(request, response)

def stop = System.currentTimeMillis()

def totalTime = stop - start

logger.info("XXXXXXXXX : " + totalTime + "ms   " + request.getRequestURI() )
/*
def kinesisProducerHelper = applicationContext.get("kinesisProducerHelper")
*/

def eventTimestamp = Long.toString(System.currentTimeMillis())
/*
def eventData = [:]
eventData.site = "test"
eventData.eventTimestamp = eventTimestamp
eventData.url = request.getRequestURI()
eventData.querystring = request.getQueryString()
eventData.duration = totalTime

kinesisProducerHelper.putData("TEST10", eventTimestamp, eventTimestamp, eventData)
*/