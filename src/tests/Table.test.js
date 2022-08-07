import { renderWithRedux } from "./helpers/renderWith"
import Table from '../components/Table'
import { screen } from '@testing-library/dom'
import React, { Component } from 'react';


describe('componente Table ',() =>{
    it('aparece os textos?',() => {
        renderWithRedux(<Table />)
        expect(screen.getByText(/Descrição/)).toBeInTheDocument()
    })
})