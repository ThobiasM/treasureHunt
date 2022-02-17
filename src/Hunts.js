let hunt = {
  hunt_id: 1,
  hunt_name: "Martins utdrikningslag",
  locations: [
    {
      post_id: 1,
      post_name: "Nydalen Bryggeri",
      coordinates: {
        lat: 59.950313170793166,
        lng: 10.76434599639627,
      },
      radius: 50,
      hint: "Lønningspils",
      isFound: false,
    },
    {
      post_id: 2,
      post_name: "BI Nydalen",
      coordinates: {
        lat: 59.949107987046006,
        lng: 10.768578221529944,
      },

      radius: 50,
      hint: "Betalt utdanning, Frederik",
      isFound: false,
    },
    {
      post_id: 3,
      post_name: "Fly Chicken Storo",
      coordinates: {
        lat: 59.947482697043675,
        lng: 10.770985011587864,
      },

      radius: 50,
      hint: "Dagen derpå-mat",
      isFound: false,
    },
    
  ],
  finalMessage: "Wow du er flink ass",
};

export async function fetchHunt() {
  // return Promise.resolve(hunt);

  return fetch('http://localhost:3001/hunt').then(result => result.json());
}

export default hunt;
