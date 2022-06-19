import {useState} from 'react'
import { gql, useMutation } from '@apollo/client'
const initOpt = [{title : ""}, {title : ""}]
const NEW_Q_MUTATION = gql`
   mutation addNew($input: questions_insert_input!){
  	insert_questions_one(object:$input){
    title
    options{
      title
    }
  }
} 
`
const NewQuestion = () => {
    const [addQuestion, {loading, data}] = useMutation(NEW_Q_MUTATION)

    const [title, setTitle] = useState('')
    const [options, setOptions] = useState(initOpt)
    const handleOptChange = (e) => {
        e.preventDefault()
        const newArray = options
        newArray[e.target.id].title = e.target.value
        setOptions([...newArray])
    }
    const handleSave = () => {
        const filledOptions = options.filter(opt => opt.title !== "")
        addQuestion({
            variables: {
                input: {
                    title: title,
                    options: {
                        data: filledOptions
                    }
                }
            }
        })
    }
    if(loading){
        return <div>Loading...</div>
    }
  return (
    <div>
       
            <input type="text" name='title' value={title}  onChange={(e) => setTitle(e.target.value) } placeholder='title' />
            <h2>Options</h2>
            {
                options.map((opt, index) => {
                    return (
                        <div key={index}>
                            <input type="text" id={index} value={opt.title} onChange={handleOptChange} />
                        </div>
                    )
                        
                })
            }
            <button onClick={() => setOptions([...options, {title: ""}])}>New Option</button>
            <button onClick={handleSave}>Save</button>
        
    </div>
  )
}

export default NewQuestion