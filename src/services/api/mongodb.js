module.exports = {
  /**
   * Randomly samples a document from 'wildcard' database.
   * @param {Object} db Database from MongoDB connection
   * @param {String} col collection name of wildcard database
   */
  sampleWildcard(db, col) {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('Invalid database')
      }
      const cursor = db.collection(col)
      .aggregate([{ $sample: { size: 1 } }])
      cursor.each((err, doc) => {
        if (doc) {
          resolve(doc)
        } else {
          reject('Unable to retrieve document')
        }
      })
    })
  },
  /**
   * increments likes of document with _id id by amount
   * @param {Object} db database from MongoDB connection
   * @param {string} callback collection name for database.
   * @param {Object} id of document to update.
   * @param {Integer} amount of likes to increment
   */
  addLikes(db, col, id, amount) {
    if (!db) {
      throw Error('ERROR: Invalid database.')
    } else {
      return db.collection(col).update({ _id: id }, { $inc: { likes: amount } })
    }
  },
  /**
   * increments dislikes of document with _id id by amount
   * @param {Object} db database from MongoDB connection
   * @param {string} callback collection name for database.
   * @param {Object} id of document to update.
   * @param {Integer} amount of likes to increment
   */
  addDislikes(db, col, id, amount) {
    if (!db) {
      throw Error('ERROR: Invalid database.')
    } else {
      return db.collection(col).update({ _id: id }, { $inc: { dislikes: amount } })
    }
  },
  /**
   * Stores tweets into MongoDB database col
   * @param {Object} db MongoDB database connection
   * @param {col} collectionToInsert MongoDB collection to store in.
   * @param {Object} content the object to store into MongoDB database.
   */
  store(db, col, content) {
    // console.log('DB connected successfully')
    db.collection(col).insert(content, (insertError) => {
      // console.log(`DB insert result: ${records.ops[0]._id}`)
      if (insertError) {
        throw new Error(`insert error: ${insertError}`)
      }
      db.close()
    })
  },
}
