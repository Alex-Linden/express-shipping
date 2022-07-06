"use strict";
const axiosMockAdapter = require('axios-mock-adapter');
const axios = require("axios");
const axiosMock = new axiosMockAdapter(axios);
const {
  shipProduct,
  SHIPIT_SHIP_URL
} = require("./shipItApi",);


test("shipProduct", async function () {
  console.log("axiosMock")
  axiosMock.onPost(SHIPIT_SHIP_URL).reply(200, {
    receipt:{
      shipId: 1000

    }
    });
  const shipId = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });

  expect(shipId).toEqual(expect.any(Number));
});
