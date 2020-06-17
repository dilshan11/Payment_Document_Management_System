import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef} from '@angular/core';
import { IpaService } from 'src/app/service/ipa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { FormBuilder } from '@angular/forms';
import * as xlsx from 'xlsx';                   // xlsx for conerting angualr table to excel 


@Component({
  selector: 'app-ipatest',
  templateUrl: './ipatest.component.html',
  styleUrls: ['./ipatest.component.css'],
  

})
export class IpatestComponent implements OnInit {

  uploadProgress: Observable<number>;
  ref: AngularFireStorageReference;
  task: any;
  routeid;
  basecontent=[];      //all the data

  projectTableNew;
  projectSave;
  projectEmail;
  projectExcel;

  projectDetails=this.addfb.group({ 
    contractName:[''],
    contractNumber:[''],
    startDate:[''],
    finishDate:[''],
    contractAmount:[''],
    maximumRetention:[''],
    advance:[''],
    paymentStatus:['']
  
  });

  maintopic=[                                                             //main topic
  {topic:'IPC No',colspan:'1',color:'',hide:''},
  {topic:'validate',colspan:'1',color:'',hide:''},
  {topic:'status',colspan:'1',color:'',hide:''},
  {topic:'MONTH',colspan:'1',color:'',hide:''},

  {topic:'SUBMITTED WITHOUT VAT(A)',colspan:'2',color:'',hide:''},

  {topic:'Ipc to be cerity as per the contract (28days)',colspan:'1',color:'',hide:''},

  {topic:'CERTIFIED WITHOUT VAT (B)',colspan:'2',color:'',hide:''},

  {topic:'payment to be cerity as per the contract (56days)',colspan:'1',color:'',hide:''},

  {topic:'RECEIVED WITHOUT VAT ©',colspan:'2',color:'',hide:''},

  {topic:'IPC Certify Delay (days)',colspan:'1',color:'',hide:''},
  {topic:'Payment Delay (days)',colspan:'1',color:'',hide:''},

  {topic:'DIFFERENCE',colspan:'2',color:'',hide:''},

  {topic:'DUDUCTOIN',colspan:'3',color:'#FBECF9',hide:''},

  {topic:'BALANCE',colspan:'2',color:'',hide:''},
  {topic:'IPA',colspan:'1',color:'',hide:''},
  {topic:'IPC',colspan:'1',color:'',hide:''},
  {topic:'REMARKS',colspan:'1',color:'',hide:''},
];

subtopic=[                                                              // sub topic
  {topic:'',colspan:'1',color:'',hide:'',uptopic:'0'},
  {topic:'',colspan:'1',color:'',hide:'',uptopic:'1'},
  {topic:'',colspan:'1',color:'',hide:'',uptopic:'2'},
  {topic:'',colspan:'1',color:'',hide:'',uptopic:'3'},

  {topic:'DATE',colspan:'1',color:'',hide:'',uptopic:'4'},
  {topic:'AMOUNT/Rs',colspan:'1',color:'',hide:'',uptopic:'4'},
  // {topic:'Delay/Deff (Days)',colspan:'1',color:'',hide:'',uptopic:'3'},
  // {topic:'AMOUNT/Rs',colspan:'1',color:'',hide:'',uptopic:'3'},

  {topic:'',colspan:'1',color:'',hide:'',uptopic:'5'},

  {topic:'DATE',colspan:'1',color:'',hide:'',uptopic:'6'},
  {topic:'AMOUNT/Rs',colspan:'1',color:'',hide:'',uptopic:'6'},
  // {topic:'AMOUNT/Rs',colspan:'1',color:'',hide:'',uptopic:'5'},

  {topic:'',colspan:'1',color:'#FBECF9',hide:'',uptopic:'7'},

  // {topic:'ACTUAL  RECEIVED  DATE',colspan:'1',color:'',hide:'',uptopic:'7'},
  {topic:'DATE',colspan:'1',color:'',hide:'',uptopic:'8'},
  {topic:'AMOUNT/Rs',colspan:'1',color:'',hide:'',uptopic:'8'},

  {topic:'',colspan:'1',color:'',hide:'',uptopic:'9'},
  {topic:'',colspan:'1',color:'',hide:'',uptopic:'10'},

  {topic:'(A-B)',colspan:'1',color:'',hide:'',uptopic:'11'},
  {topic:'(B-C)',colspan:'1',color:'',hide:'',uptopic:'11'},

  {topic:'RETENTION',colspan:'1',color:'',hide:'',uptopic:'12'},
  {topic:'ADVANCE ',colspan:'1',color:'',hide:'',uptopic:'12'},
  {topic:'OTHERS',colspan:'1',color:'',hide:'',uptopic:'12'},

  {topic:'RETENTION',colspan:'1',color:'',hide:'',uptopic:'13'},
  {topic:'ADVANCE ',colspan:'1',color:'',hide:'',uptopic:'13'},

  {topic:'',colspan:'1',color:'',hide:'',uptopic:'14'},
  {topic:'',colspan:'1',color:'',hide:'',uptopic:'15'},

  {topic:'',colspan:'1',color:'',hide:'',uptopic:'16'},
   
]
 total=[
  {name:'',value:'Total',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
  {name:'',value:'',comment:'',color:'',hide:''},
 ]

@ViewChild(ContextMenuComponent,{static: true}) public basicMenu: ContextMenuComponent;       // context munu configuration
a;

// @ViewChild('epltable', { static: false }) epltable: ElementRef;       // this is reference for data table

  constructor(private cd: ChangeDetectorRef,private addfb:FormBuilder,private ipaservice:IpaService,private router:ActivatedRoute,private afStorage: AngularFireStorage) { }


  ngOnInit() {
   
    this.routeid= this.router.snapshot.paramMap.get('id');    // get router id

    this.ipaservice.get_ipa({project:this.routeid})
    .subscribe(data=>{
      console.log(data);
      let a:any=data;
      this.basecontent=a.basecontent;
      this.subtopic=a.subtopic;
      this.maintopic=a.maintopic;
      this.total=a.total;

      this.ipaSubmitted=a.ipaSubmitted,
      this.ipcCrtfyDly=a.ipcCrtfyDly,
      this.ipcCrtfyPayDly=a.ipcCrtfyPayDly,
      this.pRvd=a.pRvd,
      this.complted=a.complted,

   this.projectDetails.setValue({
    contractName:a.contractName,
    contractNumber:a.contractNumber,
    startDate:a.startDate,
    finishDate:a.finishDate,
    contractAmount:a.contractAmount,
    maximumRetention:a.maximumRetention,
    advance:a.advance,
    paymentStatus:a.paymentStatus
   }); 
       
   let c=0;
   for(let onerow of this.basecontent){          // iterate base content to chnage state ipc  delays
       
     if(onerow[12].value>0){
         this.ipcCrtfyDly[c]=true;                  //change ipc certify delay
         this.state_change(c);
       }
       if(onerow[13].value>0){
         this.ipcCrtfyPayDly[c]=true;
         this.state_change(c);                                   // change ipc certify payment delay
       }
       c++;
   }
})

    this.check_UserPermission();

  }
  

  check_UserPermission(){                                                       // this methode make template array true or false by using sessionStorage
    let tempStr=sessionStorage.getItem("permission_projectTable");
       let tempArr=tempStr.split(",");                                          // split tempStr based on , 
      this.projectTableNew=(tempArr[0]=='true');
      this.projectSave=(tempArr[1]=='true');
      this.projectEmail=(tempArr[2]=='true');
      this.projectExcel=(tempArr[3]=='true');
      console.log(tempArr);
  }

  convertToExcel(epitable) {  
    console.log("erytetyery");                                      // this methode convert data table to excel
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(epitable);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
   }

  ipaoripc=21;
  get_ipc_or_ipa(a){
    this.ipaoripc=a;
  }

  rowidrelatedto_rightclick;                           // to get row conrext menu click
  // file uploader attach here

  downloadURL;

  upload(event,clo) {
   
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    
    this.task = this.ref.put(event.target.files[0]);

    this.uploadProgress = this.task.percentageChanges();
   
    this.uploadProgress.subscribe(data=>{           // when presentage 100% close the modal
 
      if(data==100){
          clo.click();   
      }
    });
   
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL();
          this.downloadURL.subscribe(url=>{
              this.basecontent[this.rowidrelatedto_rightclick][this.ipaoripc].name=url;
          this.basecontent[this.rowidrelatedto_rightclick][this.ipaoripc].value="view";
          this.basecontent=this.basecontent.slice();
            if(this.ipaoripc==21){
              this.ipaSubmitted[this.rowidrelatedto_rightclick]=true;
              this.state_change(this.rowidrelatedto_rightclick);
            }
         
          // console.log(this.ipaoripc);
          }) 
      })
   )
  .subscribe()
     
  }

  clientX;
  clientY;

  contextevent;
    // over eevent attached here
  trowover(onecontent,event,comm){                 // when mouse hover methode work
    this.clientX=event.clientX;
    this.clientY=event.clientY;
  }
  deletecomment(event){
      this.basecontent[event.item.rid][event.item.cid].comment="";
  }
  addcomment(event,comm){                           // this is trigger when context menu click
    this.contextevent=event;
    comm.style.display="block";
    comm.style.top=this.clientY+"px";
    comm.style.left=this.clientX-150+"px";

    this.rid=this.contextevent.item.rid;
    this.cid=this.contextevent.item.cid;
  }
  rid;
  cid;
  MyFunc(comm){
    // console.log(this.contextevent);                                     // this function is attached to enter keyup event
    // let rid=this.contextevent.item.rid;
    // let cid=this.contextevent.item.cid;
    this.basecontent[this.rid][this.cid].comment=comm.value;
    comm.style.display="none";
    comm.value="";
    
    
  }

  // add row button is attached here
  addrow(){
     this.basecontent.push(new Array(
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      {name:'',value:'',comment:'',color:'',hide:''},
      
     ));
     this.ipaSubmitted.push(false);                             // all the state arrays are incresed when row goes high
     this.ipcCrtfyDly.push(false);
     this.ipcCrtfyPayDly.push(false);
     this.pRvd.push(false);
     this.complted.push(false);
     
  }
  
  convertdate_to_rightformat(fdate:String){                                //convert data/month/year to year/month/data format
    let count=0;
    let countarr=[];
    let tc=0;
    for(let a of fdate){
      count=count+1;
      if(a=='/'){
        countarr[tc]=count;
        tc=tc+1;
      }  
    }
    let date=fdate.substring(0,countarr[0]-1);
    let month=fdate.substring(countarr[0],countarr[1]-1);
    let year=fdate.substring(countarr[1],fdate.length);
    return year+'/'+month+'/'+date;
  }

  convertdate_to_second_rightformat(fdate:String){                                // convert month/date/year data to data/month/year format
    let count=0;
    let countarr=[];
    let tc=0;
    for(let a of fdate){
      count=count+1;
      if(a=='/'){
        countarr[tc]=count;
        tc=tc+1;
      }  
    }
    let month=fdate.substring(0,countarr[0]-1);
    let date=fdate.substring(countarr[0],countarr[1]-1);
    let year=fdate.substring(countarr[1],fdate.length);
    return date+'/'+month+'/'+year;
  }

  get_date_different_tilltoday(mydate:Date){                          // get some date to till today date day amount
    let today=new Date();
    let difftime=(today.getTime()-mydate.getTime())/(1000*3600*24);   //get date amount
    let diffdays=difftime-difftime%1;                                  // get extract date amount
    return diffdays;
  }

    change_delay_column(rid,cid,mydate){                                   // get delay day amount and upadet the column
      this.basecontent[rid][cid].value=this.get_date_different_tilltoday(mydate);  //call  get_date_different_tilltoday function to update ipc certify delay delay
    }

  changetopic(cid,event){
    this.maintopic[cid].topic=event.target.textContent;                                   //track the changes of maintopic
  }

  changeValue(rid,cid, event,span){                                                       //track the changes of basecontent
    this.basecontent[rid][cid].value=event.target.textContent;
    span.textContent=this.basecontent[rid][cid].value;                                    // it stop being double in span tag
    
    if(cid==4){ 

      if(this.basecontent[rid][cid].value=='')
      { 
        this.basecontent[rid][12].value='';
        this.basecontent[rid][6].value='';

      this.ipcCrtfyDly[rid]=false;            // change ipcCrtyDly state to false
      this.state_change(rid);  

      return
      };                                     // if '' value enterd return         
      let strdate=this.convertdate_to_rightformat(this.basecontent[rid][cid].value);       //convert data year/month/data format
      let mydate=new Date(strdate);                                                       //convert to data object
      let extractdate=Number(this.maintopic[5].topic.match(/(\d+)/)[0]);                  //extract numbers in maintopic
      mydate.setDate(mydate.getDate()+extractdate);                                        //get data after adding days                          
      this.basecontent[rid][6].value=this.convertdate_to_second_rightformat(mydate.toLocaleDateString());                         //convert date/month/year formnat and store canges to basecontent         
        
      this.change_delay_column(rid,12,mydate);                                              // change ipc certify delay column
     
      if(this.basecontent[rid][12].value>0){      // change state to ipc certify delay
        this.ipcCrtfyDly[rid]=true;
        this.state_change(rid);
      }
      else{
        // console.log("value<0");
        this.ipcCrtfyDly[rid]=false;
        this.state_change(rid);
      }
      // this.basecontent=this.basecontent.slice();  //to force change detection 
    }
    
    if(cid==5){                                                                           // update total array submitted amount
      this.total[5].value='';
      for(let onerow of this.basecontent){
        if(onerow[5].value!=''){
        this.total[5].value=String(Number(this.total[5].value)+Number(onerow[5].value));
        }
      }
    }
    if(cid==8){                                                                                  // update total array certified amount
      this.total[8].value='';
      for(let onerow of this.basecontent){
        if(onerow[8].value!=''){
        this.total[8].value=String(Number(this.total[8].value)+Number(onerow[8].value));
        }
      }
    }

    if(cid==7){     
      if(this.basecontent[rid][cid].value=='')
      { this.basecontent[rid][13].value='';
        this.basecontent[rid][9].value='';

      this.ipcCrtfyPayDly[rid]=false;            // change ipcCrtyDly state to false
      this.state_change(rid);  

      return
      };                                     // if '' value enterd return       
      let strdate=this.convertdate_to_rightformat(this.basecontent[rid][cid].value);       //convert data year/month/data format
      let mydate=new Date(strdate);                                                       //convert to data object
      let extractdate=Number(this.maintopic[7].topic.match(/(\d+)/)[0]);                  //extract numbers in maintopic
      mydate.setDate(mydate.getDate()+extractdate);                                        //get data after adding days                          
      this.basecontent[rid][9].value=this.convertdate_to_second_rightformat(mydate.toLocaleDateString());                         //convert date/month/year formnat and store canges to basecontent         
      this.change_delay_column(rid,13,mydate); 
       
      if(this.basecontent[rid][13].value>0){      //change state to ipc certified payment delay
        this.ipcCrtfyPayDly[rid]=true;
        this.state_change(rid);
      }
      else{
        // console.log("value<0");
        this.ipcCrtfyPayDly[rid]=false;
        this.state_change(rid);
      }                                             
    }

    if(cid==1){
      if(this.basecontent[rid][1].value.toLowerCase()=='yes'){
        this.state_change(rid);
      }
    }

    if(cid==11){
      if(this.basecontent[rid][11].value>0){
        this.pRvd[rid]=true;                        // change state to paymentrecived
        this.state_change(rid);
      }else{
         this.pRvd[rid]=false;                      // if value is lower then payment recive set to false
         this.state_change(rid);
      }

      this.total[11].value='';                            // update total array with recived without vat
      for(let onerow of this.basecontent){
        if(onerow[11].value!=''){
        this.total[11].value=String(Number(this.total[11].value)+Number(onerow[11].value));
        }
      }

    }
    if(cid==5 || cid==8){                                                                   // update A-B column
       this.basecontent[rid][14].value =this.basecontent[rid][5].value-this.basecontent[rid][8].value;
      
      //  console.log(this.basecontent[rid][14].value);
    }
    if(cid==8 || cid==11){
      this.basecontent[rid][15].value=this.basecontent[rid][8].value-this.basecontent[rid][11].value;

      this.total[15].value='';                            // update total array with B-c 
      for(let onerow of this.basecontent){
        if(onerow[15].value!=''){
        this.total[15].value=String(Number(this.total[15].value)+Number(onerow[15].value));
        }
      }


      if(this.basecontent[rid][8].value>0 && this.basecontent[rid][15].value==0){             // triger state_change methode and update completed state if B-c=0 and b>0
          this.complted[rid]=true;
          this.state_change(rid);
      }
      else{
        this.complted[rid]=false;
          this.state_change(rid);
      }
    }

    

  }
   

  row_click(rid,cid,comm){                                                              // open link attch to click in row
    if(cid==21){      
      if(this.basecontent[rid][21].value=="view")
      window.open(this.basecontent[rid][cid].name); 
      // console.log(this.basecontent[rid][cid.name]);
      return;                                        // open ipc in another tab 
     }
     if(cid==22){
       if(this.basecontent[rid][22].value=="view")
       window.open(this.basecontent[rid][cid].name);
       return;
      }
      
      if(this.basecontent[rid][cid].comment!=''){

      comm.style.top=this.clientY+"px";
      comm.style.left=this.clientX-150+"px";
      comm.value=this.basecontent[rid][cid].comment;
      comm.style.display="block";
      this.rid=rid;
      this.cid=cid;
      }
  }

  Edit_details(b){
    b.click();
  }


  // save data to databse(save button is attached)
    save(){
      let a={base:this.basecontent,
              project:this.routeid,
              subtopic:this.subtopic,
              maintopic:this.maintopic,
              projectDetails:this.projectDetails.value,       
              total:this.total,

              ipaSubmitted:this.ipaSubmitted,
              ipcCrtfyDly:this.ipcCrtfyDly,
              ipcCrtfyPayDly:this.ipcCrtfyPayDly,
              pRvd:this.pRvd,
              complted:this.complted,
            }
      
      this.ipaservice.save_ipa(a)
      .subscribe(data=>{
        
        let a:any=data;
        this.basecontent=a.basecontent;
        this.subtopic=a.subtopic;
        this.maintopic=a.maintopic;
     
        this.ipaSubmitted=a.ipaSubmitted,
        this.ipcCrtfyDly=a.ipcCrtfyDly,
        this.ipcCrtfyPayDly=a.ipcCrtfyPayDly,
        this.pRvd=a.pRvd,
        this.complted=a.complted,

     this.projectDetails.setValue({
      contractName:a.contractName,
      contractNumber:a.contractNumber,
      startDate:a.startDate,
      finishDate:a.finishDate,
      contractAmount:a.contractAmount,
      maximumRetention:a.maximumRetention,
      advance:a.advance,
      paymentStatus:a.paymentStatus
    
     });


      });
    }
    //delete ro function is attached here
    delete_row(event){
      this.basecontent = this.basecontent.slice(0, event.item.rid).concat(this.basecontent.slice(event.item.rid + 1, this.basecontent.length))
     
      this.ipaSubmitted.splice(event.item.rid,1);              //remove array element from places            
     this.ipcCrtfyDly.splice(event.item.rid,1); 
     this.ipcCrtfyPayDly.splice(event.item.rid,1); 
     this.pRvd.splice(event.item.rid,1); 
     this.complted.splice(event.item.rid,1); 

     
    }

    // hide column function 
    hide_column( event){
      for(let onearr of this.basecontent){
          onearr[event.item.cid].hide='none';                     // frist get maincontent and set to none;
      }
      this.subtopic[event.item.cid].hide='none';                  // secondly get subtopic and set to none
      this.total[event.item.cid].hide='none';
      let topic_num= Number(this.subtopic[event.item.cid].uptopic);
      let to_colspan=Number(this.maintopic[topic_num].colspan);

      if( to_colspan > 1){
         
        to_colspan=to_colspan-1;
       this.maintopic[topic_num].colspan=String(to_colspan);      // maintopic column is hided
         
      }else{
       
            this.maintopic[topic_num].hide='none'; 
       
      }
      
    }


    // file attch modal open
    attach_ipaipc(event,attach,pro){
      pro.style.width=0;
      this.rowidrelatedto_rightclick=event.item.rid;
      attach.click();
    }
                                                                // dlete ipa attached t0 sub menu
    Delete_Ipa(event){
      this.basecontent[event.item.rid][21].value='';
      this.ipaSubmitted[event.item.rid]=false;                                  // change state if ipaSubmitted to false 
      this.state_change(event.item.rid);
    }
    //delete ipc  attached t0 sub menu
    Delete_Ipc(event){
      this.basecontent[event.item.rid][22].value='';
      // console.log(event)
    }
    //delete check  attached t0 sub menu
    Delete_check(event){
      // console.log(event);
    }

    // state changes function and varibles
    ipaSubmitted=[];
    ipcCrtfyDly=[];
    ipcCrtfyPayDly=[];
    pRvd=[];
    complted=[];
    temp; 
                              //refrencevarible for change detect
    state_change(rid){  // methode to call change state
          
      this.temp=[1,2];
     if(this.basecontent[rid][1].value.toLowerCase()=='yes'){
      
      

      if(this.complted[rid] && this.pRvd[rid] &&  this.ipaSubmitted[rid]){
         this.basecontent[rid][2].value="completed";
         this.change_colorof_Row(rid,'#A7F51E');
        //  console.log("completed");
       }
       else if(this.pRvd[rid] &&  this.ipaSubmitted[rid]){
         this.basecontent[rid][2].value="Partial Payment received";
         this.change_colorof_Row(rid,'#F3D795');

       }
       else if(this.ipcCrtfyPayDly[rid]  && this.ipaSubmitted[rid]){
        this.basecontent[rid][2].value="payemnt delay";
        this.change_colorof_Row(rid,'#F3C0F3');
      }
      else if(this.ipcCrtfyDly[rid] && this.ipaSubmitted[rid]){
        this.basecontent[rid][2].value="IPC certified delay";
        this.change_colorof_Row(rid,'#C0F3E5');
      }
     
       else if(this.ipaSubmitted[rid]){
       // this.basecontent=Object.assign([],this.basecontent);
        this.basecontent[rid][2].value="IPA Submitted";
        this.change_colorof_Row(rid,'#FFC300');
        this.save();
      }
      else{
        this.basecontent[rid][2].value='';
        this.change_colorof_Row(rid,'');
       
      }
     
    //  console.log("message"+this.basecontent[rid][2].value);
    }
    
  //  this.basecontent=this.basecontent.slice();
   this.basecontent = JSON.parse(JSON.stringify(this.basecontent));

  
  }

  change_colorof_Row(rid,color){                                // change colur of row mwthode use in state change methode
       
      for(let i=0;i<this.basecontent[rid].length;i++){
        this.basecontent[rid][i].color=color;
      }
      // console.log(this.basecontent[rid]);
  }
  
}
