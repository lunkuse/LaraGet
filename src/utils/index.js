import faker from './faker'
import helper from './helper'
import lodash from './lodash'
export * from "./useFetch";
export default app => {
  app.use(faker)
  app.use(helper)
  app.use(lodash)
}
