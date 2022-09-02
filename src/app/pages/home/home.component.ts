import { Component, OnInit } from '@angular/core';
import { UserData } from '../../shared/models/dataUser';
import { UsersService } from '../../core/services/users/users.service';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading:boolean = true;
  error:boolean = false;
  dataUser: UserData[] = [];
  filter: any = '';
  typeFilter = '';

  constructor(
    private matDialog: MatDialog,
    private userService: UsersService
  ) { }

  searchForm = new FormGroup({
    nameStudent: new FormControl(''),
    state: new FormControl('')
  })

  ngOnInit(): void {
    this.getUser();
  }
  
  getUser() {
    try {
      this.userService.getUsers('30', 'br').subscribe({
        next: response => this.dataUser = response.results,
        error: (error) => {
          console.log(error);
          this.error = true;
        },
        complete: () => {
          this.loading = false;
        }
      })
    } catch (error) {
      console.log(error);
      
    }
  }

  openModal(userSelected: UserData) {
    const dialogRef = this.matDialog.open(ModalComponent,{
      minWidth: 500,
      data: {
        userData: userSelected
      }
    });
  }

  searchValue(type: string) {
    this.typeFilter = type;
    this.filter = type === 'name' ? this.searchForm.get('nameStudent')!.value : this.searchForm.get('state')!.value;

  }
}
