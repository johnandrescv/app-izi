import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { environment } from 'src/environments/environment';
declare var google;

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
})
export class UbicacionPage implements OnInit {
  @ViewChild('map',  {static: false}) mapElement: ElementRef;
  map: any;
  ubicacion = { 
    direccion: '',
    lat: 0,
    lng: 0
  };
  autocompleteItems = [];
  GoogleAutocomplete: any;

  constructor(private geolocation: Geolocation,
              private nativeGeocoder: NativeGeocoder,
              public zone: NgZone) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
  }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.ubicacion.lat = resp.coords.latitude;
      this.ubicacion.lng = resp.coords.longitude;
      this.loadMap();
    }).catch((error) => {
      this.loadMap();
    });
  }

  loadMap() {
    let latLng = new google.maps.LatLng(this.ubicacion.lat, this.ubicacion.lng);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        panControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: environment.googleMapsStyles,
      } 
      
      this.getAddressFromCoords(this.ubicacion.lat, this.ubicacion.lng); 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions); 
      this.map.addListener('tilesloaded', () => {
        console.log('accuracy',this.map, this.map.center.lat());
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
        this.ubicacion.lat = this.map.center.lat()
        this.ubicacion.lng = this.map.center.lng()
      }); 
  }

  getAddressFromCoords(lattitude, longitude) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5    
    }; 
    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.ubicacion.direccion = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if ( value.length > 0 )
          responseAddress.push(value); 
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.ubicacion.direccion += value+", ";
        }
        this.ubicacion.direccion = this.ubicacion.direccion.slice(0, -2);
      })
      .catch((error: any) =>{ 
        this.ubicacion.direccion = "Address Not Available!";
      }); 
  }

  UpdateSearchResults(){
    if (this.ubicacion.direccion == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({input: this.ubicacion.direccion, componentRestrictions: {country: 'ec'}},
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

  SelectSearchResult(item) {
    console.log(item);
  }

  ClearAutocomplete(){
    this.autocompleteItems = []
    this.ubicacion.direccion = ''
  }
}
