import { RepoError, Result } from '../helpers/Result'
import { CommonCrud, RepoResult } from '../interfaces/CommonCrud' // eslint-disable-line
import { QueryParams } from '../interfaces/QueryParams' // eslint-disable-line

export abstract class BaseDao<Model> implements CommonCrud<Model> {
    public readonly model;
    // we created constructor with arguments to manipulate mongodb operations
    constructor (model) {
      this.model = model
    }

    async create (item: Model): RepoResult<Model> {
      try {
        const response = await this.model.create(item)
        return Result.ok(response)
      } catch (ex: any) {
        console.log(ex)
        return Result.fail(new RepoError(ex.message, 500))
      }
    }

    async update (id: string, model: Model): RepoResult<Model> {
      try {
        const response = await this.model.update(model, {
          where: { id }
        })
        return Result.ok(response)
      } catch (ex: any) {
        console.log(ex)
        return Result.fail(new RepoError(ex.message, 500))
      }
    }

    async delete (id: string): RepoResult<Model> {
      try {
        const response = await this.model.destory({
          where: { id }
        })
        return Result.ok(response)
      } catch (ex: any) {
        console.log(ex)
        return Result.fail(new RepoError(ex.message, 500))
      }
    }

    async find (params: QueryParams): RepoResult<Model[]> {
      try {
        const { where, attributes, include, offset, limit } = params
        let objFind = {}
        if (where && Object.keys(where).length > 0) {
          objFind = { ...objFind, where }
        }
        if (attributes && attributes.length > 0) {
          objFind = { ...objFind, attributes }
        }
        if (include && include.length > 0) {
          objFind = { ...objFind, include }
        }
        objFind = { ...objFind, offset, limit }
        const resposne = await this.model.findAll(objFind)
        return Result.ok(resposne)
      } catch (ex: any) {
        console.log('error', ex)
        return Result.fail(new RepoError(ex.message, 500))
      }
    }

    async findOne (id: string): RepoResult<Model> {
      try {
        const doc = await this.model.findOne({
          where: {
            id
          }
        })
        if (!doc) {
          return Result.fail(new RepoError('Not found', 404))
        }

        return Result.ok(doc)
      } catch (ex: any) {
        return Result.fail(new RepoError(ex.message, 500))
      }
    }
}
