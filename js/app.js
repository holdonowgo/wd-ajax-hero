(function() {
    'use strict';

    const movies = [];

    const renderMovies = function() {
        $('#listings').empty();

        for (const movie of movies) {
            const $col = $('<div>').addClass('col s6');
            const $card = $('<div>').addClass('card hoverable');
            const $content = $('<div>').addClass('card-content center');
            const $title = $('<h6>').addClass('card-title truncate');

            $title.attr({
                'data-position': 'top',
                'data-tooltip': movie.title
            });

            $title.tooltip({
                delay: 50
            }).text(movie.title);

            const $poster = $('<img>').addClass('poster');

            $poster.attr({
                src: movie.poster,
                alt: `${movie.poster} Poster`
            });

            $content.append($title, $poster);
            $card.append($content);

            const $action = $('<div>').addClass('card-action center');
            const $plot = $('<a>');

            $plot.addClass('waves-effect waves-light btn modal-trigger');
            $plot.attr('href', `#${movie.imdbID}`);
            $plot.text('Plot Synopsis');

            $action.append($plot);
            $card.append($action);

            const $modal = $('<div>').addClass('modal').attr('id', movie.imdbID);
            const $modalContent = $('<div>').addClass('modal-content');
            const $modalHeader = $('<h4>').text(movie.title);
            const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
            const $modalText = $('<p>').text(movie.plot);

            $modalContent.append($modalHeader, $movieYear, $modalText);
            $modal.append($modalContent);

            $col.append($card, $modal);

            $('#listings').append($col);

            $('.modal-trigger').leanModal();
        }
    };

    // ADD YOUR CODE HERE
    let btnSubmit = document.querySelector('button');
    let textSearch = document.querySelector('input');

    textSearch.setAttribute('required', 'true');

    btnSubmit.addEventListener('click', function(evt) {
        evt.preventDefault();

        movies.length = 0;

        let title = textSearch.value;

        if (textSearch.value === '') {
            Materialize.toast('No Name Provided!', 4000);
        } else {
            let results = fetch(`http://www.omdbapi.com/?s=${title}`)
                .then(function(result) {
                    return result.json();
                })
                .then(function(json) {
                    let newMovies = json.Search.map(function(movie) {
                        return {
                            id: movie.imdbId,
                            title: movie.Title,
                            poster: movie.Poster,
                            year: movie.Year,
                            imdbID: movie.imdbID
                        };
                    })
                    for (let movie of newMovies) {
                        movies.push(movie);
                    };
                    return;
                })
                .then(function() {
                    renderMovies();
                })
            // createMovieCard();
        }
    });

    // function createMovieCard() {
    //   let main = document.querySelector('main');
    //
    //   let divRow = document.createElement('div');
    //   div.class = 'row';
    //   main.appendChild(divRow);
    //
    //   let divCol = document.createElement('div');
    //   divCol.class = 'col s12 m7';
    //   divRow.appendChild(divCol);
    //
    //   let divCard = document.createElement('div');
    //   divCard.class = ="card";
    //   divCol.appendChild(divCard);
    //
    //   let divCardImg = document.createElement('div');
    //   divCard.class = ="card-image";
    //   divCard.appendChild(divCardImg);
    //
    //   let divImg = document.createElement('div');
    //   divCard.src = ?;
    //   divCardImg.appendChild(divImg);
    //
    //   let spanCardTitle = document.createElement('span');
    //   divCard.class = ="card-title";
    //   divCard.innerText = 'Title';
    //   divCardImg.appendChild(spanCardTitle);
    //
    //   let divCardContent = document.createElement('div');
    //   divCard.class = ="card-content";
    //   divCard.appendChild(divCardContent);
    //
    //   let p = document.createElement('p');
    //   divCardContent.appendChild(p);
    // }
})();
