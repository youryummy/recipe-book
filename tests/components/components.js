import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

let idRecipeBook;
let idUser = "test1"
let recipesBookPOST = { name: "test_POST", summary: "test_POST", recipeList: ["test_POST"], idUser: idUser }

const apiURL = "http://localhost:8080"

describe('GET Recipes Books', () => {
    before(() => {
        // Wait for the service to start
        let delay = new Promise(resolve => setTimeout(resolve, 3000))
        return delay
    });
    it('should GET all recipes books', (done) => {
        chai.request(apiURL)
        .get('/api/v1/recipesbooks')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            chai.expect(res.body).to.have.length.greaterThan(0);
            done();
        })
    })
})


describe('POST Recipes Books', () => {
    it('should POST a recipes book', (done) => {
        chai.request(apiURL)
        .post('/api/v1/recipesbooks')
        .send(recipesBookPOST)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('summary');
            res.body.should.have.property('recipeList');
            res.body.should.have.property('idUser');

            done();
            idRecipeBook = res.body._id;
        })
    })
})


describe('get Recipes Book by Id', () => {
    it('should get recipes book by id', (done) => {
        chai.request(apiURL)
        .get('/api/v1/recipesbooks/' + idRecipeBook)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql(recipesBookPOST.name);
            res.body.should.have.property('summary').eql(recipesBookPOST.summary);
            res.body.should.have.property('recipeList').eql(recipesBookPOST.recipeList);
            res.body.should.have.property('idUser').eql(recipesBookPOST.idUser);
            res.body.should.have.property('_id').eql(idRecipeBook);
            done();
        })
    })
})

describe('PUT Recipes Book', () => {
    it('should PUT recipes book', (done) => {
        chai.request(apiURL)
        .put('/api/v1/recipesbooks/' + idRecipeBook)
        .end((err, res) => {
            res.should.have.status(204);
            done();
        })
    })
})


describe('delete Recipes Book', () => {
    it('should delete recipes book', (done) => {
        chai.request(apiURL)
        .delete('/api/v1/recipesbooks/' + idRecipeBook)
        .end((err, res) => {
            res.should.have.status(204);
            done();
        })
    })
})


describe('GET Recipes Book by Id User', () => {
    it('should GET recipes book by id user', (done) => {
        chai.request(apiURL)
        .get('/api/v1/recipesbooks/findByUserId/' + idUser)
        .end((err, res) => {
            res.body.should.be.a('array');
            chai.expect(res.body).to.have.length.greaterThan(0);
            
            done();
        })
    })
})
