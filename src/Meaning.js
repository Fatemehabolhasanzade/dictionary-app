import React from 'react';
import Definition from "./Definition";

function Meaning(item) {
    return <>
        <div className='meaning'>
            <h5>
                <span>{item.item.partOfSpeech}:</span>
            </h5>
            {item.item.definitions.map(def => {
                return (
                    <Definition definition={def} />
                )
            })}
        </div>
    </>
}

export default Meaning;
