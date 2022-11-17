import { RepoError, Result } from '../helpers/Result' // eslint-disable-line
import { QueryParams } from './QueryParams' // eslint-disable-line

export type RepoResult<M> = Promise<Result<M | undefined, RepoError | undefined>>;

export interface CommonCrud<M> {
  create(model: M): RepoResult<M>;
  update(id: string, model: M): RepoResult<M>;
  delete(id: string): RepoResult<M>;
  find(params: QueryParams): RepoResult<M[]>;
  findOne(id: string): RepoResult<M>;
}
