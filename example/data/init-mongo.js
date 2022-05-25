db.createUser({
  user: "databaseUser",
  pwd: "password",
  roles: [
    {
      role: "readWrite",
      db: "database01"
    }
  ]
});