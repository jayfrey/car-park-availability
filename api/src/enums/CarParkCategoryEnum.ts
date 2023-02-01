export enum CarParkCategoryEnum {
  SMALL,
  MEDIUM,
  BIG,
  LARGE,
}

export function getCarParkCategoryEnum(totalLots: number) {
  if (totalLots < 100) {
    return CarParkCategoryEnum.SMALL;
  } else if (100 <= totalLots && totalLots < 300) {
    return CarParkCategoryEnum.MEDIUM;
  } else if (300 <= totalLots && totalLots < 400) {
    return CarParkCategoryEnum.BIG;
  } else {
    return CarParkCategoryEnum.LARGE;
  }
}

export function getCarParkCategoryName(carParkCategory: CarParkCategoryEnum) {
  if (carParkCategory == CarParkCategoryEnum.SMALL) {
    return "small";
  } else if (carParkCategory == CarParkCategoryEnum.MEDIUM) {
    return "medium";
  } else if (carParkCategory == CarParkCategoryEnum.BIG) {
    return "big";
  } else {
    return "large";
  }
}
