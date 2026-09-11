const API_BASE_URL = "http://localhost:8080";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  console.log(
    "API URL:",
    `${API_BASE_URL}${endpoint}`
  );

  console.log(
    "Token exists:",
    !!token
  );

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",

        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),

        ...(options.headers || {}),
      },
    }
  );

  console.log(
    "API status:",
    response.status
  );

  const text = await response.text();

  console.log(
    "API response:",
    text
  );

  if (!response.ok) {
    throw new Error(
      text ||
        `Request failed with status ${response.status}`
    );
  }

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}


// ============================
// DASHBOARD
// ============================

export const getDashboard = () => {
  return request("/api/admin/dashboard");
};


// ============================
// DASHBOARD DEMAND
// ============================

export const getDashboardDemand = () => {
  return request(
    "/api/admin/dashboard/demand"
  );
};