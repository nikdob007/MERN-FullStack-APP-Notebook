import React from 'react'

function Alerts(props) {
    const capWord = (word) => {
        if(word === "danger" ){
            word = "error"
        }
        let newWord = word.charAt(0).toUpperCase() + word.slice(1);
        return newWord;
    }
  return (
    props.alert && 
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>{capWord(props.alert.type)} :</strong> {props.alert.msg}
        {/* <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
    </div>
  )
}

export default Alerts