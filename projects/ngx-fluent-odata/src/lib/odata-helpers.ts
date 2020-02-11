import { FormGroup } from '@angular/forms';
import { ODataComparisonOperator } from './odata-model';
import { GenericSearchModel } from './generic-search.model';
import { PageAndItemsModel } from './page-and-items.model';
import { ODataBuilder } from './odata-builder';

export abstract class OdataHelpers {

  public static extractSearchFormData(form: FormGroup, oDataOptions?: string[][]): string[][] {
    const arr = new Array<string[]>();

    Object.keys(form.controls).forEach(key => {
      if (form.get(key) && form.get(key).value) {
        this.formControlExtract(key, form.get(key).value, arr, oDataOptions);
      }
    });

    return arr;
  }

  private static formControlExtract(key: string, object: Object | string, array: string[][], oDataOptions?: string[][]) {

    if (typeof object === 'string') {
      array.push([key, object.toString(), this.extractODataOption(key, oDataOptions)]);
    } else {
      Object.keys(object).forEach(innerKey => {
        if (object[innerKey]) {
          this.formControlExtract(`${key}/${innerKey}`, object[innerKey], array, oDataOptions);
        }
      });
    }

  }

  private static extractODataOption(key: string, oDataOptions?: string[][]): ODataComparisonOperator {

    if (!oDataOptions || !oDataOptions.length) {
      return undefined;
    }

    const filteredOptions = oDataOptions.filter(o => o[0] === key);

    if (filteredOptions && filteredOptions.length) {
      return filteredOptions[0][1] as ODataComparisonOperator;
    }

    return undefined;

  }

  public static queryBuilder(searchModel = new GenericSearchModel(), paging?: PageAndItemsModel): ODataBuilder {
    const query = new ODataBuilder();

    if (paging) {
      query.top(paging.itemsPerPage)
        .skip(paging.currentPage * paging.itemsPerPage)
        .count();
    }

    if (searchModel.searchFields) {
      let index = 1;

      searchModel.searchFields.forEach(sf => {
        if (sf[2]) {
          query.filterAdd(sf[0], sf[2] as ODataComparisonOperator, sf[1]);
        } else {
          query.filterContains(sf[0], sf[1]);
        }

        if (index !== searchModel.searchFields.length) {
          query.filterAnd();
          index++;
        }
      });
    }

    if (searchModel.orderBy) {
      query.orderByManual(searchModel.orderBy);
    }

    return query;
  }

}
