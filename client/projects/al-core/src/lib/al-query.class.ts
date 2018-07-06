import * as _ from 'lodash';

export interface LoopbackFilter {
  where?: any,
  limit?: number,
  skip?: number,
  fields?: any,
  order?: string,
  include?: any
}

export class LoopbackQuery implements LoopbackFilter {
  public where: any;
  public limit: number;
  public skip: number;
  public fields: any;
  public order: string;
  public include: any;

  constructor(filter?: LoopbackFilter) {
    if (filter) {
      _.extend(this, filter);
    } else {
      this.where = {};
    }
  }

  // TODO: MAke the filter format simpler to understand and convert to what loopback expects here.
  // Recursively filter out the empty property filters
  public format(node?: LoopbackFilter) {
    if (!node) {
      node = this;
    }

    node = _.isObject(node) ? _.cloneDeep(node) : {};

    const recursive = (outerNode) => {
      // First we traverse down array/object branches
      _.forOwn(outerNode, (value, key, object) => {
        if (_.isArray(value)) {
          _.forEach(value, (innerNode, index, collection) => {
            if (_.isObject(innerNode)) {
              collection[index] = recursive(innerNode);
            }
          });
        } else if (_.isObject(value)) {
          object[key] = recursive(value);
        }
      });

      // Remove all empty properties in this node
      return _.omitBy(node, (value, key) => {
        if (_.isBoolean(value)) {
          return false;
        }

        if (_.isNumber(value)) {
          return false;
        }

        if (_.isDate(value)) {
          return false;
        }

        return _.isEmpty(value);
      });
    };
    return recursive(node);
  }
}
