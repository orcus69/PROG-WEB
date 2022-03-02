const consultaCEP = ()=>{

	const cep = document.querySelector("#cep");
  
    cep.addEventListener('blur', e => {
        const value = cep.value.replace(/[^0-9]+/, '');
        const url = `https://viacep.com.br/ws/${value}/json/`;

        fetch(url).then( response => response.json())
        .then( json => {
            
            if( json.logradouro ) {
            document.querySelector('#rua').value = json.logradouro;
            document.querySelector('#bairro').value = json.bairro;
            document.querySelector('#cidade').value = json.localidade;
            document.querySelector('#estado').value = json.uf;
            }

        });
            
            
    });

}

consultaCEP();