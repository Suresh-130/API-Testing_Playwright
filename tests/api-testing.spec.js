const { test, expect } = require('@playwright/test')
const faker = require('faker')
require("dotenv").config()

import { LoginPage } from '../pages/login.page';
import { FakeDataPage } from '../pages/fakeDynamicData';
import { CreateBooking } from '../pages/createBooking';
import { BookingIds } from '../pages/getBooking.page';
import { BookingById } from '../pages/bookingsByid';
import { UpdateBooking } from '../pages/updateBooking.page';
import { DeleteBooking } from '../pages/deleteBooking.page';
import { PartialUpdateBooking } from '../pages/partialUpdating';

var authToken;
var bookingId;

test.beforeAll('Login and Token Generation', async({ request }) => {
  const loginPage = new LoginPage(request);
  authToken = await loginPage.tokenGeneration(process.env.baseUrl+"auth");
  expect(authToken).not.toBeUndefined();
});

test.beforeAll('Api POST Request - Creating new Booking', async({ request }) => {
  const createBooking = new CreateBooking(request)
  const fakeDataPage = new FakeDataPage();
  const fakeData =  fakeDataPage.dynamicFakeData();
  const postResponse = await createBooking.addBooking(authToken,fakeData,process.env.baseUrl+"booking");
  expect(postResponse.status()).toBe(200);
  const postResponseBody = await postResponse.json();
  expect(postResponseBody.bookingid).not.toBeNull();
  bookingId = postResponseBody.bookingid;
})

test('Api GET Request - Getting Booking Ids', async({ request }) => {
  const bookingIds = new BookingIds(request);
  const getResponse = await bookingIds.getBookingIds(process.env.baseUrl+"booking");
  expect(getResponse.status()).toBe(200);
  const getResponseBody = await getResponse.json();
  expect(getResponseBody.length).toBeGreaterThanOrEqual(1);
})

test('Api Get Request  - Getting one Booking Data', async({ request }) => {
  const bookingsById = new BookingById(request);
  const getOneResponse = await bookingsById.getBookingsById(process.env.baseUrl+"booking/"+bookingId);
  expect(getOneResponse.status()).toBe(200);
})

test('Api PUT Request - Updating the created Booking data', async({ request }) => {
  const updateBooking = new UpdateBooking(request);
  const fakeDataPage = new FakeDataPage();
  const fakeData =  fakeDataPage.dynamicFakeData();
  const putResponse = await updateBooking.updateTheBooking(authToken,fakeData,process.env.baseUrl+"booking/"+bookingId);
  expect(putResponse.status()).toBe(200);
})

test('Api PATCH Request - Partial Updating the created Booking data', async({ request }) => {
  const partialUpdateBooking = new PartialUpdateBooking(request);
  const fakeDataPage = new FakeDataPage();
  const fakeData =  fakeDataPage.dynamicFakeData();
  const updateResponse = await partialUpdateBooking.partialUpdateTheBooking(authToken,fakeData,process.env.baseUrl+"booking/"+bookingId);
  expect(updateResponse.status()).toBe(200);
})

test('Api Delete Request - Deleting the Updated data', async({ request }) => {
  const deleteBooking = new DeleteBooking(request);
  const deleteResponse = await deleteBooking.deleteBookingById(authToken,process.env.baseUrl+"booking/"+bookingId);
  expect(deleteResponse.status()).toBe(201);
})

