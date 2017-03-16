'use strict';

/**
 * Module dependencies
 */
var listingsPolicy = require('../policies/listings.server.policy'),
  listings = require('../controllers/listings.server.controller');

module.exports = function (app) {
  // Listings collection routes
  app.route('/api/listings').all(listingsPolicy.isAllowed)
    .get(listings.list)
    .post(listings.create);

  // Single listing routes
  app.route('/api/listings/:listingId').all(listingsPolicy.isAllowed)
    .get(listings.read)
    .put(listings.update)
    .delete(listings.delete);

  // Finish by binding the listing middleware
  app.param('listingId', listings.listingByID);
};
