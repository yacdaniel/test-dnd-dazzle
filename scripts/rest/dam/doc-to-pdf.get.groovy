import services.DocRenditionService

def renditionService = new DocRenditionService(logger)

def path = params.if  

return renditionService.doTransform(path)