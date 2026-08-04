const app = require("./app.js");
const { pool, connectDB } = require("./config/db.js");

app.listen(5000, async () => {
  console.log("Server running on port 5000");

  try {
    // This forces the pool to open a connection immediately
    await pool.query('SELECT NOW()');  // todo: needed to by removed once migration done
    console.log('postgres, Database connected successfully!');
  } catch (err) {
    console.error('Database connection failed on startup:', err.message);
  }
  	// newly prisma migration
  	await connectDB()  // prisma, db connection

});