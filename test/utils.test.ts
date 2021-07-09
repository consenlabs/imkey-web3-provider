
import { expect } from 'chai';
import {isValidHex} from '../src/common/utils';

// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('Hello function', () => {
  it('should return hello world', () => {
    const result = isValidHex("111111");
    expect(result).to.equal(false);
  });
});