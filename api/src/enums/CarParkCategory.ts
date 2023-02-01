export enum CarParkCategory {
  SMALL,
  MEDIUM,
  BIG,
  LARGE,
}

export function getCarParkCategory(totalLots: number) {
  if (totalLots < 100) {
    return CarParkCategory.SMALL;
  } else if (100 <= totalLots && totalLots < 300) {
    return CarParkCategory.MEDIUM;
  } else if (300 <= totalLots && totalLots < 400) {
    return CarParkCategory.BIG;
  } else {
    return CarParkCategory.LARGE;
  }
}

export function getCarParkCategoryName(carParkCategory: CarParkCategory) {
  if (carParkCategory == CarParkCategory.SMALL) {
    return "small";
  } else if (carParkCategory == CarParkCategory.MEDIUM) {
    return "medium";
  } else if (carParkCategory == CarParkCategory.BIG) {
    return "big";
  } else {
    return "large";
  }
}
