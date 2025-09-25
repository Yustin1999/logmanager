import { API_URL } from "./src/config";


export async function login(email, password) {
    const res = await fetch(API_URL + "login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Invalid credentials");

    const data = await res.json();
    localStorage.setItem("token", data.token); // Save JWT
    return data;
}