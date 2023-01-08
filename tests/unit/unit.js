import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.expect();
chai.should();

let recipesBookId;
let recipesBookPOST = { name: "test", summary: "test", recipeList: "test", idUser: "test" }
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
        .get('/api/v1/recipesbooks')
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

describe('get id of Recipes Book', () => {
    it('get id of an recipes book', () => {
        chai.request(apiURL)
        .get('/api/v1/recipesbooks')
        .end((err, res) => {
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql(recipesBookPOST.name);
            res.body.should.have.property('summary').eql(recipesBookPOST.summary);
            res.body.should.have.property('recipeList').eql(recipesBookPOST.recipeList);
            res.body.should.have.property('idUser').eql(recipesBookPOST.idUser);
        })
    })
})