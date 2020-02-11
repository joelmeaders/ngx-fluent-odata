import { ODataComparisonOperator, ODataLogicalOperator, ODataMetadata, ODataModel, ODataSortOperator } from './odata-model';


export abstract class ODataQueryMethods {

  public constructor(protected readonly model: ODataModel = new ODataModel()) { }

  public filterAdd(field: string, compare: ODataComparisonOperator, value: string | number | boolean): this {
    this.model.filter.push(`${field} ${compare} ${value}`);
    return this;
  }

  public filterContains(field: string, value: string): this {
    this.model.filter.push(`contains(toLower(${field}),'${value.toLowerCase()}')`);
    return this;
  }

  public filterAnd(): this {
    this.model.filter.push(ODataLogicalOperator.and);
    return this;
  }

  public filterOr(): this {
    this.model.filter.push(ODataLogicalOperator.or);
    return this;
  }

  public filterNot(): this {
    this.model.filter.push(ODataLogicalOperator.not);
    return this;
  }

  public expand(field: string | string[]): this {
    this.model.expand = this.model.expand.concat(field);
    return this;
  }

  public orderBy(field: string, sortOrder: ODataSortOperator): this {
    this.model.orderBy.push(`${field} ${sortOrder}`);
    return this;
  }

  public orderByManual(fullOrderByString: string): this {
    this.model.orderBy.push(`${fullOrderByString}`);
    return this;
  }

  public select(field: string | string[]): this {
    this.model.select = this.model.select.concat(field);
    return this;
  }

  public top(count: number) {
    this.model.top = count;
    return this;
  }

  public skip(count: number) {
    this.model.skip = count;
    return this;
  }

  public count(bool = true): this {
    this.model.count = bool;
    return this;
  }

  public format(): this {
    throw new Error('format() Not Implemented');
  }

  public metadata(meta: ODataMetadata): this {
    this.model.metadata = meta;
    return this;
  }

  public hasFilter(): boolean {
    return this.model.filter.length > 0;
  }

  public hasOrderBy(): boolean {
    return this.model.orderBy.length > 0;
  }

}
