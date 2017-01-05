/* @flow */

import {stateFromElement} from '../index';
import parseHTML from './parseHTML';

import type {ContentState} from 'draft-js';

type Options = {
  parser?: (html: string) => Element;
};

export default function stateFromHTML(html: string, options?: Options): ContentState {
  let parser = (options == null || options.parser == null) ? parseHTML : options.parser;
  let element = parser(html);
  return stateFromElement(element, options);
}
