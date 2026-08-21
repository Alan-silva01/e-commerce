export default function medusaError(error: any): never {
  if (error?.response) {
    const rawMessage = error.response.data?.message || error.response.data || "Unknown Medusa API error"
    const messageStr = typeof rawMessage === "string" ? rawMessage : JSON.stringify(rawMessage)

    throw new Error(messageStr.charAt(0).toUpperCase() + messageStr.slice(1) + ".")
  } else if (error?.request) {
    throw new Error("No response received: " + (typeof error.request === "string" ? error.request : "Network error"))
  } else {
    throw new Error("Error setting up the request: " + (error?.message || "Unknown error"))
  }
}
