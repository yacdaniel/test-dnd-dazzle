import scripts.libs.CalendarDAO;

def status = false
def dao = new CalendarDAO();

def id = params.id
def title = params.title
def start = params.start
def end = params.end
def description = params.description
def background = params.background
def departmentId = params.departmentId
def contentId = params.contentId

if(id == null) throw new Exception("id is a required parameter")
if(title == null) throw new Exception("title is a required parameter")
if(start == null) throw new Exception("end is a required parameter")
if(end == null)   throw new Exception("end is a required parameter")
if(description == null)  description = ""
if(background == null)   background = ""
if(departmentId == null) departmentId = "strategy"
if(contentId == null)    contentId = ""

try {
	dao.init()
	dao.updateEvent(id.toLong(), title, description, start.toLong(), end.toLong(), contentId, departmentId, background)
	status = true
} finally {
	dao.close()
}

return status