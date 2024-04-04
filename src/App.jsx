  import React, { useState } from "react";

  export default function App() {
    const [name, setName] = useState("");
    const [ip, setIp] = useState("");

    const url = `https://api.godaddy.com/v1/domains/akashgaur.xyz/records`;

    const data = {
          data: ip,
          name: name,
          ttl: 600,
          type: "A",
    };

    async function register(e) {
      try {
        e.preventDefault();
        const response = await fetch(url, {
          method: "PATCH",
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `sso-key ${import.meta.env.VITE_GODADDY_KEY}:${
              import.meta.env.VITE_GODADDY_SECRET
            }`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const data2 = await response.json();
        console.log(data2);
      } catch (error) {
        console.log(error.message);
      }
    }

    return (
      <div className="app">
        <div className="app-layout">
          <h1 className="heading">
            Domain <span>Registration</span>
          </h1>
          <form className="form" onSubmit={register}>
            <div className="form-row">
              <label htmlFor="name">Domain Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="ip">IP Address</label>
              <input
                type="text"
                id="ip"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
              />
            </div>
            <button className="submit-btn" id="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
