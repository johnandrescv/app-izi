import { StorageService } from './storage.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ControllersService } from './controllers.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient,
              private storageServ: StorageService,
              private controllersServ: ControllersService) { }

  async login(body: any) {
    await this.controllersServ.showLoading('Validando los datos...');
    return new Promise((resolve) => {
      this.http.put(`${environment.apiUrl}/login`, body).subscribe((data: any) => {
        const user = {...data.respuesta.usuario, apiKey: data.respuesta.token};
        this.storageServ.guardarUsuario(user);
        this.controllersServ.loading.dismiss();
        this.controllersServ.showToast(`Bienvenido, ${user.nombre}`, 1500, 'top', 'success');
        resolve(true);
      },
      (error: any) => {
        this.controllersServ.loading.dismiss();
        this.controllersServ.errorToast(error.error.respuesta);
        resolve(false);
      });
    });
  }

  async checkUbicacion(data: any) {
    await this.controllersServ.showLoading('Verificando ubicación...');
    return new Promise(resolve => {
      this.http.post(`${environment.apiUrl}/pos/verificar`, data).subscribe((response: any) => {
        resolve(true);
        this.controllersServ.loading.dismiss();
      }, (error: any) => {
        this.controllersServ.loading.dismiss();
        this.controllersServ.errorToast(error.error.respuesta);
        resolve(false);
      });
    });
  }

  async getCategorias() {
    await this.controllersServ.showLoading('Cargando categorías...');
    return new Promise(resolve => {
      this.http.get(`${environment.apiUrl}/categorias`).subscribe((response: any) => {
        resolve([true, response.respuesta]);
        this.controllersServ.loading.dismiss();
      }, (error: any) => {
        this.controllersServ.loading.dismiss();
        this.controllersServ.errorToast(error.error.respuesta);
        resolve([false]);
      });
    });
  }

  async getAfiliadosByCategoria(id: any) {
    await this.controllersServ.showLoading('Cargando categorías...');
    return new Promise(resolve => {
      this.http.get(`${environment.apiUrl}/categorias/${id}/sucursales/latitud/${this.storageServ.ubicacion.latitud}/longitud/${this.storageServ.ubicacion.longitud}`).subscribe((response: any) => {
        resolve([true, response.respuesta]);
        this.controllersServ.loading.dismiss();
      }, (error: any) => {
        this.controllersServ.loading.dismiss();
        this.controllersServ.errorToast(error.error.respuesta);
        resolve([false]);
      });
    });
  }

  async getProductosBySucursal(id: any) {
    await this.controllersServ.showLoading('Cargando productos...');
    return new Promise(resolve => {
      this.http.get(`${environment.apiUrl}/sucursales/${id}/productos`).subscribe((response: any) => {
        resolve([true, response.respuesta]);
        this.controllersServ.loading.dismiss();
      }, (error: any) => {
        this.controllersServ.loading.dismiss();
        this.controllersServ.errorToast(error.error.respuesta);
        resolve([false]);
      });
    });
  }

  async getProductosDetailById(id: any) {
    await this.controllersServ.showLoading('Cargando...');
    return new Promise(resolve => {
      this.http.get(`${environment.apiUrl}/productos/${id}`).subscribe((response: any) => {
        resolve([true, response.respuesta]);
        this.controllersServ.loading.dismiss();
      }, (error: any) => {
        this.controllersServ.loading.dismiss();
        this.controllersServ.errorToast(error.error.respuesta);
        resolve([false]);
      });
    });
  }

  async createOrden(data: string) {
    await this.controllersServ.showLoading('Realizando compra...');
    const headers = new HttpHeaders({
      token: this.storageServ.usuario.apiKey
    });
    return new Promise(resolve => {
      this.http.post(`${environment.apiUrl}/orden/create`, data, {headers}).subscribe((response: any) => {
        resolve(true);
      }, (error: any) => {
        this.controllersServ.errorToast(error.error.message);
        resolve(false);
      });
    });
  }

  async createFacturacion(data: string) {
    await this.controllersServ.showLoading('Creando datos de facturación...');
    const headers = new HttpHeaders({
      token: this.storageServ.usuario.apiKey
    });
    return new Promise(resolve => {
      this.http.post(`${environment.apiUrl}/facturacion`, data, {headers}).subscribe((response: any) => {
        resolve(true);
      }, (error: any) => {
        this.controllersServ.errorToast(error.error.message);
        resolve(false);
      });
    });
  }
}
