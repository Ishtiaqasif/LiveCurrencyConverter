

$(()=>{
    loadSupportedCurrencies();
});

let loadSupportedCurrencies = () => {
    fetch('/api/currencies')
    .then(response => response.json())
    .then(response => {
        if(response.success){
            bindDatalist($('#currency_from'), response.currencies); 
            $("#currency_to_input").val("BDT") 
            bindDatalist($('#currency_to'), response.currencies);
            $('#currency_from_input').val("USD") 
        }
        else{
            alert('Something went wrong wile getting all currencies')
        }
    })
    .catch( error => {
        console.log(error);
    })
};

let bindDatalist = (element, currencies) => {
    let optionsAsHtml = '';
    for(let [key, value] of Object.entries(currencies)){
        optionsAsHtml += `<option value="${key}">${value}</option>`
    }

    element.append(optionsAsHtml);
};

let convertCurrency = () =>{
    let from = $('#currency_from_input').val(), to = $('#currency_to_input').val();
    fetch('/api/convert',{
        method: 'POST',
        headers: {
            'Content-type':'Application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            'from': from,
            'to': to
        })
    })
    .then(res => res.json())
    .then( data => {
        setResult(data);
    })
    .catch((error) => {
        alert('Something went wrong while converting');
    });
};

let setResult = data => {

    let source = data.source, from = $('#currency_from_input').val(), to = $('#currency_to_input').val();
    let amount = $('#amount').val();
    let rates = data.quotes;
    let convertedResult = (amount * rates[`${source}${to}`]) / rates[`${source}${from}`]

    $('#currency_to_output').val(convertedResult.toFixed(2))
};