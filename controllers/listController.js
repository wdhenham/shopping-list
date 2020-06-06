const Datastore = require('@google-cloud/datastore');
const datastore = new Datastore();

module.exports = async function(app, bodyParser){

  var urlencodedParser = bodyParser.urlencoded({
    extended: true
  });

  var data = [{
    item: "Click on me to delete me",
    qty: 1
  }]

  await datastore.save({
    key: datastore.key('shoppingItem'),
    data: {
      item: data.item
      qty: data.qty
    }
  })

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
