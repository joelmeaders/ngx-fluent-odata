import { ODataBuilder } from './odata-builder';
import { ODataModel } from './odata-model';

describe('OdataQueryBuilder', () => {
  it('should create an instance', () => {
    expect(new ODataBuilder(new ODataModel())).toBeTruthy();
  });

});
