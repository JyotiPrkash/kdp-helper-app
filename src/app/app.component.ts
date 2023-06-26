import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'kdp-helper';
  
  @ViewChild('canvas') canvas: ElementRef | any;

  @ViewChild('divToConvert', { static: false }) divToConvert!: ElementRef;

  lineOne:any = [];
  lineTwo:any = [];
  logicList:any = ['+','+'];
  pageCount:number = 1;
  minRange:any = 0;
  maxRange:any = 10;
  selectedType: any = 'multiply';
  
  ngOnInit(): void {
    this.logicFunction(0,10);
    console.log(this.lineOne)
    console.log(this.lineTwo)
  }

  generateImg(){
    this.logicFunction(this.minRange,this.maxRange);
  }


  convertToImage() {
    const divElement = this.divToConvert.nativeElement;

    const canvas = document.createElement('canvas');
    canvas.width = divElement.offsetWidth;
    canvas.height = divElement.offsetHeight;

    html2canvas(divElement, { scale: 5 })
      .then((canvas) => {
        const imageDataURL = canvas.toDataURL('image/png');
        this.downloadImage(imageDataURL);
      })
      .catch((error) => {
        console.error('Error converting div to image:', error);
      });
  }

  downloadImage(imageDataURL: string) {
    const link = document.createElement('a');
    link.href = imageDataURL;
    link.download = 'page_'+this.pageCount +'.png';
    link.click();
    
  }



  logicFunction(startNumber:number, endNumber:number){
    //logic to generate random addition and subtraction between 0-9
    this.lineOne = []
    this.lineTwo = []
    
    let countOfQuestions = 60;
    if(this.selectedType == 'addsub'){
      if(startNumber == 0){
        for(let i=0;i<countOfQuestions;i++){
          this.lineOne.push(this.generateRandomIntegerFloor(startNumber, endNumber));
        }
        for(let i=0;i<countOfQuestions;i++){
          this.lineTwo.push(this.generateRandomIntegerFloor(startNumber, endNumber));
        }
      }else{
        for(let i=0;i<countOfQuestions;i++){
          this.lineOne.push(this.generateRandomIntegerFloorAbove10(startNumber, endNumber));
        }
        for(let i=0;i<countOfQuestions;i++){
          this.lineTwo.push(this.generateRandomIntegerFloorAbove10(startNumber, endNumber));
        }
      }
    }else if(this.selectedType == 'multiply'){
      console.log("calling multiply")
      for(let i=0;i<countOfQuestions;i++){
        let counter = Math.floor(Math.random() * (endNumber - startNumber + 1) + startNumber)
        if(counter % 2 == 0){
          console.log("even")
          this.lineOne.push(this.generateRandomIntegerForMultiplication(0, 10));
          this.lineTwo.push(this.generateRandomIntegerForMultiplication(startNumber, endNumber));
        }else{
          console.log("odd")
          this.lineOne.push(this.generateRandomIntegerForMultiplication(startNumber, endNumber));
          this.lineTwo.push(this.generateRandomIntegerForMultiplication(0, 10));
        }
        
      }
      // for(let i=0;i<countOfQuestions;i++){
      //   let counter = Math.floor(Math.random() * (endNumber - startNumber + 1) + startNumber)
      //   if(counter % 2 == 0){
      //     this.lineTwo.push(this.generateRandomIntegerForMultiplication(0, 10));
      //   }else{
      //     this.lineTwo.push(this.generateRandomIntegerForMultiplication(startNumber, endNumber));
      //   }
      // }
    }else{
      console.log("add divide logic");
    }
   
    console.log(this.lineOne)
    console.log(this.lineTwo)
  }

  generateRandomIntegerFloor(min:any, max:any) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  generateRandomIntegerFloorAbove10(min:any, max:any) {
    let delta = max - min
    return  Math.floor(min + Math.random() * delta)
  }

  generateRandomIntegerForMultiplication(min:any, max:any) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  logicSelector(symbol:any, type:any){
    this.selectedType = type;
    this.logicList = symbol;
  }

  addPageCount(){
    this.pageCount = Number(this.pageCount) + 1;
  }

}
