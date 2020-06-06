module.exports = function(app, bodyParser){

  var urlencodedParser = bodyParser.urlencoded({
    extended: true
  });

  var data = [{
    item: "Sample item"
  }, {
    item: "Sample item 2"
  }]

  app.get('/', function(req, res) {
    res.render('shoppingList', {
      items : data
    })
  })





}
