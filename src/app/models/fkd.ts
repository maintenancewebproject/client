<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" style="color:rgb(241, 60, 60);">User Manager</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor02">
       <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
             <a class="nav-link" (click)="onOpenModal(null, 'add')">Add User <span class="sr-only">(current)</span></a>
          </li>
       </ul>
       <form class="form-inline my-2 my-lg-0">
          <input type="search" (ngModelChange)="searchUsers(key.value)" #key="ngModel" ngModel
           name="key" id="searchName" class="form-control mr-sm-2" placeholder="Search users..." required>
       </form>
    </div>
  </nav>
  <div class="container" id="main-container">
  <div class="row">
    <div *ngFor="let user of users" class="col-md-6 col-xl-3">
       <div class="card m-b-30">
          <div class="card-body row">
             
             <div class="col-6 card-title align-self-center mb-0">
                <h5>{{user?.firstName}} {{user?.lastName}}</h5>
                <p class="m-0" *NgIf="user">{{user.role.description}}</p>
             </div>
          </div>
          <ul class="list-group list-group-flush">
             <li class="list-group-item"><i class="fa fa-envelope float-right"></i>{{user?.email}}</li>
          </ul>
          <div class="card-body">
             <div class="float-right btn-group btn-group-sm">
                <a (click)="onOpenModal(user, 'edit')" class="btn btn-primary tooltips" data-placement="top" data-original-title="Edit"><i class="fa fa-pencil"></i> </a>
                <a (click)="onOpenModal(user, 'delete')" class="btn btn-secondary tooltips" data-placement="top" data-original-title="Delete"><i class="fa fa-times"></i></a>
             </div>
          </div>
       </div>
    </div>
  </div>
  
  <!-- Add User Modal -->
  <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="addUserModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
         <div class="modal-header">
            <h5 class="modal-title" id="addUserModalLabel">Add User</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <div class="modal-body">
            <form #addForm="ngForm" (ngSubmit)="onAddUser(addForm)">
            <div class="form-group">
               <label for="firstName">firstName</label>
               <input type="text" ngModel name="firstName" class="form-control" id="firstName" placeholder="firstName" required>
            </div>
            <div class="form-group">
                <label for="lastName">lastName</label>
                <input type="text" ngModel name="lastName" class="form-control" id="lastName" placeholder="lastName" required>
             </div>

            <div class="form-group">
               <label for="email">Email Address</label>
               <input type="email" ngModel name="email" class="form-control" id="email" placeholder="Email" required>
            </div>
            <div class="form-group">
                <mat-form-field  appearance="fill">
                    <mat-label>Role</mat-label>
                    <mat-select>
                      <mat-option *ngFor="let role of roles" [value]="role.description" [formControl]="roleSelector">
                      </mat-option>
                    </mat-select>
                  </mat-form-field>
                  </div>    
            <div class="modal-footer">
               <button type="button" id="add-user-form" class="btn btn-secondary" data-dismiss="modal">Close</button>
               <button [disabled]="addForm.invalid" type="submit" class="btn btn-primary" >Save changes</button>
            </div>
            </form>
         </div>
      </div>
    </div>
    </div>
  
  <!-- Edit Modal -->
  <div class="modal fade" id="updateUserModal" tabindex="-1" role="dialog" aria-labelledby="userEditModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
       <div class="modal-content">
          <div class="modal-header">
             <h5 class="modal-title" id="updateUserModalLabel">Edit User {{editUser?.lastName}} {{editUser?.firstName}}</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
             <span aria-hidden="true">&times;</span>
             </button>
          </div>
          <div class="modal-body">
             <form #editForm="ngForm">
                <div class="form-group">
                   <label for="firstName">firstName</label>
                   <input type="text" ngModel="{{editUser?.firstName}}" name="firstName" class="form-control" id="firstName" aria-describedby="emailHelp" placeholder="firstName">
                </div>

                <div class="form-group">
                    <label for="lastName">lastName</label>
                    <input type="text" ngModel="{{editUser?.lastName}}" name="lastName" class="form-control" id="lastName" aria-describedby="emailHelp" placeholder="lastName">
                 </div>
                <div class="form-group">
                   <label for="email">Email Address</label>
                   <input type="email" ngModel="{{editUser?.email}}" name="email" class="form-control" id="email" placeholder="Email">
                </div>
                <div class="form-group">
                    <mat-form-field  appearance="fill">
                        <mat-label>Role</mat-label>
                        <mat-select>
                          <mat-option *ngFor="let role of roles" [value]="role.description" [formControl]="roleSelector">
                          </mat-option>
                        </mat-select>
                      </mat-form-field>
                      </div>   
                <div class="modal-footer">
                   <button type="button" id="" data-dismiss="modal" class="btn btn-secondary">Close</button>
                   <button (click)="onUpdateUser(editForm.value)" data-dismiss="modal" class="btn btn-primary" >Save changes</button>
                </div>
             </form>
          </div>
       </div>
    </div>
  </div>
  
  <!-- Delete Modal -->
  <div class="modal fade" id="deleteUserModal" tabindex="-1" role="dialog" aria-labelledby="deleteModelLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
       <div class="modal-content">
          <div class="modal-header">
             <h5 class="modal-title" id="deleteModelLabel">Delete User</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
             <span aria-hidden="true">&times;</span>
             </button>
          </div>
          <div class="modal-body">
             <p>Are you sure you want to delete user {{deleteUser?.lastName}} {{deleteUser?.firstName}}?</p>
             <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                <button (click)="onDeleteUser(deleteUser?.id)" class="btn btn-danger" data-dismiss="modal">Yes</button>
             </div>
          </div>
       </div>
    </div>
  </div>
  </div>
  
  <!-- Notification for no users -->
  <div *ngIf="users?.length == 0" class="col-lg-12 col-md-12 col-xl-12">
  <div class="alert alert-info" role="alert">
    <h4 class="alert-heading">No USERS </h4>
    <p>No Users were found.</p>
  </div>
  </div>