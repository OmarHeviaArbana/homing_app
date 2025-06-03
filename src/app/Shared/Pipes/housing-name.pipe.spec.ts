import { HousingNamePipe } from './housing-name.pipe';

describe('HousingNamePipe', () => {
  it('create an instance', () => {
    const pipe = new HousingNamePipe();
    expect(pipe).toBeTruthy();
  });
});
