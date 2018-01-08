const ObjectID = require('mongodb').ObjectID;

// expect an app, database to be given as arguments to this function
module.exports = function(app, db) {
  // post request to notes
  app.post('/notes', (req, res) => {
    // note object with the request body body field as text, req body title as title
    const note = { text: req.body.body, title: req.body.title };
    // db passed in has a collection method, which is used to access the notes collection. then use the insert method with a note object argument as declared above, and pass in the result of the insert to a function that sends the result to the requester.
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
  // get request to notes/id
  app.get('/notes/:id', (req, res) => {
    // id is pulled from the url params
    const id = req.params.id;
    // set details to a copy of the id field from mongodb, using the const ObjectID to create a new id object
    const details = { '_id' : new ObjectID(id) };
    // use the db object passed into the exported function to find the notes collection, then find the id equal to the details object as defined above
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        // send the item (with ID matched) found to the requester
        res.send(item);
      }
    })
  });
  // delete route to /notes/id
  app.delete('/notes/:id', (req, res) => {
    // id is pulled from the url params
    const id = req.params.id;
    // set details to a copy of the id field from mongodb, using the const ObjectID to create a new id object
    const details = { '_id' : new ObjectID(id) };
    // use the db object passed into the exported function to find the notes collection, then find the id equal to the details object as defined above
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        // send the item (with ID matched) found to the requester
        res.send('Note ' + id + ' deleted!');
      }
    })
  });
  // put request to notes/id
  app.put('/notes/:id', (req, res) => {
    // get id from the url
    const id = req.params.id;
    // details of the note via a copy of the object 
    const details = { '_id': new ObjectID(id)};
    // set note to the content of the request.body
    const note = { text: req.body.body, title: req.body.title};
    // update the note at the corresponding ID to the content of the req.body of the request
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
        res.send({'error':'An error has occured'});
      } else {
        // send the resulting note to the requester
        res.send(note);
      }
    });
  });
};