/*
  How to create TTL (auto delete documents) indexes in MongoDB?
*/
db.blacklist.createIndex({
  // here we select the field we will use as reference and if it is asc (1) our desc (0)
  data: 1
},{
  expireAfterSeconds: 1800
});

// The same can be did graphically in MongoDB Compass.