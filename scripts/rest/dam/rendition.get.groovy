import services.RenditionService

def renditionService = new RenditionService(logger)

def path = params.if  
def presets = params.presets

if(presets == null || path == null) {
	return "missing parametes"
}
else {
	// if only one preset is present, convert it to an array
	if(![Collection, Object[]].any { it.isAssignableFrom(presets.getClass()) }) {
		presets = [ presets ]
	}
}

return renditionService.doTransforms(path, presets)