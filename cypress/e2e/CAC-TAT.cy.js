describe('template spec', () => {

beforeEach(() => {
  cy.visit('../src/index.html')

})

describe('Central de Atendimento ao Cliente TAT', () => {
  it('verifica o título da aplicação', () => {

    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')

  })

  it('preencher campos obrigatórios e enviar formulario', () => {
    const longTexto = Cypress._.repeat('abdcdefghijklmnopqrstuvwxyz',10)

    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Beninca')
    cy.get('#email').type('lucas@gmail.com')
    cy.get('#open-text-area').type(longTexto, {delay:0})
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')

  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longTexto = Cypress._.repeat('abdcdefghijklmnopqrstuvwxyz',10)

    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Beninca')
    cy.get('#email').type('lucas@1234')
    cy.get('#open-text-area').type(longTexto, {delay:0})
    cy.get('button[type="submit"]').click()
 // cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')

  })

  it('valida valor não-numérico digitado no campo telefone', () => {
    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Beninca')
    cy.get('#email').type('lucas@gmail.com')
    cy.get('#phone').type('abc')
    cy.get('#phone').should('have.text','')
    
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
    .type('Lucas')
    .should('have.value','Lucas')
    .clear()
    .should('have.value','')

    cy.get('#lastName')
    .type('Beninca')
    .should('have.value','Beninca')
    .clear()
    .should('have.value','')

    cy.get('#email')
    .type('lucas@gmail.com')
    .should('have.value','lucas@gmail.com')
    .clear()
    .should('have.value','')

  })
  

  it(' exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    const longTexto = Cypress._.repeat('abdcdefghijklmnopqrstuvwxyz',10)
    cy.get('#open-text-area').type(longTexto, {delay:0})
    cy.get('button[type="submit"]').click()
 // cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')

  })
  
  it('envia o formuário com sucesso usando um comando customizado', () => {
   
    const data = {
      firstName: 'teste',
      lastName: 'sobrenomeTeste',
      email: 'test@gmail.com',
      text: 'teste'
    }
    
    cy.enviandoFormularioComSucesso(data)
    cy.get('.success').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado com valores padroes', () => {   
    cy.enviandoFormularioComSucesso()
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {   
    cy.get('#product')
    .select('YouTube')
    .should('have.value','youtube')

  })

  it('seleciona um produto (Mentoria) por seu texto', () => {   
    cy.get('#product')
    .select('mentoria')
    .should('have.value','mentoria')

  })

  it('seleciona um produto (Blog) por seu índice', () => {   
    cy.get('#product')
    .select([1])
    .should('have.value','blog')

  })

  it('marca o tipo de atendimento "Feedback"', () => {   
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')

  })

  it('marca cada tipo de atendimento', () => {  
    cy.get('input[type="radio"][value="ajuda"]')
      .check()
      .should('be.checked')

    cy.get('input[type="radio"][value="elogio"]')
      .check()
      .should('be.checked')
    
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')

  })
 
  it('marca cada tipo de atendimento (usando cy.Each e cy.Wrap)', () => {  
// a função cy.each recebe como argumento uma função e com o cy.wrap podemos empacotar o que foi recebido no cy.each e inteirar sobre os elementos
    cy.get('input[type="radio"]')
      .each(tiposDeAtendimento => {
        cy.wrap(tiposDeAtendimento)
          .check()
          .should('be.checked')

      })  
  })


  it('marca ambos checkboxes, depois desmarca o último (usando id))', () => {  
    cy.get('#email-checkbox')
    .check()
    .should('be.checked')

    cy.get('#phone-checkbox')
    .check()
    .should('be.checked')

    cy.get('#phone-checkbox')
    .uncheck()
    .should('be.not.checked')

   })  

   it('marca ambos checkboxes, depois desmarca o último (usando seletor mais generico))', () => {  
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')


   })  

   it('console.log', () => {  
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .should(input =>  {
      console.log(input)

    })
  })

   it('seleciona um arquivo da pasta fixtures', () => {  
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .should(input =>{
      expect(input[0].files[0].name).to.equal('example.json')

    })
   })  

   // usando .then ele não tem o mecanismo de re-tentativas
   it('seleciona um arquivo da pasta fixtures .then', () => {  
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .then(input =>{
      expect(input[0].files[0].name).to.equal('example.json')

    })
   })  

   it('seleciona um arquivo da pasta fixtures drag-an-drop', () => {  
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(input =>{
      expect(input[0].files[0].name).to.equal('example.json')

    })
   })  

   it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {  
    cy.fixture('example.json',{ encoding: null}).as('exampleTest')
    cy.get('#file-upload')
    .selectFile('@exampleTest')
    .should(input =>{
      expect(input[0].files[0].name).to.equal('example.json')

    })
   })  

  






  


})
})
