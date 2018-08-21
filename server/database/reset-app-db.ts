// tslint:disable:max-line-length
// import { RedisDatabase } from './redis'
import { DbProducts, Categories } from '../product/product-api'
import { serverConfig } from '../server-config'

const serverUrl = serverConfig.prod ? 'https://localhost:9000/' : 'http://localhost:4200/'

export interface KeyedObj<T> {
  [key: string]: T
}

// export const CATEGORIES: KeyedObj<Category> = {
export const categories: Categories = {
  database: {
    // key: 'database',
    lead: 'Ralph Tamlyn',
    title: 'Database Taxonomy'
  },
  manpower: {
    // key: 'manpower',
    lead: 'Robert Tamlyn',
    title: 'Manpower Services'
  },
  'web-dev': {
    // key: 'web-dev',
    lead: 'Kevin Tamlyn',
    title: 'Web Development'
  },
  veggies: {
    // key: 'web-dev',
    lead: 'Kevin Tamlyn',
    title: 'Veggies'
  }
}

// export function resetAppDb(redisDb: RedisDatabase): Promise<boolean> {
//   const dataUpdates = [
//     redisDb.saveAllProducts(getPreloadProducts()),
//     redisDb.saveAllCategories(categories)
//   ]
//   return Promise.all(dataUpdates).then((results: boolean[]) => {
//     const success = results.every(r => r)
//     console.log(`Categories and products loaded: ${success}`)
//     return success
//   })
// }

export function getPreloadProducts(assetsUrl = serverUrl) {
  const allProducts: DbProducts = {
    '-L0V4jyvXq9qR9cNTenO': {
      category: 'database',
      imageUrl: assetsUrl + 'assets/images/ch.jpg',
      price: 5,
      title: 'Taxonomy Services Lite'
    },
    '-L0VdmFZvHL3o0X7IKzu': {
      category: 'web-dev',
      imageUrl: assetsUrl + 'assets/images/hot-babe.jpg',
      price: 10,
      title: 'Web App Testing'
    },
    '-L0VdmFZvHL3o0X7Iavc': {
      category: 'manpower',
      imageUrl: assetsUrl + 'assets/images/mc1.jpg',
      price: 10,
      title: 'Web App Testing II'
    },
    '-L0ZiFWvItP4YFXtYEH_': {
      category: 'web-dev',
      imageUrl: assetsUrl + 'assets/images/pretty-lady.jpg',
      price: 22,
      title: 'Wordpress Sites'
    },
    '-KrqgOLs07ZkbapP4EGi': {
      category: 'veggies',
      imageUrl: assetsUrl + 'assets/images/spinach.jpg',
      price: 2.5,
      title: 'Spinach'
    },
    '-KrrIkDT19XhPgWo0T0A': {
      category: 'database',
      imageUrl: 'https://static.pexels.com/photos/2434/bread-food-healthy-breakfast.jpg',
      price: 3,
      title: 'Freshly Baked Bread'
    },
    '-KrvrXbV3rqnFEru_ojw': {
      category: 'veggies',
      imageUrl: assetsUrl + 'assets/images/avocado.jpg',
      price: 1.75,
      title: 'Avacado'
    },
    '-KrvrgogC3oac5k83Awt': {
      category: 'web-dev',
      imageUrl: 'https://static.pexels.com/photos/8390/food-wood-tomatoes.jpg',
      price: 2.5,
      title: 'Tomato'
    },
    '-Krvrt2nkeRw2HCbiGDj': {
      category: 'web-dev',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/7/7f/Lettuce_Mini_Heads_%287331119710%29.jpg',
      price: 1,
      title: 'Lettuce'
    },
    '-Krvs0ZZBpz5GuM0RfC8': {
      category: 'web-dev',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Cauliflowers_-_20051021.jpg/1280px-Cauliflowers_-_20051021.jpg',
      price: 1.75,
      title: 'Cauliflower'
    },
    '-Krvs7RuXkSiDZvBZmey': {
      category: 'manpower',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bananas.jpg/1024px-Bananas.jpg',
      price: 1.25,
      title: 'Banana'
    },
    '-KrvsKZbI_mpo3hJg7G7': {
      category: 'manpower',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg',
      price: 1.7,
      title: 'Orange'
    },
    '-KrvsRNOg-ftEUM3Te-F': {
      category: 'manpower',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg',
      price: 2,
      title: 'Apple'
    },
    '-Krvs_CiDXdiZ3yd0PUp': {
      category: 'manpower',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Kyoho-grape.jpg',
      price: 2,
      title: 'Grape'
    },
    '-KrvsfKjGc0NCM0prc0I': {
      category: 'database',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Autumn_Red_peaches.jpg',
      price: 2,
      title: 'Peach'
    },
    '-KrvsrmX3I1-Bo6eFCdx': {
      category: 'database',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cinnamon-other.jpg',
      price: 0.5,
      title: 'Cinnamon Sticks'
    },
    '-KrvsxvxOmTzMXOSx7iG': {
      category: 'database',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Saffron_Crop.JPG',
      price: 3,
      title: 'Saffron'
    },
    '-Krvtvc_uQyh6dzI-J3R': {
      category: 'manpower',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Fabrication_du_lavash_%C3%A0_Noravank_%286%29.jpg/1280px-Fabrication_du_lavash_%C3%A0_Noravank_%286%29.jpg',
      price: 1.25,
      title: 'Lavash Bread'
    },
    '-Krvu3aL-m-ku0yCnQGr': {
      category: 'manpower',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Bagel-Plain-Alt.jpg',
      price: 1,
      title: 'Bagel Bread'
    },
    '-KrvuH_bkBBZDW0NCwfl': {
      category: 'manpower',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Strawberries.jpg',
      price: 1.95,
      title: 'Strawberry'
    },
    '-KrvuT7GtYfsFvmQfgoj': {
      category: 'manpower',
      imageUrl: 'https://static.pexels.com/photos/416607/pexels-photo-416607.jpeg',
      price: 1.25,
      title: 'Baguette Bread'
    }
  }
  return allProducts
}
