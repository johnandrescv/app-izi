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
  marker: any;
  conf: any;
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
    const latLng = new google.maps.LatLng(this.ubicacion.lat, this.ubicacion.lng);
    const mapOptions = {
      center: latLng,
      zoom: 15,
      panControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: environment.googleMapsStyles,
    };

    this.getAddressFromCoords(this.ubicacion.lat, this.ubicacion.lng);
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
    });

    this.marker.setIcon('./assets/images/marker.svg');

    google.maps.event.addListener(this.map, 'click', (event: any) => {
      const result = [event.latLng.lat(), event.latLng.lng()];
      this.conf = {
        contador: 0,
        deltaLat: (result[0] - this.ubicacion.lat) / 100,
        deltaLng: (result[1] - this.ubicacion.lng) / 100,
        delay: 10,
      };
      this.moveMarker();
    });
  }

  getAddressFromCoords(lat, lng) {
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(lat, lng, options).then((result: NativeGeocoderResult[]) => {
        this.ubicacion.direccion = '';
        const responseAddress = [];
        for (const [key, value] of Object.entries(result[0])) {
          if ( value.length > 0 ){
            responseAddress.push(value);
          }
        }
        responseAddress.reverse();
        for (const value of responseAddress) {
          this.ubicacion.direccion += value + ', ';
        }
        this.ubicacion.direccion = this.ubicacion.direccion.slice(0, -2);
      })
      .catch((error: any) => {
        console.log(error);
        this.ubicacion.direccion = 'Dirección Personalizada';
      });
  }

  getCoordsFromAddress(dir) {
    this.nativeGeocoder.forwardGeocode(dir).then((result) => {
        console.log(result);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  UpdateSearchResults(){
    if (this.ubicacion.direccion === '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({input: this.ubicacion.direccion, componentRestrictions: {country: 'ec'}, fields: ['geometry']},
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        if (predictions) {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        }
      });
    });
  }

  SelectSearchResult(item) {
    console.log(item);
    this.getCoordsFromAddress(item.description);

    // this.ubicacion = {
    //   direccion: item.description,

    // };
  }

  ClearAutocomplete(){
    this.autocompleteItems = [];
    this.ubicacion.direccion = '';
  }

  moveMarker() {
    this.ubicacion.lat += this.conf.deltaLat;
    this.ubicacion.lng += this.conf.deltaLng;
    const latlng = new google.maps.LatLng(this.ubicacion.lat, this.ubicacion.lng);
    // marker.setTitle("Latitude:"+position[0]+" | Longitude:"+position[1]);
    this.marker.setPosition(latlng);
    if (this.conf.contador !== 100) {
        this.conf.contador++;
        setTimeout( () => this.moveMarker(), 10);
    } else {
      this.getAddressFromCoords(this.ubicacion.lat, this.ubicacion.lng);
    }
  }
}
