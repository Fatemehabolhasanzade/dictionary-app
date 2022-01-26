import React from 'react';

function Definition(definition) {
    return (
        <>
            <div className='definition' key={definition.definition.definition}>
                <h4>
                    <span>{definition.definition.definition}</span>
                </h4>
                <p className='example'>
                    <span>{definition.definition.example}</span>
                </p>
                {definition.definition.synonyms == [] ?
                    <p className='synonym'>
                        <span>similar to:</span>
                        {definition.definition.synonyms.map(item => {
                            return <span key={item}>{item}{","}</span>

                        })}
                    </p> : ""}

                {definition.definition.antoonyms == [] ?
                    <p className='antonym'>
                        <span>opposite of:</span>
                        {definition.definition.antonyms.map(item => {
                            return <span key={item}>{item}{","}</span>

                        })
                        }
                    </p> : ""}


            </div>
        </>)
}

export default Definition;



