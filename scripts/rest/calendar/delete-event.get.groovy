import scripts.libs.CalendarDAO;

def status = false
def dao = new CalendarDAO();

def id = params.id

if (id == null) throw new Exception("id is a required parameter")

try {
    dao.init()
    dao.deleteEvent(id.toLong())
    status = true
} finally {
    dao.close()
}

return status