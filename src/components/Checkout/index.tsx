"use client";

import TijuanidadBackendAPI from "@/Api/TijuanidadBackendAPI";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import styles from "./Checkout.module.css";

const stripePromise = loadStripe(
  "pk_test_51OYGgZJVvNtALDeqti9jb7VJm18ZQ793yPzSw4inm4sr6KVi3HGXG4Jr9lQsDJsX3T3rquezSg4EFGgjz8WzqpqB008tvDVLNF"
);

export default function Checkout() {
  const [loading, setloading] = useState(true);
  const [clientSecret, setClientSecret] = useState();
  const client_secret =
    "cs_test_a1vtfJdssBla0xU3b6WpLqSzUULjDRaTbn8Ex4srPRD9NOMLrlcmgbZkSB_secret_fidwbEhqYWAnPydgaGdgYWFgYScpJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ3dgYWx3YGZxSmtGamh1aWBxbGprJz8nZGlyZHx2J3gl";
  useEffect(() => {
    console.log("cargando checkout");
    TijuanidadBackendAPI()
      .post("/stripe/create-checkout-session", {
        contact_id: "6567762b93b34bfd839588ce",
        product_id: "6567a76493b34bfd83958907",
        address: "Dirección",
        city: "Ciudad",
        date: "2023-12-01T00:00:00.000Z",
        notes: "Notas",
        time: "Hora",
        meridian: "AM/PM",
        adults: 2,
        children: 1,
        accepted: 0,
        accepted_at: "2023-12-01T00:00:00.000Z",
        completed: 0,
        completed_at: "2023-12-01T00:00:00.000Z",
        status: "Estado",
        created_at: "2023-12-01T00:00:00.000Z",
        updated_at: "2023-12-01T00:00:00.000Z",
      })
      .then(({ data }) => {
        setClientSecret(data);
      });
  }, []);
  return (
    <div style={{ width: "90vw", height: "80vh" }}>
      <div style={{ width: "inherit", height: "inherit" }}>
        {!client_secret ? (
          <div>esta cargando</div>
        ) : (
          <div
            id="checkout"
            className={styles.Checkout_Container}
            style={{ width: "inherit", height: "inherit" }}
          >
            {clientSecret && (
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ clientSecret: clientSecret }}
              >
                <EmbeddedCheckout className={styles.Checkout} />
              </EmbeddedCheckoutProvider>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
