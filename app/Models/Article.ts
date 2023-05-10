import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'

import User from './User';
import Comment from './Comment';

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public cover: string | null

  @column()
  public title: string

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['title']
  })
  public slug: string

  @column()
  public content: string

  @column()
  public published: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public author: BelongsTo<typeof User>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>
}
