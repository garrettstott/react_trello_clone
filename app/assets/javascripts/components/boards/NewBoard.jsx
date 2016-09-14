class NewBoard extends React.Component {
  constructor(props) {
    super(props);
    this.addBoard = this.addBoard.bind(this);
  }

  addBoard(e) {
    e.preventDefault();
    let name = this.refs.name.value;
    let description = this.refs.description.value;
    $.ajax({
      url: '/boards',
      type: 'POST',
      data: { board: { name, description }},
      dataType: 'JSON'
    }).done( board => {
      this.props.addBoard(board);
      this.refs.addForm.reset();
    }).fail( errors => {
      console.log(errors);
    })
  }

  render() {
    return (
      <div className='col s12 offset-m1'>
        <h4>Add Board</h4>
        <form ref='addForm' onSubmit={ this.addBoard }>
          <input placeholder='Name' ref='name' required={ true } />
          <input placeholder='description' ref='description' required={ true } />
          <input type='submit' />
        </form>
      </div>
    )
  }
}
