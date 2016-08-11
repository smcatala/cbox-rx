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
import getCboxRx from '../../src'
import { Observable } from '@reactivex/rxjs'
import * as debug from 'debug'

const specs = {
  id: 'sids',
  key: {} // TODO unlocked private key
}
const sids = getCboxRx(specs)

const docs = [{
  _id: 'hubbard-rob_monty-on-the-run',
  title: 'Monty on the Run',
  author: 'Rob Hubbard',
  release: '1985'
}, [{
  _id: 'hubbard-rob_sanxion',
  title: 'Sanxion',
  author: 'Rob Hubbard',
  release: '1986'
}, {
  _id: 'tel-jeroen_ikari-union',
  title: 'Ikari Union',
  author: 'Jeroen Tel',
  release: '1987'
}]]
.map(doc => [ doc ])

// write docs to db
const refs = sids.write(toObservable(docs))
.do(debug('write:next'), debug('write:error'), debug('write:done'))
.map(toRefs)

// read docs from db
sids.read(refs)
.subscribe(debug('read:next'), debug('read:error'), debug('read:done'))

function toRefs (res: Array<{id: string}>|{id: string}) {
  return Array.isArray(res) ?
  [ res.map(res => res.id), { include_docs: true } ] : res.id
}

function toObservable (val:any): Observable<any> {
	try {
  	return Observable.from(val)
  } catch (err) {
  	return Observable.throw(err)
  }
}