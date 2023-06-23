const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
app.use(bodyParser.json());
results2 = null;
manager = false;
app.use(session({
  secret: 'my secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: false,  
    maxAge: 60 * 60 * 1000 
  }
}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'db'
});
connection.connect();


app.post('/register', function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const isManager = req.body.isManager;
  manager = isManager ? true : false;
  let stmt = 'INSERT INTO user SET ?';
  let values = {email: email, password: password, manager: manager};
  connection.query(stmt, values, function (error, results) {
  if (error) {
  res.status(500).send({ error: 'An error occurred while registering the user' });
  } else {
  res.send('User registered successfully!');
  }
  });
 });




app.post('/api/login', function (req, res) {
  // authenticate user
  connection.query('SELECT ID, manager FROM user WHERE email = ? AND password = ?', [req.body.email, req.body.password], function (error, results, fields) {
  if (error) throw error;
  if (results.length > 0) {
  results2 = results
  req.session.user_id = results[0].ID;
  if (results[0].manager == true) {
   manager = true;
  }
  else{
   manager = false;
  }
  res.json({ message: 'Login successful', user_id: req.session.user_id });
  req.session.user_id = results[0].ID;
  } else {
  res.json({ message: 'Invalid email or password' });
  }
  });
 });

app.post('/api/bugs', (req, res) => {
  const { status, title, description, deadline, user_id } = req.body;
  const query = 'INSERT INTO bugs (status, title, description, deadline, user_id) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [status, title, description, deadline, user_id], (error, results) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(201).json({ message: 'Bug created' });
    }
  });
});

app.get('/bugs', (req, res) => {
  connection.query('SELECT * FROM bugs', (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json(results);
    }
  });
});
app.get('/userBugs', (req, res) => {
  const user_id = results2[0].ID;
  const query = 'SELECT * FROM bugs WHERE user_id = ?';
  connection.query(query, [user_id], (error, results) => {
    if (error) {
      res.status(500).send('An error occurred while retrieving bugs');
    } else {
      res.json(results);
    }
  });
});

app.put('/bugs/:user_id', (req, res) => {
  const { user_id } = req.params;
  const t_user_id = results2[0].ID;
  const { title, description, deadline, status, bugId } = req.body;
  let sql;
  let params;
  if (manager) {
    sql = 'UPDATE bugs SET title = ?, description = ?, deadline = ?, status = ? WHERE id = ?';
    params = [title, description, deadline, status, bugId];
  } else {
    sql = 'UPDATE bugs SET title = ?, description = ?, deadline = ?, status = ? WHERE id = ? AND user_id = ?';
    params = [title, description, deadline, status, bugId, t_user_id];
  }
  connection.query(sql, params, (error, results, fields) => {
    if (error) {
      res.status(500).send({ error: 'An error occurred while updating the bug' });
    } else{
      res.send('Bug updated');
    }
  });
});

app.get('/userId', (req, res) => {
  const user_id = results2[0].ID;
  res.json({ user_id });
});
app.get('/auth-status', (req, res) => {
  if (req.session.user_id) {
    res.json({ authenticated: true });
  } else {
    res.json({ authenticated: false });
  }
});

app.listen(3000);
