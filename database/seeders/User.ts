import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.create({
      username: 'adonis',
      password: 'adonis',
      email: 'adonis@gmail.com',
      role: 'admin',
    })
  }
}
