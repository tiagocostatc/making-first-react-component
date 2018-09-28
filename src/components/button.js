import React from 'react';

export default class Button extends React.Component {

    render() {
        return (
            <div>
                <button onClick={() => {alert("ola pessoal")}}>
                    OLA PESSOAL Super fixe
                </button>
            </div>
        )
    }

}