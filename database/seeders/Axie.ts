import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Axie from 'App/Models/Axie'

export default class AxieSeeder extends BaseSeeder {
  public async run() {
    await Axie.createMany([
      {
        name: 'Tank',
        picture: 'https://imgur.com/wuKOeRC',
        attack: 120,
        defense: 300,
      },
      {
        name: 'Terminator',
        picture: 'https://imgur.com/uAGIfib',
        attack: 500,
        defense: 50,
      },
      {
        name: 'beast',
        picture: 'https://imgur.com/T6s5HCb',
        attack: 300,
        defense: 120,
      },
      {
        name: 'palnt-egg',
        picture: 'https://imgur.com/D4esCt6',
        attack: 0,
        defense: 0,
      },
      {
        name: 'beast-egg',
        picture: 'https://imgur.com/uAGIfib',
        attack: 0,
        defense: 0,
      },
      {
        name: 'aqua-egg',
        picture: 'https://imgur.com/qQ6Vn1v',
        attack: 0,
        defense: 0,
      },
      {
        name: 'dusk',
        picture: 'https://imgur.com/zW13DEx',
        attack: 320,
        defense: 110,
      },
      {
        name: 'stun-aqua',
        picture: 'https://imgur.com/B513iB2',
        attack: 450,
        defense: 70,
      },
      {
        name: 'shell-beast',
        picture: 'https://imgur.com/RZ4pjbs',
        attack: 450,
        defense: 120,
      },
      {
        name: 'poison-snake',
        picture: 'https://imgur.com/QZ9ApGO',
        attack: 250,
        defense: 180,
      },
      {
        name: 'bd-bird',
        picture: 'https://imgur.com/QYbj2Lj',
        attack: 550,
        defense: 30,
      },
      {
        name: 'koi-aqua',
        picture: 'https://imgur.com/4exWiSf',
        attack: 320,
        defense: 100,
      },
    ])
  }
}
