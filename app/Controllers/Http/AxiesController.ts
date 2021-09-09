import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Axie from 'App/Models/Axie'

export default class AxiesController {
  public async index({ view, auth }: HttpContextContract) {
    const axies = await Axie.all()
    const role = auth.user?.role

    return view.render('axie', { axies, role })
  }

  public async store({ request, response, session }: HttpContextContract) {
    const newAxieSchema = schema.create({
      name: schema.string({ trim: true }, [
        rules.required(),
        rules.unique({ table: 'axies', column: 'name' }),
      ]),
      picture: schema.string({ trim: true }, [rules.required()]),
      attack: schema.number([rules.required()]),
      defense: schema.number([rules.required()]),
    })

    const payload = await request.validate({
      schema: newAxieSchema,
      // messages: {
      //   'name.required': 'Enter a name',
      //   'name.unique': 'Axie name already exists',
      //   'picture.required': 'A picture is needed',
      //   'attack.required': 'Enter an attack value',
      //   'defense.required': 'Enter an defense value',
      // },
    })

    const axie = await Axie.create(payload)

    session.flash('notification', 'Axie Created!')

    response.status(201).json(axie)
  }

  public async show({ params }: HttpContextContract) {
    return Axie.findOrFail(params.id)
  }

  public async team({ auth, response }: HttpContextContract) {
    response.redirect(`/user_stash/${auth.user?.id}`)
  }

  public async destroy({ params }: HttpContextContract) {
    const axie = await Axie.findOrFail(params.id)

    await axie.delete()

    return axie
  }
}
