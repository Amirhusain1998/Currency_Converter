const base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let countrylist=countryList;

const dropedowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector(".btn");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select")
const msg=document.querySelector(".msg");

window.addEventListener("load",()=>{
 updateExchangeRate();
})

for(let select of dropedowns)
{
    for(currencyCode in countryList)
    {
        let newOption=document.createElement("option");
        newOption.innerText=currencyCode;
        newOption.value=currencyCode;
        if(select.name==="from" &&currencyCode==="USD")
        {
            newOption.selected="selected";
        }else if(select.name==="to" &&currencyCode==="INR")
        {
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}

const updateflag=(element)=>{
  let currencyCode=element.value;
  let countryCode=countryList[currencyCode];
  let newsrc= `https://flagsapi.com/${countryCode}/flat/64.png` ;
  let img=element.parentElement.querySelector("img");
  img.src=newsrc;
};
btn.addEventListener("click",(evt)=>{
 evt.preventDefault();
 updateExchangeRate();
 
})
const updateExchangeRate= async()=>{
    let amount=document.querySelector(".amount input");
 let amtvalue=amount.value;
 if(amtvalue==="" || amtvalue<1)
 {
    amtvalue=1;
    amount.value="1";
 }
 let url=`${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//  console.log(fromCurr.value , toCurr.value)
let respone= await fetch(url);
let data=await respone.json();
let rate=data[toCurr.value.toLowerCase()]
console.log(rate)

let finalAmount=amtvalue*rate;
msg.innerText=`${amtvalue} ${fromCurr.value}=${finalAmount} ${toCurr.value}`
}
