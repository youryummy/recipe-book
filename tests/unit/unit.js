import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.expect();
chai.should();

let recipesBookId;
let recipesBookPOST = { name: "test_POST", summary: "test_POST", recipeList: "test_POST", idUser: "test_POST" }
let recipesBookPUT = { name: "test_PUT", summary: "test_PUT", recipeList: "test_PUT", idUser: "test_PUT" }

const apiURL = "http://localhost:8080"

describe('get Recipes Books', () => {
    it('should return all recipes books', () => {
        chai.request(apiURL)
        .get('/api/v1/recipesbooks')
        .end((err, res) => {
            res.body.should.be.a('object');
            expect(res.body.result).to.have.length.greaterThan(0);
        })
    })
})

describe('post Recipes Books', () => {
    it('should post an recipes book', () => {
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
        })
    })
})

describe('get id Recipes Book', () => {
    it('should get id of an recipes book', () => {
        chai.request(apiURL)
        .get('/api/v1/recipesbooks' + recipesBookId)
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
        .put('/api/v1/recipesbooks' + recipesBookId)
        .send(recipesBookPUT)
        .end((err, res) => {
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql(recipesBookPUT.name);
            res.body.should.have.property('summary').eql(recipesBookPUT.summary);
            res.body.should.have.property('recipeList').eql(recipesBookPUT.recipeList);
            res.body.should.have.property('idUser').eql(recipesBookPUT.idUser);
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