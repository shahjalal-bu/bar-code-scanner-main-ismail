//declare global variable
const items = document.querySelectorAll('.circle_menu a')
const mainMenu=document.querySelector(".menuMain");
const circle_menu=document.querySelector('.circle_menu');
const popup = document.querySelector(".alert_popup_area");
//css selector change for different class for hiding 
const toggleShow = "toggle-show";

//use for circle menu
(()=>{
    for (var i = 0, l = items.length; i < l; i++) {
    items[i].style.left = (48 - 35 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";

    items[i].style.top = (48 + 35 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
    }
})();
//stack frontier for history
class stack{
    
    constructor()
    {
        this.data = [];
        this.pagovill= null;
    }
    push(value){
        this.data.push(value);
    }
    delete(){
        this.data = [this.data[0],this.data[this.data.length-1]];
    }
    remove()
    {
        return this.data.pop()
    }
    toggle(name)
    {
        if (this.pagovill==null && this.data.length > 2)
        {
            let last =this.data[this.data.length-1];
            // console.log(last.element)
            if (last.control[0].name && (last.control[0].name === "Process" || last.control[0].name === 'methodCheckFunc'))
            {
                let callBackFunction = last.control[0];
                let element = last.control[1];
                last.element.classList.toggle(toggleShow);
                this.remove()
                // this.home()
                this.data[this.data.length-1].element.classList.toggle(toggleShow);
                //add callback function to element
                this.refresh()
                
                
                element.addEventListener("click",callBackFunction);
            }
            
            else
            {
                
                last.element.classList.toggle(toggleShow);
                this.remove()
                mainMenu.classList.remove(toggleShow);
                this.data[this.data.length-1].element.classList.remove(toggleShow);
                this.refresh()
                 
            }
            
            
        }
        else if (this.pagovill  !== null)
        {   
            this.pagovill.classList.remove(toggleShow);
            this.refresh()
            mainMenu.classList.remove(toggleShow);
            this.pagovill = null;
            
        }
        
        
    }
    refresh()
    {
        document.querySelectorAll("input").forEach(item=>{
            item.value = '';
        })
    }
    home()
    {
        mainMenu.classList.remove(toggleShow);
        this.data[this.data.length-1].element.classList.remove(toggleShow);
        this.remove()
        this.refresh()
    }
    hasok()
    {
        if(this.data[this.data.length-1] !== undefined)
        {
            return this.data[this.data.length-1].element.classList.contains('subm_Ok');
        }
        
        
    }
}

//popup content like react
const popupContent = (props)=>{
    const content = `<div class="apBox_content">
                            <div class="apBoxm">
                                <span class="mprice_title">${props.title}</span>
                                <span class="p_valueM">${props.value}</span>
                            </div>
                            <div class="apBoxm">
                                <span class="mprice_title">${props.moneyName}</span>
                                <span class="currency">${props.moneySign}</span>
                            </div>
                        </div>
                        <button class="XmarkBtn_close" id="XmarkBtn_close">
                            <i class="fa-solid fa-xmark"></i>
                        </button>`
    let div = document.createElement("div");
    div.className = 'Ebs_payValue price_valueContent '+toggleShow;
    div.innerHTML = content;
    return  div;
}
//sucess element by react
const sucess_element = (props)=>{
    const content = `
                        <div class="subtitle_body_44">
                            <div class="infoSuccess subTitle444_area">
                                <h4 class="subTitle_2">${props.title}</h4>
                                <h4 class="subTitle_3">${props.currency_one_subtitle}<span>${props.currency_one_value}</span></h4>
                                <h5 class="subTitle_4">${props.currency_two_subtitle}<span>${props.currency_two_value}</span></h5>
                            </div>
                        </div>

                        <!------ valueCheck ----->
                        <div class="submethod_content4">
                            <button class="method_valueCheck">
                                <i class="fa-solid fa-check"></i>
                            </button>
                        </div>

                        <div class="subm_Ok">
                            <button class="method_valueCheck">Ok</button>
                        </div>

                    `
        div =  document.createElement('div');
        div.className = 'successPaym payMethod_checked subtitle_body_info '+toggleShow;
        div.innerHTML = content
        return div
}
//show success function for showing message
function show_sucess(parentElement,title,currency_one_subtitle,currency_one_value,currency_two_subtitle,currency_two_value){
    parentElement.appendChild(sucess_element({
        title:title,
        currency_one_subtitle:currency_one_subtitle,
        currency_one_value:currency_one_value,
        currency_two_subtitle:currency_two_subtitle,
        currency_two_value:currency_two_value
    }));
    const ok_button = parentElement.querySelector(".subm_Ok");
    function callBackCcdd(e){
        parentElement.removeChild(parentElement.lastChild);
        mainMenu.classList.remove(toggleShow);
        ok_button.removeEventListener("click",callBackCcdd);
        data_history.refresh();
        
    }
    data_history.push({element:ok_button,control:[null,null]});
    ok_button.addEventListener("click",callBackCcdd);
}
//remove popup
function remove_popup(popup_content){
    const xmark = popup_content.querySelector('.XmarkBtn_close');
                        const closeFunc = (e)=>{
                            xmark.removeEventListener('click',closeFunc);
                            xmark.parentElement.classList.remove(toggleShow);
                            // console.log(e.target)
                        }
                        xmark.addEventListener("click",closeFunc);
}
//init stack
data_history = new stack();
//save mainmenu to history
data_history.push({element:mainMenu,control:[null,null]});
//do query usage for cash,devito credito and transfer by different parameters
const doQuery = (e,query,currency=null,ccdd=null,selector1='.bs',selector2 = '.us')=>{
     mainMenu.classList.add(toggleShow);
            circle_menu.classList.remove(toggleShow);
            let money_bill_element=document.querySelector(`${query} .Method-bilMicon`);
            //add toggleShow for showing 
            money_bill_element.classList.add(toggleShow);
            data_history.push({element:money_bill_element,control:[doQuery,e.target]});
            //bs show
            let parentElement = money_bill_element.parentElement;
            // console.log(selector1);
            const bs=money_bill_element.querySelector(selector1)
            const Process =(e)=>{
                if(e.target.getAttribute("data-target")==null)
                {
                    element = e.target.parentElement;
                }
                else{
                    element =e.target;
                }
            
                element.removeEventListener("click",Process);
                
                const target = element.getAttribute("data-target");
                const title = element.getAttribute('data-title');
                const name = element.getAttribute("data-currency-name");
                const currency = element.getAttribute("data-currency");
                // console.log(name,title,target)
                //remove toggleShow for hidding money bill element 
                    money_bill_element.classList.remove(toggleShow);
                    const inputUI=parentElement.querySelector(`.payMethod_checked.${target}`);
                    data_history.push({element:inputUI,control:[Process,element]});
                    //add toggleShow to inputUi to show 
                    inputUI.classList.add(toggleShow);
                    const inputBox = parentElement.querySelector(`.${target} .payment_input input`);
                    const methodCheck=parentElement.querySelector(`.${target} .method_valueCheck`);
                    function methodCheckFunc(e){
                        value = inputBox.value;
                        // console.log("value is "+value)
                        if (value != "")
                        {
                        methodCheck.removeEventListener("click",methodCheckFunc);
                        // inputBox.removeEventListener("keydown",addValue);
                        inputUI.classList.remove(toggleShow);
                        data_history.push({element:mainMenu,control:[methodCheckFunc,methodCheck]});
                        inputBox.value ='';
                        let popup_content = popupContent({
                            title:title,
                            value:value,
                            moneyName:name,
                            moneySign:currency
                        })
                        remove_popup(popup_content);
                        //remove toggleShow for showing mainmenu
                        if(ccdd==null)
                        {
                            mainMenu.classList.remove(toggleShow);
                        }
                        else
                        {
                            //message in ok ui
                            const data = inputUI.querySelector('input[data-selector="selected"]');
                            let title = data.getAttribute('data-title'),
                                currency_one_subtitle  =data.getAttribute('data-currency-one-subtitle'), //change in here for value in ved
                                currency_one_value  =data.getAttribute('data-currency-one-value'), //change in here for value in ved
                               
                                currency_two_subtitle  =data.getAttribute('data-currency-two-subtitle'), //change in here for value in ved
                                currency_two_value  =data.getAttribute('data-currency-two-value'); //change in here for value in ved
                               
                            show_sucess(parentElement,title,currency_one_subtitle,currency_one_value,currency_two_subtitle,currency_two_value);
                            
                        }
                        data_history.delete();
                        
                        popup.appendChild(popup_content); 
                        }
                        

                    }
                    methodCheck.addEventListener("click",methodCheckFunc);
                }
            bs.addEventListener("click",Process)
            //dollar show
            const dollar = money_bill_element.querySelector(selector2);
            dollar.addEventListener("click",Process)
}

//money bill mp
document.querySelector('.money-bill_mp').addEventListener("click",(e)=>{
       
             //do  query 
            //  console.log("I am clicked")
            //  doQuery(e,query='.money-bill_mp_area', selector1='.e-bspay');
            doQuery(e,'.money-bill_mp_area',null,null,selector1='.e-bspay',selector2='.e-dollarpay');


})
//transfer
document.querySelector('.transfer-bill_mp').addEventListener("click",(e)=>{
       
             //do  query 
            //  doQuery(e,query='.transfer-bill_mpArea')
            doQuery(e,'.transfer-bill_mpArea',null,null,selector1='.t-bspay',selector2='.t-dollarpay');
             

})


//credit card
document.querySelector('.credit-card-mp').addEventListener("click",(e)=>{
 //do  query 
//  doQuery(e,query='.credit-card_mpArea',currency="BSS",ccdd=".ccdd")
   doQuery(e,'.credit-card_mpArea',null,".ccdd-success",selector1='.c-credito',selector2='.c-debito');
})



//pago vill
const doPagoVill = (e)=>{
     const area = document.querySelector('.pago_movil-bill_mpArea .Method-bilmp');
     area.classList.add(toggleShow);
     data_history.pagovill = area;
     circle_menu.classList.remove(toggleShow);
     mainMenu.classList.add(toggleShow);
     const submit_btn = area.querySelector('.method_valueCheck');
     function doSubmit(e){
        e.preventDefault();
        
        // mainMenu.classList.remove(toggleShow);
        let data=area.querySelector('input[data-selector="selected"]');
        let value = data.value
        if (value !== "")
        {
            area.classList.remove(toggleShow);
            submit_btn.removeEventListener("click",doSubmit);
        
        let title = data.getAttribute('data-title'),
                                currency_one_subtitle  =data.getAttribute('data-currency-one-subtitle'), //change in here for value in ved
                                currency_one_value  =data.getAttribute('data-currency-one-value'), //change in here for value in ved
                               
                                currency_two_subtitle  =data.getAttribute('data-currency-two-subtitle'), //change in here for value in ved
                                currency_two_value  =data.getAttribute('data-currency-two-value'); //change in here for value in ved
                               
        show_sucess(area.parentElement,title,currency_one_subtitle,currency_one_value,currency_two_subtitle,currency_two_value);
                            
        const popup_content = popupContent({
            title:submit_btn.getAttribute('data-title'),
            value:value,
            moneyName:submit_btn.getAttribute('data-currency-name'),
            moneySign:submit_btn.getAttribute('data-currency')
        })
        remove_popup(popup_content);
        popup.appendChild(popup_content);

        }
        

        
     }
     submit_btn.addEventListener("click",doSubmit);
}
//pagovill 
document.querySelector('.pago_movil').addEventListener("click",(e)=>{
       
             //do  query 
            doPagoVill(e);
             

})

//home button 
document.querySelector('.home').onclick=e=>{
    try
    {
        if(data_history.hasok() === false)
    {

    mainMenu.classList.remove(toggleShow);
    data_history.home()
    if(data_history.pagovill !== null)
    {
        data_history.pagovill.classList.remove(toggleShow);
        data_history.pagovill = null;
    }
    }
    }
    finally{
        
    }
    
    
    

};
//back one //remove this for disabled backbtn 
//start back btn js
// document.querySelector('.backBtn').onclick=e=>{
//     // mainMenu.classList.remove(toggleShow);
//     try{
//         data_history.toggle(toggleShow);
//     }
//     finally{
//         // console.log("error")
//     }
    

// };
//end remove part js
//show circler menu
document.querySelector('.menu-button').onclick = function (e) {
    e.preventDefault();
    if(circle_menu.classList.contains(toggleShow))
    {
        circle_menu.classList.remove(toggleShow);
    }
    else
    {
        circle_menu.classList.add(toggleShow);
        data_history.push({element:circle_menu,control:[null,null]});
    }
    
    
};

