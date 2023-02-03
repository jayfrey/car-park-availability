export enum CarparkCategoryEnum {
  SMALL,
  MEDIUM,
  BIG,
  LARGE,
}

export function getCarparkCategoryEnum(totalLots: number) {
  if (totalLots < 100) {
    return CarparkCategoryEnum.SMALL;
  } else if (100 <= totalLots && totalLots < 300) {
    return CarparkCategoryEnum.MEDIUM;
  } else if (300 <= totalLots && totalLots < 400) {
    return CarparkCategoryEnum.BIG;
  } else {
    return CarparkCategoryEnum.LARGE;
  }
}

export function getCarparkCategoryName(carparkCategory: CarparkCategoryEnum) {
  if (carparkCategory == CarparkCategoryEnum.SMALL) {
    return "small";
  } else if (carparkCategory == CarparkCategoryEnum.MEDIUM) {
    return "medium";
  } else if (carparkCategory == CarparkCategoryEnum.BIG) {
    return "big";
  } else {
    return "large";
  }
}
