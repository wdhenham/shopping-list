module.exports = function(app, bodyParser){

  var urlencodedParser = bodyParser.urlencoded({
    extended: true
  });

  var data = [{
    item: "Sample item",
    qty: 1
  }, {
    item: "Sample item 2",
    qty: 2
  }]

  app.get('/', function(req, res) {
    res.render('shoppingList', {
      items : data
    })
    console.log(data)
  })

  app.post('/', urlencodedParser, function(req, res) {
    var newItem = req.body
    newItem.qty = Number(newItem.qty)
    data.push(req.body)
    res.json(data)
  })

  app.delete('/:item', function(req, res) {
    //console.log(req.params.item)

    data = data.filter(function(data){
      //console.log((data.qty + data.item))
      return (data.qty + " x " + data.item).replace( / /g, '-') !== req.params.item
    })
    res.json(data);
  })

}
