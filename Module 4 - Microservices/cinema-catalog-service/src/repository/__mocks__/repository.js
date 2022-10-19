const cinemaCatalog = [{
    _id: "62fd892101bb53c21e39823d",
    cidade: "Gravataí",
    uf: "RS",
    cinemas: []
}, {
    _id: "62fd892101bb53c21e39823e",
    cidade: "Porto Alegre",
    uf: "RS",
    pais: "BR",
    cinemas: [{
        _id: "62fd892101bb53c21e39823b",
        nome: "Cinemark Bourbon Ipiranga",
        salas: [{
            nome: 1,
            sessoes: [{
                data: new Date("2021-03-01T09:00:00Z"),
                idFilme: "62f6a740fd44cfd408cc7634",
                filme: "Vingadores: Guerra Infinita",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                }]
            }, {
                data: new Date("2021-03-01T11:00:00Z"),
                idFilme: "62f6a740fd44cfd408cc7634",
                filme: "Vingadores: Guerra Infinita",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }, {
                data: new Date("2021-06-01T13:00:00Z"),
                idFilme: "62f6a740fd44cfd408cc7635",
                filme: "Vingadores: Era de Ultron",
                valor: 20.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }]
        }, {
            nome: 2,
            sessoes: [{
                data: new Date("2021-03-01T09:00:00Z"),
                idFilme: "62f6a740fd44cfd408cc7635",
                filme: "Vingadores: Era de Ultron",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                },]
            }, {
                data: new Date("2021-03-01T11:00:00Z"),
                idFilme: "62f6a740fd44cfd408cc7633",
                filme: "Vingadores: Ultimato",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }, {
                data: new Date("2021-03-01T13:00:00Z"),
                idFilme: "62f6a740fd44cfd408cc7633",
                filme: "Vingadores: Ultimato",
                valor: 20.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }]
        }]
    }, {
        _id: "62fd892101bb53c21e39823c",
        nome: "GNC Lindóia",
        salas: [{
            nome: 100,
            sessoes: [{
                data: new Date("2021-03-30T19:00:00Z"),
                idFilme: "62f6a740fd44cfd408cc7633",
                filme: "Vingadores: Ultimato",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                },]
            }, {
                data: new Date("2021-03-30T11:00:00Z"),
                idFilme: "62f6a740fd44cfd408cc7633",
                filme: "Vingadores: Ultimato",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }, {
                data: new Date("2021-03-30T13:00:00Z"),
                idFilme: "62f6a740fd44cfd408cc7635",
                filme: "Vingadores: Era de Ultron",
                valor: 20.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }]
        }]
    }]
}]

;

function getAllCities() {
  return cinemaCatalog.map(catalog => {
    return {
      _id: catalog._id,
      pais: catalog.pais,
      uf: catalog.uf,
      cidade: catalog.cidade
    }
  });
}

function getMoviesByCityId(cityId) {
	if (cityId < 0) return null;
	return getMoviesByCinemaId();
}

function getCinemasByCityId(cityId) {
	if (cityId < 0) return null;
	return cinemaCatalog[cinemaCatalog.length -1].cinemas;
}
  
function getMoviesByCinemaId(cinemaId) {
	if (cinemaId < 0) return null;
	return getCinemasByCityId().map(cinema => {
		return {
			_id: cinema.salas[0].sessoes[0].idFilme,
			filme: cinema.salas[0].sessoes[0].filme
		}
	});
}
  
function getMovieSessionsByCityId(movieId, cityId) {
	if (movieId < 0 || cityId < 0) return null;
	return getCinemasByCityId().map(cinema => {
		return {
			_id: cinema.salas[0].sessoes[0].idFilme,
			filme: cinema.salas[0].sessoes[0].filme,
			idCinema: cinema._id,
			cinema: cinema.nome,
			sala: cinema.salas[0],
			sessao: cinema.salas[0].sessoes[0]
		}
	});
}
  
function getMovieSessionsByCinemaId(movieId, cinemaId) {
	return getMovieSessionsByCityId(movieId, cinemaId);
}
  
  module.exports = { 
    getAllCities,
    getCinemasByCityId, 
    getMoviesByCinemaId, 
    getMoviesByCityId, 
    getMovieSessionsByCityId,
    getMovieSessionsByCinemaId
  };