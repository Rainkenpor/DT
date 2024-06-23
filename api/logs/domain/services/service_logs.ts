const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test')
.then(() => console.log('Connected!'));

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const LOGS = mongoose.model( 'LOGS', new Schema({
  date: { type: Date, required: true },
  message: { type: String, required: true },
  meta: { type: Object, required: true },
}) );

exports.GetAll = async (req: any, res: any) => {
  // Obteniendo todos los logs
  const logs = await LOGS.find({});
  res.status(200).send(logs);

};

exports.Create = async (req: any, res: any) => {
  // Creando un nuevo log
  const log = new LOGS({
    date: new Date(),
    message:  req.body.message,
    meta: req.body.meta
  });
  log.save()
    .then(() => res.status(200).send("Log creado"))
    .catch((err:any) => {
      console.log(err);
      res.status(500).send(err)
});

};