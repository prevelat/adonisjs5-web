import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async index({ view }: HttpContextContract) {
    return view.render('register')
  }

  public async register({ request, auth, response }: HttpContextContract) {
    const newUserSchema = schema.create({
      username: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(50),
        rules.unique({ table: 'users', column: 'username' }),
      ]),
      password: schema.string({ trim: true }, [
        rules.required(),
        rules.confirmed(),
      ]),
      email: schema.string({}, [
        rules.required(),
        rules.email(),
        rules.minLength(8),
        rules.maxLength(255),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
    })

    const payload = await request.validate({
      schema: newUserSchema,
      messages: {
        'username.required': 'Enter a username',
        'username.minLength': 'username must be at least 3 characters',
        'username.maxLength': 'username can not exceed 50 characters',
        'username.unique': 'username already exists',
        'password.required': 'Enter a password',
        'password.confirmed': 'password confirmation does not match',
        'email.required': 'Enter an email',
        'email.email': 'Enter valid email',
        'email.minLength': 'email must be at least 8 characters',
        'email.maxLength': 'email can not exceed 255 characters',
        'email.unique': 'email already in use',
      },
    })

    const user = await User.create(payload)

    try {
      await auth
        .use('web')
        .attempt(request.input('email'), request.input('password'))
      response.redirect(`/user_stash/${user.id}`)
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async showLogin({ view }: HttpContextContract) {
    return view.render('login')
  }

  public async login({ request, response, auth }: HttpContextContract) {
    try {
      await auth
        .use('web')
        .attempt(request.input('email'), request.input('password'))
      response.redirect(`/user_stash/${auth.user?.id}`)
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.use('web').logout()
    response.redirect('/')
  }
}
