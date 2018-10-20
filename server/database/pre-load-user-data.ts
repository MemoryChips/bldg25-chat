// tslint:disable:max-line-length
import { UserWoId } from '../auth/models/user'
import { MongoClient } from 'mongodb'
import { UserDatabase, MongoUserDatabase } from './mongo-users'
import { serverConfig } from '../server-config'
import { ChatMongoDataBase, ChatDatabase } from 'bldg25-chat-server'
const mongoUrl = serverConfig.mongoUrl
const mongoDataBase = serverConfig.mongoDataBase

const catUrl = 'http://localhost:4200/assets/cat.jpg'
const dogUrl = 'http://localhost:4200/assets/dog.jpg'

// Password10
const passwordDigest =
  '$argon2i$v=19$m=4096,t=3,p=1$EAOnDLilKQyKF3lDVxiSoA$YQfnRYqxh62mwk5Qo1EmSZyNcrP6G+ZcYPpFKM690AI'
const users: UserWoId[] = [
  {
    email: 'student@gmail.com',
    userName: 'MsStudent',
    roles: ['STUDENT'],
    avatarUrl: dogUrl
  },
  {
    email: 'admin@gmail.com',
    userName: 'MrAdmin',
    roles: ['STUDENT', 'ADMIN'],
    avatarUrl: catUrl
  },
  {
    userName: 'Rob',
    roles: ['STUDENT'],
    email: 'rob@rob.com',
    avatarUrl: catUrl
  },
  {
    email: 'Heath44@hotmail.com',
    roles: ['STUDENT'],
    userName: 'Aaron Moore',
    avatarUrl: ''
  },
  {
    email: 'Gideon9@yahoo.com',
    roles: ['STUDENT'],
    userName: 'Yvonne Conroy Mrs.',
    avatarUrl: ''
  },
  {
    email: 'Laney_Huels@hotmail.com',
    roles: ['STUDENT'],
    userName: 'Laron Padberg',
    avatarUrl: ''
  },
  {
    email: 'Aletha.Labadie@hotmail.com',
    roles: ['STUDENT'],
    userName: 'Dr. Maryam Spinka',
    avatarUrl: ''
  },
  {
    email: 'Rogelio24@hotmail.com',
    roles: ['STUDENT'],
    userName: 'Kiley Baumbach',
    avatarUrl: ''
  },
  {
    email: 'Yazmin.Heidenreich97@gmail.com',
    roles: ['STUDENT'],
    userName: 'Hollis MacGyver',
    avatarUrl: ''
  },
  {
    email: 'Deon_Heaney@gmail.com',
    roles: ['STUDENT'],
    userName: 'Axel McLaughlin',
    avatarUrl: ''
  }
]

const victim = 'Deon_Heaney@gmail.com'

MongoClient.connect(
  mongoUrl,
  { useNewUrlParser: true }
)
  .then(client => {
    const db = new MongoUserDatabase(client, mongoDataBase)
    const chatDb = new ChatMongoDataBase(client, mongoDataBase)
    chatDb.flushDb().then(result => {
      console.log(`Chat data base flushed: ${result}`)
    })
    runPreload(db).then(() => {
      client.close().then(() => {
        console.log(`Mongo client closed`)
      })
    })
  })
  .catch(err => {
    console.log(`Error while connecting: ${err}`)
  })

function runPreload(db: UserDatabase) {
  return db.flushDb().then(flushResult => {
    console.log(`Flush result: ${flushResult}`)
    const userCreates = users.map(userWoId => db.createUser(userWoId, passwordDigest))
    return Promise.all(userCreates)
      .then(userCreateResults => {
        console.log('users loaded: ', userCreateResults.filter(result => !result).length === 0)
        return db.deleteUser(victim)
      })
      .then(success => {
        console.log(`${victim} deleted: ${success}`)
        return success
      })
      .then(_number => {
        return db.getUserByEmail('rob@rob.com')
      })
      .then(user => {
        console.log('Found rob: ', user ? user.userName === 'Rob' : false)
      })
      .catch(err => {
        console.log(`not all users loaded: ${err}`)
      })
  })
}
