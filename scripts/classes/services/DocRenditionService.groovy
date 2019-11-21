package services

public class DocRenditionService {

  def logger = null
  def EXE_PATH = "/Users/rdanner/crafter-installs/ent/craftercms/crafter-authoring"
  def REPO_PATH = EXE_PATH + "/data/repos/sites/flow/sandbox"
  def RENDITION_FOLDER = "/renditions/"



  def DocRenditionService(logger) {
    this.logger = logger
  }

  def doTransform(relativePath) {
    def path = REPO_PATH + relativePath
  	def results = [:]
    
    results.path = path
    results.relativePath = relativePath
    results.assets = transformDoc(path)
    
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
  
  def transformDoc(path) {
      def result = [:]
      def pathParts = extractPathParts(path)
  
      result.asset = path
      result.renditions = []
  
      def workingDir = pathParts.pathOnly
      def inputFilename = pathParts.filenameNoExt + "." + pathParts.filenameExtension 
      def outputFilename = pathParts.filenameNoExt + ".pdf"
      def fullOutputPath = (workingDir + RENDITION_FOLDER + outputFilename)
      def outputPath = fullOutputPath.replace(REPO_PATH, "")

      def dirCommand = "mkdir ." + RENDITION_FOLDER
      logger.info("######## " + dirCommand  )
      dirCommand.execute(null, new File(workingDir)).text
      

      def command = "java -jar "+EXE_PATH+"/docs-to-pdf-converter-1.8.jar  -i ./"+inputFilename+" -o ." + RENDITION_FOLDER + outputFilename

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

      return result
  }
  
  def writeImageItem(path, xml) {
      def pathParts = extractPathParts(path)
      def filePath = REPO_PATH + "/site/components/documents/" + pathParts.filenameNoExt + ".xml"
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
  
      def pathParts = extractPathParts(path)
      def title = pathParts.filenameNoExt.replaceAll("-", " ").capitalize()


      def xml = "<component>" +
                  "<content-type>/component/document</content-type>" +
                  "<display-template/>"+
                  "<merge-strategy>inherit-levels</merge-strategy>" +
                  "<internal-name>" + title + "</internal-name>" +
                  "<fromAge>0</fromAge>" +
                  "<toAge>100</toAge>" +
                  "<gender>Both</gender>" +
                  "<asset>" + path + "</asset>" +
                  "<documentAttachment>" + renditions + "</documentAttachment>" +
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