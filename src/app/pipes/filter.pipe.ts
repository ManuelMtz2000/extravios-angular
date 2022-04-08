import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.lenght < 3) {
      return value;
    }
    const resultPosts = [];
    for(const post of value){
      if((post.descObjetoC.toLowerCase().indexOf(arg.toLowerCase()) > -1) ||
      (post.descDetallada.toLowerCase().indexOf(arg.toLowerCase()) > -1) ||
      (post.lugar.toLowerCase().indexOf(arg.toLowerCase()) > -1)){
         resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
