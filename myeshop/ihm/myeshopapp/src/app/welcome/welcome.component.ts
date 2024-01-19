import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MyEshopService } from '../service/my-eshop.service';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Compte } from '../model/compte';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent {
  nom: string = "";
  prenom: string = "";
  adrMail: string = "";
  adr: string = "";
  adrMailLog: string = "";

  comptes: Compte[] = [];

  nameFormControl = new FormControl('', [Validators.required]);
  prenomFormControl = new FormControl('', [Validators.required]);
  mailFormControl = new FormControl('', [Validators.required, Validators.email]);
  adresseFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  mailLogFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordLogFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  public form: FormGroup = new FormGroup({
    nom: this.nameFormControl,
    prenom: this.prenomFormControl,
    adrMail: this.mailFormControl,
    adr: this.adresseFormControl,
    password: this.passwordFormControl
  });

  public formLog: FormGroup = new FormGroup({
    adrMailLog: this.mailLogFormControl,
    passwordLog: this.passwordLogFormControl
  })

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private myEshopService: MyEshopService
  ) { }

  ngOnInit(): void {
    this.myEshopService.getComptes().subscribe(
      (data) => {
        this.comptes = data;
      }
    );
    this.form = this.formBuilder.group({
      nom: this.nameFormControl,
      prenom: this.prenomFormControl,
      adrMail: this.mailFormControl,
      adr: this.adresseFormControl
    });
    this.formLog = this.formBuilder.group({
      adrMailLog: this.mailLogFormControl
    })
  }
    
  creerCompte(){
    if (this.nameFormControl.value != null 
        && this.prenomFormControl.value != null 
        && this.mailFormControl.value != null 
        && this.adresseFormControl.value != null
        && this.passwordFormControl.value != null
      ) {
      const mail : string = this.mailFormControl.value;
      const nom : string = this.nameFormControl.value;
      const prenom : string = this.prenomFormControl.value;
      const adresse : string = this.adresseFormControl.value;
      const password : string = this.adresseFormControl.value;

      if(this.comptes.find(compte => compte.mail == mail) != null){
        this.snackBar.open('Un compte existe déjà avec cette adresse mail', 'Close', {duration: 2000,});
        this.form.reset();
        this.form.setErrors({invalid: true});        
      } else {
        this.myEshopService.creerCompte(nom,prenom,mail,adresse, password).subscribe(
          (id) => {
            localStorage.setItem("user", id)
            this.router.navigate(['/boutique'])
          },
          (error) => {
            this.form.reset();
            this.form.setErrors({invalid: true});
            this.router.navigate(['/']);
          }
        )
      }
    } else {
      console.log("form invalid");
      this.form.reset();
    }
  }

  login(){
    if(this.mailLogFormControl.value != null &&  this.passwordLogFormControl.value != null) {
      const mail : string = this.mailLogFormControl.value;
      const password : string = this.passwordLogFormControl.value;

      this.myEshopService.login(mail, password).subscribe(
        (id) => {
          if(id != null) {
            localStorage.setItem("user", id)
            this.router.navigate(['/boutique'])
          } else {
            this.formLog.reset();
            this.formLog.setErrors({invalid: true});
            this.router.navigate(['']);
          }
        }
      );
      
    }else{
        console.log("form invalid");
        this.formLog.reset();
    }
  }
}
