// Cotações das moedas do dia.

const USD = 5.24;
const EUR = 6.24;
const GBP = 7.24;

// Obtendo os elementos do formulário.

const form = document.querySelector('form');
const amount = document.getElementById('amount');
const currency = document.getElementById('currency');
const footer = document.querySelector('main footer');
const description = document.getElementById('description');
const result = document.getElementById('result');

// Manipulando o input amount para receber somente números.

amount.addEventListener('input', ()  =>{
    const hasCharacters = /\D+/g
    amount.value = amount.value.replace(hasCharacters, '');
});


// Capturando o evento de submit do formulário.

form.onsubmit = (event) => {
    event.preventDefault();

    switch(currency.value) {
        case 'USD':
            convertCurrency(amount.value, USD, 'US$');
            break;
       
        case 'EUR':
            convertCurrency(amount.value, EUR, '€');
            break;
        
        case 'GBP':
            convertCurrency(amount.value, GBP, '£');
            break;
    }   
}

// Função para converter a moeda.

function convertCurrency(amount, price, symbol) {
    try {
        // Exibindo a cotação da moeda selecionada.
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        // Calculando o total da conversão.
        let total = amount * price;

        if(isNaN(total)) {
            return alert('Valor inválido. Digite um valor numérico.');
        }

        // Formatando o total para BRL.
        total = formatCurrencyBRL(total).replace("R$", ""); 


        // Exibindo o resultado da conversão.
        result.textContent = `${total} Reais`;

        // Aplica a classe que exibe o footer para mostrar o resultado.
        footer.classList.add("show-result");
    } catch (error) {
        // Remove a classe do footer ocultando o resultado.
        
        console.log(error)
        footer.classList.remove("show-result"); 
        alert('Não foi possível realizar a conversão. Tente novamente mais tarde.');
    }
}

// Função para formatar o valor da moeda para BRL.
function formatCurrencyBRL(value) {
    // Converte para número para aplicar o método toLocaleString, para formatar no padrão de moeda BRL.
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
}