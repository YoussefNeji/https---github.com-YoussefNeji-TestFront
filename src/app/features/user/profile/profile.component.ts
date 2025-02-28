import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {CountryService} from "../../../services/country.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: any = {};
  apiUrl: string = 'https://localhost:7202/api/Profile/user-info';
  countries: any[] = [];

  constructor(private http: HttpClient ,private countryService: CountryService) {}

  ngOnInit(): void {
    this.getUserProfile();
    const token = localStorage.getItem('token');
    console.log('Token while finding user infos :', token);
    const email = localStorage.getItem('email');
    const username = localStorage.getItem('username');
    console.log('Email while finding user infos :', email);
    console.log('Username while finding user infos :', username);
    
    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.populateForm();
    }, 500);
  }

  getUserProfile(): void {
    const token = localStorage.getItem('token');
    console.log('Token in profile compoonent is :', token);

    
    if (token) {
      this.http.get(this.apiUrl, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).subscribe(
        (data: any) => {
          console.log('Raw API response:', data);
          this.userInfo = data;
          this.populateForm();
        },
        (error) => {
          console.error('Error fetching user profile', error);
        }
      );
    } else {
      console.error('Token is missing!');
    }
  }

  fetchCountries(): void {
    this.countryService.getCountries().subscribe(
      (data) => {
        this.countries = data;
        console.log('Fetched countries:', this.countries);
        this.populateForm(); // Ensure the country dropdown is updated when data arrives
      },
      (error) => {
        console.error('Error fetching countries', error);
      }
    );
  }

  populateForm(): void {
    const { username, email, phone, gender, country,dateOfBirth, address, cin } = this.userInfo;
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Date field:', dateOfBirth);
    console.log('Gender:', gender);
    console.log('Country:', country);
    console.log('Address:', address);
    console.log('CIN:', cin);
  
    (<HTMLInputElement>document.getElementById('username')).value = username;
    (<HTMLInputElement>document.getElementById('email')).value = email;
    (<HTMLInputElement>document.getElementById('phone')).value = phone;
    (<HTMLInputElement>document.getElementById('dateOfBirth')).value = dateOfBirth;
    (<HTMLSelectElement>document.getElementById('gender')).value = gender;
    (<HTMLSelectElement>document.getElementById('country')).value = country;
    (<HTMLInputElement>document.getElementById('address')).value = address;
    (<HTMLInputElement>document.getElementById('cin')).value = cin;

    
    


  }
  
  
  
}
