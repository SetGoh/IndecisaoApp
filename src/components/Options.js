import React from 'react';

import Option from './Option';

const Options = (props) => (
    <div>
        <div className="widget-header">
            <h3 className="widget-header--title">Suas opções:</h3>
            <button 
                className="button button--link"
                onClick={props.handleRemoveAll}
            >
                Remover todos
            </button>
        </div>

        {props.options.length === 0 && <p className="widget-message">Por favor adicione algo para começar</p>}
        {
            props.options.map((option, index) => (
                <Option 
                    key={option} 
                    optionText={option}
                    count={index + 1}
                    handleRemoveOne={props.handleRemoveOne}
                />
            ))
        }
    </div>
);

export default Options;