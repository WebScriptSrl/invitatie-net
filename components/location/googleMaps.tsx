"use client";

export default function GoogleMapsLocation() {
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position: GeolocationPosition) => {
    console.log(position);
    console.log(position.coords.latitude, position.coords.longitude);
  };

  return (
    <div>
      <h1>Location</h1>
      <button onClick={getLocation}>Get Location</button>

      <p>
        <strong>Latitude:</strong> {}
        <span id="latitude"></span>
      </p>

      <p>
        <strong>Longitude:</strong> <span id="longitude"></span>
      </p>

      <p>
        <strong>Accuracy:</strong> <span id="accuracy"></span>
      </p>

      <iframe
        width="600"
        height="450"
        referrerPolicy="no-referrer-when-downgrade"
        loading="lazy"
        allowFullScreen
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAdAqKJ4OE4tRfYEpqD-a4J1Ru5nY1rhYA
    &q=Amiral+Events+Style,Cluj-Napoca,RO"
      ></iframe>
    </div>
  );
}
