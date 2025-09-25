import { API_URL } from "./src/config";


export async function login(email, password) {
    const URL = API_URL + "login"
    const res = await fetch(URL, {
    //const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Invalid credentials");

    const data = await res.json();
    localStorage.setItem("token", data.token); // Save JWT
    return data;
}