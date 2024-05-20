const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDAyNzg5ZGYxMGZiZjQyMDc5M2U1NzkyNmQ4MjVhZSIsInN1YiI6IjY2NGIzN2JjMzhkN2FhZDhjOTc5ODY0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIgkgH2xiN6PfwPvrxDNHcWV4SkbscWNgdIScZWboEc'
    }
  };
  
//   fetch('https://api.themoviedb.org/3/account/21279439', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

async function callingGenres(){
    const call = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    const data = await call.json()
    console.log(data)
}

callingGenres()