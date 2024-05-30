const publicVapidKey = "BCrHqIBE3KzL79YgwfFghSPUFL_f4j5hZy8NMi63jjf_4QLVMWsra2WYN5LWffDkBsNx3Hm7Tnm0_awpxZxp5PI";

if ("serviceWorker" in navigator) {
  send().catch(err => console.error("Service Worker registration failed:", err));
}

async function send() {
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });
  console.log("Service Worker registered...");

  console.log("Registering push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log("Push registered...");

  console.log("Sending push subscription to server...");
  const response = await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to send subscription to server');
  }

  console.log("Push subscription sent to server...");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
