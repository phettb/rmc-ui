import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RawMaterialServiceService } from '../raw-material-service.service';
import { RawMaterial } from '../raw-material';

@Component({
  selector: 'app-raw-mat',
  templateUrl: './raw-mat.component.html',
  styleUrls: ['./raw-mat.component.css']
})
export class RawMatComponent {
  rawMat!: RawMaterial;

  constructor(private route: ActivatedRoute,private rawMaterialService: RawMaterialServiceService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.rawMaterialService.getRawMatByID(id).subscribe(response => {
        this.getImg(response.imageid)
        this.rawMat = response;
      });

    });

  }  

  checkStatus(status:boolean) {
    if (status) {
      return "Available"
    } else {
      return "Not Available"
    }
  }

  getImg(id: string) {
    this.isImageLoading = true;
    this.rawMaterialService.getImage(id).subscribe(res => {
      this.createImageFromBlobActive(res);
        this.isImageLoading = false;
    });
  }

  imageToShow: any;
  isImageLoading : boolean = true;

  createImageFromBlobActive(image: Blob) {
     let reader = new FileReader();
     reader.addEventListener("load", () => {
        this.imageToShow =reader.result;
     }, false);
  
     if (image) {
        reader.readAsDataURL(image);
     }
  }
}
