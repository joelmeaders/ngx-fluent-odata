export class ODataModel {
  public filter = new Array<string>();
  public expand = new Array<string>();
  public orderBy = new Array<string>();
  public select = new Array<string>();
  public top = 20;
  public skip = 0;
  public count = false;
  public format = 'application/json';
  public metadata = ODataMetadata.none;
}

export enum ODataMetadata {
  full = 'odata.metadata=full',
  minimal = 'odata.metadata=minimal',
  none = 'odata.metadata=none',
}

export enum ODataComparisonOperator {
  equal = 'eq',
  notEqual = 'ne',
  greaterThan = 'gt',
  lessThan = 'lt',
  greaterThanOrEqual = 'ge',
  lessThanOrEqual = 'le',
}

export enum ODataLogicalOperator {
  and = 'and',
  or = 'or',
  not = 'not',
  none = 'none'
}

export enum ODataSortOperator {
  ascending = 'asc',
  descending = 'desc'
}
