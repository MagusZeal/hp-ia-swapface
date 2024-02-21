import { AfterViewInit, Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnDestroy, HostListener, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, Observable, Subscription} from 'rxjs';
import { WebcamInitError, WebcamUtil, WebcamModule} from 'ngx-webcam';
import { FormsModule } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { SwapfaceService } from './service/swapface.service';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import uuid from 'uuid-random';
import {VgApiService} from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgStreamingModule } from '@videogular/ngx-videogular/streaming';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
@Component({
  selector: 'app-root',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    RouterOutlet,
    WebcamModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule,
    MatGridListModule,
    MatCardModule,
    MatToolbarModule
  ],
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss'
  ],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('videoPlayer') videoPlayer?: ElementRef;
  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
  constructor (private swapfaceService: SwapfaceService, private api: VgApiService, @Inject(DOCUMENT) private document: Document){
    this.setTimeout();
    this.userInactive.subscribe(() => this.clear());
    this.document.addEventListener('contextmenu', (event) =>
    event.preventDefault()
  );
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 600000);
  }

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: any;
  public video:any;
  public videoOptions: MediaTrackConstraints = {
    width: 1024,
    height: 700,
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage:any;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  preload: string = 'auto';
  public state = -2;
  public loading = false;
  public number = '';
  public numberAlert = false;
  public subscription: Subscription;
  userActivity:any;
  userInactive: Subject<any> = new Subject();


  public async ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  public async ngOnInit() {

    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;

    this.api.getDefaultMedia().subscriptions.ended.subscribe(
        () => {
            // Set the video to the beginning
            this.api.getDefaultMedia().currentTime = 0;
        }
    );
}

toggleVideo(){
  const videox = HTMLVideoElement = this.videoPlayer?.nativeElement;
  videox.paused ? videox.play(): videox.pause();
}

  public triggerSnapshot(): void {
    this.state = 0;
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: any): void {
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
  ngAfterViewInit() {
  }

  start() {
    this.state = -1;
  }

  repeatSnapshot(){
    this.state = -1;
    this.webcamImage = null;
  }
  pickImage(){
    this.state = 1;
  }

  completePhone(){
    if(this.number.length === 8) {
      this.state = 3;
    } else {
      this.numberAlert = true;
    }
  }

  callSwapface(target:any){
    this.state = 4;
    this.loading = true;

    let hasPhone = false;
    let valueSend = this.number.length < 8? uuid(): this.number;
    if (this.number.length < 8) {
      valueSend = uuid();
    } else {
      valueSend = this.number;
      hasPhone = true;
    }
    const obj = {
      face: this.webcamImage,
      phone: valueSend,
      target,
      hasPhone,
    }

    this.subscription = this.swapfaceService._post(obj).subscribe((response)=>{
      if(response !== -1) {
        this.state = 5;
        this.video = response;
        this.loading = false;
    } else {
        this.state = 9;
        this.loading = false;
    }
    }, err =>{
      this.state = 9;
      this.loading = false;
    });
  }

  digitar(numero:any =  null){
    if (!numero) {
      this.number = (this.number == '') ? this.number : this.number.replace(/.$/, "");
      return;
    }
    if(this.number.length === 8 ){
      this.numberAlert = false;
      return;
    } else {
      this.numberAlert = false;
      this.number = this.number + numero;
    }
  }

  clear(){
    this.loading = false;
    this.state = -2;
    this.webcamImage = null;
    this.number ='';
    this.video = null;
    this.numberAlert = false;
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
