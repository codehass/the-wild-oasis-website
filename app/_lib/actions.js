"use server"

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth"
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split('%');

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error("Please provide a valid nationalID")

  const updateData = { nationality, countryFlag, nationalID };

  console.log(updateData);

  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId)

  if (error) throw new Error('Guest could not be updated');

  revalidatePath('/account/profile');
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map(booking => booking.id);
  if (!guestBookingsIds.includes(bookingId)) throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

  if (error) throw new Error('Booking could not be deleted');

  revalidatePath('/account/reservations');
}

export async function updateReservation(formData) {
  //authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const bookingId = Number(formData.get("bookingId"));
  const reservations = await getBookings(session.user.guestId);
  const reservationIds = reservations.map(booking => booking.id);

  // authorization
  if (!reservationIds.includes(bookingId)) throw new Error("You are not allowed to update this reservation");

  const updatedData = { numGuests: formData.get("numGuests"), observations: formData.get("observations").slice(0, 1000) };

  //mutation
  const { error } = await supabase
    .from('bookings')
    .update(updatedData)
    .eq('id', bookingId)
    .select()
    .single();

  //error handling
  if (error) throw new Error('Booking could not be updated');

  // revalidation
  revalidatePath(`/account/reservations/${bookingId}`);
  revalidatePath('/account/reservations');

  // redirection
  redirect('/account/reservations');
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' })
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' })
}