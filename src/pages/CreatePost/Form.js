import './Form.css';

function Form() {
  return (
    <form className='createpost_form'>
        <input type='text' placeholder='Title...' className='form_input'/>
        <textarea type='text' placeholder='Description' className='form_textarea'/>
        <input type='submit' className='form_submit'/>
    </form>
  )
}

export default Form