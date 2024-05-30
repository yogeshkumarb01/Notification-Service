self.addEventListener('push', event => {
  try {
    const data = event.data.json();
    console.log('Push Received:', data);

    const options = {
      body: data.body || 'Notified by KBTechserver',
      icon: 'images/cell.png',
      vibrate: [100, 50, 100],
      actions: [
        { action: 'explore', title: 'Explore this new world' },
        { action: 'close', title: 'Close notification' }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  } catch (err) {
    console.error('Error handling push event:', err);
  }
});

self.addEventListener('notificationclick', event => {
  const action = event.action;

  if (action === 'explore') {
    console.log('Explore action clicked');
    // Add code to handle the 'explore' action
  } else if (action === 'close') {
    console.log('Close action clicked');
    // Add code to handle the 'close' action
  }

  event.notification.close();
});
