const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const cropSchema = require('../model/cropSchema');
const assert = require('assert');
const { expect } = chai;
chai.use(chaiHttp);
describe("GET-PORT API TEST", () => {
  it("GET-API ", done => {
    chai
      .request("http://localhost:3000")
      .get("/reports?id=612cacb067e1703977687f3a")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect({
              "_id":"612cacb067e1703977687f3a",
              "users":["u1","u2"],
              "marketID":"m1",
              "marketName":"mn",
              "cmdtyID":"c1",
              "cmdtyName":"cm",
              "priceUnit":"Kg",
              "price":15,
              "__v":0
          })
        done();
      });
  });


  it('Creates a New User', (done) => {
     chai
      .request("http://localhost:3000")
      .post('/reports')
      .end ( (err,res) => {
        const newCrop = new cropSchema(
          {
           "userID ":  "user-2 ",
           "marketID ":  "market-1 ",
           "marketName ":  "Vashi Navi Mumbai ",
           "cmdtyID ":  "cmdty-1 ",
           "cmdtyName ":  "Potato ",
           "priceUnit ":  "Quintal ",
           "convFctr ": 100,
           "price ": 1600
          }
         )
        newCrop.save() 
           .then(() => {
             expect(res.body.status).to.equals("success");
             expect(res.body.message).to.equals(newCrop._id);
           });
        done();
      } ) ;
});


});