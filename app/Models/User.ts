import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, hasMany, BaseModel, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Article from './Article';
import Comment from './Comment';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string | null

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => Article)
  public articles: HasMany<typeof Article>
  
  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>
}