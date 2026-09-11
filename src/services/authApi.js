const API_BASE_URL = "http://localhost:8080";

export async function loginUser(email, password) {
  const response = await fetch(
    `${API_BASE_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password,
      }),
    }
  );

  const text = await response.text();

  let data;

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Backend returned an invalid response.");
  }

  console.log("LOGIN STATUS:", response.status);
  console.log("LOGIN RESPONSE:", data);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        `Login failed with status ${response.status}`
    );
  }

  if (!data?.token) {
    throw new Error(
      "Login successful response did not contain a token."
    );
  }

  if (data?.user?.role !== "ADMIN") {
    throw new Error(
      "This login is only for an ADMIN account."
    );
  }

  return data;
}