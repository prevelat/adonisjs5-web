import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import AxieTeam from 'App/Models/AxieTeam'
import Axie from 'App/Models/Axie'

export default class UsersController {
  public async index() {
    return User.all()
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const UserSchema = schema.create({
      username: schema.string.optional({ trim: true }, [
        rules.minLength(3),
        rules.maxLength(50),
        rules.unique({ table: 'users', column: 'username' }),
      ]),
      password: schema.string.optional({ trim: true }, [rules.confirmed()]),
      email: schema.string.optional({}, [
        rules.email(),
        rules.minLength(8),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
    })

    const payload = await request.validate({
      schema: UserSchema,
      messages: {
        'username.minLength': 'username must be at least 3 characters',
        'username.maxLength': 'username can not exceed 50 characters',
        'username.unique': 'username already exists',
        'password.confirmed': 'password confirmation does not match',
        'email.email': 'Enter valid email',
        'email.minLength': 'email must be at least 8 characters',
        'email.maxLength': 'email can not exceed 255 characters',
        'email.unique': 'email already in use',
      },
    })

    const user = await User.findOrFail(auth.user?.id)

    if (payload.username && payload.username !== auth.user?.username) {
      user.username = payload.username
    }
    if (payload.password) {
      user.password = payload.password
    }
    if (payload.email) {
      user.email = payload.email
    }

    console.log(user)

    user.save()

    response.status(201).json(user)
  }

  public async show({ params }: HttpContextContract) {
    return User.findOrFail(params.id)
  }

  public async destroy({ auth }: HttpContextContract) {
    const user = await User.findOrFail(auth.user?.id)

    await user.delete()

    auth.logout()

    return user
  }

  public async stash({ view, auth }: HttpContextContract) {
    const team = await AxieTeam.findBy('created_by', auth.user?.id)

    const data = new Array(3)

    team?.axie_ids.forEach(async (ele) => {
      const axie = await Axie.findBy('id', ele)
      data.push(axie)
    })

    return view.render('user', { data })
  }
}
