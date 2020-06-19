import React, { Component } from 'react'
import '../../scss/_recipes-list.scss';

class RecipesList extends Component {
    state = {}

    render() {
        return (
            <div className="recipes-list__container">
                <div className="recipes__header">
                    <p>Lista Przepisow</p>
                    <span class="fas fa-plus-square"></span>
                </div>
                <div className="recipes__info">
                    <p className="recipes__info__id">ID</p>
                    <p className="recipes__info__name">NAZWA</p>
                    <p className="recipes__info__description">OPIS</p>
                    <p className="recipes__info__action">AKCJA</p>
                </div>
                <div className="recipes__list">
                    <p className="recipes__id">1</p>
                    <p className="recipes__name">Zapiekanka z ziemniakami i brukselką</p>
                    <p className="recipes__description">Mamusina najlepsza zapiekanka pod słońcem. Można ją podać jako główne danie albo jako kolację. W zapiekance możesz użyć również kiełbasy paprykowej sprawi ona, że zapiekanka będzie ostrzejsza w smaku. Zgodnie z zalecanimi Makłowicza, podawać z dobrze dobranym winkiem {";)"}</p>
                    <p className="recipes__action">
                        <span class="far fa-edit"></span>
                        <span class="far fa-trash-alt"></span>
                    </p>
                </div>
                <div className="recipes__list">
                    <p className="recipes__id">2</p>
                    <p className="recipes__name">Zapiekanka z ziemniakami i brukselką</p>
                    <p className="recipes__description">Mamusina najlepsza zapiekanka pod słońcem. Można ją podać jako główne danie albo jako kolację. W zapiekance możesz użyć również kiełbasy paprykowej sprawi ona, że zapiekanka będzie ostrzejsza w smaku. Zgodnie z zalecanimi Makłowicza, podawać z dobrze dobranym winkiem {";)"}</p>
                    <p className="recipes__action">
                        <span class="far fa-edit"></span>
                        <span class="far fa-trash-alt"></span>
                    </p>
                </div>
            </div>
        );
    }
}

export default RecipesList;