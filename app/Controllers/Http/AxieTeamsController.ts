import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import AxieTeam from 'App/Models/AxieTeam'

export default class AxieTeamsController {
  public async index({ auth, response }: HttpContextContract) {
    const team = await AxieTeam.findBy('created_by', auth.user?.id)

    if (!team) {
      return response.json({ message: 'No teams' })
    }
    return team
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const newAxieTeamSchema = schema.create({
      name: schema.string({ trim: true }, [rules.required()]),
      axie_ids: schema.array([rules.minLength(3), rules.maxLength(3)]).members(schema.number()),
    })

    let payload = await request.validate({
      schema: newAxieTeamSchema,
    })

    const obj = {
      name: payload.name,
      axie_ids: payload.axie_ids,
      created_by: auth.user?.id,
    }

    const team = await AxieTeam.create(obj)

    response.status(201).json(team)
  }

  public async show({}: HttpContextContract) {
    return AxieTeam.all()
  }

  public async destroy({ params }: HttpContextContract) {
    const team = await AxieTeam.findOrFail(params.id)

    await team.delete()

    return team
  }
}
