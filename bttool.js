
var ville=["أريانة","القصرين","القیروان","الكاف","المنستیر","المھدیة","باجة","بنزرت","بن عروس","تطاوین","توزر","تونس","جندوبة","زغوان","سلیانة","سوسة","سیدي بوزید","صفاقس","قابس","قبلي","قفصة","مدنین","منوبة","نابل"]
var productible=[1606.9,1673.84,1651.68,1584.49,1670.84,1656.01,1535.77,1578.45,1597.6,
                1825.05,1781.67,1597.29,1542.66,1560.03,1579.58,1678.99,1711.59,1715.67,
                1809.46,1821.94,1798.31,1794.29,1597.07,1606.87]

var annuite=[682.506,1267.512,1462.512,1950.012]
var montantCredit=[3500,6500,7500,10000]
var limPcredit=[2,3,4]
var prodChoisi = 0;
var creditPPui=0;
var annuiteDef=0;

// redevance de puissance par kW
const redP=0.7;
//prix du kWh par tranches
tranchesP=[0.176,0.218,0.341,0.414];
//limites des la consommation par tranches
const tranchesL=[200,100,200];


//limites des puissances pour la définition des prix du kWc
limP=[1,1.5,2.5,4,5];
//limites des prix  selon les puissances
limC=[5000,3800,3450,3200,3000];
//puissance limite pour la subvention faible conso
limPLowSub=1.5;
//subvention pour la subvention faible conso
limCLowSub=1500;
// subention par kWc pour les autres tranches
subkWc=500;
//plafond sub
 plafondsub=3000;
//augemntation tarif steg
augTarif=0.05;


function nonResidentiel(){
  plusSlides(1);
  plafondsub=5000;
  tranchesP=[0.195,0.240,0.333,0.391];
  $( "#creditButton1" ).css( "display", "none" );
  $( "#creditButton2" ).css( "display", "none" );
}

function Residentiel(){
  plusSlides(1);
  plafondsub=3000;
  tranchesP=[0.176,0.218,0.341,0.414];
  $( "#creditButton1" ).css( "display", "block" );
  $( "#creditButton2" ).css( "display", "block" );
}


function reload(){
  location.reload();
}
/*function gouvFunction(sel) {
  console.log(sel.options[sel.selectedIndex].text);
  $("#municipalité").empty()
  for (let i = 0; i < ville.length; i++) {
    if ( ville[i]== sel.options[sel.selectedIndex].text)
      for (let j = 0; j < municipalite[i].length; j++) {
      $('#municipalité').append($('<option>', {
          
          text: municipalite[i][j]
      }));
     
    }
  }
  
}
/*Text slide code*/ 
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
  console.log(slideIndex);
  
}

function creditSlides() {
  showSlides(slideIndex += 1);
  $( ".prev" ).css( "display", "none" );
  creditFunction();
  ppCredit=ppCreditCalc(invest,subvention,invoice,creditPPui,annuiteDef);
  $('#fPropre').html(Math.round((invest-subvention-creditPPui)/1)*1);
  $('#creditVal').html(creditPPui);
  $('#invest1').html(Math.round(invest*1)/1);  
  $('#subvention1').html(Math.round(subvention*1)/1);  
  $('#ppcredit').html(Math.round(ppCredit*1)/1);  
  $('#annuite').html(Math.round(annuiteDef*1)/1);  
}

function newPowerSlides() {
  showSlides(slideIndex -= 3);
  console.log(slideIndex);
  
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  
  slides[slideIndex-1].style.display = "block";  
  if (slideIndex==1 || slideIndex==6 || slideIndex==7){
    $( ".prev" ).css( "display", "none" );
  }else{
    $( ".prev" ).css( "display", "block" );
  }
  if (slideIndex==4 || slideIndex==5 || slideIndex==6 || slideIndex==7 || slideIndex==8 || slideIndex==1 || slideIndex==9){
    $( ".next" ).css( "display", "none" );
  }else{
    $( ".next" ).css( "display", "block" );
  }
  
}

/*********************/
function deletefacture (){

  $( "#facture" ).val("");
  
} 

function deletekwh (){
  $( "#kwh" ).val("");

  
}
/****code de conversion montant de facture à puissance PV******/





$("input").change(function(){
  var facture = $('#facture').val();
  const puissance = 0;
  //facture sans redevance de puissance
  var factSRed=facture-(puissance*redP*12);
  console.log(tranchesP);
  console.log(plafondsub);
  Energie=0;

  if ( factSRed < tranchesP[0]*tranchesL[0]*12) {

    Energie=factSRed/tranchesP[0];

  }else if(factSRed < ((tranchesP[0]*tranchesL[0]*12)+(tranchesP[1]*tranchesL[1]*12))) {

    Energie= 12*tranchesL[0] + ((factSRed- (tranchesP[0]*tranchesL[0]*12))/(tranchesP[1]));

  }else if(factSRed < ((tranchesP[0]*tranchesL[0]*12)+(tranchesP[1]*tranchesL[1]*12)+(tranchesP[2]*tranchesL[2]*12))) {

    Energie= 12*(tranchesL[0]+tranchesL[1]) + ((factSRed- (tranchesP[0]*tranchesL[0]*12)-(tranchesP[1]*tranchesL[1]*12))/(tranchesP[2]));

  }else{

    Energie= 12*(tranchesL[0]+tranchesL[1]+tranchesL[2]) + ((factSRed- (tranchesP[0]*tranchesL[0]*12)-(tranchesP[1]*tranchesL[1]*12)-(tranchesP[2]*tranchesL[2]*12))/(tranchesP[3]));

  }

  if($("#kwh").val() !== null && $("#kwh").val() !== '') {
    Energie=$("#kwh").val();
  }
  console.log("Energie");
console.log(Energie);
  prodFunction();

  if(puiPV<0.5){
   
    $( "#lowPowerMes1" ).css( "display", "block" );
  }else{
    
    $( "#lowPowerMes1" ).css( "display", "none" );
  }$

  if (Energie<1800){
    $( "#creditButton1" ).css( "display", "none" );
  }else{
    $( "#creditButton1" ).css( "display", "block" );
  }
});



var cashflowCum1=[];
var cashflowCum2=[];

function investCalc(puiPV){

  if (puiPV<limP[0]){
    invest=(puiPV*limCLowSub)+3500;
    
  }else if (limP[0]<=puiPV && puiPV<limP[1]){
    invest=puiPV*limC[0];
    
  }else if (limP[1]<=puiPV && puiPV<limP[2]){
    invest=puiPV*limC[1];
    
  }else if (limP[2]<=puiPV && puiPV<limP[3]){
    invest=puiPV*limC[2];
    
  }else if (limP[3]<=puiPV && puiPV<limP[4]){
    invest=puiPV*limC[3];
    
  }else {
    invest=puiPV*limC[4];
    
  }
  return invest;
}

function subvCalc(puiPV){
  if (puiPV<=limPLowSub){
    subvention=puiPV*limCLowSub;
    
  }else {
    subvention=puiPV*subkWc;
  }

  if (subvention>plafondsub){
    subvention=plafondsub;
  }
  return subvention;
}

function ppCalc(invest1,subvention1,invoice1){
  
  cashflowCum1[0]=-invest1+subvention1+invoice1;
  for (let i = 1; i < 25; i++){
    cashflowCum1[i]=cashflowCum1[i-1]+(invoice1/(Math.pow(1+augTarif, -i)));
    
  }
  let pp1 = 0;
  let i = 0;

  do {
  i = i + 1;
  pp1 = pp1 + 1;
  } while (cashflowCum1[i] < 0);

  console.log(cashflowCum1);
return pp1;
}


function ppCreditCalc(invest2,subvention2,invoice2,credit2,annuite2){
  
  cashflowCum2[0]=-invest2+subvention2+invoice2+credit2-annuite2;
  for (let i = 1; i < 25; i++){
    cashflowCum2[i]=cashflowCum2[i-1]+(invoice2/(Math.pow(1+augTarif, -i)));
    
  }
  for (let i = 1; i < 7; i++){
    cashflowCum2[i]=cashflowCum2[i]-annuite2;
    
  }
  let pp2 = 0;
  let i = 0;

  do {
  i = i + 1;
  pp2 = pp2 + 1;
  } while (cashflowCum2[i] < 0);

  console.log(cashflowCum2);
return pp2;
}



function invoiceCalc(x){
  if (x<=tranchesL[0]*12){
    y=tranchesP[0]*x;
  }
  else if (x<=tranchesL[1]*12+tranchesL[0]*12 && x>tranchesL[0]*12){
    y=tranchesP[0]*tranchesL[0]*12+tranchesP[1]*(x-tranchesL[0]*12);
  }
  else if (x<=tranchesL[2]*12+tranchesL[1]*12+tranchesL[0]*12 && x>tranchesL[1]*12+tranchesL[0]*12){ 
    y=tranchesP[0]*tranchesL[0]*12+tranchesP[1]*tranchesL[1]*12+tranchesP[2]*(x-(tranchesL[0]+tranchesL[1])*12);
  }
  else{   
    y=tranchesP[0]*tranchesL[0]*12+tranchesP[1]*tranchesL[1]*12+tranchesP[2]*tranchesL[2]*12+tranchesP[3]*(x-(tranchesL[0]+tranchesL[1]+tranchesL[2])*12);
  }
  return y;
}

function prodFunction() {
  var invest=0;
  for (let i = 0; i < ville.length; i++) {
    if ( ville[i]== $("#gouvernorat option:selected").text() )
        prodChoisi= productible [i];
  }
  puiPV=Energie/prodChoisi;
 
  $('#puiPV').html(Math.round(puiPV*100)/100);
  
  invest=investCalc(puiPV);
  subvention=subvCalc(puiPV);
  invoice=invoiceCalc(Energie);
  pp=ppCalc(invest,subvention,invoice);

  $('#invest').html(Math.round(invest/10)*10);  
  $('#subvention').html(Math.round(subvention/10)*10);  
  $('#pp').html(Math.round(pp*1)/1);  

  console.log(Energie);
  console.log(invoice);

}



$("#gouvernorat").change(function(){

  prodFunction();
  creditFunction();
  
});

/**************************************/

function creditFunction() {
  
  if ( puiPV<2){
        creditPPui= montantCredit[0];
        annuiteDef=annuite[0];
      }


    if ( puiPV>=2&puiPV<3){
      
        
        creditPPui= montantCredit[1]
        annuiteDef=annuite[1];
      
    }
    if ( puiPV>=3&puiPV<4){ 
       
       
        creditPPui= montantCredit[2]
        annuiteDef=annuite[2];
      
    }
    if ( puiPV>=4){ 
         
        creditPPui= montantCredit[3]
        annuiteDef=annuite[3];
     
    }
}

function credit2Function() {
  
  
    if ( newPuiPV<2){
        creditPPui2= montantCredit[0];
        annuiteDef2=annuite[0];
      }


    if ( newPuiPV>=2&newPuiPV<3){
      
        
        creditPPui2= montantCredit[1]
        annuiteDef2=annuite[1];
    }
    if ( newPuiPV>=3&newPuiPV<4){ 
       
       
        creditPPui2= montantCredit[2]
        annuiteDef2=annuite[2];
    }
    if ( newPuiPV>=4){ 
         
        creditPPui2= montantCredit[3]
        annuiteDef2=annuite[3];
    }
}








function creditSlides2(){
  showSlides(slideIndex += 2);
  credit2Function();
  
  ppCredit2=ppCreditCalc(newInvest,newSubvention,factureEvit,creditPPui2,annuiteDef2);
  $('#fPropre2').html(Math.round((newInvest-newSubvention-creditPPui2)*1)/1);
  $('#creditVal2').html(creditPPui2);
  $('#invest1').html(Math.round(invest/10)*10);  
    $('#subvention1').html(Math.round(subvention/10)*10);  
    $('#ppcredit2').html(Math.round(ppCredit2*1)/1); 
    $('#annuite2').html(Math.round(annuiteDef2*1)/1);  
};

/***************newpower**************/

$("#newPower").change(function(){

$( ".next" ).css( "display", "none" );
  if($("#newPower").val()>puiPV) {
    $( ".next" ).css( "display", "none" );
    $( "#highPowerMes" ).css( "display", "block" );
  }else{
    $( ".next" ).css( "display", "block" );
    $( "#highPowerMes" ).css( "display", "none" );
  }

  
  newinvoice=0;

  newPuiPV=$("#newPower").val();
  newEnergie=Energie-(newPuiPV*prodChoisi);
  console.log(Energie);
  console.log(newEnergie);
  newInvest=investCalc(newPuiPV);
  newSubvention=subvCalc(newPuiPV);
  
  newinvoice=invoiceCalc(newEnergie);
  factureEvit=invoice-newinvoice;
  newpp=ppCalc(newInvest,newSubvention,factureEvit);
  console.log(invoice);
  console.log(newinvoice);
  
  console.log(invoiceCalc(7000));

  $('#newPuiPV').html(Math.round(newPuiPV*100)/100);
  
  $('#pourcentage').html(Math.round((factureEvit/invoice)*100));

    
  $('#newInvest').html(Math.round(newInvest/10)*10);  
    
  
  $('#newSubvention').html(Math.round(newSubvention/10)*10);  
  

  $('#newpp').html(Math.round(newpp*1)/1);  

  credit2Function();
});

/************************************/


/****************Modal Start**********/




var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");

var img2 = document.getElementById("myImg2");
var modalImg2 = document.getElementById("img02");

img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  
}

/*img2.onclick = function(){
  modal2.style.display = "block";
  modalImg2.src = this.src;
  
}*/


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementById("close2");


// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}
// When the user clicks on <span> (x), close the modal
  span2.onclick = function() { 
  modal2.style.display = "none";
}



/****************Modal End***********/



/************language start***********
var language; 
function getLanguage() {
(localStorage.getItem('language') == null) ? setLanguage('en') : false;
$.ajax({ 
url:  '/language/' +  localStorage.getItem('language') + '.json', 
dataType: 'json', async: false, dataType: 'json', 
success: function (lang) { language = lang } });
}
function setLanguage(lang) {
localStorage.setItem('language', lang);
}
$(document).ready(function(){
$('#div1').text(language.date);
});
/************language end***********/