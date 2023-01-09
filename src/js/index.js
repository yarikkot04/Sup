const express = require('express');
const server = express();
const db = require('./db_member');
const PORT = 5000;
server.use(express.json());

function getAllMembers(req, res) {
  const command = 'select * from member';
  db.query(command, (error, result) => {
    if (error) return res.status(500).json(err);
    res.status(200).json(result);
  });
};
function getSelectedMember(req, res) {
  const command = `select * from member where id=${req.params.id}`;
  db.query(command, (error, result) => {
    if (error) return res.status(500).json(err);
    if (!result.length) return res.status(404).json({ 'message': 'No members found' });
    res.status(200).json(result[0]);
  })
};
function createMember(req, res) {
  const name = req.body.name;
  const task_id = req.body.task_id;
  const templateMember = {
    name: name,
    task_id: task_id,
  };
  if (!templateMember.name || !templateMember.task_id) {
    res.status(400).json({ message: 'Not enough data!' });
  }
  const command = 'insert into member set ?';
  db.query(command, templateMember, (error, result) => {
    if (error) return res.status(500).json(error);
    res.status(201).json({ message: `New member ${name} was created` });
  });
};
function updateSelectedMember(req, res) {
  const id = req.params.id;
  const name = req.body.name;
  const task_id = req.body.task_id;
  const templateMember = {
    name: name,
    task_id: task_id,
  };
  if (!templateMember.name && !templateMember.task_id) {
    res.status(400).json({ message: 'Insufficient data' });
  };
  let command;
  if (name) {
    command = `update member set name='${name}' where id=${id};`;
    db.query(command, (error) => {
      if (error) return res.status(500).json(error);
    });
  }
  if (task_id) {
    command = `update member set task_id='${task_id}' where id=${id};`;
    db.query(command, (error) => {
      if (error) return res.status(500).json(error);
    });
  };
  res.status(200).json({ message: `Member id:(${id}) was updated` });
}
function deleteMember(req, res) {
  const id = req.params.id;
  const command = `delete from member where id=${id}`;
  db.query(command, (error) => {
    if (error) return res.status(500).json(error);
    res.status(200).json({ message: `Member id:(${id}) was deleted` });
  });
}

server.get('/members', getAllMembers);
server.get('/member/:id', getSelectedMember);
server.post('/members', createMember);
server.put('/member/:id', updateSelectedMember);
server.delete('/member/:id', deleteMember);



db.connect(server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}));