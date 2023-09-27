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

const noEmailLoginFromTheBody = {
  password: "secret_admin",
};

const noPasswordLoginFromTheBody = {
  email: "admin@admin.com",
};

const invalidEmailLoginFromTheBody = {
  email: "adminEmailcom",
  password: "secret_admin",
};

const invalidPasswordLoginFromTheBody = {
  email: "admin@admin.com",
  password: "xabl",
};

const nonexistentUser = {
  email: "fellipe@email.com",
  password: "secret_admin",
}

const nonexistentPassword = {
  email: "admin@admin.com",
  password: "xablau",
}

const missingFieldsMessage = "All fields must be filled";
const invalidFieldsMessage = "Invalid email or password";

export {
  user,
  token,
  validLoginFromTheBody,
  noEmailLoginFromTheBody,
  noPasswordLoginFromTheBody,
  missingFieldsMessage,
  invalidEmailLoginFromTheBody,
  invalidPasswordLoginFromTheBody,
  invalidFieldsMessage,
  nonexistentUser,
  nonexistentPassword,
};
