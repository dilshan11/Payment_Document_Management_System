import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { Model } from 'src/app/Model';

@Component({
  selector: 'app-ipa',
  templateUrl: './ipa.component.html',
  styleUrls: ['./ipa.component.css']
})

 
export class IpaComponent implements OnInit {
  check;
  commentText;

  @ViewChild(ContextMenuComponent,{static: true}) public basicMenu: ContextMenuComponent;
  @ViewChild('com',{static:true}) public comment: ElementRef;

  editField: string;
        // header of table
    maintopic=[ 
      {name:'',topic:'IPC No',border:'',color:''},
    {name:'',topic:'status',border:'',color:''},
    {name:'',topic:'MONTH',border:'',color:''},
    {name:'DATE',topic:'SUBMITTED WITHOUT VAT(A)',border:'none',color:''},
    {name:'Amount/Rs',topic:'SUBMITTED WITHOUT VAT(A)',border:'none',color:''},
    {name:'',topic:'IPC to be cerity as per the contract (28days)',border:'',color:''},
    {name:'DATE',topic:'CERTIFIED WITHOUT VAT (B)',border:'none',color:''},
    {name:'AMOUNT',topic:'CERTIFIED WITHOUT VAT (B)',border:'none',color:''},
    {name:'',topic:'payment to be cerity as per the contract (56days)',border:'',color:''},
    {name:'DATE',topic:'RECEIVED WITHOUT VAT ©',border:'none',color:''},
    {name:'AMOUNT',topic:'RECEIVED WITHOUT VAT ©',border:'none',color:''},
    {name:'',topic:'IPC Certify Delay (days)',border:'',color:''},
    {name:'',topic:'Payment Delay (days)',border:'',color:''},
    {name:'(A-B)',topic:'DIFFERENCE',border:'none',color:''},
    {name:'(B-C)',topic:'DIFFERENCE',border:'none',color:''},
    
    {name:'RETENTION',topic:'DUDUCTOIN',border:'none',color:'#FBECF9'},
    {name:'ADVANCE',topic:'DUDUCTOIN',border:'none',color:'#FBECF9'},
    {name:'OTHERS',topic:'DUDUCTOIN',border:'none',color:'#FBECF9'},

    {name:'RETENTION',topic:'BALANCE',border:'none',color:''},
    {name:'ADVANCE',topic:'BALANCE',border:'none',color:''},
     
    {name:'REMARKS',topic:'VALUE',border:'',color:''},
  ];


   
      //content of table

    basecontent= 
    
            [{name:'',value1:'',comment:'',color:''},
            {name:'',value1:{1:'Complete',2:'IPA Submitted(D)',3:'IPC Certify Delay',4:'IPC Certified(G)',5:'Payment delay(I)',6:'Payment Received(J)'},comment:'',color:''},
            {name:'',value1:'',comment:'',color:''},
            {name:'',value1:'',comment:'',color:''},
            {name:'',value1:'',comment:'',color:''},
            {name:'',value1:'',comment:'',color:''},
            {name:'',value1:'',comment:'',color:''},
            {name:'',value1:'',comment:'',color:''},
            {name:'',value1:'',comment:'',color:''},
            {name:'',value1:'',comment:'',color:''},
            {name:'',value1:'',comment:'',color:''},
            {name:'',value1:'',comment:'',color:''},
            {name:'',value1:'',comment:'',color:''},
            {name:'',value1:'',comment:'',color:''},
            {name:'',value1:'',comment:'',color:''},
            {name:'',value1:'',comment:'',color:''},
            {name:'',value1:'',comment:'',color:''},
            {name:'',value1:'',comment:'',color:''},
            {name:'',value1:'',comment:'',color:''},
            {name:'',value1:'',comment:'',color:''},
            {name:'',value1:'',comment:'',color:''},
          ]
          maincontent:any=[];// all content array
      
  constructor() { 
    //make basecontent array name 
    this.make_basecontet();
  }

  ngOnInit() {
     

  }
  //make base content
  make_basecontet(){
    for(let i=0;i<this.maintopic.length;i++){
      this.basecontent[i].name=this.maintopic[i].topic+ this.maintopic[i].name;
   } 
  }

//add row to table
addrow(){
  
  
    
     
 this.maincontent.push(new Array([{name:'',value1:'',comment:'',color:''},
 {name:'',value1:{1:'Complete',2:'IPA Submitted(D)',3:'IPC Certify Delay',4:'IPC Certified(G)',5:'Payment delay(I)',6:'Payment Received(J)'},comment:'',color:''},
 {name:'',value1:'',comment:'',color:''},
 {name:'',value1:'',comment:'',color:''},
 {name:'',value1:'',comment:'',color:''},
 {name:'',value1:'',comment:'',color:''},
 {name:'',value1:'',comment:'',color:''},
 {name:'',value1:'',comment:'',color:''},
 {name:'',value1:'',comment:'',color:''},
 {name:'',value1:'',comment:'',color:''},
 {name:'',value1:'',comment:'',color:''},
 {name:'',value1:'',comment:'',color:''},
 {name:'',value1:'',comment:'',color:''},
 {name:'',value1:'',comment:'',color:''},
 {name:'',value1:'',comment:'',color:''},
 {name:'',value1:'',comment:'',color:''},
 {name:'',value1:'',comment:'',color:''},
 {name:'',value1:'',comment:'',color:''},
 {name:'',value1:'',comment:'',color:''},
 {name:'',value1:'',comment:'',color:''},
 {name:'',value1:'',comment:'',color:''},
])[0]);
  
}

//change maintopic and basecontent when it word change
edit_mantopic(id,event){
   
  this.maintopic[id].topic=event.target.textContent;            //chang maintopic content when value change
  this.make_basecontet();
 
  for(let i=0;i<this.maincontent.length;i++){
      let valueobjectarray=this.maincontent[i];           // change value of maincontent
      valueobjectarray[id].topic=this.maintopic[i].topic+this.maintopic[i].name;
  }
  
}
 
// change maintopic name when it change
edit_mantopic_name(id,event){                           //chang maintopic content when value change
    this.maintopic[id].name=event.target.textContent;
    this.make_basecontet();

    for(let i=0;i<this.maincontent.length;i++){
      let valueobjectarray=this.maincontent[i];           // change value of maincontent
      valueobjectarray[id].topic=this.maintopic[i].topic+this.maintopic[i].name;
  }

}
 // update value when change main content
 
  changeValue(rid,cid,event) {
this.maincontent[rid][cid].value1= event.target.textContent;
 console.log(this.maincontent);
  }

save(){
  console.log(this.maincontent[0][0].value1);
}

  
  addcolumn(event){
    let ab:any={name:'',comment:''};
    // let l=this.content.length;
    // this.topic.splice(event.item.cid,0,'');
  //  for(let i=0;i<l;i++){
  //    this.content2[i].splice(event.item.cid,0,ab);
  //  }
  }

  addcomment(event){
    console.log(event);
  }

  over(a,b,c,event,com){
  //    this.check=event.clientX;
  //   com.style.display="block";
  //  console.log(this.content2[b][a].comment);
  //  if(this.content2[b][a].comment!=''){
  //  this.comment.nativeElement.style.left=event.clientX.toString()+"px";
  //  this.comment.nativeElement.style.top=event.clientY.toString()+"px";
  //   this.commentText=this.content2[b][a].comment;
  //  }else{
  //    this.comment.nativeElement.style.display="none";
  //  }
}

  offtheOverlay(){
    this.comment.nativeElement.style.display="none";
  }
  changeColur(){
    console.log('change colur');
  }

}
