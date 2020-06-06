const {
  Datastore
} = require('@google-cloud/datastore');
/*
const projectId = 'arboreal-vector-277505';
const keyFilename = 'arboreal-vector-277505-2bf64cbefde9.json'
const datastore = new Datastore({
  projectId: projectId,
  keyFilename: keyFilename
}); //allows us to access datastore
*/

const datastore = new Datastore();

module.exports = async function(app, bodyParser){

  var urlencodedParser = bodyParser.urlencoded({
    extended: true
  });
  const query = datastore.createQuery('shoppingItem');
  var [data] = await datastore.runQuery(query);

  /*
  var data = [{
    item: "Click on me to delete me",
    qty: 1
  }]

  await datastore.save({
    key: datastore.key(['shoppingItem', 'item0']),
    data: {
      item: data[0].item,
      qty: data[0].qty
    }
  })
  */

  app.get('/', async function(req, res) {
    //console.log("Output: " + queryData[0].item)
    [data] = await datastore.runQuery(query);
    res.render('shoppingList', {
      items : data
    })
    //console.log(data)
  })

  app.post('/', urlencodedParser, async function(req, res) {
    var newItem = req.body
    newItem.qty = Number(newItem.qty)
    await datastore.save({
      key: datastore.key(['shoppingItem', "item"+(data.length)]),
      data: {
        item: newItem.item,
        qty: newItem.qty
      }
    })
    res.json(data)
  })

  app.delete('/:item', async function(req, res) {
    //console.log(req.params.item)
    /*
    data = data.filter(function(data){
      //console.log((data.qty + data.item))
      return (data.qty + " x " + data.item).replace( / /g, '-') !== req.params.item
    })
    console.log(req.params.item)
    console.log(data);
    */
    for (var i = 0; i < data.length; i++) {
      if ((data[i].qty + " x " + data[i].item).replace( / /g, '-') == req.params.item)
      {
        console.log("Item Selected: " + req.params.item)
        await datastore.delete(datastore.key(['shoppingItem', "item"+i]))
      }
    }

    res.json(data);
  })

}
