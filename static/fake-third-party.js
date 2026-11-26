// Stand-in third-party script for the third-party-scripts feature test.
// Under Partytown this runs in a web worker; the DOM write is proxied to the main thread.
window.__fakeThirdParty = { ranAt: Date.now() };
document.documentElement.setAttribute('data-fake-third-party', 'ran');
