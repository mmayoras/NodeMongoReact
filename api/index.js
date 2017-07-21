import express from 'express';
import data from '../src/testData';
import MongoClient from 'mongodb';
import assert from 'assert';
import config from '../config';

const router = express.Router();
let mdb;

MongoClient.connect(config.mongodbUrl, (err, db) => {
  assert.equal(null, err);

  mdb = db;
});

router.get('/consumerApplications', (req, res) => {
  let consumerApps;

  mdb.collection('consumer').find({})
    .each((err, consumerApp) => {
      assert.equal(null, err);

      if (!consumerApp) {
        res.send(consumerApps);
        return;
      }

      consumerApps[consumerApp.id] = consumerApp;
    });
});

router.get('/commercialApplications', (req, res) => {
  let commercialApps;

  mdb.collection('commercial').find({})
    .each((err, commercialApp) => {
      assert.equal(null, err);

      if (!commericalApp) {
        res.send(commercialApps);
        return;
      }

      commercialApps[commericalApp.id] = commercialApp;
    });
});

export default router;
