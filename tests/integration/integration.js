import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

const recipeBookController = {
    deleteRecipesBook: sinon.stub().resolves(),
    findByRecipesBookId: sinon.stub().resolves(),
    findByUserId: sinon.stub().resolves(),
    getRecipesBook: sinon.stub().resolves(),
    updateRecipesBook: sinon.stub().resolves(),
    addRecipesBook: sinon.stub().resolves(),
};

describe('recipeBookController.getRecipesBook()', () => {
    it('should call recipeBookController.getRecipesBook()', async () => {
      const req = {
        query: {
        }
      };

      const res = {
        send: sinon.stub()
      };
  
      await recipeBookController.getRecipesBook(req, res);
      expect(recipeBookController.getRecipesBook).to.have.been.calledWith(req, res);
    });
});

describe('recipeBookController.addRecipesBook()', () => {
    it('should call recipeBookController.addRecipesBook() with the correct arguments', () => {
      const req = {
        body: {
            idUser: "testUser", 
            name: "Test recipebook", 
            summary: "Test summary", 
            recipeList: ["21312", "4331ffa"]
        }

      };

      const res = {
        send: sinon.stub()
      };
  
      recipeBookController.addRecipesBook(req, res);
      expect(recipeBookController.addRecipesBook).to.have.been.calledWith(req, res);
    });
});

describe('recipeBookController.findByUserId()', () => {
    it('should call recipeBookController.findByUserId() with the correct arguments', async () => {
      const req = {
        params: {
          id: '12345'
        }
      };

      const res = {
        send: sinon.stub()
      };
  
      await recipeBookController.findByUserId(req, res);
      expect(recipeBookController.findByUserId).to.have.been.calledWith(req, res);
    });
});

describe('recipeBookController.findByRecipesBookId()', () => {
    it('should call recipeBookController.findByRecipesBookId() with the correct arguments', async () => {
      const req = {
        params: {
          id: '12345'
        }
      };

      const res = {
        send: sinon.stub()
      };
  
      await recipeBookController.findByRecipesBookId(req, res);
      expect(recipeBookController.findByRecipesBookId).to.have.been.calledWith(req, res);
    });
});

describe('recipeBookController.updateRecipesBook()', () => {
    it('should call recipeBookController.updateRecipesBook() with the correct arguments', async () => {
      const req = {
        params: {
          id: '12345'
        },
        body: {
            idUser: "testUser2", 
            name: "Test recipebook2", 
            summary: "Test summary2", 
            recipeList: ["11111", "22222"]
        }
      };

      const res = {
        send: sinon.stub()
      };
  
      await recipeBookController.updateRecipesBook(req, res);
      expect(recipeBookController.updateRecipesBook).to.have.been.calledWith(req, res);
    });
});

describe('recipeBookController.deleteRecipesBook()', () => {
    it('should call recipeBookController.deleteRecipesBook() with the correct arguments', async () => {
        const req = {
            params: {
                id: '12345'
            }
        };

        const res = {
            send: sinon.stub()
        };
  
        await recipeBookController.deleteRecipesBook(req, res);
        expect(recipeBookController.deleteRecipesBook).to.have.been.calledWith(req, res);
    });
});
