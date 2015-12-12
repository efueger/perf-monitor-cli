import cli from '../../src/cli';
import chai from 'chai';

const { expect } = chai;

describe('Tests should work!', () => {
  beforeEach(() => {
    console.log('Testing before each');
  });

  afterEach(() => {
    console.log('Testing after each');
  });

  it('should work as expected', () => {
    expect(cli('siva')).to.equal('hello siva');
  });
});
