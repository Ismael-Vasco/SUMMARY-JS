# MongoDB Commands Reference

## Connection MongoDB & Express
### Command to install dependencies
```js
npm install express mongodb
const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
```
```js
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db('myDatabase'); // Database name
    return db;
  } catch (err) {
    console.error(err);
  }
}
```
### Query Express & MongoDB

**GET**
```js
app.get('/ENDPOINT_NAME', async (req, res) => {
    try {
        const db = await connectDB();
        const data = await db.collection('collection_name').find({}).toArray();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});
```
**POST**
```js
app.post('/ENDPOINT_NAME', async (req, res) => {
    const { name, email } = req.body;

    try {
        const db = await connectDB();
        await db.collection('collection_name').insertOne({ name, email });
        res.send('Document inserted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error inserting document');
    }
});
```
## Data Types in MongoDB
| Data Type           | Category  | Description                 | Example                                |
| ------------------- | --------- | --------------------------- | -------------------------------------- |
| `String`            | Text      | UTF-8 string                | `"Alice"`                              |
| `NumberInt`         | Numeric   | 32-bit integer              | `NumberInt(42)`                        |
| `NumberLong`        | Numeric   | 64-bit integer              | `NumberLong(9000000000)`               |
| `NumberDecimal`     | Numeric   | Arbitrary precision decimal | `NumberDecimal("1234.5678")`           |
| `Double`            | Numeric   | 64-bit floating point       | `42.5`                                 |
| `Boolean`           | Logical   | True or False               | `true`                                 |
| `Date`              | Date/Time | ISODate                     | `ISODate("2026-02-27T10:00:00Z")`      |
| `ObjectId`          | Misc      | Unique document ID          | `ObjectId("507f1f77bcf86cd799439011")` |
| `Array`             | Misc      | Array of values             | `[1,2,3]`                              |
| `Embedded Document` | Misc      | Nested document             | `{name:"Alice", address:{city:"NY"}}`  |
| `BinData`           | Misc      | Binary data                 | `BinData(0,"base64string")`            |
| `Null`              | Misc      | Null value                  | `null`                                 |
| `Regex`             | Misc      | Regular expression          | `/^A/`                                 |
| `Timestamp`         | Misc      | Internal timestamp          | `Timestamp(1234567890,1)`              |
| `MinKey` / `MaxKey` | Misc      | Special comparison values   | `MinKey() / MaxKey()`                  |


## Miscellaneous Commands
| Command                 | Description               | Syntax / Example    |
| ----------------------- | ------------------------- | ------------------- |
| `db.stats()`            | Shows database stats      | `db.stats()`        |
| `db.collection.stats()` | Shows collection stats    | `db.users.stats()`  |
| `db.currentOp()`        | Shows current operations  | `db.currentOp()`    |
| `db.serverStatus()`     | Shows server stats        | `db.serverStatus()` |
| `help()`                | Interactive help in shell | `help()`            |
| `show collections`      | Lists collections         | `show collections`  |



## Database Commands
| Command                              | Description                                         | Syntax / Example               |
| ------------------------------------ | --------------------------------------------------- | ------------------------------ |
| `show dbs`                           | Lists all databases                                 | `show dbs`                     |
| `use <db>`                           | Switches to a database or creates it on first write | `use myDatabase`               |
| `db.createCollection(name, options)` | Creates a collection                                | `db.createCollection("users")` |
| `db.dropDatabase()`                  | Deletes the current database                        | `db.dropDatabase()`            |
| `db.getCollectionNames()`            | Lists all collections in current database           | `db.getCollectionNames()`      |


## CRUD Operations (Equivalent to DML)
| Command          | Description                       | Syntax / Example                                              |
| ---------------- | --------------------------------- | ------------------------------------------------------------- |
| `insertOne`      | Inserts a single document         | `db.users.insertOne({name: "Alice", age: 25})`                |
| `insertMany`     | Inserts multiple documents        | `db.users.insertMany([{name:"Bob"},{name:"Carol"}])`          |
| `find`           | Retrieves documents               | `db.users.find({age: {$gt: 20}})`                             |
| `findOne`        | Retrieves first matching document | `db.users.findOne({name: "Alice"})`                           |
| `updateOne`      | Updates first matching document   | `db.users.updateOne({name:"Alice"}, {$set:{age:26}})`         |
| `updateMany`     | Updates multiple documents        | `db.users.updateMany({age:{$lt:18}}, {$set:{minor:true}})`    |
| `replaceOne`     | Replaces a document               | `db.users.replaceOne({name:"Alice"}, {name:"Alice", age:27})` |
| `deleteOne`      | Deletes first matching document   | `db.users.deleteOne({name:"Bob"})`                            |
| `deleteMany`     | Deletes multiple documents        | `db.users.deleteMany({age:{$lt:18}})`                         |
| `countDocuments` | Counts documents matching query   | `db.users.countDocuments({age:{$gte:18}})`                    |


## Index Commands
| Command       | Description                       | Syntax / Example                                 |
| ------------- | --------------------------------- | ------------------------------------------------ |
| `createIndex` | Creates an index on a field       | `db.users.createIndex({name:1})`                 |
| `dropIndex`   | Deletes an index                  | `db.users.dropIndex("name_1")`                   |
| `getIndexes`  | Lists indexes for a collection    | `db.users.getIndexes()`                          |
| `unique`      | Ensures unique values for a field | `db.users.createIndex({email:1}, {unique:true})` |


## Aggregation / Join-like Operations
| Command    | Description                           | Syntax / Example                                                                                                        |
| ---------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `$match`   | Filters documents                     | `db.orders.aggregate([{$match:{status:"shipped"}}])`                                                                    |
| `$group`   | Groups documents                      | `db.orders.aggregate([{$group:{_id:"$customer", total:{$sum:"$amount"}}}])`                                             |
| `$project` | Reshapes documents                    | `db.orders.aggregate([{$project:{_id:0, total:1}}])`                                                                    |
| `$lookup`  | Performs join with another collection | `db.orders.aggregate([{$lookup:{from:"customers", localField:"customer_id", foreignField:"_id", as:"customer_info"}}])` |
| `$sort`    | Sorts documents                       | `db.users.aggregate([{$sort:{age:1}}])`                                                                                 |
| `$limit`   | Limits results                        | `db.users.aggregate([{$limit:10}])`                                                                                     |


## Transactions (MongoDB 4.0+)
| Command             | Description                      | Syntax / Example                                |
| ------------------- | -------------------------------- | ----------------------------------------------- |
| `startSession`      | Starts a session for transaction | `const session = db.getMongo().startSession();` |
| `startTransaction`  | Begins a transaction             | `session.startTransaction();`                   |
| `commitTransaction` | Commits the transaction          | `session.commitTransaction();`                  |
| `abortTransaction`  | Aborts the transaction           | `session.abortTransaction();`                   |
| `endSession`        | Ends the session                 | `session.endSession();`                         |
