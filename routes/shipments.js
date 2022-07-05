"use strict";

const express = require("express");
const router = new express.Router();

const jsonschema = require("jsonschema");
const orderSchema = require("../schema/order.json");

const { shipProduct } = require("../shipItApi");
const { BadRequestError } = require("../expressError")

/** POST /ship
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Validates data
 *
 * Returns { shipped: shipId } if valid
 *
 * or badRequestError if data isn't valid
 */

router.post("/", async function (req, res, next) {
  const { productId, name, addr, zip } = req.body;
  const result = jsonschema.validate(
    { productId, name, addr, zip }, orderSchema, { required: true }
  );
  if (!result.valid) {
    const errs = result.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }
  const shipId = await shipProduct({ productId, name, addr, zip });
  return res.json({ shipped: shipId });
});


module.exports = router;