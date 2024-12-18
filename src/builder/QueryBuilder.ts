import { Query } from "mongoose";

export class QueryBuilder<T> {
  constructor(
    public queryModel: Query<T[], T>,
    public query: Record<string, unknown>
  ) {}

  search(searchFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    const searchQuery = searchTerm
      ? {
          $or: searchFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: "i" },
          })),
        }
      : {};

    this.queryModel = this.queryModel.find(searchQuery);
    return this;
  }

  filter() {
    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
    const copiedQuery = { ...this.query };

    excludeFields.forEach((el) => delete copiedQuery[el]);

    this.queryModel = this.queryModel.find(copiedQuery);
    return this;
  }

  sort() {
    const sortQuery = this?.query?.sort || "-createdAt"; //Default sort based on createdAt

    this.queryModel = this.queryModel.sort(sortQuery as string);
    return this;
  }

  paginate() {
    const limitQuery = Number(this?.query?.limit) || 10;
    const pageQuery = Number(this?.query?.page) || 1;
    const skipQuery = (pageQuery - 1) * limitQuery;

    this.queryModel = this.queryModel.skip(skipQuery).limit(limitQuery);
    return this;
  }

  selectFields() {
    const fieldsQuery =
      (this?.query?.fields as string)?.split(",").join(" ") || "-__v";

    this.queryModel = this.queryModel.select(fieldsQuery);
    return this;
  }
}
