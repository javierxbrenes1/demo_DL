import {useEffect, useState} from 'react'
function Voting({hasPrediction}) {
    const [yes, setYes] = useState(0)
    const [no, setNo] = useState(0)

    const onClick = (cb) => () => cb((prev) => prev + 1)

    useEffect(() => {
        if(!hasPrediction) {
            setYes(0)
            setNo(0)
        }
    }, [hasPrediction])

    if(!hasPrediction) return null;
    return (<div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        fontSize: '3rem',
        marginBottom: '2rem'
    }}>
        <div role="button" className="voting" onClick={onClick(setYes)} style={{'&:hover': { cursor: 'pointer' }}}>👍🏼 </div>
        <div role="button" className="voting" onClick={onClick(setNo)}>👎🏻</div>
        <h6 style={
            {color: 'black'}
        }>{yes}</h6>
        <h6 style={
            {color: 'black'}
        }>{no}</h6>
    </div>)
}

export default Voting;