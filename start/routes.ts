/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

Route.get('/health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.get('/', async ({ view }: HttpContextContract) => {
  return view.render('welcome')
})

Route.get('/axie', 'AxiesController.index')
Route.get('/login', 'AuthController.showLogin')
Route.post('/login', 'AuthController.login')
Route.get('/register', 'AuthController.index')

Route.get('/logout', 'AuthController.logout')
Route.post('/register', 'AuthController.register')

Route.group(() => {
  Route.get('/axies', 'AxiesController.axies')
  Route.get('/axie/:id', 'AxiesController.index')
  Route.get('/team', 'AxiesController.team')

  // Route.get('/axie-team', 'AxieTeamsController.index')
  // Route.post('/axie-team', 'AxieTeamsController.store')
  // Route.get('/axie-team/:id', 'AxieTeamsController.show')
  // Route.delete('/axie-team/:id', 'AxieTeamsController.destroy')

  Route.get('/user_stash/:id', 'UsersController.stash')
  Route.put('/user', 'UsersController.update')
  Route.delete('/user', 'UsersController.destroy')
}).middleware('auth')

Route.group(() => {
  Route.get('/user', 'UsersController.index')
  Route.get('/user/:id', 'UsersController.show')

  Route.post('/axie', 'AxiesController.store')
  Route.delete('/axie', 'AxiesController.destroy')
}).middleware('admin')
