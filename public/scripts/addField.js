// Procurar o botão 
document.querySelector("#add-time").addEventListener('click', cloneField)

//Quando clicar no botão(.addEventListener('click', cloneField);)

//Executar uma ação
function cloneField(){
    //Node se refere a html
    //Duplicar os campos. Que campos?
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)

    //Pegar os campos. Que campos?
    const fields = newFieldContainer.querySelectorAll('input')

    //Para cada campo, limpar.
    fields.forEach(function(field) {
        //Pegar o field do momento e limpa-o.
        field.value = ""
    })

    //Colocar na página. Onde?
    document.querySelector('#schedule-items').appendChild(newFieldContainer)
}
    

    