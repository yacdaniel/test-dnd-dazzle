import scripts.libs.CalendarDAO;

def status = false
def dao = new CalendarDAO(siteItemService)

def title = params.title
def start = params.start
def end = params.end
def description = params.description
def background = params.background
def departmentId = params.departmentId
def contentId = params.contentId

if (title == null) throw new Exception("title is a required parameter")
if (start == null) throw new Exception("end is a required parameter")
if (end == null) throw new Exception("end is a required parameter")
if (description == null) description = ""
if (background == null) background = ""
if (departmentId == null) departmentId = "strategy"
if (contentId == null) contentId = ""

try {
    dao.init()
    status = dao.createEvent(
            title,
            description,
            start.toLong(),
            end.toLong(),
            contentId,
            departmentId,
            background)
} finally {
    dao.close()
}

return status