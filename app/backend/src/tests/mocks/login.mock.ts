const user = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
};

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc";

const validLoginFromTheBody = {
  email: "admin@admin.com",
  password: "secret_admin",
};

export { user, token, validLoginFromTheBody };
