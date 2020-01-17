import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
	private toastrService: ToastrService
  ) { }

  error(message: string){
	this.toastrService.error(message, "", {
		positionClass: 'toast-bottom-right'
	});
  }

  success(message: string){
	this.toastrService.success(message, "", {
		positionClass: 'toast-bottom-right'
	});
  }
}
