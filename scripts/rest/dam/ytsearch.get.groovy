//@Grab(group='org.ccil.cowan.tagsoup', module='tagsoup', version='1.2' )
import java.util.regex.Matcher
import java.util.regex.Pattern

def yturl = "https://www.youtube.com/results?search_query="+params.term
def ytout = new URL(yturl).text

def matches = []
Pattern pattern = Pattern.compile("<a (.*)>(.*)</a>");
Matcher matcher = pattern.matcher(ytout);

  // check all occurance
  while (matcher.find()) {
      def titleLink = matcher.group(1);
      if(titleLink.contains("yt-uix-tile-link")) {
            
            Pattern titlePattern = Pattern.compile("title=\"(.*?)\"");
            Matcher titleMatcher = titlePattern.matcher(titleLink);
            titleMatcher.find()
            def title = titleMatcher.group(1)

            Pattern idPattern = Pattern.compile("href=\"(.*?)\"");
            Matcher idMatcher = idPattern.matcher(titleLink);
            idMatcher.find()
            def id = idMatcher.group(1)

            if(id.contains("v=")) {
                  def result = [:]
                  result.value = id.substring(id.indexOf("v=")+2)
                  result.label = title 

                  matches.add(result)
             
            }  
     }
  }
//return [["value": "ABC", "label": "123"],["value": "ABC", "label": "123"],["value": "ABC", "label": "123"],["value": "ABC", "label": "123"],["value": "ABC", "label": "123"],["value": "ABC", "label": "123"],["value": "ABC", "label": "123"],["value": "ABC", "label": "123"],["value": "ABC", "label": "123"],["value": "ABC", "label": "123"],["value": "ABC", "label": "123"]]
return matches