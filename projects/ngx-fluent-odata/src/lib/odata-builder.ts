import { ODataQueryMethods } from './odata-query-methods';

export class ODataBuilder extends ODataQueryMethods {

  public toString(): string {

    this.cleanModel();

    const query = new Array<string>();

    query.push(this.parseFilter());
    query.push(this.parseExpand());
    query.push(this.parseOrderBy());
    query.push(this.parseSelect());
    query.push(this.parseTop());
    query.push(this.parseSkip());
    query.push(this.parseCount());
    query.push(this.parseFormat());

    return `?${query.filter(q => !!q).join('&')}`;
  }

  private cleanModel() {

    Object.keys(this.model).forEach(key => {
      if (this.model[key] && this.model[key] instanceof Array) {
        this.model[key] = this.model[key].filter(v => v !== undefined);
      }
    });

  }

  private parseFilter(): string {

    if (!this.model.filter.length) {
      return undefined;
    }

    return `$filter=${this.model.filter.filter(m => !!m).join(' ')}`;
  }

  private parseExpand(): string {

    if (!this.model.expand.length) {
      return undefined;
    }

    return `$expand=${this.model.expand.join(',')}`;
  }

  private parseOrderBy(): string {

    if (!this.model.orderBy.length) {
      return undefined;
    }

    return `$orderby=${this.model.orderBy.join(',')}`;
  }

  private parseSelect(): string {

    if (!this.model.select.length) {
      return undefined;
    }

    return `$select=${this.model.select.join(',')}`;
  }

  private parseTop(): string {
    return `$top=${this.model.top}`;
  }

  private parseSkip(): string {
    return `$skip=${this.model.skip}`;
  }

  private parseCount(): string {
    return `$count=${this.model.count}`;
  }

  private parseFormat(): string {
    return `$format=${this.model.format};${this.model.metadata}`;
  }

}
