import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InterfaceFactoryService {
  createArray(origin: any) {
    const newArray: any[] = [];
    Object.keys(origin).forEach((key) => {
      newArray.push(origin[key]);
    });

    return newArray;
  }

  checkInterface<T>(obj: any, key: string): obj is T {
    const objectKeys = Object.keys(obj);
    return objectKeys.includes(key);
  }
}
