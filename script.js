let form = document.getElementById("form");
let Data = [];

fetch('./config.json')
.then(response => response.json())
.then((data) => 
{
    Data = data.fields;
    //Handeling the empty fields n JSON file
    if(Data.length == 0){

        form.innerHTML= `<h1>The form is Empty</h1>`;

    }else
    {

        //sroting the data on the basis of order.
        Data.sort((a, b) => {
            return a.order - b.order;
        });
        Data.forEach((element, index) => 
        {
       
            //Fetching Form Labels.
            let container = document.createElement("div");
            container.setAttribute("class", "tooltip")
            let label = document.createElement("label");
            label.innerText = `${element.displayName}`;
            label.setAttribute("for",`${element.displayName.replace(/ /g, "")}`);
            label.setAttribute("class","labels");

            //Fetching Form Inputs.
            let input ;
            if(element.type == "dropdown"){
                    input = document.createElement("select");
                    input.setAttribute("name",`${element.displayName.replace(/ /g, "")}`);
                    element.values.forEach(options =>{
                        let option = document.createElement("option");
                        option.innerText = `${options.value}`;
                        option.setAttribute("value",`${options.value}`)
                        input.appendChild(option);

                    })
            }else{
                    input = document.createElement("input");
                    input.setAttribute("name",`${element.displayName.replace(/ /g, "")}`);
                    input.setAttribute("type",`${element.type == "document" ? "file" : element.type}`);
                    if(element.required === true){
                    input.setAttribute("required","");
                    }
                }

            input.setAttribute("class","inputs");
            let tooltip = document.createElement("span");
            tooltip.setAttribute("class","tooltiptext");
            tooltip.innerText = `${element.tooltip}`;

            //Append Forms label and Inputs
            
            container.appendChild(input);
            container.appendChild(tooltip);
            form.appendChild(label);
            form.appendChild(container);
         
        });
            // Creating Form Submit Button.
            let submit = document.createElement("button");
            submit.innerText = "Submit";
            submit.setAttribute("type", "submit");
            submit.setAttribute("class","submit");
            form.appendChild(submit);

    }
})

//validation for the Form.

function validation(){
    let phoneRegex = /^[6789]\d{9}$/gm ;
    let emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let email = document.myForm.EmailAddress.value;
    let phone = document.myForm.PhoneNumber.value;
    if(!emailRegex.test(email)){
        alert("Please enter a valid e-mail address");
        document.myForm.EmailAddress.focus();
        return false;
    }
    if(!phoneRegex.test(phone)){
        alert("Please enter a valid Phone Number");
        document.myForm.PhoneNumber.focus();
        return false;
    }
}


