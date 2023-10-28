import { Component } from '@angular/core';
import { RawMaterial, detail } from '../raw-material';
import { RawMaterialServiceService } from '../raw-material-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-raw-form',
  templateUrl: './raw-form.component.html',
  styleUrls: ['./raw-form.component.css']
})
export class RawFormComponent {

  types = ['Wood', 'Top Desk', 'Cloth'];

  details: detail[] = [];

  rawMat: RawMaterial = {'id':'','rawmatid': '', 'name':'','type':'','status': true,'detail':this.details,'imageid':'','created_time':new Date().toLocaleString(),'updated_time':new Date().toLocaleString()};

  edited: boolean = false;

  selectedImage: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;

  constructor(private router: Router,private route: ActivatedRoute,private rawMaterialService: RawMaterialServiceService,private http: HttpClient) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id !== '' && id != null) {
        this.rawMaterialService.getRawMatByID(id).subscribe(response => {
          this.rawMat = response;
          this.getImg(response.imageid)
          this.edited = true;
        });
      }
    });

  } 

  addDetail() {
    let d: detail = {'key':'','value':''};
    this.rawMat.detail.push(d);
  }

  removeDetail() {
    this.rawMat.detail.pop();
  }

  async create() {
    this.rawMaterialService.createRawMat(this.rawMat).subscribe(res => {
      alert("Save Success!!")
      this.router.navigate(['']);
    });
  }  

  update() {
    this.rawMat.updated_time = new Date().toLocaleString();
    this.rawMaterialService.updateRawMat(this.rawMat).subscribe(res => {
      alert("Update Success!!")
      this.router.navigate(['']);
    });
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = (inputElement.files as FileList)[0];
 
    if (file) {
      this.selectedImage = file;
      this.previewImage(file);
    }
  }
 
  previewImage(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
 
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
  }

   onUpload(): void {
    if (!this.edited) {
        if (!this.selectedImage) {
          console.log('Please select an image before uploading.');
          return;
        }
    
        const formData = new FormData();
        formData.append('image', this.selectedImage);
    
        this.http.post<any>('http://localhost:8080/api/image', formData).subscribe(
          response => {
            this.rawMat.imageid = response.image.id;
            console.log(response.image.id);
          },
        );
    } else {
        this.rawMaterialService.delImage(this.rawMat.imageid).subscribe(res => {
            console.log(res);
        });

        if (!this.selectedImage) {
            console.log('Please select an image before uploading.');
            return;
          }
      
          const formData = new FormData();
          formData.append('image', this.selectedImage);
      
          this.http.post<any>('http://localhost:8080/api/image', formData).subscribe(
            response => {
              this.rawMat.imageid = response.image.id;
              console.log(response.image.id);
            },
          );        
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
