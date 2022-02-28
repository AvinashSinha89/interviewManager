import { Component, OnInit } from "@angular/core";
import { UploadService } from "app/shared/services/upload.service";

@Component({
  selector: "app-upload-inventory",
  templateUrl: "./upload-inventory.component.html",
  styleUrls: ["./upload-inventory.component.scss"],
})
export class UploadInventoryComponent {
  file: File = null;
  constructor(private inventoryService: UploadService) {}

  onFilechange(event: any) {
    this.file = event.target.files[0];
  }

  uploadInventory() {
    if (this.file) {
      this.inventoryService.uploadInventoryFile(this.file).subscribe((resp) => {
        alert("Inventory Uploaded");
      });
    } else {
      alert("Please select a file first");
    }
  }
}
