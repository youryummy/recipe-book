//import chai from 'chai';
//import chaiHttp from 'chai-http';
//import sinon from 'sinon';

//import RecipesBook from '../../mongo/recipesBook';
//import { strict as assert } from 'node:assert';
//import mocks from "../mocks/index.js";
//import { deleteRecipesBook, findByRecipesBookId, findByUserId, getRecipesBook, updateRecipesBook } from '../../services/recipesBookManager';

//chai.use(chaiHttp);
//chai.expect();
//chai.should();

//const apiURL = "http://localhost:8080"



//const req = {}, res = {}, mocklist = []; 
//const assertRequest = (expectedCode, expectedData, done) => {
//    console.log("expectedCode: ", expectedCode)
//    console.log("expectedData: ", expectedData)
//    res.send = (data) => { 
//        console.log("data: ", data)
//        try {
//            assert.deepStrictEqual(data, expectedData); 
//            done(); 
//        } catch(err) {
//            done(err);
//        }
//    }
//    res.status = (code) => { 
//        console.log("code: ", code)
//        try {
//            assert.deepStrictEqual(code, expectedCode); 
//            return res; 
//        } catch(err) { 
//            if (code >= 400) done(err);
//            else res.status = () => done(err);
//        }
//    };
//}


//describe("get Recipes Books Manager", () => {
//    let breaker;
//    const fixture = (dbResponse, throwException = false) => {
//        breaker = mocks.circuitBreaker(throwException, "Circuit is open").fire("find", dbResponse);
//    }

//    beforeEach(() => {
//        res.locals = { oas: {}}
//    });

//    afterEach(() => {
//        breaker?.restore();
//    });

//    it("Should return 200 when Recipes Book found in DB", () => {
//        fixture([{ name: "test", summary: "test", recipeList: "test", idUser: "test" }]);
//        findByRecipesBookId(req, res);
//        assertRequest(200, [{ name: "test", summary: "test", recipeList: "test", idUser: "test" }], done);
//    });

//    it("Should return 200 with empty list when no Recipes Books found in DB", () => {
//        fixture([]);
//        findByRecipesBookId(req, res);
//        assertRequest(200, [], done);
//    });

//    it("Should return 500 when DB fails", () => {
//        fixture([], true);
//        findByRecipesBookId(req, res);
//        assertRequest(500, { message: "Unexpected error ocurred, please try again later" }, done);
//    });
//});

//describe("get User Id", () => {
//    const fixture = (username) => {
//        res.locals.oas.params = { username }
//    }

//    beforeEach(() => {
//        res.locals = { oas: {}}
//    });

//    it("Should return 200 when user found in DB", (done) => {
//        fixture("test");
//        findByUserId(req, res);
//        assertRequest(200, "test", done, (data) => data?.username);
//    });

//    it("Should return 500 when user not found in DB", (done) => {
//        fixture("testNotFound");
//        findByUserId(req, res);
//        assertRequest(500, {message: `Account with username '${res.locals.oas.params.username}' does not exist`}, done);
//    });
//});


//describe("get Recipes Books", () => {
//    let breaker;
//    const fixture = (dbResponse, throwException = false) => {
//        breaker = mocks.circuitBreaker(throwException, "Circuit is open").fire("find", dbResponse);
//    }

//    beforeEach(() => {
//        res.locals = { oas: {}}
//    });

//    afterEach(() => {
//        breaker?.restore();
//    });

//    it("Should return 200 when recipes books found in DB", (done) => {
//        fixture([{ name: "test", summary: "test", recipeList: "test", idUser: "test" }]);
//        getRecipesBook(req, res);
//        assertRequest(200, [{ name: "test", summary: "test", recipeList: "test", idUser: "test" }], done);
//    });

//    it("Should return 200 with empty list when no recipes books found in DB", (done) => {
//        fixture([]);
//        getRecipesBook(req, res);
//        assertRequest(200, [], done);
//    });

//    it("Should return 500 when DB fails", (done) => {
//        fixture([], true);
//        getRecipesBook(req, res);
//        assertRequest(500, { message: "Unexpected error ocurred, please try again later" }, done);
//    });
//});

//describe("post Recipes Book", () => {
//    let breaker;
//    const fixture = (_id, body, dbResponse, throwException = false, reason) => {
//        res.locals.oas.params = _id;
//        res.locals.oas.body = { RecipesBookInfo: body };
//        breaker = mocks.circuitBreaker(throwException, reason).fire("create", dbResponse);
//    }

//    beforeEach(() => {
//        res.locals = { oas: {}}
//        req.file = null;
//    });

//    afterEach(() => {
//        breaker?.restore();
//    });

//    it("Should return 200 when recipes book updated successfully", (done) => {
//        fixture("oldTest", { _id: "test" }, { _id: "oldTest" });
//        addRecipesBook(req, res);
//        assertRequest(200, undefined, done);
//    });

//    it("Should return 404 when user does not exist", (done) => {
//        fixture("oldTest", { _id: "test" }, null);
//        addRecipesBook(req, res);
//        assertRequest(404, {message: `Recipes Book with id '${res.locals.oas.params._id}' does not exist`}, done);
//    });

//    it("Should return 500 when database fails", (done) => {
//        fixture("oldTest", { _id: "test" }, null, true, {message: "Circuit is open"});
//        addRecipesBook(req, res);
//        assertRequest(500, {message: 'Unexpected error ocurred, please try again later'}, done);
//    });
//});

//describe("put Recipes Book", () => {
//    let breaker;
//    const fixture = (_id, body, dbResponse, throwException = false, reason) => {
//        res.locals.oas.params = _id;
//        res.locals.oas.body = { RecipesBookInfo: body };
//        breaker = mocks.circuitBreaker(throwException, reason).fire("findOneAndUpdate", dbResponse);
//    }
//
//    beforeEach(() => {
//        res.locals = { oas: {}}
//        req.file = null;
//    });

//    afterEach(() => {
//        breaker?.restore();
//    });

//    it("Should return 204 when recipes book updated successfully", (done) => {
//        fixture("oldTest", { _id: "test" }, { _id: "oldTest" });
//        updateRecipesBook(req, res);
//        assertRequest(204, undefined, done);
//    });

//    it("Should return 404 when user does not exist", (done) => {
//        fixture("oldTest", { _id: "test" }, null);
//        updateRecipesBook(req, res);
//        assertRequest(404, {message: `Recipes Book with id '${res.locals.oas.params._id}' does not exist`}, done);
//    });

//    it("Should return 500 when database fails", (done) => {
//        fixture("oldTest", { _id: "test" }, null, true, {message: "Circuit is open"});
//        updateRecipesBook(req, res);
//        assertRequest(500, {message: 'Unexpected error ocurred, please try again later'}, done);
//    });
//});

//describe("delete Recipes Book", () => {
//    let breaker;
//    const fixture = (_id, dbResponse, throwException = false, reason) => {
//        res.locals.oas.params = _id;
//        breaker = mocks.circuitBreaker(throwException, reason).fire("findOneAndDelete", dbResponse);
//    }

//    beforeEach(() => {
//        res.locals = { oas: {}}
//        req.file = null;
//    });

//    afterEach(() => {
//        breaker?.restore();
//    });

//    it("Should return 204 when recipes book is deleted successfully", (done) => {
//        fixture("test", { username: "test" });
//        deleteRecipesBook(req, res);
//        assertRequest(204, undefined, done);
//    });

//    it("Should return 400 when recipes book does not exist", (done) => {
//        fixture("test", undefined);
//        deleteRecipesBook(req, res);
//        assertRequest(400, undefined, done);
//    });

//});
