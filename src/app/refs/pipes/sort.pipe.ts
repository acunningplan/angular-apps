import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort"
})
export class SortPipe implements PipeTransform {
  transform(value: any[], setting: string = "alphabetical"): any[] {
    if (setting === "alphabetical") {
      value.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });
      return value;
    } else {
      return value;
    }
  }
}
