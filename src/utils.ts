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
/**
 * @public
 * @function isObject
 * @param {any} val
 * @return {val is Object} true if val is a _non-null_ {Object}
 */
export function isObject (val: any): val is Object {
  return !!val && (typeof val === 'object')
}
/**
 * @public
 * @function isArrayLike
 * @param {any} val
 * @return {val is Object} true if `val` is an {Object}
 * with a {number} length property
 */
export function isArrayLike (val: any): val is Object {
  return isObject(val) && isNumber(val.length)
}
/**
 * @public
 * @param {any} val
 * @return {val is Function}
 */
export function isFunction (val: any): val is Function {
  return typeof val === 'function'
}
/**
 * @public
 * @param {any} val
 * @return {val is string}
 */
export function isString (val: any): val is string {
  return typeof val === 'string'
}
/**
 * @public
 * @param {any} val
 * @return {val is number}
 */
export function isNumber (val: any): val is number {
  return typeof val === 'number'
}
/**
 * @public
 * @function assert
 * @param {boolean} val
 * @param {typeof Error} errType
 * @param {string} message
 * @throw {Error} of type `errType` with the given `message` when val is false
 */
export function assert (val: boolean, errType: typeof Error, message: string):
void {
  if (val) return
  throw new errType(message)
}
