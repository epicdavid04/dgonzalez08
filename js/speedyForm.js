let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
let prices = {
    size: {
        'Small': { 'cost' : 10},
        'Medium': { 'cost' :15},
        'Large': { 'cost' :20},
        'Extra Large' : { 'cost' :25}
    },
    delivery : {
        'First Class' : {  'cost' : 10},
        'Over Night' : {  'cost' : 7},
        '3 Day' : {  'cost' : 5}
    },
    zone : {
        'Zone A' : 10,
        'Zone B' : 12,
        'Zone C' : 15,
        'Zone D' : 20
    },
    options : {
        Bell: 1,
        Signed: 5
    }
}
function createQuote() {
    const deliveryInput = document.querySelector('input[name="deliver"]:checked');
    if (!deliveryInput) {
        alert("Please select a delivery option");
        return;
    }
    const delivery = deliveryInput.value;
    const size = document.querySelector('#mySize').value;
    const zone = document.querySelector('#destination').value;
    const options = document.querySelectorAll('input[name="options"]:checked');

    const totalCost = calculateTotalCost(delivery, size, zone, options);
    if (totalCost === 0) {
        return;
    }

    const quoteTable = createQuoteTable(delivery, size, zone, options, totalCost);
    console.log(finalCost)
    document.getElementById('results').innerHTML = quoteTable;


}
function calculateTotalCost(delivery, size, zone, options, tax){
    if (!prices.delivery[delivery] || !prices.size[size] || !prices.zone[zone]) {
        console.log("Invalid value(s) selected");
        alert("All options must be selected");

        return 0;
    }

    const deliveryCost = prices.delivery[delivery].cost;
    const sizeCost = prices.size[size].cost;
    const zoneCost = prices.zone[zone];
    let optionsCost = 0;
    options.forEach((option) => {
        optionsCost += prices.options[option.value];
    });
    return deliveryCost + sizeCost + zoneCost + optionsCost;
}
function createQuoteTable(delivery, size, zone, options, totalCost){
    const tax = totalCost * .07;
    const formattedTax = USDollar.format(tax);
    finalCost = USDollar.format(tax + totalCost);
    let oStr = '';
    oStr += '<div style="background-color: yellow; width: 400px; margin: 5px;">';
    oStr += `<h2 id="formHead" style="text-align: center"> Price Quote</h2>`;
    oStr += "<table border='2'>";
    oStr += `<tr><th>Item</th><th>Selected</th><th>Cost</th>`;
    oStr += `<tr><th>Delivery</th><th>${delivery}</th><th>$${prices.delivery[delivery].cost}.00</th>`;
    oStr += `<tr><th>Package Size</th><th>${size}</th><th>$${prices.size[size].cost}.00</th>`;
    oStr += `<tr><th>Destination</th><th>${zone}</th><th>$${prices.zone[zone]}.00</th>`;
    oStr += `<tr><th>Options</th><th>`;
    options.forEach((option) => {
        oStr += `${option.value}, `;
    });
    oStr = oStr.slice(0, -2);
    oStr += `</th><th>`;
    let optionsCost = 0;
    options.forEach((option) => {
        optionsCost += prices.options[option.value];
    });
    oStr += `$${optionsCost}.00</th>`;
    oStr += `<tr><th>Tax</th><th></th><th>${formattedTax}</th>`;
    oStr += `<tr><th>Total Cost</th><th></th><th>${finalCost}</th>`;
    return oStr;
}
function updatePage() {
    updateDelivery();
    updateSize();
    updateDestination();
    updateOptions();
}
function updateDelivery(){
    const delivery = document.getElementById("delivery");
    const delKeys = Object.keys(prices.delivery);
    let oStr = '';
    delKeys.forEach((deliveryOption) => {
        oStr += `<label><input type="radio" name="deliver" value="${deliveryOption}">${deliveryOption}</label>`;
    });
    delivery.innerHTML = oStr;
}
function updateSize() {
    const mySizeSelect = document.getElementById("mySize");
    const sizeKeys = Object.keys(prices.size);
    let oStr = '';
    sizeKeys.forEach((sizeOption) => {
        oStr += `<option value="${sizeOption}">${sizeOption}</option>`;
    });
    mySizeSelect.innerHTML = oStr;
}
function updateDestination(){
    const myZoneSelect = document.getElementById("destination");
    const zoneKeys = Object.keys(prices.zone);
    let oStr = '';
    zoneKeys.forEach((zoneOption) => {
        oStr += `<option value="${zoneOption}">${zoneOption}</option>`;
    });
    myZoneSelect.innerHTML = oStr;
}
function updateOptions(){
    let options = document.getElementById("options");
    let oStr = ""
    let optKeys = Object.keys(prices.options)
    for( let i=0; i <optKeys.length; i++ ){
        oStr += `${optKeys[i]} <input type="checkbox" name="options" value="${optKeys[i]}">`;
    }
    options.innerHTML = oStr;
}