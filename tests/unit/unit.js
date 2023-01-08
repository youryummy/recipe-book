import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

let recipesBookId;
let userId;
let recipesBookPOST = { name: "test_POST", summary: "test_POST", recipeList: "test_POST", idUser: "test_POST" }
let recipesBookPUT = { name: "test_PUT", summary: "test_PUT", recipeList: "test_PUT", idUser: "test_PUT" }

const apiURL = "http://localhost:8080"

describe('get Recipes Books', () => {
    it('should return all recipes books', () => {
        chai.request(apiURL)
        .get('/api/v1/recipesbooks')
        .end((err, res) => {
            res.body.should.be.a('object');
        })
    })
})

describe('post Recipes Books', () => {
    it('should add an recipes book', () => {
        chai.request(apiURL)
        .post('/api/v1/recipesbooks')
        .send(recipesBookPOST)
        .end((err, res) => {
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('summary');
            res.body.should.have.property('recipeList');
            res.body.should.have.property('idUser');

            recipesBookId = res.body._id;
            userId = res.body.idUser;
        })
    })
})

describe('get Recipes Book by Id', () => {
    it('should get recipes book by id', () => {
        chai.request(apiURL)
        .get('/api/v1/recipesbooks/' + recipesBookId)
        .end((err, res) => {
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql(recipesBookPOST.name);
            res.body.should.have.property('summary').eql(recipesBookPOST.summary);
            res.body.should.have.property('recipeList').eql(recipesBookPOST.recipeList);
            res.body.should.have.property('idUser').eql(recipesBookPOST.idUser);
            res.body.should.have.property('_id').eql(recipesBookId);
        })
    })
})

describe('put Recipes Book', () => {
    it('should update recipes book', () => {
        chai.request(apiURL)
        .put('/api/v1/recipesbooks/' + recipesBookId)
        .send(recipesBookPUT)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
        })
    })
})

describe('delete Recipes Book', () => {
    it('should delete recipes book', () => {
        chai.request(apiURL)
        .delete('/api/v1/recipesbooks' + recipesBookId)
        .end((err, res) => {
            res.should.have.status(204);
        })
    })
})

describe('get Recipes Book by Id User', () => {
    it('should get recipes book by id user', () => {
        chai.request(apiURL)
        .get('/api/v1/recipesbooks/' + userId)
        .end((err, res) => {
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql(recipesBookPOST.name);
            res.body.should.have.property('summary').eql(recipesBookPOST.summary);
            res.body.should.have.property('recipeList').eql(recipesBookPOST.recipeList);
            res.body.should.have.property('idUser').eql(recipesBookPOST.idUser);
            res.body.should.have.property('_id').eql(recipesBookId);
        })
    })
})
