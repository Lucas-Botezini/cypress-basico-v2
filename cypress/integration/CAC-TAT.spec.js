

/// <reference types="Cypress" />

// const { Context } = require("mocha")

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

    Cypress._.times(2, () => {

        context("Seção 2 e 3 Do Curso Testes Automatizados com Cypress Básico", () => {
            
            it('verifica o título da aplicação', function() {
        
                cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
            })
         
            it('preenche os dados e envia o form', function() {
                
                cy.clock()
    
                cy.get('#firstName').type('Lucas')
                
                cy.get('#lastName').type('Botezini')
                
                cy.get('#email').type('demonstracao@gmail.com')
                
                cy.get('#open-text-area').type('Um texto reaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaalmente looooooooooooooooooooooooooooooooooooooooooongo', {delay: 0})
        
                // cy.get('button[type="submit"]').click()
                cy.contains('button', 'Enviar').click()
    
                cy.get('.success').should('be.visible')
                
                cy.tick(3000)
                
                cy.get('.success').should('not.be.visible')
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

    context('Seção Avançada', () => {

        it('verificar que a mensagem de erro aparece depois de 3 segundos', function() {

            cy.clock()

            cy.get('button[type="submit"]').click()

            cy.get('.error').should('be.visible')

            cy.tick(3000)
            cy.get('.error').should('not.be.visible')
            // cy.contains('.error', 'Valide os campos obrigatorios!').should('not.be.visible')

        })


        it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
            cy.get('.success')
              .should('not.be.visible')
              .invoke('show')
              .should('be.visible')
              .and('contain', 'Mensagem enviada com sucesso.')
              .invoke('hide')
              .should('not.be.visible')
            cy.get('.error')
              .should('not.be.visible')
              .invoke('show')
              .should('be.visible')
              .and('contain', 'Valide os campos obrigatórios!')
              .invoke('hide')
              .should('not.be.visible')
          })

          it('preenche a area de texto usando o comando invoke0',  function() {

            const longText = Cypress._.repeat('Um texto longo ', 5)

            cy.get('#open-text-area').invoke('val', longText).should('have.value', longText)

          })




    })

    context('Request Command', () => {

        //  This one I made
        it('faz uma requisição HTTP', function() {

            cy.request({
                method: 'GET',
                url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
            }).then(result => {

                expect(result.status).to.equal(200)
                expect(result.statusText).to.equal('OK')
                expect(result.body).to.include('CAC TAT')

            })


        })

        // This one I copied from de video
        
        it('faz uma requisição HTTP', function() {

            cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
              .should(function(response) {

                const { status, statusText, body} = response

                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')

            })


        })

    })

    context('Desafio - Achar o Gato', () => {

        it('achar o gato', function() {

            cy.request({
                method: 'GET',
                url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
            }).then(result => {

                expect(result.body).to.include('🐈')

            })

            cy.get('span#cat').should('not.be.visible').invoke('show').should('be.visible')

        })


    })
})