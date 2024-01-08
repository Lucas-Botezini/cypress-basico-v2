

/// <reference types="Cypress" />

// const { each } = require("cypress/types/bluebird")

describe('Central de Atendimento ao Cliente TAT', function() {

    const user = {}

    beforeEach(() => {

        cy.visit('./src/index.html')

        user.nome = 'Lucas'
        user.sobrenome = 'Botezini'
        user.email = 'demonstracao@gmail.com'
        user.longText = 'Um texto reaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaalmente looooooooooooooooooooooooooooooooooooooooooongo'
      })


    context("Seção 2 e 3 Do Curso Testes Automatizados com Cypress Básico", () => {
        
        it('verifica o título da aplicação', function() {
    
            cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
        })
     
        it('preenche os dados e envia o form', function() {
    
            cy.get('#firstName').type('Lucas')
            
            cy.get('#lastName').type('Botezini')
            
            cy.get('#email').type('demonstracao@gmail.com')
            
            cy.get('#open-text-area').type('Um texto reaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaalmente looooooooooooooooooooooooooooooooooooooooooongo', {delay: 0})
    
            // cy.get('button[type="submit"]').click()
            cy.contains('button', 'Enviar').click()
            cy.get('.success').should('be.visible')
        })
        
        it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
            
            cy.get('#firstName').type('Lucas')
            
            cy.get('#lastName').type('Botezini')
            
            cy.get('#email').type('demonstracao.gmail.com')
            
            cy.get('#open-text-area').type('Um texto qualquer')
    
            // cy.get('button[type="submit"]').click()
            cy.contains('button', 'Enviar').click()
            cy.get('.error').should('be.visible')
            
        })
    
        it('valor não-numérico for digitado, seu valor continuará vazio', function() {
    
            cy.get('#firstName').type('Lucas')
            
            cy.get('#lastName').type('Botezini')
            
            cy.get('#email').type('demonstracao.gmail.com')
            
            cy.get('#phone').type('ABCD').should('have.value', '')
            
            cy.get('#open-text-area').type('Um texto qualquer')
    
    
        })
    
        it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
          
            cy.get('#firstName').type('Lucas')
            
            cy.get('#lastName').type('Botezini')
            
            cy.get('#email').type('demonstracao@gmail.com')
            
            cy.get('#phone-checkbox').check()
            
            cy.get('#open-text-area').type('Um texto qualquer')
    
            // cy.get('button[type="submit"]').click()
            cy.contains('button', 'Enviar').click()
            cy.get('.error').should('be.visible')
    
    
        })
    
        
        it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
          
            cy.get('#firstName').type('Lucas').should('have.value', 'Lucas')
            
            cy.get('#lastName').type('Botezini').should('have.value', 'Botezini')
            
            cy.get('#email').type('demonstracao@gmail.com').should('have.value', 'demonstracao@gmail.com')
            
            cy.get('#open-text-area').type('Um texto qualquer').should('have.value', 'Um texto qualquer')
            
    
            cy.get('#firstName').clear().should('have.value', '')
            cy.get('#lastName').clear().should('have.value', '')
            cy.get('#email').clear().should('have.value', '')
            cy.get('#open-text-area').clear().should('have.value', '')
        })
    
    
        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    
            // cy.get('.button').click()
            cy.contains('button', 'Enviar').click()
            cy.get('.error').should('be.visible')
    
        })
    
        it('envia o formuário com sucesso usando um comando customizado', function(){
    
            cy.fillMandatoryFieldsAndSubmit(user)
    
            cy.get('.success').should('be.visible')
            
        })
    })

    context("Seção 4", () => {

        it('seleciona um produto (YouTube) por seu texto', function() {
    
            cy.get('#product').select('YouTube').should('have.value', 'youtube')
            
        })
    
        it('seleciona um produto (Mentoria) por seu valor (value)', function() {
    
            cy.get('#product').select('mentoria').should('have.value', 'mentoria')
            
        })
        it('seleciona um produto (Blog) por seu índice', function() {
    
            cy.get('#product').select(1).should('have.value', 'blog')
            
        })

    })

    context("Seção 5", () => {

        it('marca o tipo de atendimento "Feedback"', function() {

            cy.get('input[type="radio"][value="feedback"').check().should('have.value', 'feedback')

        })
        it('marca cada tipo de atendimento', function() {

            cy.get('input[type="radio"]').each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
        })
        

    })

    context("Seção 6", () => {

        it('marca ambos checkboxes, depois desmarca o último', function() {

            // cy.get('input[type="checkbox"]').each(($checkbox) => {
            //     cy.wrap($checkbox).check()
            //     cy.wrap($checkbox).should('be.checked')
            // }).last().uncheck().should('not.be.checked')

            cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')

        })

    })

    context("Seção 7", () => {

        it('seleciona um arquivo da pasta fixtures', () => {

            cy.get('#file-upload')
              .selectFile('./cypress/fixtures/example.json')
              .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })

        })

        it('seleciona um arquivo simulando um drag-and-drop', () => {

            cy.get('#file-upload')
              .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
              .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })

        })

        it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
            
            cy.fixture('example.json').as('exampleFile')

            cy.get('#file-upload').selectFile('@exampleFile').then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })

        })
        
    })
    
    context('Seção 8', () => {
        
        it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
            
            cy.get('#privacy a').should('have.attr', 'target', '_blank')
            // cy.get('#privacy a').click()
        
        })

        it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
            
            cy.get('#privacy a').should('have.attr', 'target', '_blank').invoke('removeAttr', 'target').click()
            cy.contains('Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real.').should('be.visible')
        
        })

        it('testa a página da política de privacidade de forma independente', function() {

            cy.visit('./src/privacy.html')
            cy.contains('Talking About Testing').should('be.visible')

        })
    })
})