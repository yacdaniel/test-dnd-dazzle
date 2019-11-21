package services

public class RenditionService {

  def logger = null

  def REPO_PATH = "/Users/rdanner/crafter-installs/ent/craftercms/crafter-authoring/data/repos/sites/flow/sandbox"
  def RENDITION_FOLDER = "/renditions/"

  def PRESETS = [
      "identity" : [options: " ",                 postfix: "-id"],
      "quarter"    : [options: "-scale 25%   ",   postfix: "-quarter"],
      "thumb"     : [options: "-trim +repage -gravity center -background transparent -extent 128x128 ", postfix: "-thumb"]
  ]  

  def RenditionService(logger) {
    this.logger = logger
  }

  def doTransforms(relativePath, presets) {
    def path = REPO_PATH + relativePath
  	def results = [:]
    
    results.path = path
    results.relativePath = relativePath
    results.presets = presets
    results.assets = transformImage(path, presets)
    results.metadata = getImageData(path)
    
    def xml = generateImageXml(path, results.metadata, results.assets)
    
    writeImageItem(path, xml)
    
    return results
  }
 
  def extractPathParts(path) {
      def result = [:]
  
      result.pathOnly = path.substring(0, path.lastIndexOf("/"))
      result.filename = path.substring(path.lastIndexOf("/")+1)
      result.filenameNoExt = result.filename.substring(0, result.filename.lastIndexOf("."))
      result.filenameExtension = result.filename.substring(result.filename.lastIndexOf(".")+1)
  
      return result
  }
  
  def transformImage(path, presets) {
      def result = [:]
      def pathParts = extractPathParts(path)
  
      result.asset = path
      result.transforms = presets
      result.renditions = []
  
      presets.each { preset ->
          logger.info("######## getting option for '"+preset+"'"  )
          def settings = PRESETS[preset]
  
          if(settings != null) {
              def workingDir = pathParts.pathOnly
              def inputFilename = pathParts.filenameNoExt + "." + pathParts.filenameExtension 
              def outputFilename = pathParts.filenameNoExt + settings.postfix + "." + pathParts.filenameExtension
              def fullOutputPath = (workingDir + RENDITION_FOLDER + outputFilename)
              def outputPath = fullOutputPath.replace(REPO_PATH, "")

              def dirCommand = "mkdir ." + RENDITION_FOLDER
              logger.info("######## " + dirCommand  )
              dirCommand.execute(null, new File(workingDir)).text
              

              def command = "convert " + inputFilename + " " + settings.options + " ." + RENDITION_FOLDER + outputFilename
              logger.info("######## " + command  )
              def output = command.execute(null, new File(workingDir)).text
              logger.info("######## [" + output + "]"  )
  
              def renditionFile = new File(fullOutputPath)
              if(renditionFile.exists() ) {
                result.renditions.add(outputPath)
              }
              else {
                logger.info("######## Failed to create rendition [" + fullOutputPath + "]"  )
              }
          }
          else {
              logger.error("No settings found for image transform preset '"+preset+"', unable to perform transform on path `"+path+"`")
          }
      }
  
      return result
  }
  
  def writeImageItem(path, xml) {
      def pathParts = extractPathParts(path)
      def filePath = REPO_PATH + "/site/images/" + pathParts.filenameNoExt + ".xml"
      def xmlFile = new File(filePath)
  
      xmlFile.write(xml)
  
      def command = "git add --all ."  
      def output = command.execute(null, new File(REPO_PATH)).text
          command = "git commit -m 'manual' "
          command.execute(null, new File(REPO_PATH)).text
  }
  
  def generateImageXml(path, metadata, assets) {
  
      def renditions = ""
          assets.renditions.each { asset -> 
              renditions += ("<item><key>" + asset + "</key><value>" + asset + "</value></item>")
          }
  
      def xml = "<component>" +
                  "<asset>" + path + "</asset>" +
                  "<comment>"   + metadata.comment   + "</comment>" +
                  "<copyright>" + metadata.copyright + "</copyright>" +
                  "<author>"    + metadata.artist    + "</author>" +
                  "<renditions>" + renditions + "</renditions>" +
                "</component>"
  
      return xml
  }
  
  def getImageData(path) {
      def data = [:]
      data.comment = getImageField(path, "comment")
      data.artist = getImageField(path, "artist")
      data.copyright = getImageField(path, "copyright")
  
      return data
  }
  
  def getImageField(path, fieldName) {
    def value = ""

    try {
      def command = "exiftool " + path + " -"+fieldName  
      def output = command.execute().text
      value = output.split(":")[1]
    }
    catch(noExifField) {
      // not an error
    }
  
    return value
  }

}