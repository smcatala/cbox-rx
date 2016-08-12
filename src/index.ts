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
 * @interface {CboxRxFactorySpec}
 * specification object that defines a {CboxRx} instance
 */
export interface CboxRxFactorySpec {
  /**
   * @public
   * @prop {string} id of cbox (name of underlying database)
   */
  id: string
  /**
   * @public
   * @prop {OpgpKey} key pair
   */
  key: OpgpKey
  /**
   * @public
   * @prop {Object} opts? default options
   */
  opts?: {
    /**
     * @public
     * @prop {ReadOpts} read? default options for the {CboxRx#read} operator.
     */
    read?: ReadOpts,
    /**
     * @public
     * @prop {WriteOpts} read? default options for the {CboxRx#write} operator.
     */
    write?: WriteOpts
  }
}

/**
 * @public
 * @interface {CboxRx}
 * a thin (RXJS)[https://www.npmjs.com/package/@reactivex/rxjs]
 * abstraction layer for the encrypted
 * (pouchDB)[https://www.npmjs.com/package/pouchdb] storage
 * of a (Cryptobox)[https://www.npmjs.com/package/cryptobox]
 */
export interface CboxRx {
  /**
   * @public
   * @method read
   * rx operator that maps a sequence of {DocRef} document references
   * to the corresponding documents fetched and decrypted
   * from the local (Cryptobox)[https://www.npmjs.com/package/cryptobox].
   * @param {Observable<DocRef|DocRef[]>} refs
   * @param {ReadOpts} opts?
   * @return {Observable<DocRef|DocRef[]>} the referenced document(s)
   * fetched and decrypted
   * from the local (Cryptobox)[https://www.npmjs.com/package/cryptobox].
   * @error {Error} when retrieving a document fails // TODO provide more detail on possible fetch errors
   * @error {Error} when decrypting a document fails // TODO provide more detail on possible decryption errors
   */
  read (refs: Observable<DocRef|DocRef[]>, opts?: ReadOpts):
    Observable<DocRef|DocRef[]>
  /**
   * @public
   * @method write
   * rx operator that encrypts and stores the documents from an input sequence
   * to the local (Cryptobox)[https://www.npmjs.com/package/cryptobox],
   * and maps that input sequence to the corresponding sequence of documents
   * with updated {DocRef} reference.
   * @param {Observable<DocRef|DocRef[]>} docs sequence of input documents
   * that extend their own {DocRef} reference.
   * @param {WriteOpts} opts?
   * @return {Observable<DocRef|DocRef[]>} sequence of the stored document(s),
   * with updated {DocRef} references.
   * when the input `docs` sequence emits an array of documents,
   * this output sequence emits a corresponding array of documents,
   * in the same order.
   * @error {Error} when storing a document fails // TODO provide more detail on possible storage errors
   * @error {Error} when encrypting a document fails // TODO provide more detail on possible encryption errors
   */
  write (docs: Observable<DocRef|DocRef[]>, opts?: WriteOpts):
    Observable<DocRef|DocRef[]>
}

/**
 * @public
 * @interface {DocRef}
 * a unique identifier (reference) of a JSON document,
 * or a JSON document that extends its own {DocRef} reference.
 * @see (JSON Document field description)[http://wiki.apache.org/couchdb/HTTP_Document_API#Special_Fields]
 */
export interface DocRef {
  /**
   * @public
   * @prop {string} _id unique document identification string.
   */
  _id: string
  /**
   * @public
   * @prop {string} _rev? unique document revision identification string.
   * defaults to the latest revision identification string
   * of the referenced document.
   */
  _rev?: string
}

/**
 * @public
 * @interface {ReadOpts}
 * @see (pouchDB#get)[https://pouchdb.com/api.html#fetch_document] options
 * for a single {DocRef} instance {DataSource}
 * @see (pouhDB#allDocs)[https://pouchdb.com/api.html#batch_fetch] options
 * for an array of {DocRef} instances {DataSource}
 */
export interface ReadOpts {
  include_docs: boolean
  // TODO add options from pouchDB
}

/**
 * @public
 * @interface {WriteOpts}
 * @see (pouchDB#put)[https://pouchdb.com/api.html#create_document] options
 * for a single {DocRef} instance {DataSource}
 * @see (pouchDB#bulkDocs)[https://pouchdb.com/api.html#batch_create] options
 * for an array of {DocRef} instances {DataSource}
 */
export interface WriteOpts {
  include_docs: boolean
  // TODO add options from pouchDB
}