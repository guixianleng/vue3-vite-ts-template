import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import tableModule from './modules/tables'
import userModule from './modules/user'

const mockModules = [...tableModule, ...userModule]

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
