import { Component } from '@angular/core';
import { RawMaterialServiceService } from '../raw-material-service.service';
import { RawMaterial } from '../raw-material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  rawMatListActive: RawMaterial[] = [];
  rawMatListNonActive: RawMaterial[] = [];

  constructor(private rawMaterialService: RawMaterialServiceService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.rawMaterialService.getRawMaterialList().subscribe(async res => {
      console.log(res);
      this.rawMatListActive.splice(0);
      this.rawMatListNonActive.splice(0);
      for (const entry of res) {
        if (entry.status === true) {
          await this.getImgActive(entry.imageid);
          this.rawMatListActive.push(entry);
        } else {
          await this.getImgNonActive(entry.imageid);
          this.rawMatListNonActive.push(entry);
        }
      }
    });
  }

  delete(id: string,imageid: string) {
    if (confirm("Do you want delete") == true) {
        this.rawMaterialService.delImage(imageid).subscribe(res => {
            console.log(res);
        });
        this.rawMaterialService.deleteRawMat(id).subscribe(res => {
          window.alert('Delete Complete');
          window.location.reload();
        }); 
    } else {
        
    }
  }

  getImgActive(id: string) {
    this.isImageLoading = true;
    this.rawMaterialService.getImage(id).subscribe(res => {
      this.createImageFromBlobActive(res);
        this.isImageLoading = false;
    });
  }

  getImgNonActive(id: string) {
    this.isImageLoading = true;
    this.rawMaterialService.getImage(id).subscribe(res => {
      this.createImageFromBlobNonActive(res);
        this.isImageLoading = false;
    });
  }

  imageActiveToShow: any[] = [];
  imageNonActiveToShow: any[] = [];
  isImageLoading : boolean = true;

  createImageFromBlobActive(image: Blob) {
     let reader = new FileReader();
     reader.addEventListener("load", () => {
        this.imageActiveToShow.push(reader.result);
     }, false);
  
     if (image) {
        reader.readAsDataURL(image);
     }
  }

  createImageFromBlobNonActive(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageNonActiveToShow.push(reader.result);
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }

}
