describe('Open application time',() =>{
    
beforeEach('login to the application',() =>{
    //cy.intercept('GET','**/tags',{fixtures:'tags_stub.json'})
    //cy.intercept('GET','**/tags',{fixture:'tags_stub.json'})
  cy.intercept('GET','**/tags',{fixture:'tags_stub.json'})
cy.OpenApplication()
})
it('Login to the application',() =>{

    cy.log('we are logged in')
})

it.skip('Verification of the Browser API call',() =>{
cy.intercept('POST','**/articles').as('postarticles')

    cy.contains('New Article').click()
    cy.get('[formcontrolname="title"]').type('Azad6')
    cy.get('[formcontrolname="description"]').type('dthgddhg7855')
    cy.get('[formcontrolname="body"]').type('xfgdhgdbhgfjhfj')
    cy.get('[type="button"]').contains('Publish Article').click()
    cy.wait('@postarticles')
    cy.get('@postarticles').then(xhr =>{
console.log(xhr)
expect(xhr.response.statusCode).to.equal(307)
expect(xhr.request.body.article.body).to.equal('xfgdhgdbhgfjhfj')
    })
})

it('Verification of the stub API call',() =>{
    cy.get('.col-md-3')
    .should('contain','cypress')
    .and('contain','automation')
    .and('contain','performance')
})
it.only('Verification of the Global Feed Stub',() =>{
    cy.intercept('GET','**/article/feed*',{"articles":[],"articlesCount":0})
    cy.intercept('GET','**/article*',{fixture:'articles.json'})
//cy.intercept('GET','**/article/feed*','{"articles":[],"articlesCount":0}')
cy.contains('Global Feed').click()
//cy.wait(500)
cy.get('app-article-list button').then(listofbutton =>{
expect(listofbutton[0]).to.contain('0')
expect(listofbutton[1]).to.contain('1')

})
cy.fixture('articles').then(file => {
const articlelink=file.articles[1].slug
cy.intercept('POST','**/article/'+articlelink+'/favourite',file)
})
cy.get('app-article-list button').find('.ion-heart').eq(1).click()
cy.wait(1000)
})


})
