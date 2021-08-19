import { Pipe } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({name: 'safeHtml'})
<<<<<<< HEAD
export class Safe {
=======
export class safeHtmlPipe {
>>>>>>> a8004fddf4f765992a9e837fbc7e646f51e972f4
  constructor(private sanitizer:DomSanitizer){}

  transform(style) {
    return this.sanitizer.bypassSecurityTrustHtml(style);
    //return this.sanitizer.bypassSecurityTrustStyle(style);
    // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> a8004fddf4f765992a9e837fbc7e646f51e972f4
