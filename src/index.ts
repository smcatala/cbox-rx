/**
 * Copyright 2016 Stephane M. Catala
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * Limitations under the License.
 */
;
export interface OpgpKey {}// TODO import OpgpKey from 'opgp-service'

import Promise = require('bluebird')
import { Observable } from '@reactivex/rxjs'

import { __assign as assign } from 'tslib'

import debug = require('debug')
const log = debug('cbox-rx')

/**
 * @public
 * @factory
 * @param {CboxRxFactorySpec} Spec
 * @return {CboxRx}
 */
export interface CboxRxFactory {
  (spec: CboxRxFactorySpec): CboxRx
}

/**
 * @public
 */
export interface CboxRxFactorySpec {
  /**
   * @public
   * @prop {string} id of cbox (name of underlying database)
   */
  id: string
  /**
   * @public
   * @prop {OpgpKey} key
   */
  key: OpgpKey
}

export interface CboxRx {
  /**
   * @public
   * @method read
   * rx operator that maps a sequence of {ReadSpec} objects
   * to the corresponding documents from the cbox wrapped in
   * {ReadStatus} objects
   * @param {Observable<ReadSpec>} refs
   * @param {ReadOpts} opts?
   * @return {ReadStatus|ReadStatus[]}
   * @error {} TODO
   */
  read (refs: Observable<ReadSpec>, opts?: ReadOpts):
    Observable<ReadStatus|ReadStatus[]>
  /**
   * @public
   * @method write
   * rx operator that maps a sequence of {WriteSpec} objects
   * to the {WriteStatus} objects resulting from storing the documents
   * wrapped in the {WriteSpec} objects in the cbox
   * @param {Observable<WriteSpec>} docs
   * @param {WriteOpts} opts?
   * @return {WriteStatus|WriteStatus[]}
   * @error {} TODO
   */
  write (docs: Observable<WriteSpec>, opts?: WriteOpts):
    Observable<WriteStatus|WriteStatus[]>
}

export interface ReadSpec extends DataSource {
  opts?: ReadOpts
}

export interface WriteSpec extends DataSource {
  opts?: WriteOpts
}

export interface DataSource {
	src: DocRef[] | DocRef
}

export interface ReadStatus extends WriteStatus {
  doc?: DocRef
}

export interface WriteStatus {
  status: number
  ref: DocRef
  error?: Error
}

export interface DocRef {
  _id: string
  _rev?: string
}

export interface ReadOpts {
  include_docs: boolean
}

export interface WriteOpts {
  include_docs: boolean
}